
function displaySeries() {
    const seriesWrapper = document.querySelector('#series-tracker');
    seriesWrapper.innerHTML = '';
    seriesList.forEach((series, index) => {
        let card = document.createElement('div');
        card.classList.add('series');
        let seriesFront = document.createElement('div');
            seriesFront.classList.add('series-front');
        const seriesPoster = document.createElement('img');
            seriesPoster.src = `${series.image}`;
        const seriesPlot = document.createElement('p');
            seriesPlot.classList.add('series-info')
            seriesPlot.innerHTML = `
                                <h2>Season: ${series.season}</h2>
                                <h2>Episode: ${series.episode}</h2>
                                <h3>Last Watched: ${series.dateWatched}</h3>
                            `
        const seriesTitle = document.createElement('div');
            seriesTitle.classList.add('series-title')
            seriesTitle.innerHTML = `<h1>${series.title}</h1>`
        seriesFront.appendChild(seriesPoster)
        seriesFront.appendChild(seriesTitle)
        seriesFront.appendChild(seriesPlot)
        seriesFront.addEventListener('click', ()=> {
            card.classList.toggle('active');
            seriesBack.style.right = '0px';
            seriesBack.style.top = '0px';
            // seriesBack.addEventListener('click', ()=> {
            //     card.classList.remove('active');
            //     seriesBack.style.right = '-300px'
            // })
        })
        let seriesBack = document.createElement('div');
        seriesBack.classList.add('series-back');
        let seriesInfo = document.createElement('div');
            seriesInfo.classList.add('series-plot')
            seriesInfo.innerHTML = `<p>${series.plot}</p>`
        let seriesPanel = document.createElement('div');
            seriesPanel.classList.add('series-panel');
        let seriesLinks = document.createElement('div');
            seriesLinks.classList.add('series-links');
            seriesLinks.innerHTML = `
                        <a href="${series.s2day}" target="_blank">Soap2day</a>
                        <a href="${series.flixer}" target="_blank">MyFlixer</a> 
            `
        let seriesInputs = document.createElement('div')
            seriesInputs.classList.add('series-inputs');
            seriesInputs.innerHTML = `
                            <div class="inputs-box">
                                <label for="season">Season:</label>
                                <input id="inputSeason" type="text" inputmode="numeric" pattern="[0-99]" readonly
                                    value="${series.season}">
                            </div>
                            <div class="inputs-box">
                                <label for="season">Episode:</label>
                                <input id="inputEpisode" type="text" inputmode="numeric" pattern="[0-99]" readonly
                                    value="${series.episode}">
                            </div>
            `
        let seriesButtons = document.createElement('div');
            seriesButtons.classList.add('series-buttons');
            seriesButtons.innerHTML = `
                            <button id="saveButton"><span class="tooltip tooltip-1">Save</span><i
                                    class="fa-solid fa-floppy-disk"></i></button>
                            <button id="archiveButton"><span class="tooltip tooltip-3">Archive</span><i
                                    class="fa-solid fa-box-archive"></i></button>
                            <button id="deleteButton"><span class="tooltip tooltip-2">Delete</span><i class="fa-solid fa-trash"></i></button>

            `
        let seriesComment = document.createElement('div')
            seriesComment.classList.add('series-comment')
            seriesComment.innerHTML = `<input id="inputComment type="text" readonly value="${series.comment}"></input>`
        seriesPanel.appendChild(seriesLinks)
        seriesPanel.appendChild(seriesInputs)
        seriesPanel.appendChild(seriesButtons)
        seriesPanel.appendChild(seriesComment)
        seriesBack.appendChild(seriesInfo);
        seriesBack.appendChild(seriesPanel)
        card.appendChild(seriesFront);
        card.appendChild(seriesBack);
        seriesWrapper.appendChild(card);
    })
}

function logDate() {
    const today = new Date()
    const week = today.toLocaleString('en-us', {  weekday: 'long' });
    const month= today.toLocaleString('default', {  month: 'long' });
    const day = today.getDate()
    const current_time = today.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    const currentDate = `${week}, ${month} ${day} | ${current_time}`
    return currentDate
}
