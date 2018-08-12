## Alerting

We will now add alerts in our plateform. We will send alerts if we have less than 10 requests in the last 5 mn .

- Add username/password to the filebeat configuration file

```
setup.kibana:
  host: "localhost:5601"
  username: "elastic"
  password: "changeme"
```

- In the admin part of Kibana, add a watcher. For the demo, we will only send a log message to the console

  - We won't create the Watcher thanks to an HTTP request. We will use the dedicated Kibana UI (threshold watch)
    - Name this watcher `nightclazz`
    - This watcher should use index pattern `filebeat-*`.
    - If we have less than 10 requests in the last 5mn, we should logs this message : Votre site n'a pas beaucoup de visiteurs (XXX), with XXX the number of visits

- Have a look the History page of a watcher.

- From the Devtools, execute the following request

```
GET _xpack/watcher/watch/<ID of the watcher>

GET .watcher-history*/_search?pretty
{
  "query": {
            "match": {
              "metadata.name": "nightclazz"
            }
          }

}
```

- Create a quick Counter in order to show the number of alerts.
