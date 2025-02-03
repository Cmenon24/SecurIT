// Your API Key and default category
const API_KEY = '858f7d066e5f491aa903314829bab690';
let category = 'technology'; // Default category

// Get form and container elements
const form = document.getElementById('news-form');
const newsContainer = document.getElementById('news-container');

// Event listener for form submission
form.addEventListener('submit', async (event) => {
    event.preventDefault();
    console.log('The form submitted by user.');

    // Use technology as the default category
    // If you later decide to add category options, you can update the 'category' variable here.
    category = 'technology';

    // Construct the API URL using the category
    const url = `https://newsapi.org/v2/everything?q=${category}&apiKey=${API_KEY}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);

        if (data.status === 'ok') {
            displayNews(data.articles); // Display the fetched news
        } else {
            newsContainer.innerHTML = `<p>Unable to load news.</p>`;
        }
    } catch (error) {
        console.error('An error happened', error);
        newsContainer.innerHTML = `<p>Error in fetching news. Check the console for details.</p>`;
    }
});

// Function to display the fetched news
function displayNews(articles) {
    newsContainer.innerHTML = ''; // Clear previous content

    articles.forEach((article) => {
        const card = document.createElement('div');
        card.className = 'news-card';

        // Build the HTML structure for each article
        card.innerHTML = `
            <img src="${article.urlToImage}" alt="${article.title}">
            <h3>${article.title}</h3>
            <p>${article.description}</p>
            <a href="${article.url}" target="_blank">Read More</a>
        `;

        // Append the article to the news container
        newsContainer.appendChild(card);
    });
}

// Fetch news on page load (defaults to 'technology' category)
fetchNews();

// Function to fetch news
async function fetchNews() {
    const url = `https://newsapi.org/v2/everything?q=${category}&apiKey=${API_KEY}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);

        if (data.status === 'ok') {
            displayNews(data.articles); // Display the news articles
        } else {
            newsContainer.innerHTML = `<p>Unable to load news.</p>`;
        }
    } catch (error) {
        console.error('An error happened', error);
        newsContainer.innerHTML = `<p>Error in fetching news. Check the console for details.</p>`;
    }
}
