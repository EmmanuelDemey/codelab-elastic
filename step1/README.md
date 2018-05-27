# Step 2 - Add Packetbeat

We will now add Packetbeat to our plateform.

* Download Packetbeat

```shell
curl -L -O https://artifacts.elastic.co/downloads/beats/packetbeat/packetbeat-6.2.3-darwin-x86_64.tar.gz
tar xzvf packetbeat-6.2.3-darwin-x86_64.tar.gz
```

* Create the packetbeat.yml configuration file

In order to start Packetbeat, you should executed the following commands :

```shell
docker-compose up
sudo chown root config/packetbeat/packetbeat.yml
sudo bin/packetbeat -e -c config/packetbeat/packetbeat.yml
```

* You can now have a look to the HTTP dashboard

  * Explain Overview and Web Transactions Dashbaord
  * Show the vizualisations and searches
  * Show the filter feature
  * Autorefresh
  * Date Picker
  * Filter on a dashboard and check the result in the Discover Panel
  * Show the template that has been created

* Extra:
  * Explain that everything in Kibana are just Elastic documents : Dashboard, Visualizations,...

## Next step

Look at [step 2 Metric Beat](https://github.com/Gillespie59/devoxx-universite-elastic/tree/master/step2)
