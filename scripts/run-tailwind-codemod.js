#!/usr/bin/env node

import { execSync } from 'child_process';

console.log('Running Tailwind CSS v4 codemod...');

try {
  // Run the Tailwind CSS v4 codemod with force flag
  execSync('npx @tailwindcss/upgrade --force', { stdio: 'inherit' });
  console.log('✅ Tailwind CSS v4 codemod completed successfully!');
} catch (error) {
  console.error('❌ Error running Tailwind CSS v4 codemod:', error.message);
  process.exit(1);
}