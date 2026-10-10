# Kannelkylä

Luonnos Asunto Oy Kannelmäen Pientalojen sivustosta. Sisältö ja kuvat on haettu nykyiseltä sivustolta [kannelkyla.fi](https://www.kannelkyla.fi/). Julkaistu versio on osoitteessa <https://jyrmyx.github.io/kannelkyla/>.

`kannelkyla.fi` osoittaa yhä Kotisivukoneeseen. Domainia ei ole vaihdettu.

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
- **GitHub Pages** julkaisee ilmaiseksi. Oma domain voidaan osoittaa myöhemmin samaan buildiin.

Paikallinen kehitys käyttää osoitteen juurta `/`. Julkaistu sivu on polussa `/kannelkyla`, koska GitHub Pages -projektisivu toimii niin. Actions asettaa `PAGES_BASE=/kannelkyla`. Älä kovakoodaa sitä linkkeihin: käytä `url()`-apuria tiedostossa `src/lib/site.ts`.

## Oma domain myöhemmin

Kun `kannelkyla.fi` siirretään:

1. Lisää `public/CNAME`, jossa on pelkkä domain.
2. Poista workflowsta `PAGES_BASE`. GitHub Pages tarjoaa oman domainin juuresta, ei polusta `/kannelkyla`.
3. Aseta `SITE` (tai `astro.config.mjs`:n `site`) osoitteeseen `https://kannelkyla.fi`.

## Mitä luonnos ei vielä tee

- Ei kirjautumista, ei lomakkeita, ei saunavuorojen varausta.
- TV-kanavat-sivu nykyisellä sivustolla palauttaa virheen, joten sitä ei kopioitu.
- Osa vuoden 2017 tiedotteista on yhä PDF-linkkejä vanhalle palvelimelle.
- Yläreunan vihreä palkki kertoo, että tämä on yhä luonnos toimikunnalle.
