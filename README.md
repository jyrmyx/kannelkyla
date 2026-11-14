# Kannelkylä

Asunto Oy Kannelmäen Pientalojen sivusto. Sisältö ja kuvat on haettu aiemmalta Kotisivukone-sivustolta. Julkaistu versio on osoitteessa <https://www.kannelkyla.fi/>, kun nimipalvelun `www`-tietue osoittaa GitHub Pagesiin.

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

Nykyisen Kotisivukone-sivuston osiot: etusivu, uutiset, asukastiedotteet, asuminen ja eläminen, historia kuvineen, kyläkartta, perustiedot ja yhteystiedot. Tekstit ovat alkuperäisiä. Kuvat ovat taloyhtiön omia kuvia nykyiseltä sivustolta.

PDF-tiedotteet ja lomakkeet (korjausilmoitus, terassiohje, Avotakan juttu, pohjakuvat) aukeavat vielä nykyiseltä palvelimelta. Kyläkartta-PDF on kopioitu mukaan.

## Miksi tämä pino

- **Astro 7** tekee staattiset sivut. Ei palvelinta, ei tietokantaa, ei kuukausimaksua.
- **Tailwind CSS 4** pitää ulkoasun yhdessä paikassa.
- **GitHub Pages** julkaisee ilmaiseksi osoitteessa `www.kannelkyla.fi`.

Paikallinen kehitys ja julkaistu sivu käyttävät osoitteen juurta `/`. `public/CNAME` on `www.kannelkyla.fi`. Actions asettaa `SITE=https://www.kannelkyla.fi` eikä julkaistussa buildissa ole `PAGES_BASE`-etuliitettä. Älä kovakoodaa linkkejä: käytä `url()`-apuria tiedostossa `src/lib/site.ts`.

## Mitä luonnos ei vielä tee

- Ei kirjautumista, ei lomakkeita, ei saunavuorojen varausta.
- TV-kanavat-sivu nykyisellä sivustolla palauttaa virheen, joten sitä ei kopioitu.
- Osa vuoden 2017 tiedotteista on yhä PDF-linkkejä vanhalle palvelimelle.

## Tarkistukset

Push `main`-haaraan ja jokainen pull request ajavat yksikkötestit ja kaksi buildia: julkaistun juuren ja vanhan polun `/kannelkyla`. Sen jälkeen tarkistetaan, että sivujen linkit ja kuvat löytyvät buildista. Sivusto julkaistaan juuribuildista vasta, kun tämä menee läpi.

Dependabot avaa riippuvuuspäivityksille pull requestin viikoittain. Patch- ja minor-päivitykset yhdistyvät itsestään, jos tarkistukset menevät läpi. Major-päivitys jää odottamaan manuaalista hyväksyntää.
