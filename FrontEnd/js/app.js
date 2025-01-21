document.querySelector('.tous').addEventListener("click", () => getProjects())

async function getProjects(filtre) {
    document.querySelector(".gallery").innerHTML = "";
    try {
        const projects = await fetch('http://localhost:5678/api/works');

        if (!projects.ok) {
            throw new Error(`Response status: ${projects.status}`);
        }
        const data = await projects.json();

        if (filtre) {

            const filteredProjects = data.filter((data) => data.categoryId === filtre);
           
            for (let i = 0; i < filteredProjects.length; i++) {
                ajouterProjet(filteredProjects[i]);
            }
    
        } else {
        for (let i = 0; i < data.length; i++) {
            ajouterProjet(data[i]);

    } 
}
    } catch (error) {
        console.error(error.message);
    
   }
}

getProjects()

async function getCategories() {
   

        try {
            const categories = await fetch('http://localhost:5678/api/categories');
            if (!categories.ok) {
                throw new Error(`Response status: ${categories.status}`);
            }
            const dataCat = await categories.json();
            for (let i = 0; i < dataCat.length; i++) {
                ajouterCategorie(dataCat[i]);
    
        } 
        } catch (error) {
            console.error(error.message);
        
       }

   
}

getCategories()


function ajouterProjet(dataProjects) {
const projo = document.createElement('projet');
projo.innerHTML = `<img src=${dataProjects.imageUrl} alt=${dataProjects.title} />
            <titre>${dataProjects.title}</titre>`

document.querySelector('.gallery').append(projo);

}


function ajouterCategorie(data) {
const cat = document.createElement('div');
cat.className = data.id;
cat.addEventListener("click", () => getProjects(data.id));
cat.innerHTML = `${data.name}`
document.querySelector(".filtres").append(cat);
}
