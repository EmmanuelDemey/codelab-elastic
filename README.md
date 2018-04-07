# Step 0

Our application is based on a Front application (Angular) and a NodeJS REST API.

In order to launch the demo app, you should run the following command

```shell
git clone https://github.com/Gillespie59/devoxx-universite-elastic
cd devoxx-universite-elastic
docker-compose up
```

We have many routes :

* GET http://localhost:8080/rest/products
* GET http://localhost:8080/rest/fake/url returning 404
* GET http://localhost:8080/rest/long/task returing 200 after 5s
* GET http://localhost:8080/rest/weather calling an external service

## Next step

Look at [branch step1-setup-elaticsearch-kibana](https://github.com/Gillespie59/devoxx-universite-elastic/tree/step1-setup-elaticsearch-kibana)
