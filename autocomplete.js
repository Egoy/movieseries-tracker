const createAutoComplete = ({ root, renderOption, onOptionSelect, inputValue, fetchData }) => {
    root.innerHTML = `
        <div class="results"></div>
    `;

    const input = document.querySelector('#searchbar');
    const resultsWrapper = root.querySelector('.results');



    const onInput = async event => {
        const items = await fetchData(event.target.value);

        const filteredResult = items.filter(item => item.Type == 'series');

        resultsWrapper.innerHTML = '';

        for (let item of filteredResult) {
            const option = document.createElement('div');
            option.classList.add('cards')
            option.innerHTML = renderOption(item);
            option.addEventListener('click', () => {
                input.value = inputValue(item);
                onOptionSelect(item);
            })
            resultsWrapper.appendChild(option);
            console.log(item)
        }
    };

    input.addEventListener('input', debounce(onInput, 1000));
};