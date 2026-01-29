from flask import Blueprint, jsonify, request
from database import get_db
from models import Product, Category

products = Blueprint('products', __name__)

@products.route("/categories")
def get_categories():
    db = next(get_db())
    categories = db.query(Category).all()
    result = [cat.to_dict() for cat in categories]
    return jsonify(result)

@products.route("/products")
def get_products():
    db = next(get_db())
    category_id = request.args.get("category_id", type=int)
    search = request.args.get("search")
    
    query = db.query(Product)
    if category_id:
        query = query.filter(Product.category_id == category_id)
    if search:
        query = query.filter(Product.name.ilike(f"%{search}%"))
    
    products_list = query.all()
    result = [p.to_dict() for p in products_list]
    return jsonify(result)

@products.route("/products/featured/list")
def get_featured_products():
    db = next(get_db())
    limit = request.args.get("limit", 6, type=int)
    products_list = db.query(Product).limit(limit).all()
    result = [p.to_dict() for p in products_list]
    return jsonify(result)

@products.route("/products/<int:product_id>")
def get_product(product_id):
    db = next(get_db())
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        return jsonify({"error": "Product not found"}), 404
    result = product.to_dict()
    return jsonify(result)
