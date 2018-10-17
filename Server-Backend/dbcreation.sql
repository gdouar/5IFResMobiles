CREATE TABLE Reseaux(
    IdReseau INTEGER PRIMARY KEY AUTO_INCREMENT, 
    SSID VARCHAR(32),
    Type VARCHAR(50)
 );
 
 CREATE TABLE Mesures(
   IdMesure INTEGER PRIMARY KEY AUTO_INCREMENT,
   Latitude FLOAT,
   Longitude FLOAT,
   DateMesure DATE,
   BandePassante FLOAT,
   ForceSignal INTEGER,
   IdReseau INTEGER
  );

ALTER TABLE `Mesures` ADD INDEX(`IdReseau`);

ALTER TABLE `Mesures` ADD CONSTRAINT `fk_MesureReseaux` FOREIGN KEY (`IdReseau`) REFERENCES `Reseaux`(`IdReseau`) ON DELETE CASCADE ON UPDATE CASCADE;