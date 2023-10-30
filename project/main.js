const symbol = "IBM"
const apiKey = "SMO8KH6P855A2BS3"; // Replace with your actual API key
const apiUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${apiKey}`;

async function fetchData() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        // Check if the 'Time Series (5min)' key is present in the response
        if (data['Time Series (5min)']) {
            const timeSeries = data['Time Series (5min)'];
            const labels = Object.keys(timeSeries);
            const stockPrices = labels.map(time => parseFloat(timeSeries[time]['4. close']));

            return {
                labels: labels.reverse(), // Reverse to have the earliest time first
                datasets: [{
                    label: `${symbol} Stock Price`,
                    data: stockPrices.reverse(), // Reverse to match the labels order
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                }]
            };
        } else {
            // Handle the case where 'Time Series (5min)' is undefined
            console.error('Error: Time Series data is unavailable.', data);
            return null; // Return null or appropriate fallback
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

fetchData().then(data => {
    if (data) {
        createChart(data);
    }
});

// Function to create a chart
function createChart(data) {
    const ctx = document.getElementById('stockChart').getContext('2d');
    const stockChart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
            scales: {
                y: {
                    beginAtZero: false
                }
            }
        }
    });
}