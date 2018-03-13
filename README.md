# devoxx-universite-elastic

## Plan

- Slides : Présentation très succincte de la stack

Tiens j'ai une application qui n'est pas monitorée, sur laquelle nous avons beaucoup de problèmes. peux tu m'aider à mettre en place un concentrateur de logs ?
- Démo : Présenter l'application que nous allons monitorer : Back en NodeJS + un Front servi par un Nginx. Tout dans du Docker

Tres bien. Commençons par indexer les logs dans Elasticsearch. 
- Slides : Présentation de filebeat avec le module nginx + Elasticsearch et les Ingest Nodes
- Démo 

Pouvons nous faire la même chose avec le backend?
- Slides : Filebeat -> Logstash -> Elasticsearch 
     - Parler de l'intérêt de Logstash par rapport aux Ingest Nodes
     - Parler des types que nous devons plus utiliser
     - Parler des pipelines dans Logstash
- Démo 

Bon c'est bien. Tout est dans Elasticsearch, mais ce n'est pas pratique pour visualiser mes logs
- Slides : Présentation de Kibana
- Démo : Ajout du dashboard prédéfini pour Nginx

Mais là, tout le monde y a à accès ?
- Slides : Présentation de la partie sécurité
- Démo

Pouvons nous indexer d'autres informations, comme les métrics de mon OS
- Slides : presentation de metric beat
- Démo
- Slides présentation d'APM
- Démo

Ah c'est cool. Cela me fait penser a un nouveau use case. Est ce que je peux être alerter par mail, lorsqu'une requête prend plus de 5s a s'executer ?
- Slides : Présentation de la partie Alerting
- Demo

Trés bien. J'ai mon cluster "chez moi". Est il possible de l'héberger dans le cloud ?
- Slides : Présentation de Cloud/ECE 
- Démo

- Slides : Schéma récapitulatif de notre archi  et des produits que nous aurions peut être pas aborder (Swiftype, ...). Indiquer que le code de XPack est maintenant ouvert
