# Step 0 - Our Angular / NodeJS application

Our application is based on a Front application using Angular and a NodeJS REST API.

* In order to launch the demo app, you should run the following command

```shell
git clone https://github.com/Gillespie59/devoxx-universite-elastic
cd devoxx-universite-elastic
docker-compose up
```

* Open your browser at http://localhost to check if the application is available

* You can also access to the RES API. Here are the differents URLs we have.
  * GET http://localhost:8080/rest/products
  * GET http://localhost:8080/rest/fake/url returning 404
  * GET http://localhost:8080/rest/long/task returing 200 after 5s
  * GET http://localhost:8080/rest/weather calling an external service

## Next step

Look at [step1-setup-elaticsearch-kibana](https://github.com/Gillespie59/devoxx-universite-elastic/tree/master/step1)
