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
                addCard(name);
            }
            if (string === '') {
                addListItem(name)
            }
        });
    };

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
        cardBtn.classList.add('btn');

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
        cardBtn.classList.add('btn');

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
            //lodeing modal
            let modalContainer = document.querySelector('.data-container');
            let modal = document.createElement('div');
            modal.classList.add('modal');
            modalContainer.style.position = 'absolute';
            modalContainer.style.top = '0';
            modalContainer.style.height = '100vh';
            //implementing settimeouts for styling puyrposes and easing in elements
            setTimeout(() => {
                modalContainer.appendChild(modal);
                modal.style.backgroundImage = `url(${pokemon.imageUrl})`;
                setTimeout(() => {
                    modal.style.opacity = '1';
                    let heading = document.createElement('h1');
                    heading.innerHTML = pokemon.name;
                    modal.appendChild(heading);
                    setTimeout(() => {
                        heading.style.opacity = '1';
                        //calling appendData function in order to split up code block execution 
                        appendData(modal, pokemon, modalContainer, heading);
                    }, 50);
                }, 50);
            }, 50);
        });
    };

    const appendData = (modal, pokemon, modalContainer) => {
        //loading modal content
        let dataContainer = document.createElement('div');
        dataContainer.classList.add('modal-data-container');
        let height = document.createElement('p');
        height.innerHTML = `height - ${pokemon.height}`;
        let types = document.createElement('p');
        types.innerHTML = `powers - ${pokemon.types[0].type.name}`;
        let exit = document.createElement('button');
        exit.classList.add('close');
        exit.innerHTML = 'close';

        dataContainer.appendChild(height);
        dataContainer.appendChild(types);
        modal.appendChild(exit);
        modal.appendChild(dataContainer);
        modalContainer.style.navIndex = '1';

        setTimeout(() => {
            dataContainer.style.opacity = '1';
        }, 50);

        //implementing a function to close the modal inside my appendData function
        const closeModal = (e) => {
            if (e.target !== modalContainer && e.target !== exit && e.key !== 'Escape') {
                return;
            }
            modalContainer.style.height = '10vh';
            setTimeout(() => {
                modalContainer.style.position = 'relative';
            }, 250);
            modal.remove();
            exit.remove();
        };

        //eventlisteners for closing the modal
        exit.addEventListener('click', closeModal);
        modalContainer.addEventListener('click', closeModal);
        document.addEventListener('keydown', closeModal);
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

let form = document.querySelector('form');
let search = document.querySelector('#search');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    let value = search.value;
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