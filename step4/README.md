## APM

Positive
: Voici la documentation utile pour cette étape
  * [Documentation de APM](https://www.elastic.co/guide/en/apm/get-started/current/index.html) 

Et si nous monitorions notre serveur NodeJS à présent. Nous allons utiliser pour cela le module **APM**

- Démarrez `docker-compose` sans le back
- Démarrez le back avec le module `nodemon` afin de bénéficier du rechargement à chaud.

```shell
nodemon run start
```

- Allez sur la page principale de Kibana afin de voir comment activer APM
- Afin de configurer APM, créez un fichier `config/apm/apm-server.yml`
- En se basant sur le fichier de base [https://github.com/elastic/apm-server/blob/master/apm-server.yml](https://github.com/elastic/apm-server/blob/master/apm-server.yml), faites les modifications nécessaires :

  - APM doit envoyer les informations à votre cluster Elasticsearch
  - APM doit créer les dashboards Kibana nécessaires

- Vous pouvez à présent démarrer le server APM

```shell
bin/apm-server -e -c config/apm/apm-server.yml
```

- Ouvrez Kibana et vérifiez la présence des nouveaux dashboards
- Installez la dépendance NPM nécessaire dans votre projet NodeJS
- Ajoutez le code nécessaire pour activer APM dans votre API REST
- Visualisez les résultats dans Kibana
- Ajoutez un appel imbriqué à l'API `/weather` afin de voir la timeline générée dans Kibana
- Créez un span custom

### Étape suivante

[Security](https://github.com/Gillespie59/codelab-elastic/tree/nightclazz/step5)
