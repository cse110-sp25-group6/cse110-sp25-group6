---
Date: 06-01-25
---

# Location and Format of All Card Data Storage


## Context and Problem Statement

We needed to come to a consensus on where to keep all of the card data such as images, stats, etc, so that we could
use it in the website when giving the user new cards.

## Considered Solutions/Options

* This information about the cards would remain static throught the entire time a user uses the website.
* Given this, we had the following options:
  * Keep all of the card data on the GitHub Repo within JSON's and folders.
  * Keep the data on a server where we would store everything.
  * Keep the data in CSV files on the repo.
  * Keep the data within a dictionary that would be instantiated on load of the website.

## Decision:

We chose to keep the card information in JSON's and folders on the GitHub Repository.

## Pros

* Every change the the cards can be tracked with commits
* No backend is necessary for this approach
* JSON is a very easy-to-use format for data that provides good readability

## Cons 

* As the website scales, storing all of this data, espcially the images, make prove to slow things down with git
* We have to redeploy every time a slight modification to a card is made which is also slowed down by the sheer amount of data being stored

## Examples/Any more important information


Note: This is not where we store user data, this is where we store information on every possible card the user could obtain.
