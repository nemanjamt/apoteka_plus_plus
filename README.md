
# APOTEKA++
Veb aplikacija za pretrazivanje, narucivanje i prodaju proizvoda iz apoteke zasnovana na mikroservisnoj arhitekturi.

## Funkcionalnosti

### Neregistrovani korisnik<br>
* prijava na sistem
<br>pretraga, filtriranje i sortiranje proizvoda 

### Registrovani korisnik<br>
pregled profila i izmjena podataka<br>
pretraga, filtriranje i sortiranje proizvoda<br>
porucivanje proizvoda<br>
pregled istorije porudzbina<br>
otkazivanje porudzbine - moze se izvrsiti samo ukoliko je status porudzbine "KREIRANA", u suprotnom jedino apotekar moze promijeniti status<br>
ostavljanje recenzije na proizvod - samo onaj koji je barem jednom porucio <br>

### Apotekar<br>
pregled profila i izmjena podataka<br>
dodavanje, izmjena i brisanje proizvoda<br>
mijenjanje statusa porudzbine<br>
prijavljivanje recenzije<br>

### Administrator
pregled i izmjena profila<br>
dodavanje novog apotekara<br>
pregled svih apotekara<br>
uklanjanje apotekara<br>
pregled profila korisnika<br>
izvjestaji o poslovanju - generise se graficki prikaz prihoda, ukupan prihod i prosjecan prihod na osnovu izabranog vremenskog perioda <br>
uvid u istorije porudzbina za svakog korisnika<br>
blokiranje korisnika uz slanje obrazlozenja na mejl<br>
pregled prijavljenih recenzija<br>
uklanjanje recenzije<br>


## Arhitektura sistema:<br>
API Gateway - rust<br>
Mikroservis za korisnike  - CRUD korisnika, autentifikacija - python(django/flask)<br>
Mikroservis za proizvode - rust<br>
Mikroservis za porudzbine - rust<br>
Mikroservis za recenzije - python<br>
Mikroservis za izvjestaje - rust<br>
Klijentska veb aplikacija - angular<br>
Baza podataka - PostgreSQL<br>

Napomena:<br>
Izbor jezika za implementaciju mikroservisa jos uvijek nije konačan.<br>
