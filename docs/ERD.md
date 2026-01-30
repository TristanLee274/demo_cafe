# Entity Relationship Diagram (ERD)

## Database Schema (SQLite)

### Products
- `id` (Integer, Primary Key)
- `name` (String)
- `price` (Float)
- `description` (String)
- `category` (String)
- `image_url` (String)

### Users
- `id` (Integer, Primary Key)
- `username` (String)
- `password_hash` (String)
- `email` (String)

### Orders
- `id` (Integer, Primary Key)
- `user_id` (Integer, Foreign Key -> Users.id)
- `created_at` (DateTime)
- `total_amount` (Float)
- `status` (String)

### OrderItems
- `id` (Integer, Primary Key)
- `order_id` (Integer, Foreign Key -> Orders.id)
- `product_id` (Integer, Foreign Key -> Products.id)
- `quantity` (Integer)
- `price_at_purchase` (Float)
