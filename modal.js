const openModal = (series) => {
    const modal = document.querySelector('#modal');
    modal.classList.add('active');
    modal.innerHTML = modalTemplate(series.data);
    const formWindow = document.querySelector('#form')
    formWindow.addEventListener('submit', (e)=> {
        e.preventDefault();
        const newSeries = {
            title: series.Title,
            season: parseInt(e.target.elements.season.value),
            episode: parseInt(e.target.elements.episode.value),
            comment: e.target.elements.comment.value,
            image: series.Poster,
            dateWatched: logDate()
        }
        console.log(newSeries)
    })
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

const modalTemplate = (movieDetail) => {
    return `
        <div class="modal-wrapper">
            <form class="form" id="form">
                <div class="form-wrapper">
                    <div class="form-left">
                        <h2>${movieDetail.Title} (${movieDetail.Year})</h2>
                        <img src="${movieDetail.Poster}" />
                        <p>${movieDetail.Plot}</p>
                        <p><a href="https://www.imdb.com/title/${movieDetail.imdbID}/" target="_blank">IMDB:</a> ${movieDetail.imdbRating}</p>
                    </div>
                    <div class="form-right">
                        <div class="inputBox">
                            <input type="text" name="season" id="season" required inputmode="numeric" pattern="[0-9]"/>
                            <span>Season</span>
                            <i></i>
                        </div>
                        <div class="inputBox">
                            <input type="text" name="episode" id="episode" required inputmode="numeric" pattern="[0-9]"/>
                            <span>Episode</span>
                            <i></i>
                        </div>
                        <div class="inputBox">
                            <textarea id="comment" name="comment" rows="4" cols="50" placeholder="Insert comment here"></textarea>
                            <span>Comment</span>
                            <i></i>
                        </div>
                        <div class="inputBox">
                            <input type="text" name="s2day" id="s2day" required/>
                            <span>S2day Link</span>
                            <i></i>
                        </div>
                        <div class="inputBox">
                            <input type="text" name="myFlixer" id="myFlixer" required/>
                            <span>Myflixer Link</span>
                            <i></i>
                        </div>
                    </div>
                </div>
                <input type="submit" value="Add Series">
            </form>
        </div>    `
}