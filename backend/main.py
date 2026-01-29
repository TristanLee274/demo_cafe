from flask import Flask, jsonify
from flask_cors import CORS
from database import engine, Base
from routers.auth import auth
from routers.products import products
from routers.orders import orders

# Create tables
Base.metadata.create_all(bind=engine)

app = Flask(__name__)
app.config['SECRET_KEY'] = 'dev-secret-key-change-this-in-env' # Simple secret key

CORS(app, origins=["http://localhost:5173", "http://localhost:3000", "http://127.0.0.1:5173"])

# Register Blueprints
app.register_blueprint(auth, url_prefix='/api/auth')
app.register_blueprint(products, url_prefix='/api')
app.register_blueprint(orders, url_prefix='/api')

@app.route("/")
def root():
    return jsonify({"message": "Welcome to Coffee Shop API"})

@app.route("/api/health")
def health():
    return jsonify({"status": "healthy"})

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=8000, debug=True, use_reloader=False)
