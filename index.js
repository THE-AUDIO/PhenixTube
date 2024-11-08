let video_server = [];  // Initialisation avec un tableau vide
const container_video_suggestion = document.querySelector('.video_suggestion');
const video_played = document.querySelector('.video_play_now');
const choixs = document.querySelectorAll(".card__item");
const container_choix = document.querySelector(".presentation");

async function fetchData() {
    try {
        const response = await fetch("http://localhost:3001/api/video");
        video_server = await response.json();
    } catch (error) {
        console.error('Erreur lors des requêtes fetch:', error);
        video_server = [];  // Assigne un tableau vide en cas d'erreur
    }
}

function displayVideos(litVideo) {
    container_video_suggestion.innerHTML = '';  // Vide le conteneur
    litVideo.forEach((video) => {
        let categories;
        const video_name = video.name.split(".")[0];  // Nom sans extension
     
        if (video_name.toLowerCase().includes("film")) {
            categories = "Film";
        } else if (video_name.toLowerCase().includes("clip")) {
            categories = "Clip";
        } else if (video_name.toLowerCase().includes("apprendre")) {
            categories = "Tutorial";
        } else {
            categories = "Video";
        }

        const newVideoElement = document.createElement('div');
        newVideoElement.classList.add('video_suggestion_item');
        newVideoElement.innerHTML = `
            <video src="video/${video.name}"></video>
            <div class="video_suggestion__description">
                <span class="video_title">${video_name}</span>
                <span class="video_sous_titre">${categories}</span>
            </div>`;
        
        container_video_suggestion.appendChild(newVideoElement);

        newVideoElement.addEventListener('click', () => {
            video_played.src = newVideoElement.querySelector('video').src;
            video_played.play();
            document.querySelector('.title').children[0].innerHTML = video_name;
        });
    });
}

async function video_suggestion() {
    await fetchData(); 
}

document.addEventListener('DOMContentLoaded', video_suggestion);

function searchVideos(query) {
    const filteredVideos = video_server.filter(video => 
        video.name.toLowerCase().includes(query.toLowerCase())
    );
    displayVideos(filteredVideos);
}

// Événement de recherche
document.getElementById('search').addEventListener('keydown', (event) => {
   if(event.key === "Enter"){
    event.preventDefault();
   searchVideos(event.target.value);
};
});

// Gestion des choix de type vidéo
choixs.forEach((elt) => {
    elt.addEventListener("click", () => {
        container_choix.classList.add('remove');
        container_choix.innerHTML = '';  // Vide le conteneur rapidement

        const typeVideo = elt.children[1].textContent;
        const filteredVideos = video_server.filter(video => 
            video.name.toLowerCase().includes(typeVideo.toLowerCase())
        );
        displayVideos(filteredVideos);
    });
});
