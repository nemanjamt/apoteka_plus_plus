
# APOTEKA++
Veb aplikacija za pretraživanje, naručivanje i prodaju proizvoda iz apoteke zasnovana na mikroservisnoj arhitekturi.

## Funkcionalnosti

### Neregistrovani korisnik<br>
* prijava na sistem <br>
* registracija na sistem <br>
* pretraga, filtriranje i sortiranje proizvoda 

### Registrovani korisnik<br>
* pregled profila i izmjena podataka<br>
* pretraga, filtriranje i sortiranje proizvoda<br>
* poručivanje proizvoda - može da odabere preuzimanje u apoteci ili dostavu na kućnu ili neku drugu navedenu adresu.<br> Ako je izabrano preuzimanje u apoteci, moguća su sledeća stanja porudžbine: <br>
KREIRANA - ODOBRENA - ODBIJENA - SPREMNA - OTKAZANA <br>
Ako je izabrana dostava, moguća su sledeća stanja:<br>
KREIRANA - ODOBRENA - ODBIJENA  - DOSTAVA U TOKU - DOSTAVLJENA - OTKAZANA
* pregled istorije porudžbina<br>
* otkazivanje porudžbine - moze se izvrsiti samo ukoliko je status porudzbine "KREIRANA", u suprotnom jedino apotekar moze promijeniti status u "otkazana"<br>
* ostavljanje recenzije na proizvod (u okviru recenzije se unosi ocjena i komentar) - samo onaj koji je barem jednom poručio <br>
* ostavljanje recenzije za dostavljača

### Apotekar<br>
* pregled profila i izmjena podataka<br>
* dodavanje, izmjena i brisanje proizvoda<br>
* mijenjanje statusa porudžbine - ukoliko je porudžbinu potrebno dostaviti, čitav taj proces je sledeći:<br>
Apotekar promijeni status porudžbine u "odobrena" i čeka prijave dostavljača. Kada se dostavljači prijave za dostavu, apotekar bira jednog od prijavljenih.
Nakon toga porudžbina prelazi u status "DOSTAVA U TOKU".
Ukoliko dostavljač odustane od porudžbine, apotekar jedino može promijeniti status iste, ponovo u "odobreno", kako bi ponovo bila vidljiva ostalim dostavljačima i kako bi se neko od njih mogao prijaviti.<br>
* prijavljivanje recenzije <br>
* dodjeljivanje dostavljača (koji se prethodno prijavio za istu) za porudžbinu - moguće je da se više dostavljača prijavi za neku porudžbinu, ali apotekar bira samo jednog

### Dostavljač <br>
* pregled aktivnih porudžbina - može da izabere za dostavu i čeka potvrdu apotekara. Kada apotekar potvrdi da je on dostavljač, ima mogućnost ažuriranja porudžbine u stanje preuzeto, a nakon obavljene dostave porudžbinu prebacuje u stanje dostavljeno.
* pregled istorije svojih porudžbina
* mijenjanje statusa porudzbine - može promijeniti status porudžbine u "dostavljeno", "dostava u toku", "preuzeto", "dodjeljeno"
* uvid u recenzije o sebi i mogućnost da prijavi istu

### Administrator
* pregled i izmjena profila<br>
* dodavanje novog apotekara<br>
* pregled svih apotekara<br>
* uklanjanje apotekara<br>
* CRUD dostavljača
* pregled profila korisnika<br>
* izvjestaji o poslovanju - generiše se grafički prikaz prihoda, ukupan prihod i prosječan prihod na osnovu izabranog vremenskog perioda <br>
* uvid u istorije porudžbina za svakog korisnika<br>
* uvid u istoriju dostava za svakog dostavljača <br>
* pregled prijavljenih recenzija za dostavljača <br>
* blokiranje korisnika uz slanje obrazloženja na mejl<br>
* pregled prijavljenih recenzija za proizvod <br>
* uklanjanje recenzije za proizvod <br>
* uklanjanje recenzije za dostavljača


## Arhitektura sistema:<br>
* API Gateway - python<br>
* Mikroservis za korisnike  - CRUD korisnika, autentifikacija, autorizacija - python  <br>
* Mikroservis za proizvode - rust<br>
* Mikroservis za porudžbine - rust<br>
* Mikroservis za recenzije - rust<br>
* Mikroservis za izvjestaje - rust<br>
* Mikroservis za slanje mejlova - python <br>
* Klijentska veb aplikacija - angular<br>
* Baza podataka - PostgreSQL <br>

Napomena:<br>
Za razvoj mikroservisa u pythonu će se koristiti flask.

