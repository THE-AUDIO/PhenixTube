document.addEventListener('DOMContentLoaded',()=>{
    // Exemple : Associez ce comportement à un bouton
    const darkModeButton = document.getElementById('dark-mode-toggle');
    darkModeButton.addEventListener('click', ()=>{
        document.body.classList.toggle('dark-mode');
        console.log(true);
    }); 
})