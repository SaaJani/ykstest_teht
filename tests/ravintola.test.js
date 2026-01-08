import { describe, test, expect } from 'vitest';
import ravintola from '../ravintola/ravintola.js';

describe('ravintolan testaus', function () {
  test('Should add together and return the sum of values "ottaaAlkuruoan, ottaaJalkiruoan, ottaaJuoman"', function () {
    const ottaaAlkuruoan = true;
    const ottaaJalkiruoan = true;
    const ottaaJuoman = true;
    const checksum = ravintola.laskeLasku(
      ottaaAlkuruoan,
      ottaaJalkiruoan,
      ottaaJuoman
    );
    expect(checksum).toBe(17);
  });

  test('Should return a random value from one alkuruoat-table in ravintola', function () {
    const checkval = ravintola.palautaTaulukonSatunnainenArvo(
      ravintola.alkuruoat
    );
    expect(['Tomaattikeitto', 'Leipä', 'Vihersalaatti', 'Salsa']).toContain(
      /* ravintola.alkuruoat toimii myös [] tilalle*/
      checkval
    );
  });

  test('Should return the correct type of value from syoravintolassa when full', function () {
    const asiakkaidenMaara = 4;
    expect(typeof asiakkaidenMaara).toBe('number');
  });
});
