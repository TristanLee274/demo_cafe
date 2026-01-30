from sqlalchemy import Column, Integer, String, Float, Text, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from database import Base

class Category(Base):
    __tablename__ = "categories"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    description = Column(Text)
    image_url = Column(String(500))
    products = relationship("Product", back_populates="category")

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "image_url": self.image_url
        }

class Product(Base):
    __tablename__ = "products"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(200), nullable=False)
    description = Column(Text)
    price = Column(Float, nullable=False)
    image_url = Column(String(500))
    category_id = Column(Integer, ForeignKey("categories.id"))
    category = relationship("Category", back_populates="products")
    # order_items = relationship("OrderItem", back_populates="product") # Optional reverse relation

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "price": self.price,
            "image_url": self.image_url,
            "category_id": self.category_id,
            "category": self.category.to_dict() if self.category else None
        }

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(200), unique=True, nullable=False, index=True)
    password_hash = Column(String(200), nullable=False)
    full_name = Column(String(200))
    phone = Column(String(20))
    role = Column(String(20), default="customer") # customer, staff, admin
    is_active = Column(Integer, default=1) # 1: active, 0: inactive
    created_at = Column(DateTime, default=datetime.utcnow)
    orders = relationship("Order", back_populates="user")

    def to_dict(self):
        return {
            "id": self.id,
            "email": self.email,
            "full_name": self.full_name,
            "phone": self.phone,
            "role": self.role,
            "is_active": bool(self.is_active),
            "created_at": self.created_at.isoformat() if self.created_at else None
        }

class Order(Base):
    __tablename__ = "orders"
    id = Column(Integer, primary_key=True, index=True)
    customer_name = Column(String(200), nullable=False)
    email = Column(String(200), nullable=False)
    phone = Column(String(20), nullable=False)
    address = Column(Text, nullable=False)
    total = Column(Float, nullable=False)
    status = Column(String(50), default="pending")
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    user = relationship("User", back_populates="orders")
    created_at = Column(DateTime, default=datetime.utcnow)
    notes = Column(Text)
    items = relationship("OrderItem", back_populates="order")

    def to_dict(self):
        return {
            "id": self.id,
            "customer_name": self.customer_name,
            "email": self.email,
            "phone": self.phone,
            "address": self.address,
            "total": self.total,
            "status": self.status,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "notes": self.notes,
            "items": [item.to_dict() for item in self.items]
        }

class OrderItem(Base):
    __tablename__ = "order_items"
    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.id"))
    product_id = Column(Integer, ForeignKey("products.id"))
    quantity = Column(Integer, nullable=False)
    price = Column(Float, nullable=False)
    order = relationship("Order", back_populates="items")
    product = relationship("Product")

    def to_dict(self):
        return {
            "id": self.id,
            "product_id": self.product_id,
            "quantity": self.quantity,
            "price": self.price,
            "product": self.product.to_dict() if self.product else None
        }
