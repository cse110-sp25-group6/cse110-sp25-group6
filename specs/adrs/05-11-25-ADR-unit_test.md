---
Date: 05/11/25
---

# Jest for unit test

## Question/Problem being solved, with context

The team needed a unit testing step for the CI/CD pipeline. 
The team needed to ensure that pushed code is tested for logical correctness before merging with main. 

## Considered Solutions/Options

The following are possible solutions:
- JEST
- Cypress

## Decision:

We chose to go with JEST

## Pros

- familiarity: JEST was used in a lab
- JEST is similar to other unit testers that the team members have used (JUNIT for Java)
- Cypress is more used for end to end. The team is not at that stage yet.

## Cons 

- May not be the best option out there, but it is good for the team's current stage of development. 

## Examples/Any more important information

- JEST can be easily integrated into a Github action. 