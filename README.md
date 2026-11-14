# Kannelkylä

Asunto Oy Kannelmäen Pientalojen sivusto. Sisältö ja kuvat on haettu aiemmalta Kotisivukone-sivustolta. Sivusto on julkaistu osoitteessa <https://www.kannelkyla.fi/> GitHub Pagesissa.

## Käynnistys

Tarvitset Node.js 22:n (`nvm use`).

```bash
npm install
npm run dev
```

Sivu aukeaa osoitteessa http://localhost:4321.

`npm run build` tekee staattiset sivut kansioon `dist/`. `npm run preview` näyttää sen buildin.

## Julkaisu

Sivusto on staattinen. Erillistä julkaisualustaa tai CMS:ää ei ole. Push `main`-haaraan rakentaa sivun GitHub Actionsissa ja julkaisee sen GitHub Pagesiin. Repo on julkinen, koska ilmainen GitHub Pages ei palvele yksityistä repoa.

Sisältö on Markdown-tiedostoja kansiossa `src/content/`. Ylläpitäjä muokkaa tiedostoja ja puskee muutoksen. Toimikunta lukee julkaistua sivua, se ei kirjaudu muokkaamaan.

## Mitä tässä on

Sivuston osiot: etusivu, uutiset, tiedotteet, asuminen ja eläminen, historia kuvineen, kyläkartta, perustiedot ja yhteystiedot. Tiedotteet-sivu ohjaa Avaa.io-taloyhtiöportaaliin. Tekstit ovat pääosin vanhalta Kotisivukone-sivustolta, ja kuvat ovat taloyhtiön omia.

Korjausilmoitus, korjausohjeet ja Avotakan juttu ovat mukana kansiossa `public/tiedostot`. Kyläkartta-PDF on kansiossa `public/media`.

## Miksi tämä pino

- **Astro 7** tekee staattiset sivut. Ei palvelinta, ei tietokantaa, ei kuukausimaksua.
- **Tailwind CSS 4** pitää ulkoasun yhdessä paikassa.
- **GitHub Pages** julkaisee ilmaiseksi osoitteessa `www.kannelkyla.fi`.

Paikallinen kehitys ja julkaistu sivu käyttävät osoitteen juurta `/`. `public/CNAME` on `www.kannelkyla.fi`. Actions asettaa `SITE=https://www.kannelkyla.fi` eikä julkaistussa buildissa ole `PAGES_BASE`-etuliitettä. Älä kovakoodaa linkkejä: käytä `url()`-apuria tiedostossa `src/lib/site.ts`.

## Mitä sivusto ei tee

- Ei kirjautumista, ei lomakkeita, ei saunavuorojen varausta.
- TV-kanavat-sivu vanhalla Kotisivukone-sivustolla palauttaa virheen, joten sitä ei kopioitu.
- Ei vanhoja asukastiedotteita: ajankohtaiset tiedotteet ovat Avaa.io-portaalissa, ja Tiedotteet-sivu kertoo, miten tunnukset saa.

## Tarkistukset

Push `main`-haaraan ja jokainen pull request ajavat yksikkötestit ja kaksi buildia: julkaistun juuren ja vanhan polun `/kannelkyla`. Sen jälkeen tarkistetaan, että sivujen linkit ja kuvat löytyvät buildista, ja Playwright avaa julkaistun juuribuildin selaimessa. Testit varmistavat pääsivut, valikon, kuvat, kyläkartan, etusivun sijaintilinkin, 404-sivun ja historian kuvagallerian. Sivusto julkaistaan juuribuildista vasta, kun tämä menee läpi.

`npm run test:ui` ajaa samat selaintestit paikallisesti, kun julkaistu juuribuild on valmis.

Dependabot avaa riippuvuuspäivityksille pull requestin viikoittain. Patch- ja minor-päivitykset yhdistyvät itsestään, jos tarkistukset menevät läpi. Major-päivitys jää odottamaan manuaalista hyväksyntää.
