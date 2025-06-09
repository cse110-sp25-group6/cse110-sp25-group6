---
Date: 06-01-25
---

# Format For Storing Certain Files into Certain Folders


## Context and Problem Statement

We needed to decide on how we were going to organize all of our files for the website into folders to make
it easy to traverse the GitHub Repo.

## Considered Solutions/Options

* The system that we were going to by for organizng has to be easy to understand
* We needed the format to be efficient which gave us the following options:
  * Organize files by their file type (all JS go in the JS folder, all CSS go in the CSS folder, etc)
  * Organize files by their feature (all files used for the collection page go into the collection folder, etc)

## Decision:

We chose to organize files by their feature

## Pros

* Every team that is working on a particular feature knows exactly where their files are being kept
* If a team member ever needs to help out on a different feature from their own, they know which files to look at
* Pull requests remain focused and small, since each feature folder contains only the files relevant to that feature  

## Cons 

* Shared utilities or assets may end up duplicated or harder to locate if they span multiple features
* Navigating cross-cutting concerns (for example, global styling or common components) requires knowing a separate “shared” or “common” folder structure

## Examples/Any more important information

*write anything else relevant to the decision/important information related*