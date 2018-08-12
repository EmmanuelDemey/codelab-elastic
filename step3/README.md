## APM

And what if we monitor our NodeJS server now? We will use the APM features of the Elastic stack

- Start docker-compose without the back
- Start the back with nodemon in order to have the hot reload feature.

```shell
nodemon run start
```

- Go the the home page of kibana in order to see how we can enable APM
- In order to configure APM, create a file `config/apm/apm-server.yml`
- Based on this default configuration file (https://github.com/elastic/apm-server/blob/master/apm-server.yml), make the necessary changes
  - APM should send information to Elasticsearch
  - APM should automatically create Kibana dashboards
- Launch the APM server

```shell
bin/apm-server -e -c config/apm/apm-server.yml
```

- Open Kibana and check the available dashboards
- Install the NPM dependency into the NodeJS API REST server.
- Add the setup code in the Express server
- Show the result in Kibana
- Add nested call to the weather endpoint in order to see multiple spans in a transaction
- Add a custom span with just a simple sleep

### Next step

Look at [step4 Security](https://github.com/Gillespie59/devoxx-universite-elastic/tree/master/step4)
