---
Date: 05/11/25
---

# Use GitHub Actions for CI/CD Pipeline

## Context and Problem Statement

Where can we build our development workflows?
How can we organize our pipeline for quick integration and deployment?
How to easily modify our pipeline when making modifications?
Where can we use the tools we find to evaluate our development process?

## Considered Solutions/Options


* GitHub Actions
* Jenkins
* Azure DevOps

## Decision:

We chose `GitHub Actions` because of its quick turnaround time from making changes to the repository to deployment, as well as its straightforward setup process.

## Pros

* Well synced with GitHub as it is a tool within the platform
* Free to use since we have a public repository
* Supports many of the components of the pipeline that we plan to use

## Cons 

* Costs money if we ever make our repository private (not open source)
* Debugging can be difficult at times with logs being quite complex

## Examples/Any more important information

Our main.yml file can be found under .github/workflows
