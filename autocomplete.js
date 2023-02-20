const createAutoComplete = ({ root, renderOption, onOptionSelect, inputValue, fetchData }) => {
    root.innerHTML = `
                <div class="results">
                </div>
    `;

    const input = document.querySelector('#searchbar');
    const resultsWrapper = root.querySelector('.results');



    const onInput = async event => {
        const items = await fetchData(event.target.value);

        resultsWrapper.innerHTML = '';

        for (let item of items) {
            const option = document.createElement('a');
            option.classList.add('search-item')
            option.innerHTML = renderOption(item);
            console.log(item);
            option.addEventListener('click', () => {
                input.value = inputValue(item);
                onOptionSelect(item);
            })

            resultsWrapper.appendChild(option);
        }
    };

    input.addEventListener('input', debounce(onInput, 1000));
};