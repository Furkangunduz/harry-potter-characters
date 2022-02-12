const page = document.querySelector(".harry-potter-page")
const search = document.querySelector("#character-search")


const characterCount = 23;

const initCharacter = async() =>{
    for(let i = 1; i < characterCount; i++){
        await getCharacter(i);
    }

}

const getCharacter = async(id) =>{
    let url = `https://fedeperin-harry-potter-api-en.herokuapp.com/characters/${id}`
    let res = await fetch(url);
    let data = await res.json();
    renderCharacter(data)
}

const renderCharacter = (character) =>{
    const name = character["character"];
    const id = character["id"].toString().padStart(2,"0");
    const img = character["image"];
    const house = character["hogwartsHouse"];

    const characterEl = document.createElement("div")
    characterEl.classList.add("potter-card");

    characterEl.innerHTML = 
        `
        <img src="${img}" alt="image of ${name}">
        <p class = "character-id">#${id}</p>
        <h3 class = "character-name">${name}</h3>
        <h4 class = "character-house">House: ${house}</h4>
        `;

    page.appendChild(characterEl);
}

initCharacter();




search.addEventListener("input",() =>{
    const characterNames = document
        .querySelectorAll(".character-name");
    const searchInput = search.value.toLowerCase();
    
    characterNames.forEach((e)=>{
        e.parentElement.style.display ="block";
        if(!e.innerHTML.toLowerCase().includes(searchInput))
            e.parentElement.style.display ="none";
    })

})