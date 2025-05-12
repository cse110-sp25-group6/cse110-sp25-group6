# CI/CD Pipeline Phase 1 Report

![Pipeline Diagram](./phase1.png)

---

## Overview

This document summarizes the current state and future plans for our CI/CD pipeline, implemented using **GitHub Actions**. The pipeline is designed to automate essential checks such as linting, testing, documentation, and code reviews to improve code quality and maintain development efficiency.

Our goal in Phase 1 is to build a foundational, testable CI process using experimental code and setup—not full production builds. This sets the groundwork for more sophisticated CI/CD functionality in later phases.

---

## Pipeline status: Planned

The status of the pipeline is mostly completed, but few parts are still in progress as detailed below. The diagram for the pipeline has been created and is shown above.

---

## Linting

We will be using a linter that runs every time we push new code, which will help us avoid simple mistakes, enforce accessibility rules for HTML/CSS and keep our codebase clean.

> This is completed and functional.

---

## Code Style Review

Prettyfi

> This is completed and functional.

---

## HTML/CSS Validator

We have implemented the HTML and CSS validator using Cyb3r-Jak3's html5validator-action on GitHub Actions. 

> This is completed and functional.

---

## Unit Tests

We will use Jest to initially tests planned for utility function, auto-verify correctness of core logic on every commit or PR.

> This is completed and functional.

---

## Code Review (human with pull requests)

For the manual pull request review, do we want to have designated people to check it, or just whoever is available to take a second look?

> This is planned and completed, but has yet to be functionally utilized yet.

---

## Document Generation

- Tools: Prettier/JSDoc  
- Status/Trigger: Generated manually: “npm run ___” available  
- Purpose: Auto-generate API document for easier collaboration

> This is planned and in progress.

---

## Assets Validation/Review

Just as a user, maintain a consistent and performant UI asset pipeline.

> insert status here

---

## Manual Testing (end-to-end)

The code will be manually tested by developers to evaluate the functionality and visual aspects. Developers will visit the application, simulating potential user actions. If an area is missing visual/aesthetic aspects or lacks performance quality, the developers will return to the code. They will make improvements and modify the existing code to meet developer and user expectations. Once stable, we will use https://playwright.dev/ as another method of manual testing. This resource will be utilized to automate manual testing, allowing for greater time efficiency and verification of results. Additionally, we may communicate with other groups and ask them to test the application. This method of manual testing could provide more useful feedback in terms of quality and cleanliness. 

> This is completed, but has not been functionally utilized yet.

