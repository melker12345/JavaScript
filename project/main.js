// Store your API key as a constant.
const apiKey = "RVFIMWMC4KB7C7N6";

// Global variable to hold our chart object.
let stockChart;

// This variable keeps track of the currently selected stock symbol.
let currentSymbol = "";

// Function to create or update a chart with stock data.
function createChart(data, symbol) {
    // Get the canvas context where the chart will be drawn.
    const ctx = document.getElementById("stockChart").getContext("2d");

    // If a chart already exists, destroy it before creating a new one.
    if (stockChart) {
        stockChart.destroy();
    }

    // Create a new chart using the Chart.js library.
    stockChart = new Chart(ctx, {
        type: "line", // We want a line chart.
        data: {
            labels: data.labels, // X-axis labels (dates).
            datasets: [
                {
                    label: `${symbol} Stock Price`, // Chart label.
                    data: data.prices, // Y-axis data points (stock prices).
                    borderColor: "#0ca8f6", // Line color.
                },
            ],
        },
        options: {
            scales: {
                x: {
                    ticks: {
                        display: true, // Show labels on the x-axis.
                    },
                },
                y: {
                    beginAtZero: false, // Don't start the y-axis from 0.
                },
            },
            responsive: true, // Make the chart responsive to window resizing.
            plugins: {
                title: {
                    display: true,
                    text: `Stock Price of ${symbol}`, // Dynamic title based on the symbol.
                },
                legend: {
                    display: false, // Hide the legend.
                },
            },
        },
    });
}

// Asynchronous function to fetch stock data from the Alpha Vantage API.
async function fetchData(symbol, interval) {
    let functionType;
    let timeSeriesKey;
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    // Determine the API function name and time series key based on the interval
    switch(interval) {
        case "1wk":
            functionType = "TIME_SERIES_WEEKLY";
            timeSeriesKey = "Weekly Time Series";
            break;
        case "1d":
        case "1yr": // For both last 30 days and last 12 months, use daily data
            functionType = "TIME_SERIES_DAILY";
            timeSeriesKey = "Time Series (Daily)";
            break;
        case "30min": // For 5-day data, use intraday data
            functionType = "TIME_SERIES_INTRADAY";
            timeSeriesKey = `Time Series (${interval})`;
            break;
        default:
            // Handle other intervals or throw an error
            throw new Error(`Unsupported interval: ${interval}`);
        }
        
        // Construct the API request URL
    const url
}

// Function to display stock search results in the HTML.
function displaySearchResults(matches) {
    // Find the searchResults div and set its HTML content.
    document.getElementById("searchResults").innerHTML = matches
        .map(
            (match) => `<div onclick="selectSymbol('${match["1. symbol"]}', '5min')">
                ${match["2. name"]} (${match["1. symbol"]})
            </div>`
        )
        .join(""); // Join each div into one string.
}

// Function to handle when a user selects a stock symbol.
async function selectSymbol(symbol, interval) {
    currentSymbol = symbol; // Update the currentSymbol variable.
    let data;
    const currentDate = new Date();

    if(interval === "30min") {
        // Fetch the intraday data (assuming the API provides enough data to cover 5 days).
        data = await fetchData(symbol, interval);

        // Assuming fetchData returns data sorted by date in descending order,
        // you need to filter or slice the data to get the last 5 days.
        // The exact logic depends on how the data is structured and returned by the API.
        // For example, you might need to find the index of the first data point from 5 days ago
        // and then slice the data arrays accordingly.
    } else if (interval === "1yr") {
        // For the current year's data, fetch daily data.
        data = await fetchData(symbol, "1d"); // Fetch daily data.
        const startOfYear = new Date(currentDate.getFullYear(), 0, 1).toISOString().split('T')[0];
        const startIndex = data.labels.findIndex(date => date.startsWith(startOfYear));
        
        // Filter the data from Jan 1st of the current year to present.
        data.labels = data.labels.slice(0, startIndex + 1).reverse();
        data.prices = data.prices.slice(0, startIndex + 1).reverse();
    } else {
        // For other intervals, use the existing data fetching logic.
        data = await fetchData(symbol, interval);
    }
    
    createChart(data, symbol); // Create the chart with the fetched data.
    document.getElementById("searchResults").innerHTML = ""; // Clear the search results.
}

// Event listener for when a user types in the search input field.
document.getElementById("symbolSearch").addEventListener("input", async (event) => {
    const keyword = event.target.value.trim(); // Trim whitespace from the input value.
    if (keyword.length >= 3) { // Check if the input is at least 3 characters long.
        // Make an API call to search for stock symbols based on the keyword.
        const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${keyword}&apikey=${apiKey}`;
        const response = await fetch(url);
        const searchData = await response.json();
        // Display the search results.
        displaySearchResults(searchData["bestMatches"] || []);
    }
});

// Setup event listeners for interval selection buttons.
const intervals = {
    "dayBtn": "5min",
    "fiveDayBtn": "30min",
    "monthBtn": "1d",
    "yearBtn": "1d", // should display the past 12 month
    "maxBtn": "1wk"
};

// Add event listeners for each button.
Object.keys(intervals).forEach(buttonId => {
    document.getElementById(buttonId).addEventListener("click", () => selectSymbol(currentSymbol, intervals[buttonId]));
});