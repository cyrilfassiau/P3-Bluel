

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



function editMode() {
    if (sessionStorage.authToken) {
        console.log(sessionStorage.authToken)
        const editHead = document.createElement('div');
        const header = document.querySelector('header');
        editHead.className = 'editHead';
        editHead.innerText = "Mode édition";
        document.querySelector('body').insertBefore(editHead, header);
        document.getElementById("loginNav").innerText = "logout";
        document.getElementById("loginNav").style.fontWeight = '700';
        document.getElementById("filtres").style.visibility = "hidden";
        document.getElementById("modBtn").style.display = "flex";

      

    }
}

editMode()


var modal = document.getElementById("myModal");
var modal2 = document.getElementById("myModal2");

// Get the button that opens the modal
var btn = document.getElementById("modBtn");
var btn2 = document.getElementById("add");


// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
var span2 = document.getElementsByClassName("close2")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
  getProjectsModal();
}

btn2.onclick = function() {
    modal2.style.display = "block";
  }



// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
  document.querySelector(".gallerySmall").innerHTML = "";
}

span2.onclick = function() {
    modal2.style.display = "none";
    modal.style.display = "none";    
  }



// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
    document.querySelector(".gallerySmall").innerHTML = "";
 
  } else if (event.target == modal2) {
    modal2.style.display = "none";
    modal.style.display = "none";
    
 
  }
} 



 

function ajouterProjetModal(dataProjects) {
    const projo = document.createElement('figure');
    const pic = document.createElement("div");
    const picI = document.createElement("i");
    const picDiv = document.createElement("div");
    projo.appendChild(pic).innerHTML = `<img src=${dataProjects.imageUrl} alt=${dataProjects.title} id=${dataProjects.id} />`
    pic.appendChild(picDiv);
    picDiv.appendChild(picI)
    pic.className = "pic";
    picI.className = "fa-solid fa-trash-can";
    picI.id = "poubelle";
    picI.id =  `${dataProjects.id}`;
    pic.id = "pic";
    picDiv.className = "divPic";
    picDiv.id = `${dataProjects.id}`;
 
    
    document.querySelector('.gallerySmall').append(projo);
    picDiv.addEventListener("click", (event) => deleteProject(event) )
 
 

    }

    async function getProjectsModal() {
      
        try {
            const projects = await fetch('http://localhost:5678/api/works');
    
            if (!projects.ok) {
                throw new Error(`Response status: ${projects.status}`);
            }
            const data = await projects.json();
    
           
            for (let i = 0; i < data.length; i++) {
                ajouterProjetModal(data[i]);
    
        } 
    } catch (error) {
        console.error(error.message);
    
   }
        
    }

async function deleteProject(event) {
 
    const id = event.srcElement.id;
    console.log(id)
    const api = "http://localhost:5678/api/works";
    const token = sessionStorage.authToken;
    console.log(token)
    let response = await fetch(api + "/" + id, {
        method: "DELETE",
        headers: {
            Authorization: "Bearer" + " " + token,
        }
    });
    document.querySelector(".gallerySmall").innerHTML = "";
    document.querySelector(".gallery").innerHTML = "";
    getProjectsModal()
    getProjects()
    }
    
    
    async function getCategoriesForModal() {
   

        try {
            const categories = await fetch('http://localhost:5678/api/categories');
            if (!categories.ok) {
                throw new Error(`Response status: ${categories.status}`);
            }
            const dataCat = await categories.json();
            for (let i = 0; i < dataCat.length; i++) {
                ajouterCategorieModal(dataCat[i]);
    
        } 
        } catch (error) {
            console.error(error.message);
        
       }

   
}

function ajouterCategorieModal(data) {
    const cat = document.createElement('option');
    cat.value = data.id;
    cat.innerHTML = `${data.name}`
    document.querySelector("#cat").append(cat);
    }
    
    getCategoriesForModal()


    const uploadInput = document.getElementById("uploadInput");
uploadInput.addEventListener(
  "change",
  () => {
    // Calcul de la taille totale
    let numberOfBytes = 0;
    for (const file of uploadInput.files) {
      numberOfBytes += file.size;
    }

    // Approximation à l'unité humaine la plus proche
    const units = ["o", "Ko", "Mo", "Go", "To", "Po", "Eo", "Zo", "Yo"];
    const exponent = Math.min(
      Math.floor(Math.log(numberOfBytes) / Math.log(1024)),
      units.length - 1,
    );
    const approx = numberOfBytes / 1024 ** exponent;
    const output =
      exponent === 0
        ? `${numberOfBytes} octets`
        : `${approx.toFixed(3)} ${units[exponent]} (${numberOfBytes} octets)`;

    document.getElementById("fileNum").textContent = uploadInput.files.length;
    document.getElementById("fileSize").textContent = output;
  },
  false,
);