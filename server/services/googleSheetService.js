const sheets = require('../config/googleSheet');
const SPREADSHEET_ID = process.env.SPREADSHEET_ID;

async function fetchSheetData(range) {
    try {
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: SPREADSHEET_ID,
            range,
        });
        console.log("sheets connected successfully")
        return response.data.values;
    } catch (error) {
        throw new Error(`Google Sheets API error: ${error.message}`);
    }
}

module.exports = { fetchSheetData };
