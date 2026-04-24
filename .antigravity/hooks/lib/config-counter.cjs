#!/usr/bin/env node
'use strict';

// Config Counter - Count ANTIGRAVITY.md, rules, MCPs, hooks across user and project scopes

const fs = require('fs');
const path = require('path');
const os = require('os');

function getMcpServerNames(filePath) {
  if (!fs.existsSync(filePath)) return new Set();
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const config = JSON.parse(content);
    if (config.mcpServers && typeof config.mcpServers === 'object') {
      return new Set(Object.keys(config.mcpServers));
    }
  } catch {
    // Silent fail
  }
  return new Set();
}

function countMcpServersInFile(filePath, excludeFrom) {
  const servers = getMcpServerNames(filePath);
  if (excludeFrom) {
    const exclude = getMcpServerNames(excludeFrom);
    for (const name of exclude) {
      servers.delete(name);
    }
  }
  return servers.size;
}

function countHooksInFile(filePath) {
  if (!fs.existsSync(filePath)) return 0;
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const config = JSON.parse(content);
    if (config.hooks && typeof config.hooks === 'object') {
      return Object.keys(config.hooks).length;
    }
  } catch {
    // Silent fail
  }
  return 0;
}

function countRulesInDir(rulesDir, depth = 0) {
  // Depth limit prevents symlink loops and excessive recursion
  if (depth > 5 || !fs.existsSync(rulesDir)) return 0;
  let count = 0;
  try {
    const entries = fs.readdirSync(rulesDir, { withFileTypes: true });
    for (const entry of entries) {
      // Skip symlinks to prevent loops
      if (entry.isSymbolicLink()) continue;
      const fullPath = path.join(rulesDir, entry.name);
      if (entry.isDirectory()) {
        count += countRulesInDir(fullPath, depth + 1);
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        count++;
      }
    }
  } catch {
    // Silent fail
  }
  return count;
}

function countConfigs(cwd) {
  let antigravityMdCount = 0, rulesCount = 0, mcpCount = 0, hooksCount = 0;
  const homeDir = os.homedir();
  const antigravityDir = path.join(homeDir, '.antigravity');

  // User scope
  if (fs.existsSync(path.join(antigravityDir, 'ANTIGRAVITY.md'))) antigravityMdCount++;
  rulesCount += countRulesInDir(path.join(antigravityDir, 'rules'));
  const userSettings = path.join(antigravityDir, 'settings.json');
  mcpCount += countMcpServersInFile(userSettings);
  hooksCount += countHooksInFile(userSettings);
  mcpCount += countMcpServersInFile(path.join(homeDir, '.antigravity.json'), userSettings);

  // Project scope
  if (cwd) {
    if (fs.existsSync(path.join(cwd, 'ANTIGRAVITY.md'))) antigravityMdCount++;
    if (fs.existsSync(path.join(cwd, 'CLAUDE.local.md'))) antigravityMdCount++;
    if (fs.existsSync(path.join(cwd, '.antigravity', 'ANTIGRAVITY.md'))) antigravityMdCount++;
    if (fs.existsSync(path.join(cwd, '.antigravity', 'CLAUDE.local.md'))) antigravityMdCount++;
    rulesCount += countRulesInDir(path.join(cwd, '.antigravity', 'rules'));
    mcpCount += countMcpServersInFile(path.join(cwd, '.mcp.json'));
    const projectSettings = path.join(cwd, '.antigravity', 'settings.json');
    mcpCount += countMcpServersInFile(projectSettings);
    hooksCount += countHooksInFile(projectSettings);
    const localSettings = path.join(cwd, '.antigravity', 'settings.local.json');
    mcpCount += countMcpServersInFile(localSettings);
    hooksCount += countHooksInFile(localSettings);
  }

  return { antigravityMdCount, rulesCount, mcpCount, hooksCount };
}

module.exports = { countConfigs, getMcpServerNames, countMcpServersInFile, countHooksInFile, countRulesInDir };
