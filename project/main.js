let userBalance = 100000;  // Fake money

function buyStock(stockSymbol, quantity, pricePerShare) {
    const cost = quantity * pricePerShare;
    if (userBalance >= cost) {
        userBalance -= cost;
        // Add stock to user's portfolio
        // Update transaction history
    } else {
        alert("Insufficient funds!");
    }
}

function sellStock(stockSymbol, quantity, pricePerShare) {
    // Assume user owns enough shares
    const revenue = quantity * pricePerShare;
    userBalance += revenue;
    // Remove stock from user's portfolio
    // Update transaction history
}

// Fetch stock data from an API
function fetchStockData(stockSymbol) {
    fetch(`https://example.com/api/stocks/${stockSymbol}`)
        .then(response => response.json())
        .then(data => {
            // Display stock data
        });
}