# Rule: Coding Standards

## Core Principle
Code must be clean, aesthetic, and aligned with the single source of truth.

## Standards

### 1. Aesthetics & UI/UX
- **Premium Quality**: The UI must look professional and "complete", avoiding barebones or "MVP" looks unless specified.
- **Modern Modernity**: Use current design trends (Glassmorphism, clean typography, spacing).

### 2. Code Quality
- **Linting**: No linting errors should remain.
- **Validation**: Validate inputs and outputs rigorously.
- **Clean Code**: Follow principles of DRY (Don't Repeat Yourself) and SOLID.

### 3. Documentation First (The One Truth)
- Documentation (`docs/*.md`) is the **Source of Truth**.
- **Compliance Required**:
  - API endpoints must follow `docs/CRUD.md`.
  - Security implementations must adhere to `docs/SECURITY.md`.
  - Input handling must follow `docs/VALIDATION.md`.
  - Auth flows must match `docs/AUTHEN.md`.
- If code conflicts with documentation, update the code or rigorously justify the doc update.
- Keep documentation in sync with code changes (`kaizen`).

### 4. Git Commit Conventions
All commits must follow a standardized format for clarity and tracking.

**Format**: `[task] commit message`

**Task Types**:
- **`[plan]`**: Documentation, planning, and design changes.
  - Example: `[plan] add authentication flow diagram`
- **`[code]`**: Implementation of new features or refactoring.
  - Example: `[code] implement user login endpoint`
- **`[test]`**: Adding or updating tests.
  - Example: `[test] add unit tests for validation service`
- **`[deploy]`**: Deployment configurations, CI/CD, or build scripts.
  - Example: `[deploy] update production nginx config`
- **`[fixbug]`**: Bug fixes and patches.
  - Example: `[fixbug] resolve null pointer in cart calculation`
- **`[docs]`**: Documentation-only changes (README, guides, etc.).
  - Example: `[docs] update installation instructions`
- **`[refactor]`**: Code restructuring without changing functionality.
  - Example: `[refactor] reorganize project structure`

**Rules**:
- Keep messages concise but descriptive.
- Use lowercase for the message body.
- Use present tense (e.g., "add" not "added").
