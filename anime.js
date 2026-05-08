const urlParams = new URLSearchParams(window.location.search);
const animeID = parseInt(urlParams.get('id'));

async function shikimoriFetch(endpoint) {
    const proxy = 'https://corsproxy.io/?url=';
    const url = 'https://shikimori.one/api/' + endpoint;
    const response = await fetch(proxy + encodeURIComponent(url));
    return response.json();
}

const animeContent = document.getElementById('anime-content');
const buttonBack = document.getElementById('btnBack');



async function loadAnime(){
    const anime = await shikimoriFetch(`animes/${animeID}`);
    document.title = anime.russian;
if(anime){
    animeContent.innerHTML = `
        <div class="imageContainer"><img src="https://shikimori.one${anime.image?.original}" class="AnimeImg"></div>
        <div class="info">
        <h1 style="color: white" class="anime-title">${anime.russian}</h1>
        <p class="anime-title" id="rating">Рейтинг: ${anime.score}★</p>
        <p class="anime-title">Год выпуска: ${anime.aired_on.split('-')[0]}</p>
        <p class="anime-title">Эпизоды: ${anime.episodes} эп.</p>
        <p class="anime-title">Жанры: ${anime.genres.map(genre => genre.russian || genre.name).join(', ')}</p>
        </div>
    `
}
}

loadAnime();

/*const epis = document.getElementById('episode');
let html = '';


for(let i = 1; i<=anime.episodeListAni.length; ++i){
    let videoUrl = '#';
    if(anime.episodeList && anime.episodeList[i-1]){
        videoUrl = anime.episodeList[i-1] || '#';
    }
    html += `
    <div class="episode-btn" style="color: white" id="episodeBtn" data-number=${anime.episodeListAni[i-1].number}>
    Эпизод ${i}
    </div>
    `;
}
epis.innerHTML = html;
const videoBtn = document.querySelectorAll('.episode-btn');
videoBtn.forEach(btn => {
    btn.addEventListener('click', () =>{
        const num = btn.getAttribute('data-number');
        window.open(`video.html?id=${anime.id}&number=${num}`, '_blank');
    });
});

/*document.querySelectorAll('.episode-btn').forEach(btn => {
    btn.addEventListener('click', () =>{
        const url = btn.getAttribute('data-url');
        if(url && url !== '#'){
            window.open(url, '_blank');
        }else{
            alert('ссылка не добавлена');
        }
    });
});
*/
buttonBack.addEventListener('click', () => {
    history.back();
});


async function loadEpisodeBtn(){
    const episode = document.getElementById('episode');
    const a = await shikimoriFetch(`animes/${animeID}`);
    let ep = '';

    for(let i = 0; i<a.episodes; ++i){
        episodeNum = i + 1;
        ep += `<div class="episode-btn" style="color: white" id="episodeBtn">Эпизод ${episodeNum}</div>`;
    }

    episode.innerHTML = ep;
}

loadEpisodeBtn();


async function loadEpisode(){
    const prom = await fetch(`https://hianime-api-iy4s.onrender.com/api/episodes/${animeID}`);
    const episodes = await prom.json();

    const getEp = episodes.episodes[0].episodeID;
    const stream = await fetch(`https://hianime-api-iy4s.onrender.com/api/stream?id=${getEp}&type=sub&server=HD-2`);
    const res = await stream.json();

    return {
        episodeList: episodes.episodes,
        streamList: res.sources,
    };
}

loadEpisode();