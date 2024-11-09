import React, { useMemo } from 'react';

const StockTable = ({ stocks, searchTerm, sortConfig, onSort }) => {
    const headers = Object.keys(stocks[0] || {});

    const filteredStocks = useMemo(() => 
        Array.isArray(stocks)
            ? stocks.filter(stock =>
                headers.some(header =>
                    stock[header]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
                )
            )
            : [], 
        [stocks, searchTerm, headers]
    );

    const sortedStocks = useMemo(() => {
        if (!sortConfig.key) return filteredStocks;

        const sortedData = [...filteredStocks].sort((a, b) => {
            const aValue = a[sortConfig.key];
            const bValue = b[sortConfig.key];

            if (aValue < bValue) return sortConfig.direction === 'ascending' ? -1 : 1;
            if (aValue > bValue) return sortConfig.direction === 'ascending' ? 1 : -1;
            return 0;
        });

        return sortedData;
    }, [filteredStocks, sortConfig]);

    if (!filteredStocks.length) return <p className="text-gray-600 dark:text-gray-300 text-center mt-4">No results found.</p>;

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
                <thead>
                    <tr className="bg-blue-600 dark:bg-blue-700 text-white">
                        {headers.map(header => (
                            <th
                                key={header}
                                onClick={() => onSort(header)}
                                className="py-2 px-4 border-b border-r border-gray-300 dark:border-gray-600 text-center font-medium last:border-r-0 cursor-pointer hover:bg-blue-700 dark:hover:bg-blue-800"
                            >
                                {header}
                                {sortConfig.key === header && (
                                    <span>{sortConfig.direction === 'ascending' ? ' 🔼' : ' 🔽'}</span>
                                )}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {sortedStocks.map((stock, index) => (
                        <tr key={index} className="hover:bg-blue-50 dark:hover:bg-blue-900 transition duration-200 odd:bg-gray-50 even:bg-white dark:odd:bg-gray-800 dark:even:bg-gray-700">
                            {headers.map(key => (
                                <td key={key} className="py-2 px-4 border-b border-r border-gray-300 dark:border-gray-600 text-center text-gray-700 dark:text-gray-300 last:border-r-0">
                                    {stock[key]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StockTable;