# Coffee House Project Walkthrough

## Prerequisites
- Node.js (v14+)
- Python (3.9+)

## Setup

### Backend
1. Navigate to `backend`:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   pip install flask flask-cors flask-sqlalchemy flask-jwt-extended passlib
   ```
3. Run the server:
   ```bash
   python main.py
   ```
   Server runs at `http://localhost:5000`.

### Frontend
1. Navigate to `frontend`:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
   Frontend runs at `http://localhost:5173`.

## Features

### User Flow
1. **Register**: Go to `/register` to create an account.
2. **Login**: Use your credentials to log in.
3. **Shop**: Add items to the cart from the Home or Menu page.
4. **Checkout**: Go to Cart -> Checkout. Your info will be pre-filled if logged in.
5. **Orders**: View your order history in Profile.

### Admin Access
- Currently, admin status is manually set in the database (role='admin').
- Admins can access the **Admin Dashboard** via the header link (visible only to admins).
- Creating/Editing products is not yet implemented in the UI.

## Testing
- **Validation**: Try entering an existing email during registration (Shake error).
- **Security**: Try accessing `/admin` or `/profile` without logging in (Redirects to Login/Home).
- **Order Tracking**: Place an order and verify it appears in "My Orders".
