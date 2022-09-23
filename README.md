# Front End Chapter | Test Driven Development Workshop
Front End Chapter Workshop to learn the ins-and-outs of test driven development

## Ground Rules

Put your laptop on Do Not Disturb (We don't want those Teams messages coming through).

## What is Test Driven Development (TDD)?

Quoting Kent Beck, _"Test-driven development is a way of managing fear during programming"_.
But why would you fear your own programming?
Why would you fear your own code?
Maybe it's not the code... maybe it's you that you should be afraid of.
In my experience with TDD, I've learned that I can't trust myself without having a test to prove I programmed something right.
That may sound a little extreme but it's true.

All of us know that we need tests whether that's because
- We know we should do it (but secretly find testing tedious)
- Our team and leadership expects good code coverage
- It's "apparently" a better way to program

That's how I felt and the morale on my team wasn't helping either.
We had a saying, "Coding the logic takes an hour but testing afterwards takes three days". 
Ever felt like that?

Let's flip that on it's head so that you start with a test, code a little bit, and then make the test pass.
This is called the Red, Green, Refactor method.

![Red, Green, Refactor](./images/red-green-refactor.jpeg)

It looks like this:
1. Red: Write a failing test
2. Green: Write the smallest amount of code to make it pass
3. Refactor: Remove any duplication

Why?

There's tons of benefits to TDD and I can testify to them. Here's a few:
1. You're going to increase your code coverage by default
2. You're going to write classes that are more decoupled, code that's easier to test, and cleaner code because you're constantly refactoring
3. Refactor without the 💦
4. Ship less 🪲
5. My personal favorite: [Wishful coding](https://dev.to/rpalo/wishful-coding-dpj)

But you may think this sounds just like writing tests in general.
TDD is not just unit testing.
There's a difference: TDD is writing tests **before** you write the code.

TDD's strength lie in the unit test portion of the testing pyramid

![Testing Pyramid](./images/testing-pyramid.png)

You want to write tests that run quickly so you shorten your feedback loop.
You can hold off on the integration and E2E testing until later.

Enough talk. The best way to learn is through practice.

## What are we going to code?

Creating Dollars, Peso, and abstracting them.

## Getting Started

Go to your development folder and clone the repo

```bash
git clone https://github.com/patrady/fec-tdd-workshop.git
```

Open up the repo in your favorite IDE or if you're using VSCode then

```bash
code fec-tdd-workshop
```

Get everything setup on your machine and notice that there is a failing test

```bash
yarn install
yarn test
```
