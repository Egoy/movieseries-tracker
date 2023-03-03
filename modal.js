const openModal = (series) => {
    seriesList = JSON.parse(localStorage.getItem('seriesList')) || [];
    const searchWrapper = document.querySelector('.results');
    const modal = document.querySelector('#modal');
    modal.style.display = 'grid';
    modal.style.scale = '1'
    modal.innerHTML = modalTemplate(series);
    const formWrapper = document.querySelector('.modal-form');
    const formWindow = document.querySelector('#form');
    const addToListButton = document.querySelector('#openform');
    addToListButton.addEventListener('click', () => {
        formWrapper.style.transform = 'translateX(0)';
    })
    modal.addEventListener('click',(event)=> {
        if(modal === event.target) {
            modal.style.display = 'none';
        }
    })
    formWindow.addEventListener('submit', (e)=> {
        e.preventDefault();
        const newSeries = {
            title: series.Title,
            season: parseInt(e.target.elements.season.value),
            episode: parseInt(e.target.elements.episode.value),
            comment: e.target.elements.comment.value,
            plot: series.Plot,
            image: series.Poster,
            dateWatched: new Date(),
        }
        seriesList.push(newSeries);
        localStorage.setItem('seriesList', JSON.stringify(seriesList));
        modal.style.display = 'none'
        searchWrapper.innerHTML = ''
        displaySeries();
    })
}

function displaySeries() {
    const tracker = document.querySelector('#series-tracker');
    // tracker.innerHTML = ''
    for (let series of seriesList) {
        const card = document.createElement('div');
        card.classList.add('series-list')
        card.innerHTML = renderCards(series)
        tracker.appendChild(card);
    }
}
function logDate() {
    const today = new Date()
    const week = today.toLocaleString('en-us', {  weekday: 'long' });
    const month= today.toLocaleString('default', {  month: 'long' });
    const day = today.getDate()
    const current_time = today.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    const currentDate = `${week}, <br> ${month} ${day} | ${current_time}`
    return currentDate
}

const modalTemplate = (seriesDetail) => {
    return `
        <div class="modal-wrapper">
            <div class="modal-left">
                <img src="${seriesDetail.Poster}" />
            </div>
            <div class="modal-right">
                <div class="modal-info">
                    <div class="title">
                        <h2>${seriesDetail.Title}</h2>
                    </div>
                    <div class="subtitle">
                        <div class="subtitle-year">
                            ${seriesDetail.Year}
                        </div>
                        <div class="subtitle-runtime">
                            ${seriesDetail.Runtime}
                        </div>
                        <div class="subtitle-genre">
                            ${seriesDetail.Genre}
                        </div>
                    </div>
                    <div class="rating">
                        ${seriesDetail.imdbRating}<span>/10</span>
                        <div class="rating-votes">
                        (${seriesDetail.imdbVotes})
                        </div>
                    </div>
                    <div class="plot">
                        ${seriesDetail.Plot}
                    </div>
                    <div class="imdblink">
                        <a href="https://imdb.com/title/${seriesDetail.imdbID}" target="_blank">Read More</a>
                    </div>
                    <button id="openform" class="button">Add to List</button>
                </div>
                <div class="modal-form">
                    <form class="form" id="form">
                        <div class="inputBox">
                            <input type="text" name="season" id="season" required inputmode="numeric" pattern="[0-9]+" />
                            <label>Season</label>
                            <i></i>
                        </div>
                        <div class="inputBox">
                            <input type="text" name="episode" id="episode" required inputmode="numeric" pattern="[0-9]+" />
                            <label>Episode</label>
                            <i></i>
                        </div>
                        <div class="inputBox">
                            <input type="text" name="s2day" id="s2day" required />
                            <label>S2day Link</label>
                            <i></i>
                        </div>
                        <div class="inputBox">
                            <input type="text" name="myFlixer" id="myFlixer" required />
                            <label>Myflixer Link</label>
                            <i></i>
                        </div>
                        <div class="inputBox">
                            <textarea id="comment" name="comment" rows="4" cols="50" placeholder="Insert comment here"></textarea>
                            <label>Comment</label>
                            <i></i>
                        </div>
                        <button id="submitForm" class="button" type="submit" value="submit">Add Series</button>
                    </form>
                </div>
            </div>
        </div>
        `
}