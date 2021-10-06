## Background

"Blind" voting on a public blockchain takes some thought. All data is public so without any extra tricks it's trivial to see who voted what and which side is likely to win. This can greatly bias voters and lead to inefficient decisions.

One way to mitigate this is to use a "commit-reveal" scheme. In such a scheme, eligible voters commit `Hash(x + secret)` in some "commit period" where `x` is their vote choice. For simplicitly, suppose `x` is either 0 or 1 and the `"+"` operator means concatenation. So for example, a user might commit a vote `"Hash(0~mysuperbigsecret)"`. We call this the "commitment".

After the "commit period", voters can reveal their vote by supplying `(x + secret)`, and their `Hash(x + secret)`. This would be `"0~mysuperbigsecret"` and `"Hash(0~mysuperbigsecret)"` respectively, in this case. Using the fact that hash collisions are impossible using a cryptographic hash function, we can cryptographically prove that a user committed to a particular vote by computing the hash of `(x + secret)` and comparing it with the supplied commitment.

Using this technique, it's now impossible to know what a given user committed to before the revealing period unless they told you their secret beforehand, grealty improving the effectiveness of the vote.

## The task

Write a simple implementation of a commit-reveal vote scheme in Solidity and a very simple script to wrap it and make it easy for users to participate in the vote.

The Solidity implementation is very simple: it has only two choices, "YES" and "NO", the commit phase lasts 2 minutes, and users can vote multiple times.

- If the blockchain is in the commit phrase, the user should be able to see the two choices they can vote for, "YES" and "NO", and commit a vote. A user can run this as many times as they want, provided they use a different secret each time. Behind the scenes it should be map "YES" and "NO" to the appropriate "1" or "2"
- If the blockchain is in the reveal phase, the user should be able to reveal a vote by supplying their secret and their vote. A user can run this as many times as they want, provided they reveal a different commit each time.
- If all votes have been revealed, the program should output
  - The winner of the vote
  - How many votes were cast




## How to run the contracts

First, kick off Ganache: `> ganache-cli`

Second, run `> truffle migrate`

Third, run `> truffle console`

Fourth, run `> let instance = await CommitReveal.deployed()` to get the deployed instance in truffle's console

Fifth, run `> instance.address` to get the deployed address


## How to run the client

First, run `> cd ./client`

Second, install dependencies. `> npm i`

Third, replace the existing address with the new deployed address (Step #5 of running contracts) in `config.js` file

![#3](https://i.ibb.co/r75HJ7d/Screen-Shot-2021-09-23-at-12-18-15-PM.png)

Fourth, run `npm run start`

![#4](https://i.ibb.co/tpC4D31/Screen-Shot-2021-09-23-at-12-34-32-PM.png)





