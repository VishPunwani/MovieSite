const apiKey = '6aec77677605d2cda5029a345623edd6';
const imgKey = 'https://image.tmdb.org/t/p/w1280';
const searchURL = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=`;
const form = document.getElementById('search-form');
const query = document.getElementById('search-input');
const result = document.getElementById('result');

let page = 1;
let isSearching = false;

async function fetchData(url) {
    try{
        const response = await fetch(url);
        if(!response.ok){
            throw new Error('Network response failed');
        }
        return await response.json();
    } catch(error){
        return null;
    }
}


async function fetchAndShowResults(url) {
    const data = await fetchData(url);
    if (data && data.results) {
        showResults(data.results);
    }
    console.log(showResults)
}

function createMovieCard(movie){
    const{posterPath, originalTitle, releaseDate, overview} = movie;
    const imagePath = posterPath ? imgAPI + posterPath : "./img-01.jpeg";
    const truncatedTitle = originalTitle.length > 15 ? originalTitle.slice(0 , 15)
 + "..." : originalTitle;
 const formattedDate = releaseDate || "No release date";
 const cardTemplate = `
        <div class="column">
            <div class="card">
                <a class="card-media" href="./img-01.jpeg">
                    <img src="${imagePath}" alt="${original_title}" width="100%" />
                </a>
                <div class="card-content">
                <div class="card-header">
                    <div class="left-content">
                    <h3 style="font-weight: 600">${truncatedTitle}</h3>
                    <span style="color: #12efec">${formattedDate}</span>
                    </div>
                <div class="right-content">
                    <a href="${imagePath}" target="_blank" class="card-btn">See Cover</a>
                </div>
            </div>
            <div class="info">
                ${overview || "No overview yet..."}
            </div>
        </div>
    </div>
</div>
`;
return cardTemplate;
}


function clearResults() {
    result.innerHTML = "";
}

function showResults(item) {
const newContent = item.map(createMovieCard).join("");
result.innerHTML = newContent || "<p>No Results Found</p>";
}

async function loadMoreResults() {
    if(isSearching){
        return;
    }
    page++;
    const searchTerm = query.value;
    const url = searchTerm ? `${searchURL}${searchTerm}&page=${page}` : `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${apiKey}&page=${page}`;
    await fetchAndShowSearchResults(url);
}

function detectEnd(){
    const {scrollTop, clientHeight, scrollHeight} = document.documentElement;
    if(scrollHeight + clientHeight >= scrollHeight - 20){
        loadMoreResults();
    }
}

async function handleSearch(e){
    e.preventDefault();
    const searchTerm = query.value.trim();
    if(searchTerm){
        isSearching = true;
        clearResults();
        const newURL = `${searchURL}${searchTerm}&page=${page}`;
        await fetchAndShowSearchResults(newURL);
        query.value=""
    }
}