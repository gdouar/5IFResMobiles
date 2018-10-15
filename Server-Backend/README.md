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
- Eventuellement créer un compte administrateur si aucun n'est déjà en place
- Créer une base de données "connectme" (SANS majuscules)
- Exécuter le SQL du fichier Server-Backend\dbcreation.sql. En fonction des paramètres par défaut de MySQL, la clé étrangère pourra ne pas être bien générée, il faut alors la créer à la main depuis l'onglet Structure.
- Alimenter la base de données via le dataset de test (fichier SQL du sous-répertoire dataset5ifMobile\result.sql à exécuter dans phpmyadmin en ayant la bonne base sélectionnée)

### Etape 4 : Accéder aux services Web
- Démarrer les services Apache et MySQL.  
- Le chemin d'accès aux ressources dépend de la base du répertoire Apache. Au besoin, vous pouvez consulter celui-ci dans le fichier de configuration httpd.conf du serveur Apache (directive `DocumentRoot`). Pour les tests il est conseillé d'utiliser [Postman](https://www.getpostman.com/) qui permet de sauvegarder des requêtes.
