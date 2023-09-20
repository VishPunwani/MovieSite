const apiKey = '6aec77677605d2cda5029a345623edd6';
const imgKey = 'https://image.tmdb.org/t/p/w1280';
const searchURL = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=`;
const form = document.getElementById('search-form');
const query = document.getElementById('search-input');
const result = document.getElementById('result');

let page = 1;
let isSearching = false;