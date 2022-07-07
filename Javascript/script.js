// for lesson 1.1 if by chance you do not see this code before my new commits for the next lesson appear in lesson 1.2 

// alert('Hello World!!!!');

// const favoriteFood = 'Pizza, or maybe burritos.'

// document.write(favoriteFood);

//pokemon variable
const pokemonList = (() => {
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

    const add = (obj) => {
        let keys1 = Object.keys(pokemon[0]);
        let keys2 = Object.keys(obj);
        const equal = keys1.every(value => keys2.find(key => key === value));
        if (typeof(obj) !== 'object' || !equal) {
            return;
        } else {
        pokemon.push(obj);
        }
    }

    const getAll = () => {
        return pokemon;
    }

    const filter = (string) => {
        // for (let i in pokemon) {
        //     if (string === pokemon[i].name) {
        //         console.log(pokemon[i]);
        //     }
        // }
        pokemon.filter(name => {
            if (name.name === string) {
                console.log(name)
            }
        })
    }

    return {
        add: add,
        getAll: getAll,
        filter: filter,
    }
})();

pokemonList.getAll().forEach((obj) => {
    const { name, height } = obj;
    let str = `${name} (height: ${height})`;
    if (height > 4.0) {
        str += ' - Wow! That is big!!';
    }
    document.write(`<p>${str}</p><br>`)
});