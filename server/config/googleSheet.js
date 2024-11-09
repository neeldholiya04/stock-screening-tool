const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');


const base64Key = process.env.GOOGLE_APPLICATION_CREDENTIALS_BASE64;
const keyPath = path.join(__dirname, 'stock.json');

if (base64Key) {
    const decodedKey = Buffer.from(base64Key, 'base64').toString('utf-8');
    fs.writeFileSync(keyPath, decodedKey);
}

const auth = new google.auth.GoogleAuth({
    keyFile: keyPath,
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
});

const sheets = google.sheets({ version: 'v4', auth });

module.exports = sheets;
