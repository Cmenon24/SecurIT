const API_KEY = "CzK0jRV8CpOaHSzSakiZ1ub96npY0q9QA4diOEhN"; 
const form = document.getElementById('news-form'); 
const newsContainer = document.getElementById('news-container'); 

form.addEventListener('submit', async (event) => {
    event.preventDefault();  // Prevent form from reloading the page on submit
    console.log('Form submitted!');  

    const searchTerm = 'software';  
    const apiUrl = `https://api.nasa.gov/techtransfer/patent/?patent/?engine&api_key=${API_KEY}`;

    try {
        const response = await fetch(apiUrl);  
        const data = await response.json();  

        console.log(data); 

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

function displayNews(results) {
    newsContainer.innerHTML = results.map(result => {

        const title = result[2] || 'No title available';
        const description = result[3] || 'No description available';
        const patentNumber = result[1] || 'N/A';
        const imageUrl = result[11] || '';  
        const url = result[10] || '#'; 

        return `
            <div class="news-card">
                <h3>${title}</h3>
                <p>${description}</p>
                <p><strong>Patent Number:</strong> ${patentNumber}</p>
                <a href="${url}" target="_blank">Read More</a>
                ${imageUrl ? `<img src="${imageUrl}" alt="${title}" />` : ''}
            </div>
        `;
    }).join('');
}
