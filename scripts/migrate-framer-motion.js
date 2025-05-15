#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

// Find all files that import from framer-motion
const findFramerMotionImports = () => {
  try {
    const result = execSync(
      'find /workspace/animata -type f -name "*.tsx" -o -name "*.ts" | grep -v "node_modules" | xargs grep -l "framer-motion"',
      { encoding: 'utf8' }
    );
    return result.trim().split('\n').filter(Boolean);
  } catch (error) {
    console.error('Error finding framer-motion imports:', error.message);
    return [];
  }
};

// Replace framer-motion imports with our custom motion utility
const replaceImports = (filePath) => {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace import statements
    content = content.replace(
      /import\s+{([^}]*)}\s+from\s+["']framer-motion["'];?/g,
      (match, importedItems) => {
        // Keep track of what's being imported
        const items = importedItems.split(',').map(item => item.trim());
        
        // Create a new import statement using our motion utility
        return `import { ${items.join(', ')} } from "@/lib/motion";`;
      }
    );
    
    // Replace type annotations for VariantLabels and TargetAndTransition
    content = content.replace(
      /VariantLabels\s*\|\s*TargetAndTransition/g,
      'Record<string, any>'
    );
    
    content = content.replace(
      /TargetAndTransition/g,
      'Record<string, any>'
    );
    
    content = content.replace(
      /VariantLabels/g,
      'Record<string, any>'
    );
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Updated ${filePath}`);
  } catch (error) {
    console.error(`❌ Error updating ${filePath}:`, error.message);
  }
};

// Main function
const main = () => {
  console.log('🔍 Finding files that import from framer-motion...');
  const files = findFramerMotionImports();
  
  if (files.length === 0) {
    console.log('No files found that import from framer-motion.');
    return;
  }
  
  console.log(`Found ${files.length} files that import from framer-motion.`);
  
  files.forEach(file => {
    console.log(`Processing ${file}...`);
    replaceImports(file);
  });
  
  console.log('✨ Migration complete!');
};

main();