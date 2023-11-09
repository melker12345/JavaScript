const sevenDaysAgo = new Date();
sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

const url = `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=AAPL&time_from=${sevenDaysAgo}&apikey=RVFIMWMC4KB7C7N6`;


function displayNews(NewsItem) {
    const newsContent = `
        <h3>${NewsItem.headline}</h3>
        <p>${NewsItem.summary}</p>
        <a href="${NewsItem.url}" target="_blank">Read more</a>
    `;
    document.getElementById("news-feed").innerHTML += newsContent;
}

function isWithinLastWeek(dateString) {
    const newsDate = new Date(dateString);
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7); // Set to 7 days ago

    return newsDate >= oneWeekAgo;
}

fetch(url)
    .then((response) => response.json())
    .then((data) => {
        if (data.feed && Array.isArray(data.feed)) {
            data.feed.forEach((NewsItem) => {
                if (NewsItem.publishedDate && isWithinLastWeek(NewsItem.publishedDate)) {
                    displayNews(NewsItem);
                }
            });
        } else {
            console.error('Error: data.feed is not an array');
        }
    })
    .catch((error) => {
        console.error('Error fetching data: ', error);
    });