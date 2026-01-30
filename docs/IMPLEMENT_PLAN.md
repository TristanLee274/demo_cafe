# Implementation Plan - Project Restracture

## Phase 1: Restructuring
- [ ] Create directory structure: `src`, `test`, `scripts`, `docs`
- [ ] Move `frontend` to `src/frontend`
- [ ] Move `backend` to `src/backend`
- [ ] Move root documents to `docs/` (`README.md`, `SRS.md`, `TASKS.md`)

## Phase 2: Documentation Setup
- [ ] Create `.agent/PRISM_RULES.md` (User rules for Antigravity)
- [ ] Update `docs/README.md` with new structure info
- [ ] Create `docs/SYSTEM_OPERATIONS.md`
- [ ] Create `docs/ERD.md`

## Phase 3: Scripts Setup
- [ ] Create `scripts/start-fe.sh` (cd src/frontend && npm run dev)
- [ ] Create `scripts/start-be.sh` (cd src/backend && python3 main.py)
- [ ] Create `scripts/build.sh` (Placeholders for now)

## Phase 4: Validation & Git
- [ ] Verify structure
- [ ] Git add, commit, push
- [ ] Update this plan to Complete
