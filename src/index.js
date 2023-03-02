const SEARCH_URL = `https://api.nytimes.com/svc/search/v2/articlesearch.json?`;
const API_KEY = '1H8y2dY2rihC7fdcuGY6W6JByrUaIDi7';

async function getData(value) {
  const response = await fetch(`${SEARCH_URL}q=${value}&api-key=${API_KEY}`);
    if (response.ok) {
        return response.json();
    }
    throw new Error(response.statusText);
}

const card__containerEl = document.querySelector(".card__container")
const form = document.getElementById('search-form');

form.addEventListener('submit', onSubmit);

function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const value = form.elements.searchQuery.value.trim();


getData(value).then(({results}) => {
console.log(results);
const markup = createCardMarkup(results);
addMarkup(card__containerEl, markup)
}).catch(error => {
    console.log(error.message);
})
}

function createCardMarkup(data){
    return data.map(({
            title, 
            abstract,
            media, 
            published_date, 
            url
        }) => {
            const img = media[0]["media-metadata"][2].url;
        return `<div class = "card"><img class="card__img" src="${img}" alt="" width="350px" height="500px">
        <button class="card__btn">add/remove</button>
        <h3 class="card__title">${title}</h3>
        <p class="card__text">${abstract}</p>
        <span class="card__date">published_date: ${published_date}</span>
        <a href="${url}">read more</a></div>`
    }).join('')
}

function addMarkup(elem, html) {
    elem.insertAdjacentHTML("beforeend", html);
}