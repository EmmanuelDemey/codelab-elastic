# Step 1 - Setup Elasticsearch and Kibana

* Stop the previous docker-compose

* In order to setup Elasticsearch and Kibana in our project, you need to add these extra lines in your docker-compose file

```yml
elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch-platinum:6.2.3
    environment:
      - xpack.security.enabled=false
    ports:
        - 9200:9200
        - 9300:9300
kibana:
    image: docker.elastic.co/kibana/kibana:6.2.3
    depends_on:
        - elasticsearch
    ports:
        - 5601:5601
```

* Run the following command

```shell
docker-compose up
```

* Have a look to the response of GET http://localhost:9200 to check if the cluster is UP

* Index a simple document, and check you retrieve this document in a search:

```shell
DELETE cars
PUT cars/_doc/1
{
  "model": "c3",
  "manufacturer": "Citroen"
}
# Index many of them
POST cars/_doc
{
  "model": "c3",
  "manufacturer": "Citroen"
}
# Index many of them
POST cars/_doc
{
  "model": "zoe",
  "manufacturer": "Renault"
}
GET cars/_doc/1
GET cars/_search?q=citroen
GET cars/_search
{
  "query": {
    "match": {
      "manufacturer": "citroen"
    }
  }
}
GET cars/_doc/_search
{
  "size": 0,
  "aggs" : {
    "manufacturers_aggs" : {
      "terms" : {
        "field" : "manufacturer.keyword"
      }
    }
  }
}
```

* Index 1m documents with:

```sh
# Get the injector if not downloaded yet
wget https://download.elastic.co/workshops/basic-kibana/injector/injector-6.0.jar
# Insert 1m persons randomly generated
java -jar injector-6.0.jar 1000000 10000
```

* Open Kibana and show the basic features:

  * Search
  * Visualizations
  * Dashboard

* Import the pre-built dashboard available in `config/kibana` dir and open it.

## Next step

Look at [branch step2-demo-packetbeat](https://github.com/Gillespie59/devoxx-universite-elastic/tree/step2-demo-packetbeat)
