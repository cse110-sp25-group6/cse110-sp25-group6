# Contributing to My CS Monsters
Firstly, Thank you for taking the time to contribute to this project!! It means a lot to our team

## Table Of Contents
- [Getting started](#so-how-can-i-get-started)
- [Folder Structure](#folder-structure)
- [Branches](#to-branch-or-not-to-branch)
- [Pipline](#pipeline)
- [Testing](#testing-123)

## So... How can I get started?
That is a very good question. Since our app is a web app, there are no dependencies or downloads that you will have to make. Just have a coding environment, a terminal, and you are set! The latest public build will always be on the main branch while work-in-progress builds will be on the development branch. If you want to learn more about Branches [click here](#to-branch-or-not-to-branch)

## Folder Structure
Here is a quick overview of our folder structure. Important folders are starred (**) for your convenience
```
CSE110-SP25-GROUP6
├──.github - general git hub files (issue templates etc)
│
├──.vscode - General vscode settings
│
├── admin - Folder for general company documents related to this project
│   │
│   ├── assets - images and other assets used in readme's and docs
│   │
│   ├── branding - Our brand assets
│   │
│   ├── **cipipline - docs and assets showing and explaining our CI Pipeline
│   │
│   ├── meetings - documentation for all our past meetings
│   │
│   ├── misc - our signed team contracts
│   │
│   └── video - Videos that we filmed relating to the team and the project
│
├── source - This is where all our projects code is
│   │
│   ├── assets - assets used by our source files
│   │
│   ├── **card_data - data for our cards (JSON objects and images)
│   │
│   ├── **collection - Collection page functionality 
│   │
│   ├── **components - Universal components used across the site
│   │
│   ├── config - our CIpipline configs
│   │
│   ├── **homepage - homepage functionality
│   │
│   ├── img - images used by our source files
│   │
│   ├── **pullpage - pullpage functionality
│   │
│   └── **util - global functions and styles used across the site
│   
└── specs
    │
    ├── **adrs - documentation of all major project decisions
    │
    └── brainstorm - artifacts of our project brainstorming
    
```

## To Branch or not to Branch?
Again, Since our app is a web app, we separated our features into different pages with each page being developed separately on different branches.

Quick Rundown on our existing branches:
- Main - the Main branch is the public build. This is our latest release and what the customer will see
- Development - The Development branch is where are prereleases are. This is where we can see our in progress builds and features that we haven't released yet
- Pages
    - Homepage - The Homepage branch is where our developing homepage lives. Any updates to homepage will first be tested here
    - Pullpage - The Pullpage branch is where our developing pullpage lives. Any updates to pullpage will first be tested here 
    - Collection - The Collection page branch is where our developing Collection page lives. Any updates to collections will first be tested here
- individual branches - Individual branches are your all your own. This is where you will be doing most of your work!

## Pipeline
I see that you are eager to start working, lets go through the pipeline.
- Assign Issues - Firstly you must assign yourself the issue. Whether it is a new feature, bug, or documentation, assign yourself the issue or create a new issue before you start any work. 
- Pull - Next Pull from the desired branch. Assume you are working on a new feature for the homepage, pull the latest code from the homepage branch onto your machine
- Create a new branch - to prevent any conflicts, make sure that after you have pulled, create a new branch for yourself. This will be your very own space to do whatever you need to do
- Before pushing your code, run local checks to make sure that your code follows our CI standards
    - `npm install` (install dev dependencies)
    - `npm run lint` (run linter to check for JS errors)
    - `npm run test` (run tests)
    - `npm run prettier`:check (check formatting)
    - use `npm run prettier:fix` to automatically fix formatting issues
    - **IMPORTANT**: If any of these fail, please fix these issues before pushing.
- Push to your branch and submit a pull request- Now that you have finished your wonderful additions push your changes to your branch and submit a pull request to merge your branch into the page that you have been working. Going along with the homepage example, you should be merging into the homepage branch.
- Done! thats it! Your PR will be reviewed, and if accepted it will be merged. Once that is merged, a PR will be submitted to merge into development. Once that is approved, another PR will be submitted to merge into Main. 

This long pipeline will ensure that code will be reviewed by multiple people and many times.

<!--
## Testing... 1,2,3
Now you're wondering how to test your code huh. What a good dev you are.  
-->