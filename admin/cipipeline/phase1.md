# CI/CD Pipeline Phase 1 Report

![Pipeline Diagram](./phase1.png)

---

## Overview

This document summarizes the current state and future plans for our CI/CD pipeline, implemented using **GitHub Actions**. The pipeline is designed to automate essential checks such as linting, testing, documentation, and code reviews to improve code quality and maintain development efficiency.

Our goal in Phase 1 is to build a foundational, testable CI process using experimental code and setup—not full production builds. This sets the groundwork for more sophisticated CI/CD functionality in later phases.

---

## ✅ Pipeline status: Planned
The status of the pipeline is planned. The diagram for the pipeline has been created. 

---

## Linting

We will be using a linter that runs every time we push new code, which will help us avoid simple mistakes, enforce accessibility rules for HTML/CSS and keep our codebase clean.

---

## Code Style Review

Prettyfi

---

## HTML/CSS Validator

We will be implementing HTML and CSS validators to help check the syntax of the html and css utilized in the project. These validators will be implemented through npm installation.

---

## Unit Tests

We will use Jest to initially tests planned for utility function, auto-verify correctness of core logic on every commit or PR.

---

## Code Review (human with pull requests)

For the manual pull request review, do we want to have designated people to check it, or just whoever is available to take a second look?

---

## Document Generation

- Tools: Prettier/JSDoc  
- Status/Trigger: Generated manually: “npm run ___” available  
- Purpose: Auto-generate API document for easier collaboration

---

## Assets Validation/Review

Just as a user, maintain a consistent and performant UI asset pipeline.

---

## Manual Testing (end-to-end)

- Manual human testing  
- Once stable, we will use https://playwright.dev/ as another method of manual testing.

