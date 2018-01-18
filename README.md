App
---------------

[![Build Status](https://travis-ci.org/Barelydead/chess-app.svg?branch=master)](https://travis-ci.org/Barelydead/chess-app)
[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/Barelydead/chess-app/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/Barelydead/chess-app/?branch=master)
[![Code Coverage](https://scrutinizer-ci.com/g/Barelydead/chess-app/badges/coverage.png?b=master)](https://scrutinizer-ci.com/g/Barelydead/chess-app/?branch=master)
[![Build Status](https://scrutinizer-ci.com/g/Barelydead/chess-app/badges/build.png?b=master)](https://scrutinizer-ci.com/g/Barelydead/chess-app/build-status/master)

Detta repo är det avslutande projektet i ramverk2 kursen som går vid BTH - webbprogrammering.

## Tekniker
Denna sida är byggd med Node och använder ramveket express. Chat och spel funktionaliteten på sidan bygger på socket.io och databasen jag använt är mongoDB. Det är grunden till sidan och jag har inte använt något ramverk för frontenden. Istället så bygger jag mina vyer med vymotorn pug. Enligt mig en ganska enkel setup med många användningsområden.


## Install

```
git clone https://github.com/Barelydead/chess-app.git
```

```
cd chess-app/
```

```
npm install
```

```
npm start
```

## Test
Mitt repo omfattas av unittest med mocha och linters eslint och stylelint.

- Unittest: `npm test`
    Detta kommando kör alla unit test och om allt blir grönt så körs linters.
- Unittest i flera versioner av node: `npm run test-docker`, `npm run test-docker1`
    Detta körs i versionerna 8, 9


##### Starta node och mongoDB i docker
För att starta appen som en helthet med både nodeservern och mongodbservern så använd `npm run start-docker`. Det går nu att rikta webbläsaren till http://localhost:3000 för att komma åt sidan. Vill du avsluta så använd `npm run stop-docker`.

## Realtid
Jag har använt realtid i min app med hjälp av pluginet socket.io. Jag använder mig av realtid för att användare ska kunna chatta med varandra i lobbyn och det används även när ett spel är igång. Detta gör att användarna får uppdateringar som gjort snabbare än med andra metoder. Jag är väldigt nöjd med socket.io då det gör det enkelt att skapa olika "rum". Detta var något jag använde för att kunna ha många spel igång samtidigt. Socket.io har också en stor användarbas vilket gör att det är lätt att hitta svar på frågor både i documentationen och från andra användare.

## Databas
Jag har valt att använda mig av mongoDB som databas. Jag använder databasen i framförallt två sammanhang. För att spara användaruppgifter och för att lagra chatten. När man hoppas in i lobbyn så hämtas de senaste inläggen till chatten så att man kan se inlägg som gjorts även när man inte var ansluten.

Jag tror definitivt det finns plats för att använda noSQL databaser i vissa lägen och en fördel som jag ser med exempelvis mongodb är att det går snabbare att komma igång med ett projekt av den anledningen att man inte behöver skapa tabeller i förväg. Det kräver såklart mer kontroll av datan man lägger in men det gör också att det blir mer flexibelt. En annan sak som jag gillar är att språket i applikationen och datan man får tillbaka är densamma (JSON).


## Modul
Modulen jag har skapat till det här projektet är själva Schackmotorn. Den är troligtvis den största delen i den här projektet och jag blev väldigt nöjd med hur allt fungerade. Det finns fortfarande saker som jag skulle kunna lägga till såsom automatisk schackmatt och rokad men eftersom det finns en tidsgräns på projektet så har jag fått lägga det åt sidan för stunden. Modulen bygger på en objektorienterad approch vilket passade väldigt bra i sammanhanget. Den är byggd med testning i fokus och jag har lyckats komma upp en ungefär 70% kodtäckning. Modulen finns på NPM under namnet [oop-chess](https://www.npmjs.com/package/oop-chess).

## Ci-kedja
Jag använder mig av två olika tjänser för att hålla koll på projektet under utvecklingen. Jag kör på travis-ci som byggtjänst. Det är en smidigtjänst som genom att "bygga" koden i projektet hittar fel och defekter så fort man publicerar. Sedan använder jag scrutinizer för att få kodtäckning och kodkvalitet. Jag har haft mycket problem under projektets gång med att kunna ökra mina testar hos scrutinizer. Ibland fungerar det att köra localt med inte när man pushar till scrutinizer. Jag har gjort många ändringar i konfigfilerna för att tillslut få det att fungera.

Min kodkvalitet är jag väldigt nöjd med och ligger på 9.86 för appen som helhelt och 9.7 för modulen.

## Testning
För testning av min applikation har jag använt mig av mocha och supertest. Den största delen av test jag har körs av mocha och jag tycker det har fungerat bra. Mocha har den funktionaliteten som jag önskar av ett program för unittest och löser även lite mer komplicerade saker som mockning och test av asynkron-kod. Just testning av asynkrona saker är något jag inte gjort förut och var lite trixigt att komma igång med.  

Jag har också använt mig av supertest för att göra kontroller av olika routes och vilken statuskod de retunerar. Jag har inte dykt så djupt i hur man kan använda supertest men för det lilla jag ville testa så fungerade det väldigt smidigt. Det känns också som ett bra komplement till vanliga unittest då man på ett bättre sätt kan testa ett flöde i applikationen (typ inloggning och verifiering).

Min totala kodtäckning av appen (backend) ligger på 56%. Jag är inte helt nöjd med täckningen men det som gjorde det extra svårt att testa är att jag använt mig av både socket och databasfrågor i flera delar av applikationen. Att hålla reda på både socketkoden sammtidigt som man ska testa databasen blev lite för komplicerat för tidsramet och därav så nöjer jag mig med de tester som finns.


## Publicering
Applikationen är publicerad till en driftserver. Servern är en dropplet från Digital ocean och för att kunna presentera sidan så har jag installerat nginx på servern tillsammans med node och mongo. 


## Länkar
Demo av applikation [Demo av applikation](http://138.68.163.238/)
Modulen på npm [oop-chess](https://www.npmjs.com/package/oop-chess)
Modulen på github [oop-chess](https://www.github.com/Barelydead/oop-chess)
Modulen på github [oop-chess](https://www.github.com/Barelydead/oop-chess)
