## Metricbeat

Positive
: Voici la documentation utile pour cette étape
  * [Documentation de MetricBeat](https://www.elastic.co/guide/en/beats/metricbeat/current/index.html) 

C'est le tour du dernier Beat à mettre en place : **MetricBeat**

- Téléchargez Metricbeat

```shell
curl -L -O https://artifacts.elastic.co/downloads/beats/metricbeat/metricbeat-6.2.3-darwin-x86_64.tar.gz
tar xzvf metricbeat-6.2.3-darwin-x86_64.tar.gz
```

- Créez un fichier de configuration `config/metricbeat/metricbeat.yml` basé sur ce template: [https://github.com/elastic/beats/blob/master/metricbeat/metricbeat.yml](https://github.com/elastic/beats/blob/master/metricbeat/metricbeat.yml)

- Modifiez le fichier de configuration, afin de respecter les règles ci-dessous:

  - vous souhaitez monitorer les metriques des vos containers Docker
  - MetricBeat doit genérer les dashboards Kibana nécessaires
  - MetricBeat doit envoyer les données à votre cluster Elasticsearch

```shell
metricbeat.modules:
- module: docker
  metricsets: ["container", "cpu", "diskio", "healthcheck", "info", "memory", "network"]
  hosts: ["unix:///var/run/docker.sock"]
  period: 10s
```

- Vous pouvez à présent lancer MetricBeat

```shell
sudo chown root config/metricbeat/metricbeat.yml
sudo bin/metricbeat -e -c config/metricbeat/metricbeat.yml
```

- Vos container sont à présent monitorés, et vous accédez aux données indéxées depuis Kibana

### Étape suivante

[APM](https://github.com/Gillespie59/codelab-elastic/tree/nightclazz/step4)
