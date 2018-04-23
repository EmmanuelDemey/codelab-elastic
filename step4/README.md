# Step 4 - Parse our logs thanks to Logstash

We will now add Logstash in order to parse the log indexed by filebeat

* Before presenting Logstash, we can present also the Search Profiler tool in Kibana (using an Elasticsearch endpoint)

```shell
POST test/test/_bulk
{"index":{}}
{"name":"aaron","age":23,"hair":"brown"}
{"index":{}}
{"name":"sue","age":19,"hair":"red"}
{"index":{}}
{"name":"sally","age":19,"hair":"blonde"}
{"index":{}}
{"name":"george","age":19,"hair":"blonde"}
{"index":{}}
{"name":"fred","age":69,"hair":"blonde"}
```

```shell
{
   "query": {
      "bool": {
         "should": [
            {
               "match": {
                  "name": "fred"
               }
            },
            {
               "terms": {
                  "name": [
                      "sue",
                      "sally"
                  ]
               }
            }
         ]
      }
   },
   "aggs": {
      "stats": {
         "stats": {
            "field": "price"
         }
      }
   }
}
```

* If we copy/paste the JSON response of the Elastic API, the tool we will detect the format, and will display the UI for this JSON response. Run the following request in the console, and copy/past the response to the Search Profiler tool

```json
POST /test/_search
{
  "profile": true,
  "query": {
    "bool": {
      "should": [
        {
          "match": {
            "name": "fred"
          }
        },
        {
          "terms": {
            "name": ["emmanuel", "sally"]
          }
        }
      ]
    }
  }
}
```

* We can now present the grok debugger in Kibana with a very simple sample

```shell
172.18.0.1 the rest of the message
%{GREEDYDATA:message}
%{IP:ip} %{GREEDYDATA:message}
```

* Download Logstash (https://www.elastic.co/guide/en/logstash/current/installing-logstash.html)

* In Filebeat, the only thing we need to change is the output. We will send the document to logstash instead of elasticsearch cluster

```yml
output.logstash:
  # The Logstash hosts
  hosts: ["localhost:5044"]
```

* Rerun filebeat with the new configuration

```shell
sudo chown root config/filebeat/filebeat.yml
sudo bin/filebeat -e -c config/filebeat/filebeat.yml
```

* We will start with an easy logstash configuration file with only the beats input and elasticsearch and stdout outputs

```shell
input { beats { port => "5044" } }
output {
  elasticsearch { hosts => ["localhost:9200"] }
  stdout { codec => rubydebug }
}
```

* Run Logstash

```shell
bin/logstash -f config/logstash/logstash.conf
```

Then we will add filters :

* grok

```shell
filter {
    grok {
        match => { "message" => "%{IPORHOST:[nginx][access][remote_ip]} - %{DATA:[nginx][access][user_name]} \[%{HTTPDATE:[nginx][access][time]}\] \"%{WORD:[nginx][access][method]} %{DATA:[nginx][access][url]} HTTP/%{NUMBER:[nginx][access][http_version]}\" %{NUMBER:[nginx][access][response_code]} %{NUMBER:[nginx][access][body_sent][bytes]} \"%{DATA:[nginx][access][referrer]}\" \"%{DATA:[nginx][access][agent]}\""}
    }
}
```

* date

```shell
date {
    match => [ "[nginx][access][time]", "dd/MMM/YYYY:H:m:s Z" ]
}  
```

We will finally add a mutate filter in order to delete the original message

```shell
mutate {
    remove_field => [ "message" ]
}
```

* We will debug the result of this configuration file via the stdout output
* Check the data indexed in Elasticsearch

* As a final step, we will present how to enable/monitor pipelines directly from Kibamna
* Uncomment these few lines in the logstash.yml file

```yml
 xpack.monitoring.elasticsearch.url: "http://localhost:9200"

 xpack.management.enabled: true
 xpack.management.elasticsearch.url: "http://localhost:9200/"
 xpack.management.logstash.poll_interval: 5s
 xpack.management.pipeline.id: ["nginx"]
 xpack.management.elasticsearch.password: ""
 xpack.management.elasticsearch.username: ""
```

* Run Logstash without the -f flag

```shell
bin/logstash
```

* Create a pipeline directly from Kibana. Add a change et deploy a new version.

* Present the Monitoring UI for Logstash (And also for Elasticsearch maybe)
  In order to emulate request to our application, we can execute the following AB command

```shell
ab -n 100000 -c 1 http://127.0.0.1:80/index.html
```

## Next step

Look at [branch step5-demo-ingest](https://github.com/Gillespie59/devoxx-universite-elastic/tree/step5-demo-ingest)
