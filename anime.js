const urlParams = new URLSearchParams(window.location.search);
const animeID = parseInt(urlParams.get('id'));

const anime = animeData.find(a => a.id === animeID);
const animeContent = document.getElementById('anime-content');

if(anime){
    animeContent.innerHTML = `
        <img src="${anime.imagePath}" width="300" class="AnimeImg">
        <h1 style="color: white" class="anime-title">${anime.title}</h1>
    `
}