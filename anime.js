const urlParams = new URLSearchParams(window.location.search);
const animeID = parseInt(urlParams.get('id'));

const anime = animeData.find(a => a.id === animeID);
const animeContent = document.getElementById('anime-content');

document.title = anime.title;

if(anime){
    animeContent.innerHTML = `
        <img src="${anime.imagePath}" width="300" class="AnimeImg">
        <div class="info">
        <h1 style="color: white" class="anime-title">${anime.title}</h1>
        <p class="anime-title" id="rating">Рейтинг: ${anime.rating}★</p>
        <p class="anime-title">Год выпуска: ${anime.year}</p>
        <p class="anime-title">Эпизоды: ${anime.episodes} эп.</p>
        <p class="anime-title">Озвучка: ${anime.voice}</p>
        </div>
    `
}

const epis = document.getElementById('episode');
let html = '';


for(let i = 1; i<=anime.episodeListAni.length; ++i){
    /*let videoUrl = '#';
    if(anime.episodeList && anime.episodeList[i-1]){
        videoUrl = anime.episodeList[i-1] || '#';
    }*/
    html += `
    <div class="episode-btn" style="width: 150px; height: 50px; color: white" id="episodeBtn" data-number=${anime.episodeListAni[i-1].number}>
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
});*/