# Meeting Notes - 5/10/25
## Agenda

- Management Contract Checking
- CI/CD Pipeline
- ADR

## Members Present
- Andrew Zhao  
- Yanhua Liu  
- Anna  
- Atharva  
- Blake  
- Chakshan  
- Ferrari  
- Lia  
- Khuyen Lai  
- Adrian  

---

# CI/CD Pipeline Components

### Tools & Practices
- **Linting** (with VSCode?)
- **Code Style** (with Prettier extension?)
- **HTML / CSS Validator**
- **Unit Tests**
- **Code Review** (human via pull requests)
- **Documentation Generation**
- **Assets Validation/Review**
- **Manual Testing** (for end-to-end functionality)

---

### From Assignment

- **Linting and Code Style Enforcement**  
  May occur in the editor or CI pipeline.

- **Code Quality Tools**  
  Tools like CodeClimate, Codacy, etc.

- **Human Code Review**  
  Pull request-based code review.

- **Unit Tests via Automation**  
  Tools like Jest, Tape, Ava, Cypress, Mocha/Chai, etc.

- **Documentation Generation via Automation**  
  e.g., JSDocs

- **Other Testing**  
  Includes end-to-end and pixel testing environments.

---

# Phase 1 - Pipeline Status (by Bosco)

- **Status**: Planned  
- **Note**: Diagram for the pipeline has been created.

---

## Task Assignments

### Linting – *Chakshan*
We will use a linter that runs on each code push. This will prevent simple bugs, enforce accessibility for HTML/CSS, and keep the codebase clean.

### Code Style Review – *Chakshan*
Using Prettier (`prettyfi`) to maintain consistent code formatting across the team.

### HTML/CSS Validator – *Blake*
HTML and CSS validators will be implemented using npm packages to check for syntax errors and enforce best practices in markup styling.

### Unit Tests – *Ferrari*
We will use **Jest** to run unit tests, focusing on utility functions and core logic. These tests will run on every commit or PR to ensure correctness.

### Code Review (Human w/ Pull Requests) – *Abdirahman*
Team members will manually review all pull requests. If issues are identified, they will be discussed with the author, and necessary fixes will be made to maintain code quality.

### Document Generation – *Chakshan*
- **Tools**: Prettier, JSDoc  
- **Status/Trigger**: Manually triggered via `npm run ___`  
- **Purpose**: Auto-generate API documentation to improve team collaboration.

### Assets Validation/Review – *Lia*
Maintain consistent and performant UI by reviewing all UI assets to ensure quality and adherence to design principles.

### Manual Testing (End-to-End) – *Anna*
Developers will simulate user actions to test visual and functional aspects of the app. Based on observations, code will be updated to meet expected standards.  
Once stabilized, [Playwright](https://playwright.dev/) will be used to automate manual testing, enhancing efficiency. We may also involve other groups for external testing and feedback.
