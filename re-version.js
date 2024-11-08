const fs = require('fs');
const semver = require('semver');

const filePath = './package.json';

if (fs.existsSync(filePath)) {
    const packageData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const currentVersion = packageData.version;
    const type = ['major', 'minor', 'patch'].includes(process.argv[2]) ? process.argv[2] : 'patch';
    
    const newVersion = semver.inc(currentVersion, type);
    if (newVersion) {
        packageData.version = newVersion;
        fs.writeFileSync(filePath, JSON.stringify(packageData, null, 2));
        console.log(`Root Project Version updated: ${currentVersion} => ${newVersion}`);
    } else {
        console.error('Error: Failed to increment version.');
    }
} else {
    console.error('Error: package.json not found.');
}
