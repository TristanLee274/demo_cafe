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
