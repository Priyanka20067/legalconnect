// Script to add NEXTAUTH_SECRET to .env file
// Run this with: node scripts/setup-nextauth-secret.js

const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

const envPath = path.join(__dirname, '..', '.env');

// Generate a secure random secret
const secret = crypto.randomBytes(32).toString('base64');

// Read existing .env file
let envContent = '';
if (fs.existsSync(envPath)) {
    envContent = fs.readFileSync(envPath, 'utf8');
}

// Check if NEXTAUTH_SECRET already exists
if (envContent.includes('NEXTAUTH_SECRET=')) {
    console.log('⚠️  NEXTAUTH_SECRET already exists in .env file');
    console.log('If you want to regenerate it, please remove the existing line first.');
} else {
    // Add NEXTAUTH_SECRET and NEXTAUTH_URL
    const newLines = [
        '',
        '# NextAuth Configuration',
        `NEXTAUTH_SECRET=${secret}`,
        'NEXTAUTH_URL=http://localhost:3000',
    ].join('\n');

    envContent += newLines + '\n';

    fs.writeFileSync(envPath, envContent);
    console.log('✓ Successfully added NEXTAUTH_SECRET to .env file');
    console.log('✓ Added NEXTAUTH_URL=http://localhost:3000');
    console.log('\n⚠️  IMPORTANT: Please restart your dev server for changes to take effect!');
    console.log('   Press Ctrl+C in the terminal running "npm run dev" and run it again.');
}
