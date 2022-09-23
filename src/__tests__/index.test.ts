import { Money } from '..';

describe('Dollar', () => {
  describe('#times', () => {
    it('returns a result', () => {
      const five = Money.dollar(5);

      expect(five.times(2).equals(Money.dollar(10))).toBeTruthy();
      expect(five.times(3).equals(Money.dollar(15))).toBeTruthy();
    });
  });

  describe('#getCurrency', () => {
    it('returns USD', () => {
      expect(Money.dollar(10).getCurrency()).toEqual('USD');
    });
  });

  describe('#equals', () => {
    describe('when the amounts are equal', () => {
      it('returns true', () => {
        expect(Money.dollar(5).equals(Money.dollar(5))).toBeTruthy();
      });
    });

    describe('when the amounts are not equal', () => {
      it('returns false', () => {
        expect(Money.dollar(5).equals(Money.dollar(6))).toBeFalsy();
        expect(Money.dollar(5).equals(Money.peso(5))).toBeFalsy();
      });
    });
  });
});

describe('Peso', () => {
  describe('#times', () => {
    it('returns a result', () => {
      const five = Money.peso(5);

      expect(five.times(2).equals(Money.peso(10))).toBeTruthy();
      expect(five.times(3).equals(Money.peso(15))).toBeTruthy();
    });
  });

  describe('#getCurrency', () => {
    it('returns MXN', () => {
      expect(Money.peso(10).getCurrency()).toEqual('MXN');
    });
  });

  describe('#equals', () => {
    describe('when the amounts are equal', () => {
      it('returns true', () => {
        expect(Money.peso(5).equals(Money.peso(5))).toBeTruthy();
      });
    });

    describe('when the amounts are not equal', () => {
      it('returns false', () => {
        expect(Money.peso(5).equals(Money.peso(6))).toBeFalsy();
        expect(Money.peso(5).equals(Money.dollar(5))).toBeFalsy();
      });
    });
  });
});
