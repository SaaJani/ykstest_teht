import { describe, it, expect, beforeEach } from 'vitest';
import ravintola from '../ravintola/ravintola_updated.js';

describe('ravintola_updated testaus', function () {
  beforeEach(() => {
    // Reset paikat array before each test
    ravintola.paikat = undefined;
  });

  it('Should return an array of orders when customer count is less than or equal to available seats', function () {
    const asiakkaidenMaara = 10; // Less than paikkojenMaara (15)
    const tilaukset = ravintola.syoRavintolassa(asiakkaidenMaara);

    // Check that it returns an array
    expect(Array.isArray(tilaukset)).toBe(true);

    // Check that the array length matches the number of customers
    expect(tilaukset.length).toBe(asiakkaidenMaara);

    // Check that each order has the correct structure
    tilaukset.forEach((tilaus) => {
      expect(tilaus).toHaveProperty('summa');
      expect(tilaus).toHaveProperty('ruoat');
      expect(typeof tilaus.summa).toBe('number');
      expect(Array.isArray(tilaus.ruoat)).toBe(true);
    });
  });

  it('Should fail on second call when trying to reserve more seats than available', function () {
    // First call with 10 customers - should succeed
    const tilaukset1 = ravintola.syoRavintolassa(10);
    expect(Array.isArray(tilaukset1)).toBe(true);
    expect(tilaukset1.length).toBe(10);

    // Second call with 6 customers - should fail because only 5 seats left (15 - 10 = 5)
    const tilaukset2 = ravintola.syoRavintolassa(6);
    expect(tilaukset2).toBeUndefined();
  });

  it('Should correctly calculate the total price from food objects array', function () {
    // Create a sample array of food objects
    const ruoat = [
      { ruoka: 'Tomaattikeitto', hinta: 5 },
      { ruoka: 'Kalakeitto', hinta: 8 },
      { ruoka: 'Jäätelö', hinta: 3 },
      { ruoka: 'Kahvi', hinta: 2 },
    ];

    const summa = ravintola.laskeLasku(ruoat);

    // Should return 5 + 8 + 3 + 2 = 18
    expect(summa).toBe(18);
  });

  it('Should return 0 for empty food array', function () {
    const ruoat = [];
    const summa = ravintola.laskeLasku(ruoat);

    expect(summa).toBe(0);
  });
});
