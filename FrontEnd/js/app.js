

document.querySelector('.tous').addEventListener("click", () => getProjects())

// Recupère les projets dans l'API 

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

// Récupère les catégories dans l'API

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

// Ajoute les projets dans l'HTML

function ajouterProjet(dataProjects) {
const projo = document.createElement('projet');
projo.innerHTML = `<img src=${dataProjects.imageUrl} alt=${dataProjects.title} />
            <titre>${dataProjects.title}</titre>`

document.querySelector('.gallery').append(projo);

}

// Ajoute les filtres dans l'HTML

function ajouterCategorie(data) {
const cat = document.createElement('div');
cat.className = data.id;
cat.addEventListener("click", () => getProjects(data.id));
cat.innerHTML = `${data.name}`
document.querySelector(".filtres").append(cat);
}


// Si il y a un token dans le sessionStorage, modifie l'index.html avec les droits d'administrateur

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


let modal = document.getElementById("myModal");
let modal2 = document.getElementById("myModal2");
let btn = document.getElementById("modBtn");
let btn2 = document.getElementById("add");
let span = document.getElementsByClassName("close")[0];
let span2 = document.getElementsByClassName("close2")[0];

// Ouvre la modal en cliquant sur le bouton

btn.onclick = function() {
  modal.style.display = "block";
  getProjectsModal();
}

btn2.onclick = function() {
    modal2.style.display = "block";
  }



// Ferme la modal en cliquant sur le X
span.onclick = function() {
  modal.style.display = "none";
  document.querySelector(".gallerySmall").innerHTML = "";
}

span2.onclick = function() {
    modal2.style.display = "none";
    modal.style.display = "none";  
    document.querySelector(".gallerySmall").innerHTML = "";  
    uploadInput.value = "";
  previewImage.style.display = "none"; 
  buttonUpload.style.display = "flex"; 
  }



// Ferme la modal en cliquant à l'extérieur de la fenetre

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
    document.querySelector(".gallerySmall").innerHTML = "";
 
  } else if (event.target == modal2) {
    modal2.style.display = "none";
    modal.style.display = "none";
    document.querySelector(".gallerySmall").innerHTML = "";  
    uploadInput.value = "";
  previewImage.style.display = "none"; 
  buttonUpload.style.display = "flex"; 

  }
} 

// Ajout des projets dans la modal

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

  // Appel des projets pour la modal

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

// Suppression des projets

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






const uploadInput = document.getElementById('uploadInput');
const buttonUpload = document.getElementById('buttonUpload');
const previewImage = document.getElementById('previewImage');
const uploadContainer = document.getElementById('uploadContainer');

// Ouvre le sélecteur de fichier lors du clic sur le bouton
buttonUpload.addEventListener('click', function () {
  uploadInput.click();
});

// Prévisualise l'image sélectionnée
uploadInput.addEventListener('change', function (event) {
  const file = event.target.files[0];
  const maxSize = 4 * 1024 * 1024; // 4 Mo en octets
  if (file.size > maxSize) {
    alert("L'image est trop volumineuse. Taille maximale : 4 Mo.");
    return; // Arrête l'exécution
  }
  
  // Affiche l'image en tant qu'aperçu

  const reader = new FileReader();
  reader.onload = function (e) {
    previewImage.src = e.target.result;
    console.log(previewImage.src) // Charge l'image dans l'aperçu
    // Afficher l'image

    previewImage.style.display = 'block';

    // Cacher le bouton

    buttonUpload.style.display = 'none'; 
    
    reader.onerror = function () {
      alert("Une erreur s'est produite lors du chargement du fichier.");
    };
  };
  reader.readAsDataURL(file); // Lire le fichier comme URL de données
});



document.getElementById("uploadForm").addEventListener("submit", async function (event) {
  event.preventDefault(); 
  
  const uploadInput = document.getElementById("uploadInput");
  const titleInput = document.getElementById("email");
  const categorySelect = document.getElementById("cat");

  // Vérifie que tous les champs sont remplis
  if (!uploadInput.files[0] || !titleInput.value || !categorySelect.value) {
    alert("Veuillez remplir tous les champs avant de soumettre.");
    return;
  }

  // Prépare les données du formulaire
  const formData = new FormData();
  formData.append("image", uploadInput.files[0]); 
  formData.append("title", titleInput.value);
  formData.append("category", categorySelect.value); 

  try {
    
    const token = sessionStorage.authToken;
    const response = await fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers: {
        
        Authorization: "Bearer" + " " + token,
      },
      body: formData, // Ajoute les données du formulaire
    });

    // Vérifie la réponse de l'API
    if (response.ok) {
      const result = await response.json();
      alert("Le fichier a été envoyé avec succès !");
      document.querySelector(".gallerySmall").innerHTML = "";
    document.querySelector(".gallery").innerHTML = "";
    getProjectsModal()
    getProjects()
      console.log(result);
    } else {
      const errorData = await response.json();
      alert(`Erreur : ${errorData.message || "Une erreur est survenue."}`);
    }
  } catch (error) {
    console.error("Erreur lors de la requête :", error);
    alert("Impossible d'envoyer les données. Veuillez réessayer.");
  }
});