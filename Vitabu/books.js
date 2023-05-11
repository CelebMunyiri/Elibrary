// Set up variables
const searchBox = document.getElementById('search-box');
const searchBtn = document.getElementById('search-btn');
const resultsContainer = document.getElementById('results');
const prevBtn = document.getElementById('prev-btn');
const pageNumber = document.getElementById('page-number');
const nextBtn = document.getElementById('next-btn');

let startIndex = 0;
let totalItems = 0;

// Function to fetch books from Google Books API
function fetchBooks(query) {
    // Construct URL for API request
    const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&startIndex=${startIndex}&maxResults=10`;

    // Make API request
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Update totalItems variable
            totalItems = data.totalItems;

            // Clear previous search results
            resultsContainer.innerHTML = '';

            // Loop through search results and create HTML for each book
            data.items.forEach(item => {
                const book = document.createElement('div');
                book.classList.add('book');
                book.innerHTML = `
                    <img src="${item.volumeInfo.imageLinks.thumbnail}" alt="${item.volumeInfo.title}">
                    <div>
                        <h2>${item.volumeInfo.title}</h2>
                        <p>Author(s): ${item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : 'Unknown'}</p>
                        <p>Publisher: ${item.volumeInfo.publisher || 'Unknown'}</p>
                        <p>Published Date: ${item.volumeInfo.publishedDate || 'Unknown'}</p>
                    </div>
                `;
                resultsContainer.appendChild(book);
            });

            // Update page number
            const currentPage = Math.floor(startIndex / 10) + 1;
            pageNumber.textContent = `Page ${currentPage} of ${Math.ceil(totalItems / 10)}`;

            // Enable/disable prev/next buttons
            prevBtn.disabled = startIndex === 0;
            nextBtn.disabled = startIndex + 10 >= totalItems;
        })
        .catch(error => {
            console.log(error);
        });
}

// Event listener for search button
searchBtn.addEventListener('click', () => {
    startIndex = 0;
    fetchBooks(searchBox.value);
});

// Event listener for prev button
prevBtn.addEventListener('click', () => {
    startIndex -= 10;
    fetchBooks(searchBox.value);
});

// Event listener for next button
nextBtn.addEventListener('click', () => {
    startIndex += 10;
    fetchBooks(searchBox.value);
});
