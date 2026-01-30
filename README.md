# Demo Cafe Application

A full-stack coffee shop e-commerce application built with **Flask (Python)** for the backend and **React (Vite)** for the frontend.

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your machine:
-   [Node.js](https://nodejs.org/) (v16 or higher)
-   [Python](https://www.python.org/) (v3.9 or higher)
-   [Git](https://git-scm.com/)

---

## 🚀 Setup & Run Instructions

### 1️⃣ Clone the Repository

First, download the project code to your local machine:

```bash
git clone https://github.com/TristanLee274/demo_cafe.git
cd demo_cafe
```

---

### 2️⃣ Backend Setup (Flask API)

The backend runs on port `8000` by default. It uses SQLite as the database.

#### 🍎 macOS / Linux

1.  Open a terminal and navigate to the `backend` folder:
    ```bash
    cd backend
    ```

2.  (Recommended) Create and activate a virtual environment:
    ```bash
    python3 -m venv venv
    source venv/bin/activate
    ```

3.  Install dependencies:
    ```bash
    pip3 install -r requirements.txt
    ```

4.  Initialize the Database (Create tables & Seed data):
    ```bash
    python3 seed_data.py
    ```
    *You should see a message: "Seeded ... categories and ... products!" or "Data already seeded!"*

5.  Start the Server:
    ```bash
    python3 main.py
    ```
    *Server runs at: `http://127.0.0.1:8000`*

#### 🪟 Windows

1.  Open Command Prompt (cmd) or PowerShell and navigate to the `backend` folder:
    ```bash
    cd backend
    ```

2.  (Recommended) Create and activate a virtual environment:
    ```bash
    python -m venv venv
    venv\Scripts\activate
    ```

3.  Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```

4.  Initialize the Database:
    ```bash
    python seed_data.py
    ```

5.  Start the Server:
    ```bash
    python main.py
    ```
    *Server runs at: `http://127.0.0.1:8000`*

---

### 3️⃣ Frontend Setup (React App)

The frontend runs on port `5173` by default.

**Instructions for both macOS/Linux & Windows:**

1.  Open a **new** terminal window (keep the backend running in the first one).
2.  Navigate to the `frontend` folder:
    ```bash
    cd frontend
    ```

3.  Install Node dependencies:
    ```bash
    npm install
    ```

4.  Start the Development Server:
    ```bash
    npm run dev
    ```
    *Access the app at: `http://localhost:5173`*

---

## 🛠 Features

-   **Browse Menu**: View products by categories (Hot Coffee, Iced Coffee, Specialty, Tea/Other).
-   **Product Details**: View detailed information about each drink.
-   **Shopping Cart**: Add items, adjust quantities, and review your order.
-   **Checkout**: Simple checkout form (mock order placement).
-   **Authentication**: Register and Login functionality.
-   **Order History**: View past orders (requires login).

## ❓ Troubleshooting

### Common Issues

1.  **"python" or "pip" command not found on macOS**: 
    -   macOS often aliases Python 3 as `python3` and Pip as `pip3`. Please use the `python3` command explicitly as shown in the instructions above.

2.  **Port already in use**:
    -   If port `8000` is busy, check if another instance of the backend is running.
    -   If port `5173` is busy, Vite will automatically try to use the next available port (e.g., 5174), check the terminal output for the correct URL.

3.  **Database Errors (Table not found / no such table)**:
    -   Ensure you ran the `seed_data.py` script **before** starting the main server. This script creates the `coffee_shop.db` file with the necessary table schema.

4.  **"externally-managed-environment" error on pip install**:
    -   This happens on some modern Linux/macOS systems to prevent breaking system packages. **Always use a virtual environment** (venv) as described in step 2.
