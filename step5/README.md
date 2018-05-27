# Step 9 - Alerting

We will now add alerts in our plateform. We will send alerts if we have less than 10 request in the last 5 mn .

* Add username/password to filebeat (kibana option)

'''
setup.kibana:
host: "localhost:5601"
username: "elastic"
password: "changeme"
'''

* Add username/password to Logstash

```shell
elasticsearch {
      hosts => ["localhost:9200"]
      user => elastic
      password => changeme
  }
```

* In the admin part, add the watcher. For the demo, we will only send a log
* Display log for the Elasticsearch cluster

```
docker-compose logs -f elasticsearch
```

* In order to see the payload of a watcher, use first this log and have a look to the logs

```
Votre site n'a pas beaucoup de visiteurs ({{ctx}})
```

* Show the History page of a watcher.

* From the Devtools, execute the following request

```
GET _xpack/watcher/watch/<ID of the watcher>

GET .watcher-history*/_search?pretty
{
  "query": {
            "match": {
              "metadata.name": "devoxx"
            }
          }

}
```

* Create a quick Counter in order to show the number of alerts.
