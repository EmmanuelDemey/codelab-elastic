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
