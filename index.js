const autoCompleteConfig = {
    renderOption(movie) {
        const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;
        return `
                <div class="imgBox">
                    <img src="${imgSrc}" alt="">
                </div>
                <div class="content">
                    <div class="details">
                        <h2>${movie.Title}</h2>
                        <h3>(${movie.Year})</h3>
                        <p>${movie.Rating}/10</p>
                        <a href="https://www.imdb.com/title/${movie.imdbID}"</a>
                    </div>
                </div>
        `;
    },
    inputValue(movie) {
        return movie.Title;
    },
    async fetchData(searchTerm) {
    const response = await axios.get('https://www.omdbapi.com/', {
        params: {
            apikey: '3c87b09a',
            s: searchTerm
        }
    });
    if (response.data.Error) {
        return [];
    }
    return response.data.Search;
    }
};

createAutoComplete({
    ...autoCompleteConfig,
    root: document.querySelector('#search-results'),
    onOptionSelect(series) {
        onSeriesSelect(series)
    },}
);


const onSeriesSelect = async (series) => {
    const response = await axios.get('https://www.omdbapi.com/', {
        params: {
            apikey: '3c87b09a',
            i: series.imdbID
        }
    });
    openModal(response);
};