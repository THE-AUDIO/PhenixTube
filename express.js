const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

const PORT = 3001;

const videosFolder = path.join(__dirname, 'video');

app.get('/api/video', (req, res) => {
    fs.readdir(videosFolder, (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'Impossible de lire le dossier' });
        }

        // Filtrer pour ne garder que les fichiers vidéo
        const videoFiles = files.filter(file => {
            const ext = path.extname(file).toLowerCase();
            return ['.mp4', '.avi', '.mov', '.mkv'].includes(ext); // Ajoute d'autres extensions si nécessaire
        });

        // Créer un tableau JSON contenant les chemins complets ou les noms des vidéos
        const videos = videoFiles.map(file => ({
            name: file,
            path: `/videos/${file}`
        }));

        res.json(videos);
    });
});

// Servir les fichiers vidéo statiques
app.use('/videos', express.static(videosFolder));

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});