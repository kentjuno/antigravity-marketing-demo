const fs = require('fs');
const path = require('path');
const os = require('os');

// Detect Antigravity Knowledge Directory based on OS
const homeDir = os.homedir();
const globalKnowledgeDir = path.join(homeDir, '.gemini', 'antigravity', 'knowledge');

// Local skills directory
const localKnowledgeDir = path.join(__dirname, '.antigravity', 'knowledge');
const prefix = 'mkt-';

function copyRecursiveSync(src, dest) {
    const exists = fs.existsSync(src);
    const stats = exists && fs.statSync(src);
    const isDirectory = exists && stats.isDirectory();
    
    if (isDirectory) {
        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest, { recursive: true });
        }
        fs.readdirSync(src).forEach(childItemName => {
            copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
        });
    } else {
        fs.copyFileSync(src, dest);
    }
}

async function install() {
    console.log('🚀 Chẩn bị cài đặt Antigravity Marketing Skills vào hệ thống...');
    
    if (!fs.existsSync(localKnowledgeDir)) {
        console.error('❌ Không tìm thấy thư mục kĩ năng cục bộ tại: ' + localKnowledgeDir);
        process.exit(1);
    }
    
    if (!fs.existsSync(globalKnowledgeDir)) {
        console.log(`Tiến hành tạo mới thư mục Antigravity Knowledge Global...`);
        fs.mkdirSync(globalKnowledgeDir, { recursive: true });
    }

    const items = fs.readdirSync(localKnowledgeDir);
    let count = 0;

    items.forEach(item => {
        const itemPath = path.join(localKnowledgeDir, item);
        const stats = fs.statSync(itemPath);
        
        if (stats.isDirectory()) {
            const targetName = item.startsWith(prefix) ? item : `${prefix}${item}`;
            const targetPath = path.join(globalKnowledgeDir, targetName);
            
            try {
                if (fs.existsSync(targetPath)) {
                    fs.rmSync(targetPath, { recursive: true, force: true });
                }
                copyRecursiveSync(itemPath, targetPath);
                console.log(`✅ Đã cài đặt: ${targetName}`);
                count++;
            } catch (error) {
                console.error(`❌ Lỗi khi cài đặt ${item}:`, error.message);
            }
        }
    });

    console.log(`\n🎉 Hoàn tất! Đã đưa thành công ${count} kỹ năng Marketing vào Google Antigravity.`);
    console.log(`💡 Bây giờ bạn có thể báo Agent viết lách ở bất kì thư mục dự án nào!`);
}

install();
