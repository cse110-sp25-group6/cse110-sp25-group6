---
Date: 05/11/25
---

# Using Cyb3r-Jak3's HTML5 validator with CSS implemented with github actions

## Question/Problem being solved, with context

Are we going to validate html/css files to ensure code quality?
How can we go about this using the CI/CD pipeline and/or js files?

## Considered Solutions/Options

* Use npm install html-validator and npm install w3c-css
* Fetch official W3C API for both html and css validation
* Use outsourced GitHub actions to directly implement into pipeline

## Decision:

We are going to use another already created GitHub action that directly implements the HTML and CSS validators into actions.

## Pros

* Easy to set up and integrate into pipeline
* Doesn't rely on public W3C API and public rate limits with requests
* Added security without needed to send files over the internet to the API

## Cons 


* Less customizable than directly using API/using npm libraries
* No direct access to W3C validator

## Examples/Any more important information

I think that using Cyb3r-Jak3's HTML5 validator will be easier and more integratable into our pipeline, without having to install many npm libraries ourselves. Below is a link to the GitHub action repo for it, and you can view example calls and actions on Marketplace.
Additionally, I have attached the npm libraries for html-validator and w3c-css aswell

[GitHub Actions Validator Repository](https://github.com/Cyb3r-Jak3/html5validator-action)
[html-validator documentation](https://www.npmjs.com/package/html-validator)
[w3c-css documentation](https://www.npmjs.com/package/w3c-css)