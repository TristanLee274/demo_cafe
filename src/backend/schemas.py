from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime


# Category Schemas
class CategoryBase(BaseModel):
    name: str
    description: Optional[str] = None
    image_url: Optional[str] = None


class CategoryResponse(CategoryBase):
    id: int

    class Config:
        from_attributes = True


# Product Schemas
class ProductBase(BaseModel):
    name: str
    description: Optional[str] = None
    price: float
    image_url: Optional[str] = None
    category_id: Optional[int] = None


class ProductResponse(ProductBase):
    id: int
    category: Optional[CategoryResponse] = None

    class Config:
        from_attributes = True


# Order Item Schemas
class OrderItemCreate(BaseModel):
    product_id: int
    quantity: int


class OrderItemResponse(BaseModel):
    id: int
    product_id: int
    quantity: int
    price: float
    product: Optional[ProductResponse] = None

    class Config:
        from_attributes = True


# Order Schemas
class OrderCreate(BaseModel):
    customer_name: str
    email: str
    phone: str
    address: str
    notes: Optional[str] = None
    items: List[OrderItemCreate]


class OrderResponse(BaseModel):
    id: int
    customer_name: str
    email: str
    phone: str
    address: str
    total: float
    status: str
    created_at: datetime
    notes: Optional[str] = None
    items: List[OrderItemResponse]

    class Config:
        from_attributes = True


# Cart Schemas (for frontend state, not persisted)
class CartItem(BaseModel):
    product_id: int
    quantity: int
