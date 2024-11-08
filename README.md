# Steps to Update Project Version Using `re-version`

1. Initialize `package.json`

```bash
npm init -y
```

2. Install Development Dependency Install the `semver` package as a development dependency:

```bash
npm install -D semver
```

3. **Create the** `re-version.js` **Script** Create a new JavaScript file named `re-version.js` and add the following
   code:

```javascript
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
```

4. **Add Script to** `package.json` Update the `"scripts"` section in `package.json` to include the new command:

```json
{
  "scripts": {
    "re-version": "node re-version.js"
  }
}
```

5. **Run the Version Update** Execute the script to update the version (default is `patch`):

```bash
npm run re-version
```

---

This guide will help you automatically update the project version in `package.json`. You can also specify the version
type (`major`, `minor`, or `patch`) when running the script:

```bash
npm run re-version [major|minor|patch]
```
