CREATE TABLE Reseaux(
    IdReseau INTEGER PRIMARY KEY, 
    SSID VARCHAR(32),
    Type VARCHAR(50)
 );
 
 CREATE TABLE Mesures(
   IdMesure INTEGER PRIMARY KEY,
   Latitude FLOAT,
   Longitude FLOAT,
   DateMesure DATE,
   BandePasssante FLOAT,
   ForceSignal INTEGER,
   IdReseau INTEGER
  );

ALTER TABLE Mesures ADD CONSTRAINT fk_MesureReseaux FOREIGN KEY (idReseau) REFERENCES reseaux(idReseau)
    