const { fetchSheetData } = require('../services/googleSheetService');
const { filterStocks } = require('../services/stockService');

exports.getStocks = async (req, res) => {
    try {
        const rawData = await fetchSheetData('Sheet1!A1:I500');
        const [headers, ...rows] = rawData;

        const stocks = rows.map(row =>
            headers.reduce((obj, header, index) => {
                obj[header] = row[index];
                return obj;
            }, {})
        );

        res.json(stocks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



exports.filterStocks = async (req, res) => {
    try {
        const { filters } = req.body;

        if (!filters || !Array.isArray(filters)) {
            console.error("Invalid filters provided:", filters);
            return res.status(400).json({ error: 'Invalid filters format' });
        }

        const rawData = await fetchSheetData('Sheet1!A1:I500');
        const [headers, ...rows] = rawData;

        const stocks = rows.map(row =>
            headers.reduce((obj, header, index) => {
                obj[header] = row[index];
                return obj;
            }, {})
        );

        const filteredStocks = filterStocks(stocks, filters);
        res.json(filteredStocks);
    } catch (error) {
        console.error("Error processing filterStocks request:", error);
        res.status(500).json({ error: error.message });
    }
};

exports.getHeaders = async (req, res) => {
    try {
        const rawData = await fetchSheetData('Sheet1!A1:Z1'); 
        const headers = rawData[0]; 

        if (!headers) {
            return res.status(404).json({ error: 'No headers found' });
        }

        res.json(headers); 
    } catch (error) {
        console.error("Error fetching headers:", error);
        res.status(500).json({ error: error.message });
    }
};

exports.getSuggestions = async (req, res) => {
    try {
        const { term = '' } = req.query;
        const rawData = await fetchSheetData('Sheet1!A1:I500'); 
        const [headers, ...rows] = rawData;

        const tickerIndex = headers.indexOf("Ticker");
        if (tickerIndex === -1) {
            return res.status(400).json({ error: `Field 'Ticker' not found in the data.` });
        }

        const uniqueTickers = Array.from(new Set(rows.map(row => row[tickerIndex])));
        const suggestions = uniqueTickers
            .filter(ticker => ticker && ticker.toLowerCase().includes(term.toLowerCase()))
            .slice(0, 10); 

        res.json(suggestions);
    } catch (error) {
        console.error("Error fetching Ticker suggestions:", error);
        res.status(500).json({ error: error.message });
    }
};