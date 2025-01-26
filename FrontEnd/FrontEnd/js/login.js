const loginApi = "http://localhost:5678/api/users/login"

document.getElementById("log").addEventListener("click", logIn);


async function logIn(event){
    event.preventDefault();
    let user = {
        email: document.getElementById("email").value, 
        password: document.getElementById("name").value,
    };
    
    let response = await fetch(loginApi, {
        method : "POST",
        headers : { "Content-Type": "application/json",
        },
        body : JSON.stringify(user),
    });

    let result = await response.json();

    if (result.userId) {
        const token = result.token;
        sessionStorage.setItem("authToken", token);
        location.href = "index.html";
    } else {
        erreurLogin()
    }
    console.log(result)

    
}

function erreurLogin() {
const erreur = document.createElement('p');
erreur.className = 'erreurLogin';
erreur.innerText = 'Erreur dans l’identifiant ou le mot de passe'
document.querySelector('#login').append(erreur);



}
