window.addEventListener('load', () => {
    series = JSON.parse(localStorage.getItem('series')) || [];
    const seriesWaitList = JSON.parse(localStorage.getItem('seriesWaitList')) || []
    const newSeriesForm = document.querySelector('#new-series-form');
    const modal = document.getElementById('modal')
    newSeriesForm.addEventListener('submit', e => {
        e.preventDefault();

        const newSeries = {
            title: e.target.elements.title.value,
            season: e.target.elements.season.value,
            episode: e.target.elements.episode.value,
            s2day: e.target.elements.s2day.value,
            myFlixer: e.target.elements.myFlixer.value,
            comment: e.target.elements.comment.value,
            watched: false,
            dateWatched: logDate()
        }
        series.push(newSeries)
        localStorage.setItem('series', JSON.stringify(series));
        e.target.reset();
        displaySeries();
        modal.classList.add('hideModal')
        modal.classList.remove('showModal')
        appWrapper.style.display = 'none'
    })
    // console.log(series)
    displaySeries();
})