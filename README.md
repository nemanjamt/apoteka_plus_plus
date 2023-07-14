
# APOTEKA++
Veb aplikacija za pretrazivanje, narucivanje i prodaju proizvoda iz apoteke zasnovana na mikroservisnoj arhitekturi.

## Funkcionalnosti

### Neregistrovani korisnik<br>
* prijava na sistem <br>
* registracija na sistem <br>
* pretraga, filtriranje i sortiranje proizvoda 

### Registrovani korisnik<br>
* pregled profila i izmjena podataka<br>
* pretraga, filtriranje i sortiranje proizvoda<br>
* porucivanje proizvoda - može da odabere preuzimanje u apoteci ili dostavu na kućnu adresu.<br> Ako je izabrano preuzimanje u apoteci, moguća su sledeća stanja porudžbine: <br>
KREIRANA - ODOBRENA - ODBIJENA - SPREMNA - OTKAZANA <br>
Ako je izabrana dostava, moguća su sledeća stanja:
KREIRANA - ODOBRENA - ODBIJENA - PREDATA DOSTAVLJAČU - DOSTAVLJENA - OTKAZANA
* pregled istorije porudzbina<br>
* otkazivanje porudzbine - moze se izvrsiti samo ukoliko je status porudzbine "KREIRANA", u suprotnom jedino apotekar moze promijeniti status<br>
* ostavljanje recenzije na proizvod (u okviru recenzije se unosi ocjena i komentar) - samo onaj koji je barem jednom porucio <br>
* ostavljanje recenzije za dostavljača

### Apotekar<br>
* pregled profila i izmjena podataka<br>
* dodavanje, izmjena i brisanje proizvoda<br>
* mijenjanje statusa porudzbine<br>
* prijavljivanje recenzije<br>

### Dostavljač <br>
* pregled aktivnih porudžbina - može da izabere za dostavu i čeka potvrdu apotekara. Kada apotekar potvrdi da je on dostavljač, ima mogućnost ažuriranja porudžbine u stanje preuzeto, a nakon obavljene dostave porudžbinu prebacuje u stanje dostavljeno.
* pregled istorije svojih porudžbina
* uvid u recenzije o sebi i mogućnost da prijavi istu

### Administrator
* pregled i izmjena profila<br>
* dodavanje novog apotekara<br>
* pregled svih apotekara<br>
* uklanjanje apotekara<br>
* CRUD dostavljača
* pregled profila korisnika<br>
* izvjestaji o poslovanju - generise se graficki prikaz prihoda, ukupan prihod i prosjecan prihod na osnovu izabranog vremenskog perioda <br>
* uvid u istorije porudzbina za svakog korisnika<br>
* uvid u istoriju dostava za svakog dostavljaca <br>
* pregled prijavljenih recenzija za dostavljaca <br>
* blokiranje korisnika uz slanje obrazlozenja na mejl<br>
* pregled prijavljenih recenzija za proizvod <br>
* uklanjanje recenzije za proizvod <br>
* uklanjanje recenzije za dostavljaca


## Arhitektura sistema:<br>
* API Gateway - python<br>
* Mikroservis za korisnike  - CRUD korisnika, autentifikacija, autorizacija - python  <br>
* Mikroservis za proizvode - rust<br>
* Mikroservis za porudzbine - rust<br>
* Mikroservis za recenzije - rust<br>
* Mikroservis za izvjestaje - rust<br>
* Mikroservis za slanje mejlova - python <br>
* Klijentska veb aplikacija - angular<br>
* Baza podataka - PostgreSQL <br>

Napomena:<br>
Za razvoj mikroservisa u pythonu ce se koristiti flask.

