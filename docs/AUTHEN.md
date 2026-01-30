# Authentication & Authorization

## Overview
Security mechanisms for user identity and access control.

## Flow
1. **Login**: User submits credentials -> Server verifies -> Returns Token (JWT/Session).
2. **Access**: Token sent in Header `Authorization: Bearer <token>`.
3. **Refresh**: Token expiration handling.

## Roles
- `admin`: Full access.
- `user`: Limited access to own data.
- `guest`: Read-only public data.
