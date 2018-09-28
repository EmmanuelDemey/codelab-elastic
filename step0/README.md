author: Emmanuel DEMEY et David Pilato
summary: Un concentrateur de logs avec la suite Elastic
id: elastic-codelab

# Codelab Elastic

Prérequis: 
- Vagrant et Virtual Box

## Elasticsearch et Kibana

Positive
: Voici la documentation utile pour cette étape
  * [Documentation d'Elasticsearch](https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html) 
  * [Documentation de Kibana](https://www.elastic.co/guide/en/kibana/current/index.html)
  * [Université à Devoxx France](https://www.youtube.com/watch?v=0J5Xt5CCQhQ)

Notre application est basée sur une application Front Angular et une API REST NodeJS.

- Dans le but de lancer notre application de démo, vous devez exécuter la commande suivante

```shell
git clone https://github.com/Gillespie59/codelab-elastic -b nightclazz
cd codelab-elastic/step0
docker-compose up
```

- Dans votre navigateur, visitez la page [http://localhost](http://localhost) afin de vérifier que l'application est disponible

- Vous pouvez également accéder à l'API REST. Voici les différents endpoints :

  - GET [http://localhost:8080/rest/products](http://localhost:8080/rest/products)
  - GET [http://localhost:8080/rest/fake/url](http://localhost:8080/rest/fake/url) retourne une `404`
  - GET [http://localhost:8080/rest/long/task](http://localhost:8080/rest/long/task) retourne un `200` après 5 secondes
  - GET [http://localhost:8080/rest/weather](http://localhost:8080/rest/weather) qui appelle un service externe.

- Dans le fichier `docker-compose`, nous avons également défini le nécessaire pour notre concentrateur de logs.
  - Jetez un coup d'oeil à la réponse HTTP retournée par la requête de type `GET` sur le endpoint [http://localhost:9200](http://localhost:9200) pour vérifier que Elasticsearch est bien démarré
  - Allez sur [http://localhost:5601](http://localhost:5601) pour accéder à l'interface graphique de Kibana

Les logs qui seront par la suite indexés dans Elasticsearch se trouveront dans le répertoire `nginxlogs`.

### Étape suivante

[FileBeat](https://github.com/Gillespie59/codelab-elastic/tree/nightclazz/step1)
