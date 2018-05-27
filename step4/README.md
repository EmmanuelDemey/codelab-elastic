# Step 4 - Add some security

We will now add some Security to our cluster

* First change the ES docker used in order to use the one with XPack enabled
* Define the environnement variable for the password used for ES (use changeme, the one used by default by Kibana)

```shell
environment:
      - ELASTIC_PASSWORD=changeme
```

* Log in to kibana and present the new securty page
* In the `Devtools panel`, index one fake document that will be used to present fields filtering

```shell
POST devoxx_indices/_doc/1
{
  "firstName": "Manu",
  "secret": "xxxxx"
}
```

* Create a simple dashboard with a saved search

* Create a user manu with the kibana dashboard only role

* Log in with this account and check if we only have access to the dashboard page... But we have no data :(

* Create a role devoxx-reader with read right on the devoxx-reader indice, and remove the secret field of each document

* Check if the role has been created

```shell
GET /_xpack/security/role
```

* Assign this role to the user manu

* Log in again and normally we should have access to the right data

* Add a lastName field to the document. Manu should not be able to see this field

* Get the role thanks to the REST API

'''shell
GET /\_xpack/security/role
'''

* Add the lastName field to the configuration

```shell
POST /_xpack/security/role/devoxx-reader
{
    "cluster": [],
    "indices": [
      {
        "names": [
          "devoxx_indices"
        ],
        "privileges": [
          "read"
        ],
        "field_security": {
          "grant": [
            "firstName",
            "lastName"
          ]
        }
      }
    ],
    "run_as": [],
    "metadata": {},
    "transient_metadata": {
      "enabled": true
    }
  }
```

* Check thanks to the Kibana UI if this modification is enabled

* Check the Kibana UI with Manu

## Next step

Look at [step5 alerting](https://github.com/Gillespie59/devoxx-universite-elastic/tree/master/step5)
