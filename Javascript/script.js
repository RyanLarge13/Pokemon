// for lesson 1.1 if by chance you do not see this code before my new commits for the next lesson appear in lesson 1.2 

// alert('Hello World!!!!');

// const favoriteFood = 'Pizza, or maybe burritos.'

// document.write(favoriteFood);

//pokemon variable
const pokemonList = [
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

//for loop to iterate through object
for (let i = 0; i < pokemonList.length; i++) {
    //declairing variables in for loop
    let height = pokemonList[i].height;
    let name = pokemonList[i].name;
    let string = `${name} (height: ${height})`;
    //conditional statment for largest height
    if (height > 4.0) {
        string += ' - Wow that is big!!!';
    }
    //final for loop execution
    document.write(string + '<br><br>');
}