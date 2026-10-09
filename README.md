# Kannelkylä

Paikallinen luonnos Asunto Oy Kannelmäen Pientalojen sivustosta. Sisältö ja kuvat on haettu nykyiseltä sivustolta [kannelkyla.fi](https://www.kannelkyla.fi/). Tämä ei ole vielä julkinen sivusto, eikä sitä ole viety GitHubiin.

## Käynnistys

Tarvitset Node.js 22:n (`nvm use`).

```bash
npm install
npm run dev
```

Sivu aukeaa osoitteessa http://localhost:4321.

`npm run build` tekee staattiset sivut kansioon `dist/`. `npm run preview` näyttää sen buildin.

## Mitä tässä on

Nykyisen Kotisivukone-sivuston osiot: etusivu, uutiset, asukastiedotteet, asuminen ja eläminen, historia kuvineen, kyläkartta, perustiedot ja yhteystiedot. Tekstit ovat alkuperäisiä. Kuvat ovat taloyhtiön omia kuvia nykyiseltä sivustolta.

PDF-tiedotteet ja lomakkeet (korjausilmoitus, terassiohje, Avotakan juttu, pohjakuvat) aukeavat vielä nykyiseltä palvelimelta. Kyläkartta-PDF on kopioitu mukaan.

## Miksi tämä pino

- **Astro 7** tekee staattiset sivut. Ei palvelinta, ei tietokantaa, ei kuukausimaksua.
- **Tailwind CSS 4** pitää ulkoasun yhdessä paikassa.
- Sisältö on **Markdown-tiedostoja** kansiossa `src/content/`. Uutinen on yksi tiedosto, sivu on yksi tiedosto.

Tämä sopii taloyhtiön sivustolle paremmin kuin Lovable. Lovable on kätevä ensimmäiseen luonnokseen, mutta sivusto jäisi suljettuun palveluun. Siitä tulisi uusi Kotisivukone: maksu, ja sisältöä ei voi yhtä helposti muokata gitissä tai tekoälyllä.

## Miten sisältöä päivitetään myöhemmin

Kolme tapaa, sama sisältö:

1. **Toimikunta, ilman koodia.** Git-pohjainen editori repositorion päälle. Vuonna 2026 järkevä valinta on [TinaCMS](https://tina.io/) (avoin ydin, visuaalinen muokkaus, sisältö jää tiedostoiksi). Ilmainen paikallinen käyttö riittää. [Decap CMS](https://decapcms.org/) on täysin ilmainen ja yksinkertainen, mutta kehitys on hitaampaa. Keystatic toimii myös, jos GitHub riittää.
2. **Ylläpitäjä tai tekoäly.** Sama markdown muokataan suoraan. Mitään erillistä rajapintatunnusta ei tarvita: työkalu lukee ja kirjoittaa tiedostot. Muutos on git-commit, joten sen näkee ja sen voi perua.
3. **Julkaisu.** Kun repositorio on GitHubissa, Cloudflare Pages rakentaa sivun ilmaiseksi jokaisesta muutoksesta. Oma domain `kannelkyla.fi` osoitetaan sinne, kun toimikunta niin päättää.

WordPress kannattaa vain, jos hallitus haluaa erikseen ylläpidettävän palvelimen ja tutun ylläpitopaneelin. Tälle sisältömäärälle se on raskas.

## Mitä luonnos ei vielä tee

- Ei kirjautumista, ei lomakkeita, ei saunavuorojen varausta.
- TV-kanavat-sivu nykyisellä sivustolla palauttaa virheen, joten sitä ei kopioitu.
- Osa vuoden 2017 tiedotteista on yhä PDF-linkkejä vanhalle palvelimelle.
