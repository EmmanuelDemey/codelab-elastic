## Kibana

Positive
: Voici la documentation utile pour cette étape

- [Documentation de Kibana](https://www.elastic.co/guide/en/kibana/current/index.html)

* Nous allons à présent indexer d'autres données afin d'aborder d'autres fonctionnalités d'Elasticsearch et également créer nos premières visualisations dans Kibana.

```js
//Dans la machine virtuelle que vous avez démarré précédemment
$ java -jar /opt/injector.jar 100000 1000

// Vérifier que l'index a été créé
GET _cat/indices?v

// Faire une recherche par la propriété country
GET /person/_search
{
  "query": {
    "match": {
      "address.country": "Germany"
    }
  }
}

// Faire une recherche par les propriétés country et dateOfBirth
GET /person/_search
{
  "query": {
    "bool": {
      "must": [
        {
          "match": {
            "address.country": "Germany"
          }
        },
        {
          "range": {
            "dateOfBirth": {
              "from": "1970",
              "to": "1971"
            }
          }
        }
      ]
    }
  }
}

// Réaliser une aggregation, afin d'avoir une répartition par la propriété country
GET /person/_search
{
  "size": 0,
  "aggs": {
    "by_country": {
      "terms": {
        "field": "address.country.aggs"
      }
    }
  }
}
```

- Nous allons à présent utiliser Kibana pour créer nos propres visualisations et dashboards

  - Ajouter l'index `person` dans la partie d'Administration de Kibana
  - Visualiser les données via la page `Discover`
  - Voici des exemples de visualisations que vous pouvez créer;
    - un `Vertical bar` avec une aggrégation de type `date histogram` en utilisant la propriété `dateOfBirth`
    - un `Pie chart` sur le sexe
    - un `Pie chart` sur le pays, puis sur la ville
    - une `Tile map`
  - Combiner toutes ces nouvelles visualisation dans un dashboard

- Depuis l'interface, activez le Monitoring pour Elasticsearch. Par la suite, nous l'activerons également pour l'ensemble de la suite Elastic. Vous pouvez visualiser les dashboards de Monitoring, visitez la page [http://localhost:5601/app/monitoring#/overview](http://localhost:5601/app/monitoring#/overview)

