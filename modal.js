const openModal = (series) => {
    seriesList = JSON.parse(localStorage.getItem('seriesList')) || [];
    const searchWrapper = document.querySelector('.results');
    const modal = document.querySelector('#modal');
    modal.style.display = 'grid';
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
            s2day: e.target.elements.s2day.value,
            flixer: e.target.elements.myFlixer.value,
            dateWatched: logDate(),
        }
        seriesList.push(newSeries);
        localStorage.setItem('seriesList', JSON.stringify(seriesList));
        modal.style.display = 'none'
        searchWrapper.innerHTML = ''
        displaySeries();
    })
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
