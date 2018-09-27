## FileBeat

Positive
: Voici la documentation utile pour cette étape
  * [Documentation de FileBeat](https://www.elastic.co/guide/en/beats/filebeat/current/index.html) 

Nous allons à présent activer **Filebeat** afin d'indexer et visualiser les logs générés par **NGINX**.

- Télécharger Filebeat

```shell
curl -L -O https://artifacts.elastic.co/downloads/beats/filebeat/filebeat-6.2.3-darwin-x86_64.tar.gz
tar xzvf filebeat-6.2.3-darwin-x86_64.tar.gz
```

- Créer un fichier de configuration `config/packetbeat/filebeat.yml` basé sur ce template: [https://github.com/elastic/beats/blob/master/filebeat/filebeat.yml](https://github.com/elastic/beats/blob/master/filebeat/filebeat.yml)

- Modifiez le fichier de configuration, afin de respecter les règles ci-dessous:

  - vous devez indexer les logs de type Nginx générée par notre application
  - Filebeat doit genérer les dashboards Kibana nécessaires
  - Filebeat doit envoyer les données à votre cluster Elasticsearch

- Afin de lancer Filebeat, vous devez exécuter la commande suivante :

```shell
sudo bin/filebeat -e -c config/filebeat/filebeat.yml -strict.perms=false
```

- Vous devez à présent avoir accés à de nouveaux dashboards Kibana. Afin d'indexer de nouvelles données, vous pouvez simuler des visiteurs sur votre site :
  - Soit en rafraichissant la page depuis votre navigateur
  - Soit en utilisant un outil comme `ab` : `ab -n 100000 -c 1 http://127.0.0.1:80/index.html`

### Étape suivante

[PacketBeat](https://github.com/Gillespie59/codelab-elastic/tree/nightclazz/step2)
