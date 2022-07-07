//IIFE function
const pokemonList = (() => {
    //list of pokemon
    let pokemon = [
        {
            name: 'Bulbasaur',
            height: 0.7,
            types: ['grass', 'poison']
        },
        {
            name: 'Charizard',
            height: 1.7,
            types: ['fire', 'flying']
        },
        {
            name: 'Arcinine',
            height: 1.9,
            types: ['fire']
        },
        {  
            name: 'Alakazam',
            height: 1.5,
            types: ['psychic']
        },
        {
            name: 'Zapdos',
            height: 1.6,
            types: ['electric', 'flying']
        },
        {
            name: 'Kyogre',
            height: 4.5,
            types: ['water']
        },
    ];

    //begin functions for handling dom minipulation and pokemon objects
    const add = (obj) => {
        let keys1 = Object.keys(pokemon[0]);
        let keys2 = Object.keys(obj);
        const equal = keys1.every(value => keys2.find(key => key === value));
        if (typeof(obj) !== 'object' || !equal) {
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
                console.log(name)
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
    }

    //adding an eventlistener to each button and when fired calling showDetails();
    const btnEvent = (pokemon, cardBtn) => {
        cardBtn.addEventListener('click', () => {
            showDetails(pokemon);
        });
    };

    const showDetails = (pokemon) => {
        console.log(pokemon);
    };

    return {
        add: add,
        getAll: getAll,
        filter: filter,
        addListItem: addListItem,
        showDetails: showDetails,
    };
})();

//forEach loop calling the addListItem function and initiating dynamic dom elemetns for pokemon
pokemonList.getAll().forEach((obj) => {
    pokemonList.addListItem(obj)
});

