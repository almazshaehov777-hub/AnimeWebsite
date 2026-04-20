function renderCard(){
    const container = document.getElementById('animeGrid');
    let html = '';

    for(let i = 0; i<animeData.length; ++i){
        const anime = animeData[i];
        html += `
    <div class="card" data-id="${anime.id}">
    <div class="info">
    <img src="${anime.imagePath}" alt="${anime.title}">
    <div class="cardInfo">
        <div class="title">${anime.title}</div>
            <div class="details">
                <span class="rating">${anime.rating}</span>
                <br>
                <span class="year">${anime.year} • ${anime.episodes} эп.</span>
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