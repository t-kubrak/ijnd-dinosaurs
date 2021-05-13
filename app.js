const form = document.getElementById('dino-compare');
const submitBtn = document.getElementById('btn');
const grid = document.getElementById('grid');

// Create Dino Constructor
function Dino(object) {
    return Object.assign({}, object)
}

// Create Dino Objects
async function getDinos() {
    try {
        const response = await fetch('./dino.json');
        const json = await response.json();
        return json.Dinos.map((record) => Dino(record));
    } catch (e) {
        console.log(e);
    }
}

// Create Human Object
function Human(object) {
    return Object.assign({}, object)
}

// Use IIFE to get human data from form
function getFormData() {
    return Object.fromEntries(new FormData(form))
}


// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches.

// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.

// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.

function createTileFromHuman(human) {
    let gridItem = document.createElement('div')
    gridItem.className = "grid-item"
    gridItem.innerHTML =
        `<h3>${human.name}</h3>
        <img src="images/human.png">`;

    return gridItem;
}

function createTileFromDino(dino) {
    let gridItem = document.createElement('div')
    gridItem.className = "grid-item"
    gridItem.innerHTML =
        `<h3>${dino.species}</h3>
        <p>${dino.fact}</p>
        <img src="images/${dino.species.toLowerCase()}.png">`;

    return gridItem;
}

// Generate Tiles for each Dino in Array
function generateTilesFromDinos(dinos) {
    return dinos.map((dino) => {
        return createTileFromDino(dino);
    })
}

// Add tiles to DOM
function showTiles(tiles) {
    const div = document.createElement('div');
    tiles.forEach(tile => div.append(tile));
    console.log(tiles);
    grid.innerHTML = div.innerHTML;
}

// Remove form from screen
function removeForm() {
    form.style.display = 'none';
}


// On button click, prepare and display infographic
submitBtn.addEventListener("click", (e) => {
    const formData = getFormData();
    const human = Human(formData);
    const humanTile = createTileFromHuman(human);

    getDinos().then((dinos) => {
        const tiles = generateTilesFromDinos(dinos);
        tiles.splice(4, 0, humanTile);
        showTiles(tiles);
    });

    console.log(human);
    //removeForm();
});