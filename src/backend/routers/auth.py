from flask import Blueprint, request, jsonify, current_app, g
from werkzeug.security import generate_password_hash, check_password_hash
from itsdangerous import URLSafeTimedSerializer, SignatureExpired, BadSignature
from functools import wraps
from database import get_db
from models import User

auth = Blueprint('auth', __name__)

def get_serializer():
    return URLSafeTimedSerializer(current_app.config['SECRET_KEY'])

def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        auth_header = request.headers.get('Authorization')
        if not auth_header:
            return jsonify({"msg": "Missing Authorization Header"}), 401
        
        try:
            token = auth_header.split(" ")[1] # Bearer <token>
        except IndexError:
            return jsonify({"msg": "Invalid Token Format"}), 401

        serializer = get_serializer()
        try:
            user_id = serializer.loads(token, max_age=86400) # 24 hours
        except SignatureExpired:
            return jsonify({"msg": "Token has expired"}), 401
        except BadSignature:
            return jsonify({"msg": "Invalid token"}), 401
        except Exception as e:
            return jsonify({"msg": str(e)}), 401

        db = next(get_db())
        user = db.query(User).filter(User.id == user_id).first()
        if not user:
             return jsonify({"msg": "User not found"}), 401
        
        g.user = user
        return f(*args, **kwargs)
    return decorated_function

def admin_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if not g.user or g.user.role != 'admin':
            return jsonify({"msg": "Admins only!"}), 403
        return f(*args, **kwargs)
    return decorated_function

@auth.route('/register', methods=['POST'])
def register():
    db = next(get_db())
    data = request.get_json()
    
    email = data.get('email')
    password = data.get('password')
    full_name = data.get('full_name')
    phone = data.get('phone')
    
    if not email or not password:
        return jsonify({"msg": "Email and password are required"}), 400
        
    if db.query(User).filter(User.email == email).first():
        return jsonify({"msg": "Email already exists"}), 400
        
    user = User(
        email=email,
        password_hash=generate_password_hash(password),
        full_name=full_name,
        phone=phone
    )
    
    db.add(user)
    db.commit()
    
    return jsonify({"msg": "User created successfully"}), 201

@auth.route('/login', methods=['POST'])
def login():
    db = next(get_db())
    data = request.get_json()
    
    email = data.get('email')
    password = data.get('password')
    
    user = db.query(User).filter(User.email == email).first()
    
    if not user or not check_password_hash(user.password_hash, password):
        return jsonify({"msg": "Bad email or password"}), 401
        
    serializer = get_serializer()
    token = serializer.dumps(user.id)
    
    return jsonify({
        "access_token": token,
        "user": user.to_dict()
    }), 200

@auth.route('/me', methods=['GET'])
@login_required
def get_current_user():
    return jsonify(g.user.to_dict()), 200
