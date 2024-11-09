import React, { useState, useEffect } from 'react';
import FilterForm from './components/FilterForm';
import StockTable from './components/StockTable';
import Loader from './components/Loader';
import { fetchAllStocks, fetchFilteredStocks, fetchSuggestions } from './services/stockService';

function App() {
    const [stocks, setStocks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const darkModePreference = localStorage.getItem('darkMode') === 'true';
        setIsDarkMode(darkModePreference);
        document.documentElement.classList.toggle('dark', darkModePreference);
    }, []);

    const toggleDarkMode = () => {
        setIsDarkMode((prev) => {
            const newMode = !prev;
            document.documentElement.classList.toggle('dark', newMode);
            localStorage.setItem('darkMode', newMode);
            return newMode;
        });
    };

    const loadAllStocks = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchAllStocks();
            setStocks(data);
        } catch (error) {
            console.error("Error loading all stocks:", error);
            setError("Failed to load stocks.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadAllStocks();
    }, []);

    const fetchStocks = async (filters) => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchFilteredStocks(filters);
            setStocks(data);
        } catch (error) {
            console.error("Error fetching filtered stocks:", error);
            setError("Failed to fetch stocks.");
        } finally {
            setLoading(false);
        }
    };

    const handleSearchChange = async (event) => {
        const value = event.target.value;
        setSearchTerm(value);

        if (value) {
            try {
                const suggestions = await fetchSuggestions(value, 'Ticker');
                setSuggestions(suggestions);
            } catch (error) {
                console.error("Error fetching Ticker suggestions:", error);
            }
        } else {
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setSearchTerm(suggestion);
        setSuggestions([]);
    };

    const handleSort = (key) => {
        setSortConfig((prevSortConfig) => {
            if (prevSortConfig.key === key && prevSortConfig.direction === 'ascending') {
                return { key, direction: 'descending' };
            }
            return { key, direction: 'ascending' };
        });
    };

    const clearFilters = () => {
        loadAllStocks(); // Reset stocks to initial unfiltered data
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 dark:text-gray-100">
            {/* Sticky Navbar */}
            <div className="w-full bg-gray-50 dark:bg-gray-900 shadow-md sticky top-0 z-20 py-2 md:py-4">
                <div className="max-w-5xl mx-auto flex justify-between items-center px-4">
                    <h1 className="text-xl md:text-3xl font-bold text-blue-600 dark:text-blue-400">Stock Screening Tool</h1>
                    <button
                        onClick={toggleDarkMode}
                        className="bg-gray-200 dark:bg-gray-800 p-2 rounded text-xs md:text-sm text-gray-800 dark:text-gray-200 shadow-md"
                    >
                        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                    </button>
                </div>
            </div>

            {/* Filter and Search Container */}
            <div className="max-w-5xl mx-auto p-2 md:p-4 space-y-4">
                <div className="w-full max-w-lg mx-auto">
                    {/* Filter Form */}
                    <FilterForm onFilter={fetchStocks} clearFilters={clearFilters} />

                    {/* Search Bar */}
                    <div className="relative mt-4">
                        <input
                            type="text"
                            placeholder="Search Ticker..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="w-full p-2 border dark:border-gray-600 rounded shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300"
                        />
                        {suggestions.length > 0 && (
                            <ul className="absolute left-0 right-0 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 shadow-lg rounded mt-1 max-h-48 overflow-y-auto z-10">
                                {suggestions.map((suggestion, index) => (
                                    <li
                                        key={index}
                                        onClick={() => handleSuggestionClick(suggestion)}
                                        className="p-2 cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-800"
                                    >
                                        {suggestion}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>

            {/* Responsive Table with Sticky Header */}
            <div className="max-w-5xl mx-auto p-2 md:p-4">
                {loading ? (
                    <Loader />
                ) : error ? (
                    <p className="text-red-500 dark:text-red-400 text-center mt-4">{error}</p>
                ) : (
                    <StockTable
                        stocks={stocks}
                        searchTerm={searchTerm}
                        sortConfig={sortConfig}
                        onSort={handleSort}
                    />
                )}
            </div>
        </div>
    );
}

export default App;
