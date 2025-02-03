const API_KEY = "858f7d066e5f491aa903314829bab690";
const form = document.getElementById('news-form');
const newsContainer = document.getElementById('news-container');

form.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent form submission reload

    // Fetch news data
    try {
        const response = await fetch(`https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}`);
        const data = await response.json();

        if (data.status === "ok") {
            newsContainer.innerHTML = data.articles.map(article => `
                <div class="news-card">
                    <img src="${article.urlToImage}" alt="${article.title}">
                    <h3>${article.title}</h3>
                    <p>${article.description}</p>
                    <a href="${article.url}" target="_blank">Read More</a>
                </div>
            `).join(''); // Create HTML for each article
        } else {
            newsContainer.innerHTML = `<p>Unable to load news</p>`;
        }
    } catch (error) {
        console.error("Error:", error);
        newsContainer.innerHTML = `<p>Error fetching news. Please check the console.</p>`;
    }
});