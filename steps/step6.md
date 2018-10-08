## APM

Positive
: Voici la documentation utile pour cette étape

- [Documentation de APM](https://www.elastic.co/guide/en/apm/get-started/current/index.html)

Nous allons à présent activer **APM** afin de monitorer la performace d'une API REST NodeJS

Afin de configurer APM, vous devez modifier le fichier disponible dans l'image fournie : `/etc/apm/apm-server.yml`

- Faites les modifications nécessaires pour activer `APM`:

  - Activer la sortie Elasticsearch
  - Configurer la connexion avec Kibana

- Démarrer APM :

```
cd /elastic-stack
ansible-playbook 4_configure-apm.yml
```

- Une application NodeJS est disponible dans `/etc/nodejs-api`
  - Installer les dépendance : `sudo npm i`
  - Lancer l'application en exécutant `npm start &`
  - Executer un curl pour vérifier que l'API est disponible : `curl http://localhost:3000`
  - Installer le module NPM pour pour ajouter le client `APM` dans le projet NodeJS (`sudo npm i elastic-apm-node`)
  - Activer le client dans le fichier `app/index.js`

```javascript
require("elastic-apm-node").start({});
```

- Redemarrer l'API NodeJS et vérifier que vous récupérer des données
- Installer le module NPM `weather-js`
- Lors d'un `GET` sur /, appeler le module weather afin de retourner à l'utilisateur la météo de Nantes.

```javascript
app.get("/", (req, res) => {
  require("weather-js").find({ search: "Nantes, FR" }, (err, result) => {
    if (err) console.log(err);
    res.send(result);
  });
});
```

- Via curl, faites de nouveaux des requêtes sur ce endpoint. Vous allez à présent récupérer un nouveau `span` dans une transaction utilisateur, représentant le temps d'exécution de la requête.
