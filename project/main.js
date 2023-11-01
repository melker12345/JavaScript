const apiKey = "RVFIMWMC4KB7C7N6";
let stockChart; // This will hold our chart instance

// Function to create a chart
function createChart(data, symbol) {
    const ctx = document.getElementById('stockChart').getContext('2d');
    if (stockChart) {
        stockChart.destroy(); // Destroy the old chart instance before creating a new one
    }
    stockChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.labels,
            datasets: [{
                label: `${symbol} Stock Price`,
                data: data.datasets[0].data,
                fill: false,
                borderColor: '#0ca8f6',
                tension: 0.1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: false
                }
            },
            responsive: true,
            title: {
                display: true,
                text: `Stock Price of ${symbol}`
            }
        }
    });
}

// Function to fetch data for the selected symbol
async function fetchData(symbol) {
    const apiUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${apiKey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    const timeSeries = data['Time Series (Daily)'];
    const labels = Object.keys(timeSeries).reverse();
    const stockPrices = labels.map(date => parseFloat(timeSeries[date]['4. close']));

    return {
        labels: labels,
        datasets: [{
            label: `${symbol} Stock Price`,
            data: stockPrices,
            fill: false,
            borderColor: 'rgb(0,0,0)',
            tension: 0.1
        }]
    };
}

// Placeholder function for fetching symbols from the API
async function fetchSymbols() {
    const apiUrl = `https://www.alphavantage.co/query?function=LISTING_STATUS&apikey=${apiKey}`;
    const response = await fetch(apiUrl);
    const text = await response.text();
    const rows = text.trim().split('\n');
    const symbols = rows.slice(1).map(row => row.split(',')[0]);
    return symbols;
}

// Function to populate the symbol selector dropdown with symbols fetched from the API
async function populateSymbols() {
    const symbols = await fetchSymbols();
    const selector = document.getElementById('symbolSelector');
    symbols.forEach(symbol => {
        const option = document.createElement('option');
        option.value = symbol;
        option.textContent = symbol;
        selector.appendChild(option);
    });

    // Trigger change event to load initial chart after populating the dropdown
    selector.dispatchEvent(new Event('change'));
}
// Function to display search results
function displaySearchResults(matches) {
    const resultsDiv = document.getElementById('searchResults');
    resultsDiv.innerHTML = ''; // Clear previous results

    matches.forEach((match) => {
        const symbol = match['1. symbol'];
        const name = match['2. name'];
        const div = document.createElement('div');
        div.textContent = `${name} (${symbol})`;
        div.addEventListener('click', () => {
            document.getElementById('symbolSelector').value = symbol;
            document.getElementById('symbolSelector').dispatchEvent(new Event('change'));
            resultsDiv.innerHTML = ''; // Clear results after selection
        });
        resultsDiv.appendChild(div);
    });
}

// Event listener for search input
document.getElementById('symbolSearch').addEventListener('input', async (event) => {
    const keyword = event.target.value;

    if (keyword.length < 2) { // Only search if the user has typed at least 3 characters
        return;
    }

    const searchApiUrl = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${keyword}&apikey=${apiKey}`;
    try {
        const response = await fetch(searchApiUrl);
        const searchData = await response.json();
        if (searchData.bestMatches) {
            displaySearchResults(searchData['bestMatches']);
        }
    } catch (error) {
        console.error('Error fetching search results:', error);
    }
});
// Event listener for when a new symbol is selected
document.getElementById('symbolSelector').addEventListener('change', async function () {
    const symbol = this.value;
    const data = await fetchData(symbol);
    createChart(data, symbol);
});

// Call `populateSymbols` on page load to fetch symbols and populate the dropdown
window.addEventListener('load', populateSymbols);