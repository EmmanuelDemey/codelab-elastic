## Security

Positive
: Voici la documentation utile pour cette étape
  * [Documentation sur la Sécurité](https://www.elastic.co/guide/en/x-pack/current/security-getting-started.html) 

Nous allons à présent ajouter un peu de sécurité à notre cluster

- Premièrement, modifiez l'image Docker afin d'utiliser celle avec XPack activé
- Ajoutez le variable d'environnement nécessaire pour le password de l'utilisateur **Elasticsearch** (utilisez `changeme` celui utilisé par défaut dans Kibana)

```shell
environment:
      - ELASTIC_PASSWORD=changeme
```

- Connectez vous à Kibana et allez jeter un coup d'oeil à la page de gestion de la sécurité
- Dans la page `Devtools panel`, indexez un document simple, qui nous sera utile par la suite lorsque nous allons présenter la fonctionnalité de _fields filtering_

```shell
POST codelab/_doc/1
{
  "firstName": "Manu",
  "secret": "xxxxx"
}
```

- Créez un simple dashboard avec une _saved search_

- Créez un utilisateur `manu` avec le rôle `kibana_dashboard_only`

- Connectez vous avec ce nouveau compte, et vérifiez que vous n'avez accès que à ce dashboard. Mais vous n'avez pas les données...page... But we have no data :(

- Créez un rôle `codelab-reader` avec les droits `read write` sur l'index `codelab` et supprimez l'accés au champs `secret` pour les utilisateur ayant ce rôle
- Vérifiez que le rôle a bien été crée, en exécutant la requête suivante :

```shell
GET /_xpack/security/role
```

- Assignez ce rôle à l'utilisateur `manu`

- Connectez vous de nouveau avec ce compte, et vous devriez avoir accès aux données à présent.

- Ajoutez un champ `lastName` au document, votre utilisateur n'y accedera pas.

- Récupérez le rôle via l'API REST

'''shell
GET /\_xpack/security/role
'''

- Ajoutez le champ `lastName` à cette configuration

```shell
POST /_xpack/security/role/codelab-reader
{
    "cluster": [],
    "indices": [
      {
        "names": [
          "codelab_indices"
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

- L'utilisateur `manu` devrait avoir accès à ce champ à présent.

### Étape suivante

[Alerting](https://github.com/Gillespie59/codelab-elastic/tree/nightclazz/step6)
