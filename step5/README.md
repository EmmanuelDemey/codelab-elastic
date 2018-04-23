# Step 5 - Ingest our logs with Elasticsearch

In this section we will reimplement the previous logstash configuration but with the built-in ingest feature.

We will first use the simulate API.

* Ingest a message without any processors

```shell
POST _ingest/pipeline/_simulate
{
    "pipeline" : {
        "processors": []
    },
    "docs" : [{
      "_source": {
        "message": "172.18.0.1 - - [25/Mar/2018:17:07:43 +0000] \"GET / HTTP/1.1\" 304 0 \"-\" \"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36\" \"-\"\r\n"
      }

    }]
}
```

* Add the grok processor

```shell
POST _ingest/pipeline/_simulate
{
    "pipeline" : {
        "processors": [
          {
                "grok": {
                    "field": "message",
                    "patterns": ["%{IPORHOST:[nginx][access][remote_ip]} - %{DATA:[nginx][access][user_name]} \\[%{HTTPDATE:[nginx][access][time]}\\] \"%{WORD:[nginx][access][method]} %{DATA:[nginx][access][url]} HTTP/%{NUMBER:[nginx][access][http_version]}\" %{NUMBER:[nginx][access][response_code]} %{NUMBER:[nginx][access][body_sent][bytes]} \"%{DATA:[nginx][access][referrer]}\" \"%{DATA:[nginx][access][agent]}\""]
                }
            }  
        ]
    },
    "docs" : [{
      "_source": {
        "message": "172.18.0.1 - - [25/Mar/2018:17:07:43 +0000] \"GET / HTTP/1.1\" 304 0 \"-\" \"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36\" \"-\"\r\n"
      }

    }]
}
```

* Add the remove processor

```shell
POST _ingest/pipeline/_simulate
{
    "pipeline" : {
        "processors": [
          {
                "grok": {
                    "field": "message",
                    "patterns": ["%{IPORHOST:[nginx][access][remote_ip]} - %{DATA:[nginx][access][user_name]} \\[%{HTTPDATE:[nginx][access][time]}\\] \"%{WORD:[nginx][access][method]} %{DATA:[nginx][access][url]} HTTP/%{NUMBER:[nginx][access][http_version]}\" %{NUMBER:[nginx][access][response_code]} %{NUMBER:[nginx][access][body_sent][bytes]} \"%{DATA:[nginx][access][referrer]}\" \"%{DATA:[nginx][access][agent]}\""]
                },
                "remove": {
                    "field": "message"
                }
            }  
        ]
    },
    "docs" : [{
      "_source": {
        "message": "172.18.0.1 - - [25/Mar/2018:17:07:43 +0000] \"GET / HTTP/1.1\" 304 0 \"-\" \"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36\" \"-\"\r\n"
      }

    }]
}
```

* Store the pipeline in ES

```shell
PUT _ingest/pipeline/nginx
{
      "processors": [
        {
              "grok": {
                  "field": "message",
                  "patterns": ["%{IPORHOST:[nginx][access][remote_ip]} - %{DATA:[nginx][access][user_name]} \\[%{HTTPDATE:[nginx][access][time]}\\] \"%{WORD:[nginx][access][method]} %{DATA:[nginx][access][url]} HTTP/%{NUMBER:[nginx][access][http_version]}\" %{NUMBER:[nginx][access][response_code]} %{NUMBER:[nginx][access][body_sent][bytes]} \"%{DATA:[nginx][access][referrer]}\" \"%{DATA:[nginx][access][agent]}\""]
              },
              "remove": {
                  "field": "message"
              }
          }  
      ]
  }
```

* Use the previous stored pipeline when indexing a new document

```shell
PUT my-index/_doc/my-id?pipeline=nginx
{
    "message": "172.18.0.1 - - [25/Mar/2018:17:07:43 +0000] \"GET / HTTP/1.1\" 304 0 \"-\" \"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36\" \"-\"\r\n"
}
```

```shell
GET /my-index/_doc/my-id
```

* We will now enable the modules feature of Filebeat

  * change the output of filebeat to send logs directly to elasticsearch
  * disable the previous prospector
  * enable module feature

* Rerun filebeat

```shell
sudo filebeat -e -c config/filebeat/filebeat.yml -strict.perms=false
```

* Check the new generated dashboards created in Kibana

* Run the following query to check if the new template has been created

```shell
GET  /_template/packetbeat-6.2.2
```

* Finally, we will present the possibility to generate Logstash configuration file based on a Elasticsearch pipeline

```shell
bin/ingest-convert.sh --input=file:///tmp/devoxx-universite-elastic/config/ingest/pipeline.json --output=file:///tmp/devoxx-universite-elastic/conf.cfg
```

## Next step

Look at [branch step6-demo-metricbeat](https://github.com/Gillespie59/devoxx-universite-elastic/tree/step6-demo-metricbeat)
