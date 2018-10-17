author: Emmanuel DEMEY et David Pilato
summary: Un concentrateur de logs avec la suite Elastic
id: elastic-codelab

# Codelab Elastic

Prérequis:

- Vagrant et Virtual Box

## Elasticsearch

Positive
: Voici la documentation utile pour cette étape

- [Documentation d'Elasticsearch](https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html)
- [Université à Devoxx France](https://www.youtube.com/watch?v=0J5Xt5CCQhQ)

### Installation

Nous vous fournissons un environnement complet afin de tester la suite Elastic. Veuillez suivre les étapes suivantes afin de la démarrer:

```shell
git clone https://github.com/Gillespie59/vagrant-elastic-stack -b devfest-nantes
cd vagrant-elastic-stack
vagrant up
vagrant ssh
/elastic-stack/all.sh
```

Si vous n'avez ni Vagrant ni Ansible, vous pouvez utiliser l'image OVA fournie via clé USB.

- Chargez le fichier OVA dans VirtualBox, et assurez vous d'avoir 3GB de RAM disponible. (File -> Import Appliance... -> Select the file and start it)
- Connectez vous à l'instance en utilisant le login/password `vagrant/vagrant` dans Virtual Box
- Ou utilisez SSH avec le même login/passowrd

  - Windows: Utilisez http://www.putty.org et connectez vous à vagrant@127.0.0.1 sur le port 2222.
  - Mac and Linux: $ ssh vagrant@127.0.0.1 -p 2222 -o PreferredAuthentications=password

### Manipulation d'Elasticsearch

- Une fois l'environnement installé, Kibana sera accessible à l'URL [http://localhost:5601](http://localhost:5601)

- Nous allons à présent manipuler pour la premiére fois Elasticsearch. Depuis les [Devtools de Kibana](<http://localhost:5601/app/kibana#/dev_tools/console?_g=()>), exécutez les commandes suivantes :

```js
// Pour vérifier la disponibilité du cluster
GET /

// Pour lister les indexes
GET /_cat/indices?v

// Indexer son premier document
PUT /movies/_doc/1
{
  "title": "The Godfather",
  "director": "Francis Ford Coppola",
  "year": 1972
}

// Récupérer un document
GET /movies/_doc/1

// Voir le mapping généré
GET /movies/_mapping

// Mettre à jour un document
PUT /movies/_doc/1
{
  "title": "The Godfather",
  "director": "Francis Ford Coppola",
  "year": 1972,
  "genres": ["Crime", "Drama"]
}
GET /movies/_doc/1

// Indexation de documents supplémentaires
PUT /movies/_doc/2
{
  "title": "Lawrence of Arabia",
  "director": "David Lean",
  "year": 1962,
  "genres": ["Adventure", "Biography", "Drama"]
}
PUT /movies/_doc/3
{
  "title": "Apocalypse Now",
  "director": "Francis Ford Coppola",
  "year": 1979,
  "genres": ["Drama", "War"]
}

// Faire une recherche
POST /movies/_search
{
    "query": {
        "query_string": {
            "query": "ford"
        }
    }
}

// Ajouter un filtre
POST /movies/_search
{
  "query": {
    "bool": {
      "filter": {
        "term": {
          "year": 1972
        }
      }
    }
  }
}

// Supprimer les données
DELETE /movies
GET /movies/_doc/1
```
