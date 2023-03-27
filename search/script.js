const searchBox = document.getElementById('search-box');
const searchBtn = document.getElementById('search-btn');
const resultsContainer = document.getElementById('results');

searchBtn.addEventListener('click', () => {
	const query = searchBox.value.trim();
	if (!query) {
		alert('Please enter a search term.');
		return;
	}
	const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${query}`;
	fetch(apiUrl)
		.then(response => response.json())
		.then(data => displayResults(data.items))
		.catch(error => {
			console.error(error);
			alert('An error occurred while fetching results.');
		});
});

function displayResults(results) {
	if (!results || results.length === 0) {
		resultsContainer.innerHTML = '<p>No results found.</p>';
		return;
	}
	resultsContainer.innerHTML = '';
	for (let result of results) {
		const title = result.volumeInfo.title || 'No Title Available';
		const author = result.volumeInfo.authors ? result.volumeInfo.authors.join(', ') : 'Unknown Author';
		const imageUrl = result.volumeInfo.imageLinks ? result.volumeInfo.imageLinks.thumbnail : 'no-image.png';
		const previewUrl = result.volumeInfo.previewLink || '#';
		const bookHtml = `
			<div class="book">
				<img src="${imageUrl}">
				<div>
					<h2>${title}</h2>
					<p>by ${author}</p>
					<a href="${previewUrl}" target="_blank">Preview</a>
				</div>
			</div>
		`;
		resultsContainer.insertAdjacentHTML('beforeend', bookHtml);
	}
}
