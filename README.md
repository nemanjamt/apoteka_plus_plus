
###Aplikacija za apoteku bazirana na mikroservisnoj arhitekturi

##Funkcionalnosti

#Neregistrovani korisnik
prijava na sistem
pretraga, filtriranje i sortiranje proizvoda 

Registrovani korisnik
pregled profila i izmjena podataka
pretraga, filtriranje i sortiranje proizvoda
porucivanje proizvoda
pregled istorije porudzbina
otkazivanje porudzbine - moze se izvrsiti samo ukoliko je status porudzbine "KREIRANA", u suprotnom jedino apotekar moze promijeniti status
ostavljanje recenzije na proizvod - samo onaj koji je barem jednom porucio 

Apotekar
pregled profila i izmjena podataka
dodavanje, izmjena i brisanje proizvoda
mijenjanje statusa porudzbine
prijavljivanje recenzije

Administrator
pregled i izmjena profila
dodavanje novog apotekara
pregled svih apotekara
uklanjanje apotekara
pregled profila korisnika
izvjestaji o poslovanju - generise se graficki prikaz prihoda, ukupan prihod i prosjecan prihod na osnovu izabranog vremenskog perioda 
uvid u istorije porudzbina za svakog korisnika
blokiranje korisnika uz slanje obrazlozenja na mejl
pregled prijavljenih recenzija
uklanjanje recenzije


Arhitektura sistema:
API Gateway - rust
Mikroservis za korisnike  - CRUD korisnika, autentifikacija - python(django/flask)
Mikroservis za proizvode - rust
Mikroservis za porudzbine - rust
Mikroservis za recenzije - python
Mikroservis za izvjestaje - rust
Klijentska veb aplikacija - angular
Baza podataka - PostgreSQL

Napomena:
Izbor jezika za implementaciju mikroservisa jos uvijek nije konačan.
