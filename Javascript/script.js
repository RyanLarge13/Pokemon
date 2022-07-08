//IIFE function
const pokemonList = (() => {
    //list of pokemon
    let pokemon = [];
    //apiURL
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    //begin functions for handling dom minipulation and pokemon objects
    const add = (obj) => {
        let keys1 = ['name', 'height', 'types'];
        let keys2 = Object.keys(obj);
        const equal = keys1.some(value => keys2.find(key => key === value));
        if (typeof(obj) !== 'object' || Array.isArray(obj) || !equal) {
            return;
        } else {
            pokemon.push(obj);
        }
    };

    const getAll = () => {
        return pokemon;
    };

    //for future search bar at top of page
    const filter = (string) => {
        pokemon.filter(name => {
            if (name.name === string) {
                console.log(name);
            }
        });
    };

    //creating the list of cards in the dom and buttons to go with them
    const addListItem = (pokemon) => {
        let cardContainer = document.querySelector('.card-container');
        let card = document.createElement('div');
        card.classList.add('card');
        let cardBtn = document.createElement('button');
        cardBtn.innerText = `${pokemon.name}`;
        cardBtn.classList.add('btn');
        cardContainer.appendChild(card);
        card.appendChild(cardBtn);

        btnEvent(pokemon, cardBtn);
    };

    //loadList and loadDetails functions for fetching pokemon data
    const loadList = () => {
        showLoadingMessage();
        return fetch(apiUrl).then((response) => {
            return response.json();
        }).then((json) => {
            json.results.forEach((item) => {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url,
                };
                add(pokemon);
            });
            hideLoadingMessage();
        }).catch((e) => {
            console.error(e);
        });
    };

    const loadDetails = (item) => {
        showLoadingMessage();
        let url = item.detailsUrl;
        return fetch(url).then((response) => {
            return response.json();
        }).then((details) => {
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
            hideLoadingMessage();
            // addImage(item.imageUrl);
        }).catch((e) => {
            console.error(e);
        });
    };

    //loading message functions for bonus tasks
    const showLoadingMessage = () => {
        let message = document.createElement('div');
        message.classList.add('loading-message');
        message.innerHTML = 'Loading...'
        let dataContainer = document.querySelector('.data-container');
        dataContainer.appendChild(message);
    };

    const hideLoadingMessage = () => {
        let message = document.querySelector('.loading-message');
        message.remove();
    };

    //adding an eventlistener to each button and when fired calling showDetails();
    const btnEvent = (pokemon, cardBtn) => {
        cardBtn.addEventListener('click', () => {
            showDetails(pokemon);
        });
    };

    const showDetails = (pokemon) => {
        loadDetails(pokemon).then(() => {
            console.log(pokemon);
        });
    };

    // const addImage = (image) => {
    //     let arr = []
    //     arr.push(image)
    //     console.log(arr)
    //     let cards = document.querySelectorAll('.card');
    //     cards.forEach((card, index) => {
    //         card.style.backgroundImage = `url(${arr[index]})`
    //     });
    // }

    return {
        add: add,
        getAll: getAll,
        filter: filter,
        addListItem: addListItem,
        showDetails: showDetails,
        loadList: loadList,
        loadDetails: loadDetails,
    };
})();

pokemonList.loadList().then(() => {
    pokemonList.getAll().forEach((pokemon) => {
        let assignObj = {
            name: 'Anonymous Pokemon',
            height: 'Unknown height',
            types: 'No known types'
        };
        if (pokemon.name === undefined) {
            pokemon.name = assignObj.name;
        }
        if (pokemon.height === undefined) {
            pokemon.height = assignObj.height;
        }
        if (pokemon.types === undefined) {
            pokemon.types = assignObj.types;
        }
        pokemonList.addListItem(pokemon);
        // pokemonList.loadDetails(pokemon);
    });
});

