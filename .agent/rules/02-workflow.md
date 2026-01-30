# Rule: Operational Workflow

## Core Principle
"Read first, Plan second, Code third."

## Workflow Steps

### 1. Preparation
- **Read Documentation**: Before writing any code, you MUST read the `docs/IMPLEMENT_PLAN.md` and other relevant `.md` files in `docs/` or `.agent/`.
- **Context Awareness**: Understand the current state of the project from the documentation, not just the code.

### 2. Planning (`concise-planning`)
- **Analyze**: Break down the user request.
- **Plan**: Create a concise plan of action.
- **Decision**: If significant architectural changes are needed, consult/create ADRs.

### 3. Execution
- **Implementation**: Write high-quality code.
- **Language**: If the user communicates in a specific language (e.g., Vietnamese), respond in that language.

### 4. Tracking & Completion
- **Update Plan**: Immediately mark tasks as completed in `docs/IMPLEMENT_PLAN.md`.
- **Git Operations**:
  - Stage changes (`git add`).
  - Commit with conventional commits (`git commit`).
  - Push to remote (`git push`).
