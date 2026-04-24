/**
 * AI Bridge - Connects Content Hub UI to Google Antigravity CLI
 * Uses user's Google Antigravity subscription (no extra API cost)
 */

const { spawn, execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

// Find Antigravity binary path
const CLAUDE_PATH = (() => {
  try {
    return execSync('which antigravity', { encoding: 'utf-8' }).trim();
  } catch {
    return '/opt/homebrew/bin/antigravity'; // Default for macOS
  }
})();

/**
 * Sanitize input string to prevent injection
 */
function sanitizeInput(input, maxLength = 50000) {
  if (typeof input !== 'string') {
    throw new Error('Input must be a string');
  }
  const sanitized = input.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');
  if (sanitized.length > maxLength) {
    throw new Error(`Input exceeds maximum length of ${maxLength} characters`);
  }
  return sanitized;
}

/**
 * Execute Google Antigravity CLI with prompt
 */
function executeAntigravityCode(prompt, options = {}) {
  return new Promise((resolve, reject) => {
    const {
      timeout = 60000,
      cwd = process.cwd()
    } = options;

    let sanitizedPrompt;
    try {
      sanitizedPrompt = sanitizeInput(prompt);
    } catch (err) {
      reject(err);
      return;
    }

    // Write prompt to temp file to avoid shell escaping issues
    const tempFile = path.join(os.tmpdir(), `antigravity-prompt-${Date.now()}.txt`);
    fs.writeFileSync(tempFile, sanitizedPrompt, 'utf-8');

    const args = [
      '-p', // Print mode
      '--output-format', 'text',
      '--allowedTools', '', // No tools, just text generation
      `Read ${tempFile} and respond to the request inside it. Output ONLY the requested content, nothing else.`
    ];

    const antigravity = spawn(CLAUDE_PATH, args, {
      cwd,
      env: { ...process.env, PATH: process.env.PATH + ':/opt/homebrew/bin:/usr/local/bin' },
      timeout,
      stdio: ['pipe', 'pipe', 'pipe']
    });

    let stdout = '';
    let stderr = '';

    antigravity.stdout.on('data', (data) => {
      stdout += data.toString();
    });

    antigravity.stderr.on('data', (data) => {
      stderr += data.toString();
    });

    antigravity.on('close', (code) => {
      // Clean up temp file
      try { fs.unlinkSync(tempFile); } catch {}

      if (code !== 0) {
        reject(new Error(`Antigravity exited with code ${code}: ${stderr || stdout}`));
        return;
      }

      resolve({ text: stdout.trim() });
    });

    antigravity.on('error', (err) => {
      try { fs.unlinkSync(tempFile); } catch {}
      reject(new Error(`Failed to spawn antigravity: ${err.message}`));
    });

    // Timeout handler
    setTimeout(() => {
      antigravity.kill('SIGTERM');
    }, timeout);
  });
}

/**
 * Enhance content with AI
 * Since Antigravity CLI can't be spawned reliably from Node.js while a session is active,
 * this saves content to a file and returns the file path for the user to enhance via CLI.
 *
 * @param {string} content - Original content
 * @param {string} instruction - Enhancement instruction
 * @param {string} contentType - Type of content (blog, social, etc.)
 * @returns {Promise<object>} - Object with file path and command
 */
async function enhanceContent(content, instruction, contentType = 'content') {
  const timestamp = Date.now();
  const enhanceDir = path.join(__dirname, '..', '..', 'temp', 'enhance');
  const filename = `enhance-${timestamp}.md`;
  const filepath = path.join(enhanceDir, filename);
  const relativePath = `.antigravity/skills/marketing-dashboard/temp/enhance/${filename}`;

  // Ensure directory exists
  fs.mkdirSync(enhanceDir, { recursive: true });

  // Write content with instruction
  const fileContent = `---
instruction: ${instruction}
type: ${contentType}
created: ${new Date().toISOString()}
---

${content}
`;

  fs.writeFileSync(filepath, fileContent, 'utf-8');

  // Return file info for the API to handle
  return {
    saved: true,
    filepath: relativePath,
    absolutePath: filepath,
    command: `Enhance the content in ${relativePath}`,
    content: content // Return original for now
  };
}

/**
 * Generate new content with AI
 * @param {string} type - Content type (blog, social, email, etc.)
 * @param {string} description - What to generate
 * @param {object} context - Additional context (brand, etc.)
 * @returns {Promise<string>} - Generated content
 */
async function generateContent(type, description, context = {}) {
  const brandContext = context.brand
    ? `BRAND CONTEXT: ${JSON.stringify(context.brand)}`
    : '';

  const prompt = `
Generate marketing content.

TYPE: ${type}
DESCRIPTION: ${description}
${brandContext}

Generate high-quality ${type} content based on the description.
Output ONLY the content, formatted appropriately for the type.
`;

  const result = await executeAntigravityCode(prompt, {
    tools: 'Read',
    timeout: 90000
  });

  if (result.result) {
    return result.result;
  }
  if (result.text) {
    return result.text;
  }
  throw new Error('Failed to generate content');
}

/**
 * Check if Google Antigravity CLI is available
 * @returns {Promise<boolean>}
 */
async function isAntigravityAvailable() {
  return new Promise((resolve) => {
    const antigravity = spawn('antigravity', ['--version'], { timeout: 5000 });
    antigravity.on('close', (code) => resolve(code === 0));
    antigravity.on('error', () => resolve(false));
  });
}

module.exports = {
  executeAntigravityCode,
  enhanceContent,
  generateContent,
  isAntigravityAvailable
};
