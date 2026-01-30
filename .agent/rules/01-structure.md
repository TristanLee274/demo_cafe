# Rule: Project Structure

## Core Principle
The project adheres to a strict, modular directory structure to ensure separation of concerns and maintainability.

## Directory Layout
- **`src/`**: The root for all source code.
  - **`src/frontend/`**: The frontend application powered by React/Vite.
  - **`src/backend/`**: The backend logic powered by Python (Flask/FastAPI).
- **`test/`**: Dedicated folder for all testing tiers (Unit, Integration, E2E).
- **`scripts/`**: Automation and operational scripts.
  - `start-be.sh`: script to start backend.
  - `start-fe.sh`: script to start frontend.
  - `build.sh`: script to build the project.
- **`docs/`**: Project documentation and knowledge base.
  - `SYSTEM_OPERATIONS.md`: Runbooks and ops guides.
  - `ERD.md`: Entity Relationship Diagrams.
  - `IMPLEMENT_PLAN.md`: Tracking implementation progress.
  - `SRS.md`: (Software Requirements Specification) Detailed requirements and functional specs.
  - `CRUD.md`: Guidelines and standards for API CRUD operations.
  - `VALIDATION.md`: Rules for data validation (Input/Output) and error handling.
  - `AUTHEN.md`: Authentication flow (Login/Register) and Authorization rules (RBAC).
  - `SECURITY.md`: Security best practices, policies, and checklist.
- **`README.md`**: Root level project entry point.
