const autoCompleteConfig = {
    renderOption(movie) {
        const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;
        return `
            <img src="${imgSrc}" />
            ${movie.Title} (${movie.Year})
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
    root: document.querySelector('#tracker'),
    onOptionSelect(movie) {
        onMovieSelect(movie)
    },}
);


const onMovieSelect = async (movie) => {
    const response = await axios.get('https://www.omdbapi.com/', {
        params: {
            apikey: '3c87b09a',
            i: movie.imdbID
        }
    });
    const modal = document.querySelector('#tracker');
    modal.classList.add('active');
    modal.innerHTML = modalTemplate(response.data);
    console.log(response.data)
};

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
                        <label for="season">Season:</label> <input type="text" inputmode="numeric" pattern="[0-9]">
                        <label for="episode">Episode:</label> <input type="text" inputmode="numeric" pattern="[0-9]+">
                        <label for="comment">Comment:</label> <textarea name="" id="" cols="30" rows="10"></textarea>
                        <label for="soap2day link">Soap2day:</label> <input type="text">
                        <label for="myflixer link">Myflixer:</label> <input type="text">
                    </div>
                </div>
                <input type="submit" value="Add Series">
            </form>
        </div>
    `
}
// const modalTemplate = (movieDetail) => {

//     return `
//         <div class="modal-wrapper">
//             <div class="form" id="form">
//                 <img src="${movieDetail.Poster}" />
//             </div>
//         </div>
//     `
// }

// const modalTemplate = (movieDetail) => {

//     return `
//         <article class="media">
//             <figure class="media-left">
//                 <p class="image">
//                     <img src="${movieDetail.Poster}" />
//                 </p>
//             </figure>
//             <div class="media-content">
//                 <div class="content">
//                     <h1>${movieDetail.Title}</h1>
//                     <h4>${movieDetail.Genre}</h4>
//                     <p>${movieDetail.Plot}</p>
//                 </div>
//             </div>
//         </article>
//         <article data-value=${awards} class="notification is-primary">
//             <p class="title">${movieDetail.Awards}</p>
//             <p class="subtitle">Awards</p>
//         </article>
//         <article data-value=${dollars} class="notification is-primary">
//             <p class="title">${movieDetail.BoxOffice}</p>
//             <p class="subtitle">Box Office</p>
//         </article>
//         <article data-value=${metascore} class="notification is-primary">
//             <p class="title">${movieDetail.Metascore}</p>
//             <p class="subtitle">Metascore</p>
//         </article>
//         <article data-value=${imdbRating} class="notification is-primary">
//             <p class="title">${movieDetail.imdbRating}</p>
//             <p class="subtitle">IMDB Rating</p>
//         </article>
//         <article data-value=${imdbVotes} class="notification is-primary">
//             <p class="title">${movieDetail.imdbVotes}</p>
//             <p class="subtitle">IMDB Votes</p>
//         </article>
//     `
// }