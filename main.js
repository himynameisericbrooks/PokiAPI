let userInput = 0;
console.log(userInput);
function update() {

    userInput = document.getElementById("input").value;
    console.log("The current userInput is " + userInput);
    
    // Statement to hide output box when an invalid number is selected and show the box when a valid number is selected
    if ((userInput > 0 && userInput < 807) && userInput[0] != '0') {
        document.getElementById("output").style.display = "inline-block";
    }
    else if (userInput[0] == '0' || userInput[0] == '-' || userInput.includes('.')){
        window.alert("Please start a Pokemon ID only with digits 1-9");
        document.getElementById("output").style.display = "none";
    }
    else {
        document.getElementById("output").style.display = "none";
        window.alert("Please enter a valid ID 1-807");
    }

    // array conecting to pokeapi data
    const apiData = {
        url: 'https://pokeapi.co/api/v2/',
        type: 'pokemon',
        id: userInput,
    }
    const {url, type, id} = apiData

    const apiUrl = `${url}${type}/${id}`
    
    fetch(apiUrl)
        .then( (data) => {
            if(data.ok){
                return data.json()
            }
            throw new Error('Response not ok.'); 
        })
        .then( pokemon => generateHtml(pokemon))
        .catch( error => console.error('Error:', error))
    
    
    
    // code to create and display html
    const generateHtml = (data) => {
        console.log(data)
        const html = `
            <div class="name">${data.name}</div>
            <img class ="pokeimg" src=${data.sprites.front_default}>
            <div class="details">
                <span>Height: ${(Math.round(data.height*3.937))} in</span>
                <span>Weight: ${(Math.round(data.weight/4.536))} lbs</span>
            </div>
            <div class="number">id#: ${data.id}</div>
        `
    
        const pokemonDiv = document.querySelector('.pokemon')
        pokemonDiv.innerHTML = html
    }
}
updatebtn.addEventListener("click", update);
input.addEventListener('keypress', function enterKey(e) {
	if(e.keyCode == 13) {
		update();
	};
}, false);



// var input = document.querySelector("input");
// var output = document.querySelector("output");


// var button = document.queryCommandEnabled.Selector("updatebtn");
// button.addEventListener("click", update, false);

// function update() {
//     userInput = document.getElementById("input");
//     console.log(userInput)
// }