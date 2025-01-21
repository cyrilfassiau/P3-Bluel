
document.querySelector(".tous").addEventListener("click", () => getTravaux());


async function getTravaux(filter) {
    document.querySelector(".gallery").innerHTML = "";
    try {
        const response = await fetch("http://localhost:5678/api/works");
     
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
   
        const data = await response.json();
        if (filter) {
            const filtered = data.filter((data) => data.categoryId === filter)
            
            for (let i = 0; i < filtered.length; i++) {
                ajouterFigure(filtered[i])
            }
        } else {
            for (let i = 0; i < data.length; i++) {
                ajouterFigure(data[i]);
            }
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
                ajouterFiltres(data[i])
            }
      

        
    } catch (error) {
        console.error(error.message);
    }
   
}

getCategories();



function ajouterFiltres(data) {
    console.log(data)
    const filtre = document.createElement("div");
    filtre.className = data.id;
    filtre.addEventListener("click", () => getTravaux(data.id));
    filtre.innerHTML = `${data.name}`;

    document.querySelector(".filtres").append(filtre);

  
}

