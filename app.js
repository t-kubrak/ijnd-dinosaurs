const form = document.getElementById('dino-compare');
const submitBtn = document.getElementById('btn');

    // Create Dino Constructor


    // Create Dino Objects


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
  
        // Add tiles to DOM

    // Remove form from screen


// On button click, prepare and display infographic
submitBtn.addEventListener("click", (e) => {
    const formData = getFormData();
    const human = Human(formData);

    console.log(human);
});