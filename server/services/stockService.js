function filterStocks(stocks, filters) {
    return stocks.filter(stock =>
        filters.every(({ field, condition, value }) => {
            const stockValue = parseFloat(stock[field]);
            const filterValue = parseFloat(value);
            switch (condition) {
                case 'gt': return stockValue > filterValue;
                case 'lt': return stockValue < filterValue;
                case 'eq': return stockValue === filterValue;
                default: return false;
            }
        })
    );
}

module.exports = { filterStocks };
