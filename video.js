const back = document.getElementById('back');

back.addEventListener('click', () => {
    window.close();
});

const video = document.getElementById('video');
const urlParams = new URLSearchParams(window.location.search);
const animeID = parseInt(urlParams.get('id'));
const num = parseInt(urlParams.get('number'));

const anime = animeData.find(a => a.id === animeID);
const select = document.getElementById('select');

video.src = anime.episodeListAni[num - 1].url;