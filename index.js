const genre = document.getElementById('selectGenre');
let currentGenre = 'all';
currentGenre = genre.value;

async function shikimoriFetch(endpoint) {
    const proxy = 'https://corsproxy.io/?url=';
    const url = 'https://shikimori.one/api/' + endpoint;
    const response = await fetch(proxy + encodeURIComponent(url));
    return response.json();
}

async function renderCard(){
    const anime = await shikimoriFetch('animes?limit=30&order=ranked');
    const container = document.getElementById('animeGrid');
    let html = '';

    for(const a of anime){
        html += `
    <div class="card" data-id="${a.id}">
    <div class="info">
    <img src="https://shikimori.one${a.image?.original}" alt="${a.name}">
    <div class="cardInfo">
        <div class="title">${a.russian}</div>
            <div class="details">
                <span class="rating">${a.score}</span>
                <br>
                <span class="year">${a.aired_on.split('-')[0]} • ${a.episodes} эп.</span>
            </div>
        </div>
        </div>
    </div>`;
    }
    container.innerHTML = html;

    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', () => {
            const animeID = card.dataset.id;
            window.location.href = `anime.html?id=${animeID}`;

        });
    });
}

renderCard();

const con = document.getElementById('animeGrid');
const modal = document.getElementById('modalOverlay');
const closeBtn = document.getElementById('closeBtn');
const modalWin = document.getElementById('modalWindow');

con.onclick = (e) => {
    const card = e.target.closest('.card')
    if(card){
        const animeId = parseInt(card.dataset.id);
        const selectAnime = animeData.find(anime => anime.id === animeId);

        if(selectAnime){
            fillModal(selectAnime);
            modal.classList.add('show');
        }
    }
}

modal.onclick = (e) => {
    if(e.target === modal){
        modal.classList.remove('show');
    }
};

/*function fillModal(anime){
    modalWin.innerHTML = `
    <div class="modalHeader">
        ${anime.title}
        <button id="buttonClose">X</button>
    </div>
    <div class="modalMain">
        <p class="animeInfo">Рейтинг: ${anime.rating}★</p>
        <p class="animeInfo">Эпизоды: ${anime.episodes} эп.</p>
        <p class="animeInfo">Год: ${anime.year}</p>
    </div>
    <div class="modalFooter">
        <a href="${anime.url}"><button class="buttonDemo">Смотреть DEMO</button></a>
    </div>`

    const btnClose = document.getElementById('buttonClose');

    if(btnClose){
        btnClose.onclick = () => modal.classList.remove('show');
    }
}*/

function filter(){
    let anime = [...animeData];

    if(currentGenre !== 'all'){
        anime = anime.filter(a => 
            a.genre.toLowerCase() === currentGenre.toLowerCase()
        );
    }

    renderCard();
}

genre.addEventListener('change', (e) => {
    currentGenre = e.target.value;
    filter();
});

filter();