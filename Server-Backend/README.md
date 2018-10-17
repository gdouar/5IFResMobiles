
# ConnectMe - Backend #
##  Installation
### Etape 1 : Téléchargement des outils

- Se procurer un logiciel contenant la suite Apache/MySQL/PHP tel que [XAMPP](https://www.apachefriends.org/fr/index.html) (windows), [LAMPP](https://doc.ubuntu-fr.org/lamp) (Linux) ou [MAMPP](https://www.mamp.info/en/) (Mac), puis l'installer.  Attention, la version minimale de PHP requise est la 7.1, assurez vous de télécharger la dernière version proposée.
- Télécharger le gestionnaire de paquets PHP [Composer](https://getcomposer.org/) pour l'OS adéquat, puis l'installer

### Etape 2 : Mise en place du serveur Web et de l'environnement

- Créer un dossier dans le répertoire associé aux ressources du serveur Web (ex : C:\xampp\htdocs pour xampp). 
- Cloner le projet git dans ce répertoire (`git init` puis `git clone https://github.com/gdouar/5IFResMobiles`)
- Se placer dans le sous-répertoire "Server-Backend" puis lancer la commande `composer install` pour installer toutes les dépendances

### Etape 3 : Initialisation de la base de données
- Démarrer les services Apache et MySQL.  
- Accéder à l'URL  `http://localhost/phpmyadmin`
- Eventuellement créer un compte administrateur si aucun n'est déjà en place. 
- Créer une base de données "connectme" (SANS majuscules)
- Exécuter le SQL du fichier Server-Backend\dbcreation.sql. En fonction des paramètres par défaut de MySQL, la clé étrangère pourra ne pas être bien générée, vous pouvez alors la créer à la main depuis l'onglet Structure.
- Alimenter la base de données via le dataset de test (fichier SQL du sous-répertoire dataset5ifMobile\result.sql à exécuter dans phpmyadmin en ayant la bonne base de sélectionnée)
- Créer un autre compte utilisateur servant à l'application pour accéder à la base. Bien cocher la case "Accorder tous les privilèges à un nom passe-partout (utilisateur\_%)." et tous les privilèges possibles lors de la création de cet utilisateur.

Julien :
- Renseigner correctement les informations de connexion à la base de données dans le fichier .env (si celui-ci n'existe pas, le créer sur le modèle de .env.dist)

Lucas :
- Dans le fichier .env à la racine du backend : commenter la ligne commençant par DATABASE_URL
- Dans le fichier "config/packages/doctrine.yaml" : 
  - vérifier que la version de la base de données est la bonne (on peut la voir à droite dans l'écran d'accueil de phpmyadmin). Si vous utilisez mariaDB (lol) il faut préfixer le numéro de version par `mariadb-`
  - ajouter les paramètres suivants : `host: 'localhost'`, `port: '3306'`, `dbname: 'connectme'`, `user: '<votre_user>'`, `password: '<votre_password>'` sous l'élément `dbal`
  - vérifier que ce fichier est bien gitignored
### Etape 4 : Accéder aux services Web
- Démarrer les services Apache et MySQL.  
- Le chemin d'accès aux ressources dépend de la base du répertoire Apache. Au besoin, vous pouvez consulter celui-ci dans le fichier de configuration httpd.conf du serveur Apache (directive `DocumentRoot`). Pour les tests il est conseillé d'utiliser [Postman](https://www.getpostman.com/) qui permet de sauvegarder des requêtes.

##  Développement 
Le framework utilisé côté backend est Symfony version 4. La documentation se trouve [ici](https://symfony.com/doc/current/index.html#gsc.tab=0)

## Doc
### Points d'API (pour l'instant)
* /createNetwork (nécessite les paramètres _ssid_ et _type_)
* /createMeasure (nécessite les paramètres _reseau_, _bande_passante_, _force_, _lat_ et _lon_)
* /getAllNetworks
* /getAllMeasures