## Alerting

Positive
: Voici la documentation utile pour cette étape
  * [Documentation sur l'Alerting](https://www.elastic.co/guide/en/x-pack/current/watcher-getting-started.html) 

Pour finir, nous allons mettre en place la solution d'alerting. Nous allons émettre des alertes, si nous recevons moins de 10 requêtes dans les dernières 5 minutes.

- Ajoutez username/password dans le fichier de configuration de **Filebeat**

```
setup.kibana:
  host: "localhost:5601"
  username: "elastic"
  password: "changeme"
```

- Dans la partie d'administration de Kibana, ajoutez un _watcher_. Pour ce codelab, nous allons émettre l'alerte dans la console d'Elasticsearch

  - Nous n'allons pas créer un watcher via l'API REST. Nous allons utiliser l'interface dédiée (threshold watch)
    - Nommez ce watcher `codelab`
    - Ce watcher doit manipuler les indexes `filebeat-*`.
    - Si nous avons moins de 10 requêtes dans les dernières 5 minutes, nous désirons alerter avec le message :"Votre site n'a pas beaucoup de visiteurs (XXX)", avec XXX le nombre de visites

- Visualisez la page d'historique du watcher

- Depuis les Devtools, exécutez les commandes suivantes

```shell
GET _xpack/watcher/watch/<ID of the watcher>

GET .watcher-history*/_search?pretty
{
  "query": {
            "match": {
              "metadata.name": "codelab"
            }
          }

}
```

- Dans un dashboard, créez un compteur afin de visualiser le nombre d'alertes émises
