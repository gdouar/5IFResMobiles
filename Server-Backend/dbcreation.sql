CREATE TABLE reseaux(
    IdReseau INTEGER PRIMARY KEY AUTO_INCREMENT, 
    SSID VARCHAR(32),
    Type VARCHAR(50)
 );
 
 CREATE TABLE mesures(
   IdMesure INTEGER PRIMARY KEY AUTO_INCREMENT,
   Latitude FLOAT,
   Longitude FLOAT,
   DateMesure DATE,
   BandePassante FLOAT,
   ForceSignal INTEGER,
   IdReseau INTEGER
  );

ALTER TABLE `mesures` ADD INDEX(`IdReseau`);

ALTER TABLE `mesures` ADD CONSTRAINT `fk_MesureReseaux` FOREIGN KEY (`IdReseau`) REFERENCES `reseaux`(`IdReseau`) ON DELETE CASCADE ON UPDATE CASCADE;