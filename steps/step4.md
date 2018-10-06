## Packetbeat

Positive
: Voici la documentation utile pour cette étape
  * [Documentation de PacketBeat](https://www.elastic.co/guide/en/beats/packetbeat/current/index.html) 

Nous allons à présent activer **Packetbeat** afin d'indexer les requêtes utilisant certains protocoles. 

Afin de configurer Packetbeat, vous devez modifier le fichier disponible dans l'image fournie ; `/etc/packetbeat/packetbeat.yml`

- Faites les modifications nécessaires pour activer `Packetbeat` dans notre solution:
  - Activer la sortie Elasticsearch
  - Configurer la connexion avec Kibana
  - Nous souhaitons monitorer les ports HTTP 80 (Nginx) et 5601 (Kibana)
  - Activer également le protocole mongodb (port 27017)
  - Activer le monitoring, afin de monitorer vos agents `Packetbeat` (paramètre `xpack.monitoring.enabled`)

- Pour simuler des requêtes Mongo, vous pouvez executer le script suivant 
```shell
/elastic-stack
mongo mongodb.js
```

- Démarrer Packetbeat :
```
cd /elastic-stack
ansible-playbook 4_configure-packetbeat.yml
```
- Visualiser les données depuis Kibana, ainsi que les dashboards automatiquement crées pour pour les requêtes HTTP.  

### Étape suivante

[MetricBeat](https://github.com/Gillespie59/codelab-elastic/tree/devfest-nantes/steps/step4.md)
