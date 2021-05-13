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


    // Generate Tiles for each Dino in Array
    function generateTiles(dinos) {
        return dinos.map((dino) => {
            let gridItem = document.createElement('div')
            gridItem.className = "grid-item"
            gridItem.innerHTML =
                `<h3>dino.species</h3>
                <p>Weight: dino.weight</p>
                <img src="images/${dino.species.toLowerCase()}.png">`;

            return gridItem;
        })
    }

    // Add tiles to DOM
    function showTiles(tiles) {
        const fragment = document.createDocumentFragment();
        tiles.forEach(tile => fragment.append(tile))
        console.log(tiles);
        grid.append(fragment);
    }

    // Remove form from screen


// On button click, prepare and display infographic
submitBtn.addEventListener("click", (e) => {
    const formData = getFormData();
    const human = Human(formData);

    getDinos().then((dinos) => {
        const tiles = generateTiles(dinos);
        showTiles(tiles)
    });

    console.log(human);
});