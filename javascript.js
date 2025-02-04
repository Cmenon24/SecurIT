const API_KEY = "CzK0jRV8CpOaHSzSakiZ1ub96npY0q9QA4diOEhN"; 
const form = document.getElementById('news-form'); 
const newsContainer = document.getElementById('news-container'); 

form.addEventListener('submit', async (event) => {
    event.preventDefault();  // Prevent form from reloading the page on submit
    console.log('Form submitted!');  

    const searchTerm = 'software';  
    const apiUrl = `https://api.nasa.gov/techtransfer/patent/?patent=${searchTerm}&api_key=${API_KEY}`;

    try {
        const response = await fetch(apiUrl);  
        const data = await response.json();  

        // console.log(data); 

        if (data && data.results && data.results.length > 0) {
            displayNews(data.results);
        } else {
            newsContainer.innerHTML = `<p>No results found for "${searchTerm}"</p>`;
        }
    } catch (error) {
        console.error("Error fetching data:", error);  
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
