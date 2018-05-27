# Step 7 - APM

And what if we monitor our NodeJS server now? We will use the APM feature of the Elastic stack

* Start docker-compose without the back
* Start the back with nodemon in order to have hot reload

```shell
nodemon run start
```

* Go the the home page of kibana in order to see how we can enable APM
* Configure the APM server and start it
* Launch the APM server

```shell
bin/apm-server -e -c config/apm/apm-server.yml
```

* Open kibana and check the available dashboards
* Install the NPM dependency
* Add the setup code in the Express serveur
* Show the result in Kibana
* Add a addFilter with a console.log of the payload
* Add nested call to the weather endpoint in order to see multiple spans in a transactions
* Add a custom span with just a simple sleep

## Next step

Look at [step4 Security](https://github.com/Gillespie59/devoxx-universite-elastic/tree/master/step4)
