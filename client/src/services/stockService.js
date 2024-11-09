import axios from 'axios';


export async function fetchAllStocks() {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/stocks`);
        return response.data;
    } catch (error) {
        console.error("Error fetching all stocks:", error);
        throw error;
    }
}

export async function fetchFilteredStocks(filters) {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/stocks/filter`, { filters });
        return response.data;
    } catch (error) {
        console.error("Error fetching filtered stocks:", error);
        throw error;
    }
}

export async function fetchHeaders() {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/stocks/headers`);
        return response.data; 
    } catch (error) {
        console.error("Error fetching headers:", error);
        throw error;
    }
}

export async function fetchSuggestions(term, field = 'name') {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/stocks/suggestions`, {
            params: { term, field },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching suggestions:", error);
        throw error;
    }
}
