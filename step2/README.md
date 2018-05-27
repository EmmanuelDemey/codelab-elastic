# Step 6 - Monitor our Docke images

We will add now the last beat of the day : Metricbeat for for Docker containers

* Download Metricbeat

```shell
curl -L -O https://artifacts.elastic.co/downloads/beats/metricbeat/metricbeat-6.2.3-darwin-x86_64.tar.gz
tar xzvf metricbeat-6.2.3-darwin-x86_64.tar.gz
```

* Create the metricbeat.yml configuration file

In order to start you should executed the following commands :

```shell
docker-compose up
sudo chown root config/metricbeat/metricbeat.yml
sudo bin/metricbeat -e -c config/metricbeat/metricbeat.yml
```

With the following configuration

```yml
metricbeat.modules:
- module: docker
  metricsets: ["container", "cpu", "diskio", "healthcheck", "info", "memory", "network"]
  hosts: ["unix:///var/run/docker.sock"]
  period: 10s
```

* Open Kibana and present the differents dashboards

## Next step

Look at [step3 APM](https://github.com/Gillespie59/devoxx-universite-elastic/tree/master/step3)
