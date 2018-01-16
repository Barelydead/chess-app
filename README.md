App
---------------

[![Build Status](https://travis-ci.org/Barelydead/chess-app.svg?branch=master)](https://travis-ci.org/Barelydead/chess-app)
[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/Barelydead/chess-app/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/Barelydead/chess-app/?branch=master)
[![Code Coverage](https://scrutinizer-ci.com/g/Barelydead/chess-app/badges/coverage.png?b=master)](https://scrutinizer-ci.com/g/Barelydead/chess-app/?branch=master)
[![Build Status](https://scrutinizer-ci.com/g/Barelydead/chess-app/badges/build.png?b=master)](https://scrutinizer-ci.com/g/Barelydead/chess-app/build-status/master)

This repo is a part of the bth-course chess-app

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
- Linters: `npm run lint`
- Unittest i flera versioner av node: `npm run docker-test-all`

## Docker

##### Starta node och mongoDB
För att starta appen som en helthet med både nodeservern och mongodbservern så använd `npm run start-docker`. Det går nu att rikta webbläsaren till http://localhost:3000 för att komma åt sidan. Vill du avsluta så använd `npm run stop-docker`.

##### Starta redovisa i flera versioner
Det går att starta enbart redovisa servern i flera versioner. Detta görs med commando `npm run docker-start-v`.
De olika versioner kommer man åt på: `http://localhost:3060`, `http://localhost:3080`, `http://localhost:3090`.

För att stoppa dessa servrar `npm run docker-stop-v`

## Realtid
Jag har använt realtid i min app med hjälp av pluginet socket.io. Jag använder mig av realtid för att användare ska kunna chatta med varandra i lobbyn och det används även när ett spel är igång. Detta gör att användarna får uppdateringar som gjort snabbare än med andra metoder.

## Databas
Jag har valt att använda mig av mongoDB som databas. Jag använder databasen i framförallt två sammanhang. För att spara användaruppgifter och för att lagra chatten. När man hoppas in i lobbyn så hämtas de senaste inläggen till chatten så att man kan se inlägg som gjorts även när man inte var ansluten.

## Backend
