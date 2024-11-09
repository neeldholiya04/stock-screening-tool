require('dotenv').config();
const express = require('express');
const cors = require('cors');
const stockRoutes = require('./routes/stockRoutes');

const corsOption = (req, res, next) => {

    const allowedOrigins = ['http://localhost:5173',"https://frontend-vogueish.vercel.app", "https://frontend-vogueish-git-main-neeldholiya04s-projects.vercel.app/", "https://frontend-vogueish-cgko6yuks-neeldholiya04s-projects.vercel.app/"]; // Add any other allowed origins
  
    const origin = req.headers.origin;
    
    if (allowedOrigins.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
    }
  
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  
    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }
  
    next();
  };

const app = express();
app.use(cors(corsOption));
app.use(express.json());

app.use('/api/stocks', stockRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
