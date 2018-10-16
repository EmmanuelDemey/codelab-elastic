## Metricbeat

Positive
: Voici la documentation utile pour cette étape

- [Documentation de MetricBeat](https://www.elastic.co/guide/en/beats/metricbeat/current/index.html)

Nous allons à présent activer **MetricBeat** afin d'indexer des métriques de notre infrastructure.

Afin de configurer MetricBeat, vous devez modifier le fichier disponible dans l'image fournie : `/etc/metricbeat/metricbeat.yml`

- Faites les modifications nécessaires pour activer `Metricbeat`:
  - Activer la sortie Elasticsearch
  - Configurer la connexion avec Kibana
  - Activer les modules suivants et recolter les métrics spécifiées:
    - module `system` avec les métriques `cpu`, `memory` et `diskio`
    - module `elasticsearch` avec les métriques `node` et `node_stats`
    - module `kibana` avec la métrique `status`
    - module `mongo` avec les métriques `dbstats` et `status`
    - module `nginx` avec la métrique `stubstatus`
  - Activer le monitoring, afin de monitorer vos agents `Metricbeat` (paramètre `xpack.monitoring.enabled`)

* Démarrer Metricbeat :

```
cd /elastic-stack
ansible-playbook 4_configure-metricbeat.yml
```

- Visualiser les données depuis Kibana, ainsi que les dashboards automatiquement créés.
