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

Nous vous fournissons un environnement complet afin de tester la suite Elastic. Veuillez suivre les étapes suivantes: 

```shell
git clone https://github.com/dadoonet/vagrant-elastic-stack -b devfest-nantes
cd vagrant-elastic-stack
vagrant up
vagrant ssh
/elastic-stack/all.sh
```

- Une fois l'environnement installé, Kibana sera accessible via l'URL [http://localhost:5601](http://localhost:5601)

### Étape suivante

[FileBeat](https://github.com/Gillespie59/codelab-elastic/tree/nightclazz/step1)
