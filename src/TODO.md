Write a quick test

```ts
import { Dollar } from '..';

describe('Dollar', () => {
  describe('#times', () => {
    it('returns the result', () => {
      const five = new Dollar(5);
      five.times(2);

      expect(five.amount).toEqual(10);
    });
  });
});
```

First implementation, just to make it compile

```ts
export class Dollar {
  public amount: number;

  constructor(amount: number) {
    this.amount = amount;
  }

  public times(value: number) {}
}
```

It fails.

Make it pass with Fake It.

```ts
export class Dollar {
  public amount: number;

  constructor(amount: number) {
    this.amount = amount;
  }

  public times(value: number) {
    this.amount = 10; // Changed this
  }
}
```

That was ugly. Use triangulation now.

```ts
import { Dollar } from '..';

describe('#times', () => {
  it('returns the result', () => {
    const five = new Dollar(5);
    five.times(2);

    expect(five.amount).toEqual(10);
  });

  it('returns the result', () => {
    const six = new Dollar(6);
    six.times(2);

    expect(six.amount).toEqual(12);
  });
});
```

```ts
export class Dollar {
  public amount: number;

  constructor(amount: number) {
    this.amount = amount;
  }

  public times(multiplier: number) {
    this.amount = this.amount * multiplier;
  }
}
```

We can delete the second test because it's irrelevant now.

Let's add the following to our TODO List

- [ ] Make "amount" private
- [ ] Side effects with `amount`

# CHAPTER 2: DEGENERATE OBJECTS

Let's tackle the side effects first with a failing test that won't compile

```ts
describe('#times', () => {
  it('returns the result', () => {
    const five = new Dollar(5);
    const ten = five.times(2);

    expect(five.amount).toEqual(5);
    expect(ten.amount).toEqual(10);
  });
});
```

Make it compile now with Obvious Implementation
\*\* Explain why we didn't use "Fake It" here (becuase we already knew the right thing to do)

```ts
export class Dollar {
  public amount: number;

  constructor(amount: number) {
    this.amount = amount;
  }

  public times(multiplier: number) {
    return new Dollar(this.amount * multiplier);
  }
}
```

Let's cross off that TODO item

- [x] Side effects with `amount`

# CHAPTER 3: Equality for All

Add a test for equality

```ts
describe('#equals', () => {
  describe('when they are equal', () => {
    it('returns true', () => {
      expect(new Dollar(5).equals(new Dollar(5))).toBeTruthy();
    });
  });
});
```

Use fake implementation to make it pass

```ts
public equals(dollar: Dollar) {
  return true;
}
```

Now use triangulation to generalize

Tangent: Triangulation is a method you can use when you're unsure of how to refactor code. When you use obvious implementation to first hardcode a value, triangulation gives you the safety of attacking the problem from multiple angles and you are sure you've solved it once the tests pass.

```ts
describe('#equals', () => {
  describe('when they are equal', () => {
    it('returns true', () => {
      expect(new Dollar(5).equals(new Dollar(5))).toBeTruthy();
    });
  });

  // Added this
  describe('when the amounts are not equal', () => {
    it('returns false', () => {
      expect(new Dollar(5).equals(new Dollar(6))).toBeFalsy();
    });
  });
});
```

Update the method

```ts
  public equals(dollar: Dollar) {
    return this.amount === dollar.amount;
  }
```

# CHAPTER 4: PRIVACY

Let's make our tests a little more friendly to read now that `equals` is implemented

Redo the first test

```ts
it('returns the result', () => {
  const five = new Dollar(5);
  const ten = five.times(2);
  const fifteen = five.times(3);

  expect(ten.equals(new Dollar(10))).toBeTruthy();
  expect(fifteen.equals(new Dollar(15))).toBeTruthy();
});
```

Now get rid of the temporary variables

```ts
it('returns the result', () => {
  const five = new Dollar(5);

  expect(five.times(2).equals(new Dollar(10))).toBeTruthy();
  expect(five.times(3).equals(new Dollar(15))).toBeTruthy();
});
```

These tests now "speak" much more clearly!

Now that we aren't asserting on `amount`, let's make it private.

```ts
export class Dollar {
  private amount: number; // Changed from public -> private
}
```

# CHAPTER 5: FRAC-LY SPEAKING

Let's add a Peso by copy-pasting the Dollar tests

```ts
describe('Peso', () => {
  describe('#times', () => {
    it('returns the result', () => {
      const five = new Peso(5);

      expect(five.times(2).equals(new Peso(10))).toBeTruthy();
      expect(five.times(3).equals(new Peso(15))).toBeTruthy();
    });
  });
});
```

To get that to compile, you may be VERY tempted to abstract early because you think Dollar and Peso are going to share a lot of the same code.

DON'T. Get your tests to pass first and we'll TDD our way there.

```ts
export class Peso {
  private amount: number;

  constructor(amount: number) {
    this.amount = amount;
  }

  public times(multiplier: number) {
    return new Peso(this.amount * multiplier);
  }

  public equals(peso: Peso) {
    return this.amount === peso.amount;
  }
}
```

# CHAPTER 6: EQUALITY FOR ALL, REDUX

Now that we've gotten the tests to pass, let's start to generalize. We are now in the _REFACTOR_ stage!

Let's start with `equals`.

Make a money class and get Dollar to work with it.

```ts
class Money {}

class Dollar extends Money {} // Update constructor
```

Move `amount` to `Money` and change it to `public` with a default of 0.

```ts
public amount: number = 0;
```

Now change `equals` in `Dollar` to accept a `Money`

```ts
public equals(money: Money) {
  return this.amount === money.amount;
}
```

Move up `equals` to `Money`

OH NO! We didn't create tests to test `Peso.equality()`!

We always want to code like we had the tests we wish we had.

```ts
describe('#equals', () => {
  describe('when they are equal', () => {
    it('returns true', () => {
      expect(new Peso(5).equals(new Peso(5))).toBeTruthy();
      expect(new Peso(5).equals(new Peso(6))).toBeFalsy();
    });
  });
});
```

Now let's get `Peso` to extend `Money`

```ts
export class Peso extends Money {
  constructor(amount: number) {
    super();
    this.amount = amount;
  }

  public times(multiplier: number) {
    return new Peso(this.amount * multiplier);
  }
}
```

# CHAPTER 7: APPLES AND ORANGES

Question: What happens if we compare Dollars and Pesos?

```ts
expect(new Dollar(5).equals(new Peso(5))).toBeFalsy();
```

It fails 🙁.

```ts
public equals(money: Money) {
  return this.amount === money.amount
      && this.constructor.name === money.constructor.name;
}
```

This is a code smell but that doesn't mean that you can't leave it like that.
We note it and move on.

# CHAPTER 8: MAKIN' OBJECTS

Let's move the constructor's up to `Money`

```ts
export class Money {
  protected amount: number = 0;

  // Added this
  constructor(amount: number) {
    this.amount = amount;
  }

  public equals(money: Money) {
    return this.amount === money.amount && this.constructor.name === money.constructor.name;
  }
}
```

Now let's try to get `times` to match.
But, we can't get rid of it until we eliminate references to `Dollar` and `Peso` because of the constructor name comparison.

Start with adding a factory method for the `Dollar.times` test

```ts
it('returns the result', () => {
  const five = Money.dollar(5); // This changed

  expect(five.times(2).equals(new Dollar(10))).toBeTruthy();
  expect(five.times(3).equals(new Dollar(15))).toBeTruthy();
});
```

Create the static method

Now change all the other references in the Dollar tests

```ts
describe('Dollar', () => {
  describe('#times', () => {
    it('returns the result', () => {
      const five = Money.dollar(5);

      expect(five.times(2).equals(Money.dollar(10))).toBeTruthy();
      expect(five.times(3).equals(Money.dollar(15))).toBeTruthy();
    });
  });

  describe('#equals', () => {
    describe('when they are equal', () => {
      it('returns true', () => {
        expect(Money.dollar(5).equals(Money.dollar(5))).toBeTruthy();
        expect(Money.dollar(5).equals(Money.dollar(6))).toBeFalsy();
        expect(Money.dollar(5).equals(new Peso(5))).toBeFalsy();
      });
    });
  });
});
```

Quoting Kent Beck

> "By decoupling the tests from the existence of the subclasses, we have given ourselves the freedom to change inheritance without affecting any model code"

The tests still pass!

Let's update the `Peso` tests.

```ts
describe('Peso', () => {
  describe('#times', () => {
    it('returns the result', () => {
      const five = Money.peso(5);

      expect(five.times(2).equals(Money.peso(10))).toBeTruthy();
      expect(five.times(3).equals(Money.peso(15))).toBeTruthy();
    });
  });

  describe('#equals', () => {
    describe('when they are equal', () => {
      it('returns true', () => {
        expect(Money.peso(5).equals(Money.peso(5))).toBeTruthy();
        expect(Money.peso(5).equals(Money.peso(6))).toBeFalsy();
      });
    });
  });
});
```

Now, we're much more well equipped to remove `times`

# CHAPTER 9: Times We're Living In

If we're trying to eliminate the sub-classes, we somehow still have to know what type of money it is.

Let's add a new concept called `currency`.

```ts
// In Dollar tests
describe('#getCurrency', () => {
  it('returns USD', () => {
    expect(Money.dollar(10).getCurrency()).toEqual('USD');
  });
});

// In Peso tests
describe('#getCurrency', () => {
  it('returns USD', () => {
    expect(Money.peso(10).getCurrency()).toEqual('MXN');
  });
});
```

Easiest way to make those pass, is adding methods to each sub-class

```ts
// In Dollar
public getCurrency() {
  return "USD";
}

// In Money
public getCurrency() {
  return "MXN";
}
```

Now that the tests pass, REFACTOR!!

Update the `Money` constructor to take a currency

```ts
constructor(amount: number, currency: string) {
  this.amount = amount;
  this.currency = currency;
}
```

Update the references.

But see how we're putting currencies everywhere now!

Let's use our factory methods inside `times`

```ts
// In Dollar
public times(multiplier: number) {
  return Money.dollar(this.amount * multiplier);
}

// In Peso
public times(multiplier: number) {
  return Money.peso(this.amount * multiplier);
}
```

We're almost ready to push up `times`

# Chapter 10: Interesting Times

We are so close to getting `times` identical, but looking at them I don't know what to do next.

Let's undo our last change (it's frustrating right?) and try.

```ts
export class Dollar extends Money {
  public times(multiplier: number) {
    return new Dollar(this.amount * multiplier, this.getCurrency()); // Changed this back
  }
}

export class Peso extends Money {
  public times(multiplier: number) {
    return new Peso(this.amount * multiplier, this.getCurrency()); // Changed this back
  }
}
```

Next change the classes to `Money`

```ts
export class Dollar extends Money {
  public times(multiplier: number) {
    return new Money(this.amount * multiplier, this.getCurrency());
  }
}

export class Peso extends Money {
  public times(multiplier: number) {
    return new Money(this.amount * multiplier, this.getCurrency());
  }
}
```

Run the tests, they fail!

Why? Because of the `equals` using the constructor name comparison.
IT WAS A CODE SMELL 👃!

Update `Money.equals`

```ts
public equals(money: Money) {
  return this.amount === money.amount
      && this.getCurrency() === money.getCurrency();
}
```

Remove them from the subclasses
Run the tests. They pass!

Update `Money.dollar` and `Money.peso` to return `Money` instead.
