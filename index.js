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
        `

}