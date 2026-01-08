/*
TIKO RAVINTOLA
OHJELMAKOODI
*/

const Ravintola = function () {
  this.alkuruoat = [
    { ruoka: 'Tomaattikeitto', hinta: 5 },
    { ruoka: 'Leipä', hinta: 2 },
    { ruoka: 'Vihersalaatti', hinta: 4 },
    { ruoka: 'Salsa', hinta: 3 },
  ];
  this.paaruoat = [
    { ruoka: 'Kalakeitto', hinta: 8 },
    { ruoka: 'Makaroonilaatikko', hinta: 6 },
    { ruoka: 'Kasvispihvi', hinta: 7 },
    { ruoka: 'Kanasalaatti', hinta: 9 },
  ];
  this.jalkiruoat = [
    { ruoka: 'Hedelmäsalaatti', hinta: 4 },
    { ruoka: 'Jäätelö', hinta: 3 },
    { ruoka: 'Pulla', hinta: 2 },
    { ruoka: 'Donitsi', hinta: 3 },
  ];
  this.juomat = [
    { ruoka: 'Tee', hinta: 2 },
    { ruoka: 'Kahvi', hinta: 2 },
    { ruoka: 'Maito', hinta: 1 },
    { ruoka: 'Mehu', hinta: 3 },
  ];
  this.paikkojenMaara = 15;
  this.paikat; // TÃ¤hÃ¤n muuttujaan paikkojen taulukko
};

/**
 * Palauttaa satunnaisen boolean arvon
 * @return {boolean} Randomized boolean
 */
function generoiBoolean() {
  return Math.random() < 0.5;
}

/**
 * Jos 'asiakkaidenMaara' on pienempi tai yhtÃ¤suuri kuin 'paikkojenMaara', luo taulukon 'tilaukset'
 * johon tallennetaan yksittÃ¤isen asiakkaan tilaus. tilaaAteria-funktiolle annetaan satunnaiset boolean arvot
 * argumentteina.
 *
 * Palauttaa pÃ¤Ã¤tteeksi 'tilaukset' taulukon.
 * @param {number} asiakkaidenMaara
 * @return {object} object array
 */
Ravintola.prototype.syoRavintolassa = function (asiakkaidenMaara) {
  const onTilaa = this.tarkistaPaikkojenMaara(asiakkaidenMaara);
  if (!onTilaa) {
    return;
  }

  this.varaaPaikat(asiakkaidenMaara);

  const tilaukset = [];

  for (let i = 0; i < asiakkaidenMaara; i++) {
    console.log('-------------------------------------------------------');
    console.log(
      'Tarjoillaan asiakasta numero ' + (i + 1) + '. MitÃ¤ teille saisi olla?'
    );
    tilaukset.push(
      this.tilaaAteria(generoiBoolean(), generoiBoolean(), generoiBoolean())
    );
    console.log('Asiakkaalle tarjoiltu. HyvÃ¤Ã¤ ruokahalua!');
  }
  console.log('-------------------------------------------------------');
  console.log('Kaikille asiakkaille tarjoiltu!');

  return tilaukset;
};

/**
 * Tarkistaa, ettÃ¤ 'asiakkaidenMaara' on suurempi kuin 0, mutta pienempi tai yhtÃ¤suuri kuin 'paikkojenMaara'.
 *
 * Kirjoittaa konsoliin tulosteen tilanteesta, ja palauttaa onnistumisen boolean arvona.
 *
 * Jos 'asiakkaidenMaara' ei ole numero, heittÃ¤Ã¤ TypeErrorin.
 * @param {number} asiakkaidenMaara
 * @return {boolean} Onnistuminen
 */
Ravintola.prototype.tarkistaPaikkojenMaara = function (asiakkaidenMaara) {
  if (typeof asiakkaidenMaara !== 'number') {
    throw new TypeError();
  }
  if (asiakkaidenMaara <= 0) {
    console.log(
      'IkÃ¤vÃ¤ kyllÃ¤ emme voi tarjoilla ' + asiakkaidenMaara + ' asiakkaalle.'
    );
    return false;
  } else if (asiakkaidenMaara <= this.paikkojenMaara) {
    console.log(
      'Tilaa on ' + asiakkaidenMaara + ' asiakkaalle. Tervetuloa ravintolaamme!'
    );
    return true;
  } else {
    console.log(
      'IkÃ¤vÃ¤ kyllÃ¤ ravintolaamme ei mahdu ' +
        asiakkaidenMaara +
        ' asiakasta.'
    );
    return false;
  }
};

/**
 * Luo Ravintolan paikat-muuttujaan uuden taulukon, jonka koko mÃ¤Ã¤rÃ¤ytyy paikkojenMaara-muuttujan mukaisesti,
 * ja tÃ¤yttÃ¤Ã¤ taulukon boolean arvolla false.
 */
Ravintola.prototype.generoiPaikat = function () {
  this.paikat = new Array(this.paikkojenMaara).fill(false);
};

/**
 * Generoi taulun jos sellaista ei jo ole, tarkistaa montako vapaata paikkaa ravintolassa on
 * Palauttaa falsen, jos ravintola on jo bookattu täyteen. Varaa sovitun määrän paikkoja täyttämällä taulukon arvolla true
 *  jos niitä jäljellä ja sitten palauttaa true
 */
Ravintola.prototype.varaaPaikat = function (varauksenMaara = 1) {
  if (!Array.isArray(this.paikat)) {
    this.generoiPaikat();
  }

  let vapaatPaikat = 0;
  for (let i = 0; i < this.paikat.length; i++) {
    if (this.paikat[i] === false) {
      vapaatPaikat++;
    }
  }

  if (vapaatPaikat < varauksenMaara) {
    throw new Error('Ei tarpeeksi paikkoja');
  }

  let varattu = 0;
  for (let i = 0; i < this.paikat.length && varattu < varauksenMaara; i++) {
    if (this.paikat[i] === false) {
      this.paikat[i] = true;
      varattu++;
    }
  }
  return true;
};

/**
 * Ottaa parametreina 3 boolean arvoa, joiden avulla mÃ¤Ã¤ritellÃ¤Ã¤n mitÃ¤ ruokia asiakas tilaa.
 * Jos parametrit eivÃ¤t ole tyyppiÃ¤ boolean, heitetÃ¤Ã¤n TypeError.
 *
 * Tilaukset tallennetaan 'ruoat' taulukkoon boolean parametrien mukaisesti.
 *
 * Lopuksi kutsutaan 'laskeLasku' funktiota, jolla lasketaan tilauksen lasku.
 *
 * Palauttaa objektin, joka sisÃ¤ltÃ¤Ã¤ numeron ja string-taulukon
 *
 * @param {boolean} ottaaAlkuruoan
 * @param {boolean} ottaaJalkiruoan
 * @param {boolean} ottaaJuoman
 * @return {object} object - number, string[]
 */
Ravintola.prototype.tilaaAteria = function (
  ottaaAlkuruoan,
  ottaaJalkiruoan,
  ottaaJuoman
) {
  if (
    typeof ottaaAlkuruoan !== 'boolean' ||
    typeof ottaaJalkiruoan !== 'boolean' ||
    typeof ottaaJuoman !== 'boolean'
  ) {
    throw new TypeError();
  }

  const ruoat = [];
  let ruokaObjekti;

  if (ottaaAlkuruoan) {
    ruokaObjekti = this.palautaTaulukonSatunnainenArvo(this.alkuruoat);
    console.log('Ottaisin alkuruoaksi: ' + ruokaObjekti.ruoka);
    ruoat.push(ruokaObjekti);
  }

  ruokaObjekti = this.palautaTaulukonSatunnainenArvo(this.paaruoat);
  console.log('Ottaisin pääruoaksi: ' + ruokaObjekti.ruoka);
  ruoat.push(ruokaObjekti);

  if (ottaaJalkiruoan) {
    ruokaObjekti = this.palautaTaulukonSatunnainenArvo(this.jalkiruoat);
    console.log('Ottaisin jälkiruoaksi: ' + ruokaObjekti.ruoka);
    ruoat.push(ruokaObjekti);
  }

  if (ottaaJuoman) {
    ruokaObjekti = this.palautaTaulukonSatunnainenArvo(this.juomat);
    console.log('Ottaisin juomaksi: ' + ruokaObjekti.ruoka);
    ruoat.push(ruokaObjekti);
  }

  const summa = this.laskeLasku(ruoat);

  return { summa, ruoat };
};

/**
 * Palauttaa satunnaisen arvon annetusta taulukosta
 * @param {object[]} taulukko - Taulukossa ruokia
 * @return {object} - Palauttaa randomin ruokaobjektin ruoalla ja hinnalla
 */
Ravintola.prototype.palautaTaulukonSatunnainenArvo = function (taulukko) {
  return taulukko[Math.floor(Math.random() * taulukko.length)];
};

/**
 * Laskee summan ruoat-tauluko objektien hinnoista
 *
 * Palauttaa lopussa 'loppuSumma'.
 *
 * @param {object[]} ruoat - Taulukossa ruokaobjekteja hinta-arvolla
 * @return {number}
 */
Ravintola.prototype.laskeLasku = function (ruoat) {
  let loppuSumma = 0;

  for (let i = 0; i < ruoat.length; i++) {
    loppuSumma += ruoat[i].hinta;
  }

  return loppuSumma;
};

const ravintola = new Ravintola();

export default ravintola;
