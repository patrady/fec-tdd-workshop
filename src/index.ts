export class Money {
  private amount: number = 0;
  private currency: string;

  public static dollar(amount: number) {
    return new Money(amount, 'USD');
  }

  public static peso(amount: number) {
    return new Money(amount, 'MXN');
  }

  constructor(amount: number, currency: string) {
    this.amount = amount;
    this.currency = currency;
  }

  public times(multiplier: number) {
    return new Money(this.amount * multiplier, this.getCurrency());
  }

  public getCurrency() {
    return this.currency;
  }

  public equals(money: Money) {
    return this.amount === money.amount && this.getCurrency() === money.getCurrency();
  }
}
