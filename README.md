App
---------------

[![Build Status](https://travis-ci.org/Barelydead/chess-app.svg?branch=master)](https://travis-ci.org/Barelydead/chess-app)
[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/Barelydead/chess-app/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/Barelydead/chess-app/?branch=master)
[![Code Coverage](https://scrutinizer-ci.com/g/Barelydead/chess-app/badges/coverage.png?b=master)](https://scrutinizer-ci.com/g/Barelydead/chess-app/?branch=master)
[![Build Status](https://scrutinizer-ci.com/g/Barelydead/chess-app/badges/build.png?b=master)](https://scrutinizer-ci.com/g/Barelydead/chess-app/build-status/master)

This repo is a part of the bth-course chess-app

## Bakgrund



## Tekniker
Denna sida är byggd med node och använder ramveket express. Chat funktionaliteten på sidan bygger på socket.io och databasen jag använt är mongoDB. Det är grunden till sidan och jag har inte använt något ramverk för frontenden. Istället så bygger jag mina vyer med vymotorn pug.


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
- Unittest i flera versioner av node: `npm run test-docker`, `npm run test-docker1`, `npm run test-docker2`
    Detta körs i versionerna 8, 9 och 10


##### Starta node och mongoDB i docker
För att starta appen som en helthet med både nodeservern och mongodbservern så använd `npm run start-docker`. Det går nu att rikta webbläsaren till http://localhost:3000 för att komma åt sidan. Vill du avsluta så använd `npm run stop-docker`.

## Realtid
Jag har använt realtid i min app med hjälp av pluginet socket.io. Jag använder mig av realtid för att användare ska kunna chatta med varandra i lobbyn och det används även när ett spel är igång. Detta gör att användarna får uppdateringar som gjort snabbare än med andra metoder. Jag är väldigt nöjd med socket.io då det gör det enkelt att skapa olika "rum". Detta var något jag använde för att kunna ha många spel igång samtidigt. Socket.io har också en stor användarbas vilket gör att det är lätt att hitta svar på frågor både i documentationen och från andra användare.

## Databas
Jag har valt att använda mig av mongoDB som databas. Jag använder databasen i framförallt två sammanhang. För att spara användaruppgifter och för att lagra chatten. När man hoppas in i lobbyn så hämtas de senaste inläggen till chatten så att man kan se inlägg som gjorts även när man inte var ansluten.

## Modul
Modulen jag har skapat till det här projektet är själva Schackmotorn. Den är troligtvis den största delen i den här projektet och jag blev väldigt nöjd med hur allt fungerade. Det finns fortfarande saker som jag skulle kunna lägga till såsom automatisk schackmatt och rokad men eftersom det finns en tidsgräns på projektet så har jag fått lägga det åt sidan för stunden. Modulen bygger på en objektorienterad approch vilket passade väldigt bra i sammanhanget. Den är byggd med testning i fokus och jag har lyckats komma upp en ungefär 70% kodtäckning. Modulen finns på NPM under namnet [oop-chess](https://www.npmjs.com/package/oop-chess).

## Ci-kedja
Jag använder mig av två olika tjänser för att hålla koll på projektet under utvecklingen. Jag kör på travis-ci som byggtjänst. Det är en smidigtjänst som genom att "bygga" koden i projektet hittar fel och defekter så fort man publicerar. Sedan använder jag scrutinizer för att få kodtäckning och kodkvalitet. Jag har haft mycket problem under projektets gång med att kunna ökra mina testar hos scrutinizer. Ibland fungerar det att köra localt med inte när man pushar till scrutinizer. Jag har gjort många ändringar i konfigfilerna för att tillslut få det att fungera.

Min kodkvalitet är jag väldigt nöjd med och ligger på 9.86 för appen som helhelt och 9.7 för modulen.
