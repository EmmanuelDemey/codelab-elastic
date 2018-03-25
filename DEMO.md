# Step 0

In order to launch the demo app, you should run the following command

```shell
docker-compose up
```

We have many routes :

* GET http://localhost:8080/rest/products
* GET http://localhost:8080/fake/url returing 404
* GET http://localhost:8080/long/task returing 200 after 5s
* GET http://localhost:8080/rest/weather calling an external service

# Step !

In order to setup Elasticsearch and Kibana in our project, you need to add these extra lines in your docker-compose file

```
elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:6.2.2
    ports:
        - 9200:9200
        - 9300:9300
kibana:
    image: docker.elastic.co/kibana/kibana:6.2.2
    depends_on:
        - elasticsearch
    ports:
        - 5601:5601
```

# Step 2

We can explain first the content of the packetbeat.yml file

In order to start you should executed the following commands :

```shell
sudo chown root packetbeat.yml
sudo ./packetbeat-6.2.2-darwin-x86_64/packetbeat -e -c packetbeat.yml
```
