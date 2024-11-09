import React, { useState, useEffect } from 'react';
import { fetchHeaders } from '../services/stockService';

const FilterForm = ({ onFilter, clearFilters }) => {
    const [filters, setFilters] = useState([{ field: '', condition: 'gt', value: '' }]);
    const [availableFields, setAvailableFields] = useState([]);

    useEffect(() => {
        const loadHeaders = async () => {
            try {
                const headers = await fetchHeaders();
                setAvailableFields(Array.isArray(headers) ? headers : []); // Ensure availableFields is an array
            } catch (error) {
                console.error("Failed to load headers:", error);
                setAvailableFields([]); // Set empty array on failure
            }
        };
        loadHeaders();
    }, []);

    const handleAddFilter = () => {
        setFilters([...filters, { field: '', condition: 'gt', value: '' }]);
    };

    const handleChange = (index, e) => {
        const { name, value } = e.target;
        const newFilters = [...filters];
        newFilters[index][name] = value;
        setFilters(newFilters);
    };

    const handleFilter = () => {
        const validFilters = filters.filter(f => f.field && f.value);
        onFilter(validFilters);
    };

    const handleClearFilters = () => {
        setFilters([{ field: '', condition: 'gt', value: '' }]); // Reset filters to initial state
        clearFilters(); // Call the clearFilters function passed from App.js
    };

    return (
        <div className="bg-white dark:bg-gray-800 shadow-md p-6 mb-6 rounded-lg border border-gray-200 dark:border-gray-700">
            {filters.map((filter, index) => (
                <div key={index} className="flex space-x-4 mb-4">
                    <select
                        name="field"
                        value={filter.field}
                        onChange={(e) => handleChange(index, e)}
                        className="border border-gray-300 dark:border-gray-600 p-2 rounded w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                    >
                        <option value="" disabled>Select field</option>
                        {availableFields.map((field) => (
                            <option key={field} value={field}>{field}</option>
                        ))}
                    </select>
                    <select
                        name="condition"
                        value={filter.condition}
                        onChange={(e) => handleChange(index, e)}
                        className="border border-gray-300 dark:border-gray-600 p-2 rounded w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                    >
                        <option value="gt">Greater than</option>
                        <option value="lt">Less than</option>
                        <option value="eq">Equal to</option>
                    </select>
                    <input
                        type="number"
                        name="value"
                        placeholder="Value"
                        value={filter.value}
                        onChange={(e) => handleChange(index, e)}
                        className="border border-gray-300 dark:border-gray-600 p-2 rounded w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                    />
                </div>
            ))}
            <div className="flex space-x-4">
                <button onClick={handleAddFilter} className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white p-2 rounded shadow transition duration-200 ease-in-out">
                    Add Filter
                </button>
                <button onClick={handleFilter} className="bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white p-2 rounded shadow transition duration-200 ease-in-out">
                    Apply Filters
                </button>
                <button onClick={handleClearFilters} className="bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white p-2 rounded shadow transition duration-200 ease-in-out">
                    Clear Filters
                </button>
            </div>
        </div>
    );
};

export default FilterForm;