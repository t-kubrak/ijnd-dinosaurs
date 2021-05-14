const form = document.getElementById('dino-compare');
const submitBtn = document.getElementById('btn');
const grid = document.getElementById('grid');

// Create Dino Constructor
function Dino(object) {
    return Object.assign({}, object)
}

// Create Dino Objects
function getDinos() {
    return data.Dinos.map((record) => Dino(record));
}

// Create Human Object
function Human(object) {
    let human = Object.assign({}, object);
    human.height = human.feet * 12 + human.inches;
    human.species = 'human';
    return human;
}

// Use IIFE to get human data from form
function getFormData() {
    return Object.fromEntries(new FormData(form))
}


// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches.
function heightDiff(human, dino) {
    return human.height === dino.height
        ? ' Your heights are the same!'
        : `His height is ${dino.height} in. and yours is ${human.height} in.`;
}

// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.
function weightDiff(human, dino) {
    return human.weight === dino.weight
        ? 'Your weights are the same!'
        : `His weight is ${dino.weight} lbs and yours is ${human.weight} lbs`;
}

// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.
function dietDiff(human, dino) {
    return human.diet.toLowerCase() === dino.diet.toLowerCase()
        ? 'Your diets are the same!'
        : `His diet is ${dino.diet} and yours is ${human.diet}`;
}

function randomizeFactForDino(dinos, human) {
    const getRandomInt = (max) => {
        return Math.floor(Math.random() * max);
    }

    const getRandomFact = (dino) => {
        let fact = null;

        switch (getRandomInt(4)) {
            case 0:
                fact = heightDiff(human, dino);
                break;
            case 1:
                fact = weightDiff(human, dino);
                break;
            case 2:
                fact = dietDiff(human, dino);
                break;
            case 3:
                fact = dino.fact
                break;
        }

        return fact;
    }

    return dinos.map(dino => {
        if (dino.species !== 'Pigeon') {
            dino.fact = getRandomFact(dino);
        }

        return dino;
    })
}

function createTileFromObject(obj) {
    const fact = obj.species !== 'human' ? obj.fact : '';
    let gridItem = document.createElement('div')
    gridItem.className = "grid-item"
    gridItem.innerHTML =
        `<h3>${obj.species}</h3>
        <p>${fact}</p>
        <img src="images/${obj.species.toLowerCase()}.png">`;

    return gridItem;
}

// Generate Tiles for each Dino in Array
function generateTilesFromDinos(dinos) {
    return dinos.map((dino) => {
        return createTileFromObject(dino);
    })
}

// Add tiles to DOM
function showTiles(tiles) {
    const div = document.createElement('div');
    tiles.forEach(tile => div.append(tile));
    grid.innerHTML = div.innerHTML;
}

// Remove form from screen
function removeForm() {
    form.style.display = 'none';
}

// On button click, prepare and display infographic
submitBtn.addEventListener("click", (e) => {
    const formData = getFormData();
    const human = new Human(formData);
    const humanTile = createTileFromObject(human);

    let dinos = getDinos();
    dinos = randomizeFactForDino(dinos, human);

    const tiles = generateTilesFromDinos(dinos);
    tiles.splice(4, 0, humanTile);

    showTiles(tiles);

    removeForm();
});