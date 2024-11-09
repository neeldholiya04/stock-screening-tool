# Stock Screening Tool

A web-based stock screening tool that allows users to filter and view stocks based on specific criteria, similar to Screener.in. The project is built as a **full-stack application** with a **React frontend** and an **Express.js backend**. The tool allows for responsive and user-friendly stock filtering, sorting, and search-ahead functionalities.

### Live Demo

[Stock Screening Tool Live Demo](https://stock-screening-tool-one.vercel.app/)

---

## Table of Contents

- [Project Structure](#project-structure)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
  - [Setting Up Google Sheets API Key](#setting-up-google-sheets-api-key)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Documentation](#api-documentation)

---

## Project Structure

```
stock-screening-tool/
├── server/                     # Backend (Express.js)
│   ├── controllers/            # Controller files for handling requests
│   ├── services/               # Services for handling external dependencies (e.g., Google Sheets)
│   ├── routes/                 # API route definitions
│   ├── config/                 # Configuration files (e.g., Google Sheets)
│   ├── .env                    # Environment variables for server
│   └── server.js               # Main server file
├── client/                     # Frontend (React.js)
│   ├── public/                 # Public assets and HTML template
│   ├── src/                    # Source files
│   ├── components/             # React components
│   ├── services/               # API service functions
|   ├── hooks/               
│   ├── .env                    # Environment variables for client
│   └── App.js                  # Main App file
└── README.md                   # Project documentation
```

---

## Features

- **Filtering**: Users can filter stocks based on multiple parameters like Market Cap, P/E Ratio, ROE, etc.
- **Sorting**: Sort stocks by various fields (e.g., Market Cap, P/E Ratio).
- **Search Ahead**: Autocomplete feature to search for specific tickers.
- **Clear Filters**: Easily reset all filters and view the full stock list.
- **Responsive Design**: Optimized for both desktop and mobile views.
- **Dark Mode**: Toggle between light and dark themes.

---

## Tech Stack

### Backend

- **Node.js**: JavaScript runtime
- **Express.js**: Web framework for server
- **Google Sheets API**: Data source for stock information

### Frontend

- **React.js**: Frontend library
- **Tailwind CSS**: Styling framework
- **Axios**: HTTP client for API calls

---

## Installation

### Prerequisites

- **Node.js** and **npm** installed on your system.
- **Google Cloud Console** account and a project with access to Google Sheets API.

### Backend Setup

1. **Clone the Repository**
    
    ```bash
    git clone https://github.com/neeldholiya04/stock-screening-tool.git
    cd stock-screening-tool/server
    
    ```
    
2. **Install Dependencies**
    
    ```bash
    
    npm install
    ```
    
3. **Set Up Environment Variables**
    
    Create a `.env` file in the `server` directory and add the following variables:
    
    ```
    PORT=5000
    SPREADSHEET_ID=spreadsheet_id
    GOOGLE_APPLICATION_CREDENTIALS=./stock.json
    GOOGLE_APPLICATION_CREDENTIALS_BASE64="base64 converted data"
    ```
    
    
4. **Run the Server**
    
    ```bash
    npm start
    ```
    
    The server will be running on `http://localhost:5000`.
    

### Frontend Setup

1. **Navigate to the Client Directory**
    
    ```bash
    cd ../client
    
    ```
    
2. **Install Dependencies**
    
    ```bash
    npm install
    
    ```
    
3. **Set Up Environment Variables**
    
    Create a `.env` file in the `client` directory and add the following:
    
    ```
    REACT_APP_API_URL=http://localhost:5000
    
    ```
    
    - **REACT_APP_API_URL**: The URL where the backend server is running.
4. **Run the Client**
    
    ```bash
    npm start
    
    ```
    
    The client will be running on `http://localhost:3000`.

### Setting Up Google Sheets API Key

1. **Create a Service Account on Google Cloud**
   - Go to the [Google Cloud Console](https://console.cloud.google.com/).
   - Create a **Service Account** for your project under **IAM & Admin** > **Service Accounts**.
   - Once the service account is created, generate a JSON key file by selecting **Keys** > **Add Key** > **Create new key** and download the JSON file.

2. **Base64 Encode the JSON Key File**

   **For Windows (PowerShell):**
   ```powershell
   [Convert]::ToBase64String([System.IO.File]::ReadAllBytes("path/to/your/stock.json")) | Out-File -Encoding ASCII encoded_key.txt
   ```
   **For macOS and Linux**
   ```bash
   base64 path/to/your/stock.json > encoded_key.txt
   ```

3. **Set the Encoded Key in Environment Variables**
   * Open the `encoded_key.txt` file, copy the entire Base64 string, and set it as the value for `GOOGLE_APPLICATION_CREDENTIALS_BASE64` in your `.env` file.
    

---

## Configuration

The tool retrieves stock data from Google Sheets. Ensure the **Google Sheets API** is enabled in your Google Cloud project, and that the sheet has the required columns (`Market Cap`, `P/E Ratio`, etc.).

1. **Accessing Google Sheets API**:
    - Go to Google Cloud Console.
    - Enable the **Google Sheets API**.
    - Generate an **API key** and set permissions for reading Google Sheets.
2. **Configure Google Sheet**:
    - Share the Google Sheet as "Anyone with the link" if it’s public.
    - Make sure the sheet has structured columns matching the expected parameters.

---

## Usage

1. **Filter Stocks**: Enter filter criteria in the form, e.g., "Market Cap > 10000" and click "Apply Filters."
2. **Clear Filters**: Click "Clear Filters" to reset the filter form and view all stocks.
3. **Sorting**: Click on a column header to sort the stocks by that column.
4. **Search Ahead**: Type in the search bar to get suggestions for stock tickers.

---

## API Documentation

### Base URL

```
http://localhost:5000/api/stocks
```


### Endpoints

1. **Get All Stocks**
    - **URL**: `/api/stocks`
    - **Method**: `GET`
    - **Description**: Fetches all stock data.
    - **Response**: JSON array of stock objects.
2. **Filter Stocks**
    - **URL**: `/api/stocks/filter`
    - **Method**: `POST`
    - **Description**: Filters stocks based on specified criteria.
    - **Request Body**:
        
        ```json
        
        {
          "filters": [
            {
              "field": "Market Capitalization",
              "condition": "gt",
              "value": 10000
            }
          ]
        }
        
        ```
        
    - **Response**: JSON array of filtered stock objects.
3. **Get Headers**
    - **URL**: `/api/stocks/headers`
    - **Method**: `GET`
    - **Description**: Fetches available filter headers.
4. **Get Suggestions**
    - **URL**: `/api/stocks/suggestions`
    - **Method**: `GET`
    - **Query Parameters**: `term` (search term for suggestions), `field` (e.g., `Ticker`)
    - **Response**: Array of suggestions.
