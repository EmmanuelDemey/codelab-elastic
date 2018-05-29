# Step 1 - Add Packetbeat

We will now add Packetbeat to our plateform.

* Download Packetbeat

```shell
curl -L -O https://artifacts.elastic.co/downloads/beats/packetbeat/packetbeat-6.2.3-darwin-x86_64.tar.gz
tar xzvf packetbeat-6.2.3-darwin-x86_64.tar.gz
```

* Create the `config/packetbeat/packetbeat.yml` configuration file based on this default configuration file : https://github.com/elastic/beats/blob/master/packetbeat/packetbeat.yml

* Change the default configuration file ;

  * in order to listen only the 80, 8080 and 9200 ports
  * packetbeat should automatically create Kibana dashboards
  * Packetbeat should send the data directly to Elasticsearch

* You can noz execute Packetbeat and start indexing network data.

```shell
sudo chown root config/packetbeat/packetbeat.yml
sudo bin/packetbeat -e -c config/packetbeat/packetbeat.yml
```

* You can now have a look to the HTTP dashboard automatically created by Packetbeat

## Next step

Look at [step 2 Metric Beat](https://github.com/Gillespie59/devoxx-universite-elastic/tree/master/step2)
