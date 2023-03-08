function displaySeries() {
    archives = JSON.parse(localStorage.getItem('archives')) || [];
    const seriesWrapper = document.querySelector('#series-tracker');
    seriesWrapper.innerHTML = '';
    seriesList.forEach((series, index) => {
        const card = document.createElement('div');
        card.classList.add('series');
        const seriesFront = document.createElement('div');
            seriesFront.classList.add('series-front');
        const seriesPoster = document.createElement('img');
            seriesPoster.src = `${series.image}`;
        const seriesPlot = document.createElement('p');
            seriesPlot.classList.add('series-info');
            seriesPlot.innerHTML = `
                                <h2>Season: ${series.season}</h2>
                                <h2>Episode: ${series.episode}</h2>
                                <h3>Last Watched: ${series.dateWatched}</h3>
                            `
        const seriesTitle = document.createElement('div');
            seriesTitle.classList.add('series-title');
            seriesTitle.innerHTML = `<h1>${series.title}</h1>`
        seriesFront.appendChild(seriesPoster);
        seriesFront.appendChild(seriesTitle);
        seriesFront.appendChild(seriesPlot);
        seriesFront.addEventListener('click', ()=> {
            card.classList.toggle('active');
            seriesBack.style.right = '0px';
            seriesBack.style.top = '0px';
        })
        const seriesBack = document.createElement('div');
        seriesBack.classList.add('series-back');
        const seriesInfo = document.createElement('div');
            seriesInfo.classList.add('series-plot');
            seriesInfo.innerHTML = `<p>${series.plot}</p>`
        const seriesPanel = document.createElement('div');
            seriesPanel.classList.add('series-panel');
        const seriesLinks = document.createElement('div');
            seriesLinks.classList.add('series-links');
            seriesLinks.innerHTML = `
                        <a href="${series.s2day}" target="_blank">Soap2day</a>
                        <a href="${series.flixer}" target="_blank">MyFlixer</a> 
            `
        const seriesInputs = document.createElement('div');
            seriesInputs.classList.add('series-inputs');
            seriesInputs.innerHTML = `
                            <div class="inputs-box">
                                <label for="season">Season:</label>
                                <input id="inputSeason" type="text" inputmode="numeric" pattern="[0-99]"
                                    value="${series.season}">
                            </div>
                            <div class="inputs-box">
                                <label for="season">Episode:</label>
                                <input id="inputEpisode" type="text" inputmode="numeric" pattern="[0-99]"
                                    value="${series.episode}">
                            </div>
            `
        const seriesButtons = document.createElement('div');
        const saveButton = document.createElement('button');
            saveButton.innerHTML = `<span class="tooltip tooltip-1">Save</span><i class="fa-solid fa-floppy-disk"></i>`;
        const archiveButton = document.createElement('button');
            archiveButton.innerHTML = `<span class="tooltip tooltip-3">Archive</span><i class="fa-solid fa-box-archive"></i>`
        const deleteButton = document.createElement('button');
            deleteButton.innerHTML = `<span class="tooltip tooltip-2">Delete</span><i class="fa-solid fa-trash"></i>`
            seriesButtons.classList.add('series-buttons');
            seriesButtons.appendChild(saveButton)
            seriesButtons.appendChild(archiveButton)
            seriesButtons.appendChild(deleteButton)
        const seriesComment = document.createElement('div');
            seriesComment.classList.add('series-comment');
            seriesComment.innerHTML = `<input id="inputComment" type="text" value="${series.comment}"></input>`
        seriesPanel.appendChild(seriesLinks)
        seriesPanel.appendChild(seriesInputs)
        seriesPanel.appendChild(seriesButtons)
        seriesPanel.appendChild(seriesComment)
        seriesBack.appendChild(seriesInfo);
        seriesBack.appendChild(seriesPanel)
        card.appendChild(seriesFront);
        card.appendChild(seriesBack);
        seriesWrapper.appendChild(card);
        saveButton.addEventListener('click', e => {
            const newSeason = document.querySelector('#inputSeason');
            const newEpisode = document.querySelector('#inputEpisode');
            const newComment = document.querySelector('#inputComment');
            series.season = newSeason.value;
            series.episode = newEpisode.value;
            series.comment = newComment.value;
            series.dateWatched = logDate();
            const index = seriesList.indexOf(series)
            if (index > -1) {
                seriesList.splice(index, 1)
            }
            seriesList.push(series)
            localStorage.setItem('seriesList', JSON.stringify(seriesList));
            displaySeries();
        })
        archiveButton.addEventListener('click', (e) => {
            e.preventDefault()
            const archivedList = series;
            archives.push(archivedList);
            localStorage.setItem('archives', JSON.stringify(archives));
            archivedSeries = seriesList.filter(n => n != series);
            localStorage.setItem('seriesList', JSON.stringify(archivedSeries));
            displaySeries();
        })
        deleteButton.addEventListener('click', (e) => {
            e.preventDefault()
            deletedSeries = seriesList.filter(n => n != series);
            localStorage.setItem('seriesList', JSON.stringify(deletedSeries));
            displaySeries();
        })
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
