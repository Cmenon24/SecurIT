const API_KEY = "CzK0jRV8CpOaHSzSakiZ1ub96npY0q9QA4diOEhN";  // Your NASA API Key
const form = document.getElementById('news-form');  // Get the form element
const newsContainer = document.getElementById('news-container');  // Get the container to display results

form.addEventListener('submit', async (event) => {
    event.preventDefault();  // Prevent form from reloading the page on submit
    console.log('Form submitted!');  // For debugging: log when form is submitted

    const searchTerm = 'cybersecurity';  // Fixed search term (you can replace with dynamic input later)
    const apiUrl = `https://api.nasa.gov/techtransfer/patent/?patent=${searchTerm}&api_key=${API_KEY}`;

    try {
        const response = await fetch(apiUrl);  // Fetch data from the NASA API
        const data = await response.json();  // Parse the JSON response

        console.log(data);  // Log the response to check its structure

        if (data && data.results && data.results.length > 0) {
            // If there are results, display them
            displayNews(data.results);
        } else {
            // If no results found
            newsContainer.innerHTML = `<p>No results found for "${searchTerm}"</p>`;
        }
    } catch (error) {
        console.error("Error fetching data:", error);  // Log any errors
        newsContainer.innerHTML = `<p>Error fetching data. Please check the console.</p>`;
    }
});

// Function to display the fetched news data
function displayNews(results) {
    newsContainer.innerHTML = results.map(result => `
        <div class="news-card">
            <h3>${result.title || 'No title available'}</h3>
            <p>${result.description || 'No description available'}</p>
            <p><strong>Patent Number:</strong> ${result.patent_number || 'N/A'}</p>
            <a href="${result.url || '#'}" target="_blank">Read More</a>
        </div>
    `).join('');
}
