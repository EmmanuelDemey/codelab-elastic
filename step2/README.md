## Packetbeat

Positive
: Voici la documentation utile pour cette étape
  * [Documentation de PacketBeat](https://www.elastic.co/guide/en/beats/packetbeat/current/index.html) 

Il est à présent temps d'ajouter **PacketBeat** à notre plateforme.

- Téléchargez Packetbeat

```shell
curl -L -O https://artifacts.elastic.co/downloads/beats/packetbeat/packetbeat-6.2.3-darwin-x86_64.tar.gz
tar xzvf packetbeat-6.2.3-darwin-x86_64.tar.gz
```

- Créez un fichier de configuration `config/packetbeat/packetbeat.yml` basé sur ce template: [https://github.com/elastic/beats/blob/master/packetbeat/packetbeat.yml](https://github.com/elastic/beats/blob/master/packetbeat/packetbeat.yml)

- Modifiez le fichier de configuration, afin de respecter les règles ci-dessous:

  - vous souhaitez monitorer les requêtes sur les ports `80`, `8080` et `9200`
  - PacketBeat doit genérer les dashboards Kibana nécessaires
  - Packetbeat doit envoyer les données à votre cluster Elasticsearch

- Vous pouvez à présent lancer PacketBeat et indexer vos nouvelles données.

```shell
sudo chown root config/packetbeat/packetbeat.yml
sudo bin/packetbeat -e -c config/packetbeat/packetbeat.yml
```

- Depuis Kibana, vous devriez avoir accès à de nouveaux dashboards, notamment celui permettant de monitorer les requêtes HTTP.

### Étape suivante

[MetricBeat](https://github.com/Gillespie59/codelab-elastic/tree/nightclazz/step3)
