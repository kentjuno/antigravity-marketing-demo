/**
 * ROUTE: Content
 * Đọc file .md offline từ thư mục output của Antigravity
 */
import { Hono } from 'hono';
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Thư mục chứa bài viết của Antigravity
const POSTS_DIR = path.resolve(__dirname, '..', '..', '..', '..', '..', 'assets');

function findMarkdownFiles(dir, fileList = []) {
    if (!fs.existsSync(dir)) return fileList;
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            findMarkdownFiles(filePath, fileList);
        } else if (filePath.endsWith('.md')) {
            const relPath = path.relative(POSTS_DIR, filePath).replace(/\\/g, '/');
            fileList.push(relPath);
        }
    }
    return fileList;
}

const contentRouter = new Hono();

// Helper: Phân tích YAML Frontmatter (linh hoạt CRLF/LF Windows/Linux)
function parseFrontmatter(fileContent) {
    const regex = /^---[\r\n]+([\s\S]*?)[\r\n]+---[\r\n]+([\s\S]*)$/;
    const match = fileContent.match(regex);

    if (!match) return { attributes: {}, body: fileContent };

    const yamlBlock = match[1];
    const body = match[2];

    const attributes = {};
    const lines = yamlBlock.split(/\r?\n/);
    lines.forEach(line => {
        const colonIdx = line.indexOf(':');
        if (colonIdx > -1) {
            const key = line.slice(0, colonIdx).trim();
            const val = line.slice(colonIdx + 1).trim()
                            .replace(/^['"](.*)['"]$/, '$1');
            attributes[key] = val;
        }
    });

    return { attributes, body };
}

// 1. GET /api/content - Lấy danh sách toàn bộ các file .md
contentRouter.get('/', (c) => {
    try {
        if (!fs.existsSync(POSTS_DIR)) {
            return c.json([]);
        }

        const files = findMarkdownFiles(POSTS_DIR);
        const posts = files.map(file => {
            const filePath = path.join(POSTS_DIR, file);
            const stats = fs.statSync(filePath);
            const fileContent = fs.readFileSync(filePath, 'utf8');
            const { attributes } = parseFrontmatter(fileContent);

            return {
                id: file,
                filename: file,
                title: attributes.title || file.replace('.md', ''),
                category: attributes.category || 'draft',
                createdAt: stats.birthtime,
                updatedAt: stats.mtime,
            };
        });

        posts.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
        return c.json(posts);
    } catch (err) {
        console.error('Lỗi khi đọc danh sách Content:', err);
        return c.json({ error: 'Không thể đọc nội dung thư mục output' }, 500);
    }
});

// 2. GET /api/content/:id - Lấy nội dung chi tiết 1 bài
contentRouter.get('/:id{.*}', (c) => {
    const filename = c.req.param('id');
    const filePath = path.join(POSTS_DIR, filename);

    try {
        if (!filename.endsWith('.md') || filename.includes('..')) {
            return c.json({ error: 'Đường dẫn file không hợp lệ' }, 400);
        }
        if (!fs.existsSync(filePath)) {
            return c.json({ error: 'Bài viết không tồn tại' }, 404);
        }

        const stats = fs.statSync(filePath);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const { attributes, body } = parseFrontmatter(fileContent);

        return c.json({
            id: filename,
            filename,
            title: attributes.title || filename.replace('.md', ''),
            category: attributes.category || 'draft',
            createdAt: stats.birthtime,
            updatedAt: stats.mtime,
            attributes,
            body,
        });
    } catch (err) {
        return c.json({ error: 'Lỗi parse dữ liệu' }, 500);
    }
});

// 3. POST /api/content/open-ide - Kích hoạt VSCode/Cursor mở thẳng file .md
contentRouter.post('/open-ide', async (c) => {
    const body = await c.req.json();
    const filename = body.filename;
    if (!filename || filename.includes('..')) return c.json({ error: 'Lỗi bảo mật' }, 400);

    const filePath = path.join(POSTS_DIR, filename);

    // Thử cursor trước (Antigravity users hay dùng), fallback code, fallback start Windows
    const tryOpen = (cmds) => {
        if (cmds.length === 0) return;
        exec(cmds[0], (err) => {
            if (err) tryOpen(cmds.slice(1));
        });
    };

    tryOpen([
        `cursor "${filePath}"`,
        `code "${filePath}"`,
        `cmd /c start "" "${filePath}"`,
    ]);

    return c.json({ success: true, message: `Đã gửi lệnh bật IDE cho file: ${filename}` });
});

export default contentRouter;
