#!/bin/bash

# Lancer le serveur Node.js dans /api
echo "Lancement du serveur Node.js..."
cd "$(dirname "$0")/api" || exit
nohup node ./bin/www &> node.log &  # Redirige les logs vers un fichier
NODE_PID=$!  # Récupère le PID du serveur Node.js

# Lancer le serveur web dans ./frontend
echo "Lancement du serveur web..."
cd "../frontend" || exit
nohup yarn run serve -s build &> npm.log &  # Redirige les logs vers un fichier
FRONTEND_PID=$!  # Récupère le PID du serveur web

# Attendre quelques secondes pour donner le temps aux serveurs de démarrer
sleep 5

# Déterminer le port du serveur web (par défaut c'est 8080)
PORT=$(grep -oP 'port:\s*\K\d+' package.json || echo 3000)

# Ouvrir le navigateur à l'URL dynamique
echo "Ouverture du navigateur à http://localhost:$PORT..."
xdg-open "http://localhost:$PORT"

# Fonction pour arrêter les serveurs
cleanup() {
    echo "Arrêt des serveurs..."
    kill $(lsof -t -i :5000)
    kill $(lsof -t -i :3000)
}

# Intercepter le signal de fermeture du terminal
trap cleanup EXIT

# Garder le script en cours d'exécution
wait "$NODE_PID"
wait "$FRONTEND_PID"
