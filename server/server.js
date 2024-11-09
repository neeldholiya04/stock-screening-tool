require('dotenv').config();
const express = require('express');
const cors = require('cors');
const stockRoutes = require('./routes/stockRoutes');

const corsOptions = {
    origin: ['https://stock-screening-tool-one.vercel.app', 'http://localhost:3000'],
    optionsSuccessStatus: 200,
};


const app = express();
app.use(cors(corsOption));
app.use(express.json());

app.use('/api/stocks', stockRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
