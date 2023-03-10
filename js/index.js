window.addEventListener('load', () => {
    seriesList = JSON.parse(localStorage.getItem('seriesList')) || [];
    displaySeries();
})

const autoCompleteConfig = {
    renderOption(series) {
        const imgSrc = series.Poster === 'N/A' ? '' : series.Poster;
        return `
                <div class="imgBox">
                    <img src="${imgSrc}" alt="">
                </div>
                <div class="content">
                    <div class="details">
                        <h2>${series.Title}</h2>
                        <h3>(${series.Year})</h3>
                    </div>
                </div>
        `;
    },
    inputValue(series) {
        return series.Title;
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
    }}
);

const onSeriesSelect = async (series) => {
    const response = await axios.get('https://www.omdbapi.com/', {
        params: {
            apikey: '3c87b09a',
            i: series.imdbID
        }
    });
    openModal(response.data);
};