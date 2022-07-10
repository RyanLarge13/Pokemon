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
        pokemon.filter((poke) => {
            let match = poke.name.includes(string);
            if (match && string !== '') {
                addCard(poke);
            }
            if (string === '') {
                let cards = document.querySelectorAll('.card');
                cards.forEach((card) => {
                    card.remove();
                });
                setTimeout(() => {
                    addListItem(poke);
                }, 1);
            }
        });
    };

    //function for card filters
    const addCard = (pokemon) => {
        let cards = document.querySelectorAll('.card');
        cards.forEach((card) => {
            card.remove();
        });

        let cardContainer = document.querySelector('.card-container');
        let card = document.createElement('div');
        card.classList.add('card');
        let cardBtn = document.createElement('button');
        cardBtn.innerText = `${pokemon.name}`;
        cardBtn.setAttribute('type', 'button');
        cardBtn.setAttribute('data-toggle', 'modal');
        cardBtn.setAttribute('data-target', '#myModal');
        cardBtn.classList.add('btn-dark');
        cardContainer.appendChild(card);
        card.appendChild(cardBtn);

        //chaining promise for card images on load
        loadDetails(pokemon).then(() => {
            card.style.backgroundImage = `url(${pokemon.imageUrl})`; 
        });

        btnEvent(pokemon, cardBtn);
    }

    //creating the list of cards in the dom and buttons to go with them
    const addListItem = (pokemon) => {
        let cardContainer = document.querySelector('.card-container');
        let card = document.createElement('div');
        card.classList.add('card');
        let cardBtn = document.createElement('button');
        cardBtn.innerText = `${pokemon.name}`;
        cardBtn.setAttribute('type', 'button');
        cardBtn.setAttribute('data-toggle', 'modal');
        cardBtn.setAttribute('data-target', '#myModal');
        cardBtn.classList.add('btn-dark');
        cardContainer.appendChild(card);
        card.appendChild(cardBtn);

        //chaining promise for card images on load
        loadDetails(pokemon).then(() => {
            card.style.backgroundImage = `url(${pokemon.imageUrl})`; 
        });

        btnEvent(pokemon, cardBtn);
    };

    //loadList and loadDetails functions for fetching pokemon data
    const loadList = () => {
        // showLoadingMessage();
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
            // hideLoadingMessage();
        }).catch((e) => {
            console.error(e);
        });
    };

    const loadDetails = (item) => {
        // showLoadingMessage();
        let url = item.detailsUrl;
        return fetch(url).then((response) => {
            return response.json();
        }).then((details) => {
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
            // hideLoadingMessage();
        }).catch((e) => {
            console.error(e);
        });
    };

    //adding an eventlistener to each button and when fired calling showDetails();
    const btnEvent = (pokemon, cardBtn) => {
        cardBtn.addEventListener('click', () => {
            showDetails(pokemon);
        });
    };

    const showDetails = (pokemon) => {
       
        loadDetails(pokemon).then(() => {
            let modalContent = document.querySelector('.modal-content');
            let modalTitle = document.querySelector('.modal-title');
            setTimeout(() => {
                modalContent.style.backgroundImage = `url(${pokemon.imageUrl})`;
                setTimeout(() => {
                    modalTitle.innerHTML = `${pokemon.name}`;
                    setTimeout(() => {
                        //calling appendData function in order to split up code block execution 
                        appendData(pokemon);
                    }, 50);
                }, 50);
            }, 50);
        });
    };

    const appendData = (pokemon) => {
        //loading modal content
        let height = document.querySelector('.height');
        let types = document.querySelector('.types');
        height.innerHTML = `height - ${pokemon.height}`;
        types.innerHTML = `types - ${pokemon.types[0].type.name}`;
    };

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

let search = document.querySelector('#search');
search.addEventListener('keyup', (e) => {
    e.preventDefault();
    let value = search.value.toLowerCase();
    pokemonList.filter(value);
});

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
    });
});