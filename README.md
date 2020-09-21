# firefighter
Partie Web service

1-Clone le projet sur Github et l'ouvrir   dans le terminal  code .

2-Ouvrir le fichier config/dbconnect.js et changer les access
3-lancer la commande npm install 
4-ce qui te concerne est dans le dossier routes/sinistre.js

Pour lancer le serveur en dev fais un npm start dans le terminal à la racine du projet

Tu définis un port vu que ton 5000 est pour python-> server.js
Tu créé une page de connexion ou de création de compte.
 Tu utilises les routes  avec POST localhost:port/register  ou localhost:port/login et  GET localhost:port/signout si tu veux le déconnecter.
L'utilisateur doit être connecté pour accéder aux ressources.



Tu connectes un utilisateur à la base pour obtenir un token que tu utiliseras dans la route /sinstres/
  GET localhost:port/sinsters/  pour récupérer tous les sinistres(alertes)
  GET localhost:port/sinsters/:id    pour récupérer les détails d'un sinistre avec son id
