# Step 2 - Monitor our Docker images

We will add now the last beat of the day : Metricbeat for Docker containers

* Download Metricbeat

```shell
curl -L -O https://artifacts.elastic.co/downloads/beats/metricbeat/metricbeat-6.2.3-darwin-x86_64.tar.gz
tar xzvf metricbeat-6.2.3-darwin-x86_64.tar.gz
```

* Create the `config/metricbeat/metricbeat.yml` configuration file based on this default configuration file : https://github.com/elastic/beats/blob/master/metricbeat/metricbeat.yml

* Change the default configuration file ;
  * We will monitor only informations about our Docker images

```shell
metricbeat.modules:
- module: docker
  metricsets: ["container", "cpu", "diskio", "healthcheck", "info", "memory", "network"]
  hosts: ["unix:///var/run/docker.sock"]
  period: 10s
```

* Metricbeat should automatically create Kibana dashboards
* Metricbeat should send the data directly to Elasticsearch

In order to start Metricbeat, you should execut the following commands :

```shell
sudo chown root config/metricbeat/metricbeat.yml
sudo bin/metricbeat -e -c config/metricbeat/metricbeat.yml
```

* Open Kibana and you should have access again to new dashboards

## Next step

Look at [step3 APM](https://github.com/Gillespie59/devoxx-universite-elastic/tree/master/step3)
