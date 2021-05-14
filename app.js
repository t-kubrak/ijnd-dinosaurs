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
    human.height = human.feet * 12 + parseInt(human.inches);
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
    let diff = '';

    if (human.height === dino.height) {
        diff = 'Your heights are the same!';
    } else {
        const result = human.height < dino.height ? 'smaller' : 'taller';
        diff = `You are ${result} than ${dino.species}! His height is ${dino.height} in. and yours is ${human.height} in.`;
    }

    return diff;
}

// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.
function weightDiff(human, dino) {
    let diff = '';

    if (human.weight === dino.weight) {
        diff = 'Your weights are the same!';
    } else {
        const result = human.weight < dino.weight ? 'lighter' : 'heavier';
        diff = `You are ${result} than ${dino.species}! His weight is ${dino.weight} lbs. and yours is ${human.weight} lbs.`;
    }

    return diff;
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
            default:
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
    const title = obj.species !== 'human' ? obj.species : obj.name;
    let gridItem = document.createElement('div')
    gridItem.className = 'grid-item'
    gridItem.innerHTML =
        `<h3>${title}</h3>
        <p>${fact}</p>
        <img src='images/${obj.species.toLowerCase()}.png'>`;

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
submitBtn.addEventListener('click', (e) => {
    const formData = getFormData();
    const human = new Human(formData);
    const humanTile = createTileFromObject(human);

    const dinos = getDinos();
    const formattedDinos = randomizeFactForDino(dinos, human);

    const tiles = generateTilesFromDinos(formattedDinos);
    tiles.splice(4, 0, humanTile);

    showTiles(tiles);

    removeForm();
});