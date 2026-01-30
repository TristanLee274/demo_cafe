from flask import Blueprint, jsonify, request, g, current_app
from database import get_db
from models import Order, OrderItem, Product
from routers.auth import login_required
from itsdangerous import URLSafeTimedSerializer

orders = Blueprint('orders', __name__)

@orders.route("/orders", methods=["POST"])
@orders.route("/orders/", methods=["POST"]) # Handle trailing slash
def create_order():
    db = next(get_db())
    data = request.json
    
    # Calculate total
    total = 0
    order_items_data = []
    
    for item in data.get("items", []):
        product = db.query(Product).filter(Product.id == item["product_id"]).first()
        if not product:
            return jsonify({"error": f"Product {item['product_id']} not found"}), 404
        
        item_total = product.price * item["quantity"]
        total += item_total
        order_items_data.append({
            "product_id": item["product_id"],
            "quantity": item["quantity"],
            "price": product.price
        })
    
    # Create order
    user_id = data.get("user_id") 
    
    # Try to extract user from token if present
    auth_header = request.headers.get('Authorization')
    if auth_header:
        try:
            token = auth_header.split(" ")[1]
            s = URLSafeTimedSerializer(current_app.config['SECRET_KEY'])
            # Assuming same max_age as auth.py
            token_user_id = s.loads(token, max_age=86400)
            user_id = token_user_id
        except Exception:
            # Token invalid or expired, ignore and treat as guest (or user_id from body if any)
            pass

    order = Order(
        customer_name=data["customer_name"],
        email=data["email"],
        phone=data["phone"],
        address=data["address"],
        notes=data.get("notes"),
        total=total,
        status="pending",
        user_id=user_id 
    )
    db.add(order)
    db.commit()
    db.refresh(order)
    
    # Create order items
    for item_data in order_items_data:
        order_item = OrderItem(
            order_id=order.id,
            product_id=item_data["product_id"],
            quantity=item_data["quantity"],
            price=item_data["price"]
        )
        db.add(order_item)
    
    db.commit()
    db.refresh(order)
    result = order.to_dict()
    return jsonify(result), 201

@orders.route("/orders/<int:order_id>")
def get_order(order_id):
    db = next(get_db())
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        return jsonify({"error": "Order not found"}), 404
    result = order.to_dict()
    return jsonify(result)

@orders.route("/orders/mine", methods=["GET"])
@login_required
def get_my_orders():
    db = next(get_db())
    # g.user is set by login_required
    user_orders = db.query(Order).filter(Order.user_id == g.user.id).order_by(Order.created_at.desc()).all()
    results = [order.to_dict() for order in user_orders]
    return jsonify(results), 200
