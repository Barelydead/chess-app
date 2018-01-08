App
---------------

[![BCH compliance](https://bettercodehub.com/edge/badge/Barelydead/framework2?branch=master)](https://bettercodehub.com/)
[![Maintainability](https://api.codeclimate.com/v1/badges/2d247096c0bfb7a88f4c/maintainability)](https://codeclimate.com/github/Barelydead/framework2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/2d247096c0bfb7a88f4c/test_coverage)](https://codeclimate.com/github/Barelydead/framework2/test_coverage)
[![Build Status](https://travis-ci.org/Barelydead/framework2.svg?branch=master)](https://travis-ci.org/Barelydead/framework2)
[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/Barelydead/framework2/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/Barelydead/framework2/?branch=master)
[![Code Coverage](https://scrutinizer-ci.com/g/Barelydead/framework2/badges/coverage.png?b=master)](https://scrutinizer-ci.com/g/Barelydead/framework2/?branch=master)
[![Build Status](https://scrutinizer-ci.com/g/Barelydead/framework2/badges/build.png?b=master)](https://scrutinizer-ci.com/g/Barelydead/framework2/build-status/master)

This repo is a part of the bth-course framework2

## Tekniker
Denna sida är byggd med node och använder ramveket express. Chat funktionaliteten på sidan bygger på socket.io och databasen jag använt är mongoDB. Det är grunden till sidan och jag har inte använt något ramverk för frontenden. Istället så bygger jag mina vyer med vymotorn pug.


## Install

```
git clone https://github.com/Barelydead/framework2.git
```

```
cd framework2/
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

##### Starta redovisa och mongoDB
För att starta redovisa servern och mongodbservern kör `npm run start-docker` och rikta webläsaren till http://localhost:3000 för att komma åt sidan. `npm run stop-docker` avslutar servrarna.

##### Starta redovisa i flera versioner
Det går att starta enbart redovisa servern i flera versioner. Detta görs med commando `npm run docker-start-v`.
De olika versioner kommer man åt på: `http://localhost:3060`, `http://localhost:3080`, `http://localhost:3090`.

För att stoppa dessa servrar `npm run docker-stop-v`
