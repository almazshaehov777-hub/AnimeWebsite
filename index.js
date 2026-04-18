const animeData = [
    {
        id: 1,
        title: 'Ангел по соседству',
        rating: 8.5,
        year: 2023,
        episodes: 12,
        imagePath: 'AnimeImagePath/OIP (1).jpg'
    },
    {
        id: 2,
        title: 'Благоухающий цветок расцветает с достоинством',
        rating: 8.6,
        year: 2025,
        episodes: 12,
        imagePath: 'AnimeImagePath/kaoruHanaWa.jpg'
    },
];

function renderCard(){
    const container = document.getElementById('animeGrid');
    let html = '';

    for(let i = 0; i<animeData.length; ++i){
        const anime = animeData[i];
        html += `
    <div class="card">
    <div class="info">
    <img src="${anime.imagePath}" alt="${anime.title}">
    <div class="cardInfo">
        <div class="title">${anime.title}</div>
            <div class="details">
                <span class="rating">${anime.rating}</span>
                <br>
                <span>${anime.year} • ${anime.episodes} эп.</span>
            </div>
        </div>
        </div>
    </div>`;
    }
    container.innerHTML = html;
}

renderCard();