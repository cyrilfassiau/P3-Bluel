
async function getTravaux() {
    
    try {
        const response = await fetch("http://localhost:5678/api/works");
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        
        const data = await response.json();
       
        for (let i = 0; i < data.length; i++) {
            ajouterFigure(data[i]);
        }
        
    } catch (error) {
        console.error(error.message);
    }

}

getTravaux()

function ajouterFigure(data) {
    const figure = document.createElement("figure");
    figure.innerHTML = `<img src=${data.imageUrl} alt=${data.title} />
            <figcaption>${data.title}</figcaption>`

    document.querySelector(".gallery").append(figure);
}


async function getCategories() {
    
    try {
        const response = await fetch("http://localhost:5678/api/categories");
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        
        const data = await response.json();

        
        for (let i = 0; i < data.length; i++) {
            ajouterFiltres(data[i]);
        }
        
    } catch (error) {
        console.error(error.message);
    }

}

getCategories()

function ajouterFiltres(data) {
    const filtre = document.createElement("div");
    filtre.innerHTML = `${data.name}`

    document.querySelector(".filtres").append(filtre);
}


















// // Récupération des projets depuis le fichier JSON
// const reponse = await fetch('http://localhost:5678/api/works');
// let projets = await reponse.json();

// // Récupération des catégories depuis le fichier JSON
// const reponse_cat = await fetch('http://localhost:5678/api/categories');
// const categories = await reponse_cat.json();

// function ajouteListenerFiltre(filterElement){
//     // listener on click
    
//     filterElement.addEventListener("click", function () {
//         // picks all projects whose category matches (useless for 'tout')
        
//         let projetsFiltres = projets;
//         const category = filterElement.innerText;
//         if( category !== "Tout")
//         {
//             // uses anonymous function on filter method of JSON data 
//             projetsFiltres = projets.filter(function (projet) {
//                 return projet.category.name === category;
//             });
//         }
    
//         // update selected filter (green button for class fliter-selected)
//         // remove 
//         document.querySelector('.filter-selected').classList.remove('filter-selected');
//         // add new one 
//         filterElement.classList.add("filter-selected");

//         // remove all projects
//         document.querySelector(".gallery").innerHTML = "";
        
//         // add selected projects
//         genererProjets(projetsFiltres);
//         }); 
//     }