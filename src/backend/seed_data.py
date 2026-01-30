from database import SessionLocal, engine, Base
from models import Category, Product

# Create tables
Base.metadata.create_all(bind=engine)

def seed_data():
    db = SessionLocal()
    
    # Check if data already exists
    if db.query(Category).first():
        print("Data already seeded!")
        db.close()
        return
    
    # Create categories
    categories = [
        Category(
            name="Cà Phê Nóng",
            description="Các loại cà phê nóng truyền thống và hiện đại",
            image_url="https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400"
        ),
        Category(
            name="Cà Phê Đá",
            description="Cà phê đá mát lạnh, giải khát",
            image_url="https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400"
        ),
        Category(
            name="Specialty",
            description="Các loại cà phê đặc biệt cao cấp",
            image_url="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400"
        ),
        Category(
            name="Trà & Đồ Uống Khác",
            description="Trà, sinh tố và các đồ uống khác",
            image_url="https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400"
        ),
    ]
    
    for category in categories:
        db.add(category)
    db.commit()
    
    # Create products
    products = [
        # Hot Coffee
        Product(
            name="Espresso",
            description="Cà phê espresso đậm đà, nguyên chất từ hạt Arabica rang mộc. Hương vị mạnh mẽ, đắng nhẹ với lớp crema vàng óng.",
            price=35000,
            image_url="https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=400",
            category_id=1
        ),
        Product(
            name="Cappuccino",
            description="Sự kết hợp hoàn hảo giữa espresso, sữa nóng và bọt sữa mịn. Vị cà phê đậm đà hòa quyện cùng vị béo ngậy của sữa.",
            price=45000,
            image_url="https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400",
            category_id=1
        ),
        Product(
            name="Latte",
            description="Cà phê latte với tỷ lệ hoàn hảo 1:3 espresso và sữa nóng. Vị nhẹ nhàng, thơm ngon, phù hợp với những ai mới uống cà phê.",
            price=50000,
            image_url="https://images.unsplash.com/photo-1561882468-9110e03e0f78?w=400",
            category_id=1
        ),
        Product(
            name="Americano",
            description="Espresso pha loãng với nước nóng. Vị cà phê thuần túy, đắng nhẹ, thích hợp cho những ai thích vị cà phê đen.",
            price=40000,
            image_url="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400",
            category_id=1
        ),
        Product(
            name="Mocha",
            description="Sự kết hợp tuyệt vời giữa espresso, sô-cô-la và sữa nóng. Vị ngọt thanh, đắng nhẹ, thơm lừng mùi cà phê và sô-cô-la.",
            price=55000,
            image_url="https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?w=400",
            category_id=1
        ),
        
        # Iced Coffee
        Product(
            name="Cà Phê Sữa Đá",
            description="Cà phê phin Việt Nam truyền thống với sữa đặc. Đậm đà, thơm ngon, mang hương vị đặc trưng của cà phê Việt.",
            price=35000,
            image_url="https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=400",
            category_id=2
        ),
        Product(
            name="Iced Latte",
            description="Cà phê latte đá mát lạnh. Espresso hòa quyện cùng sữa tươi và đá, tạo nên thức uống giải khát hoàn hảo.",
            price=55000,
            image_url="https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400",
            category_id=2
        ),
        Product(
            name="Cold Brew",
            description="Cà phê ủ lạnh trong 18 giờ. Vị êm dịu, ít axit, hương thơm đặc trưng. Thức uống hoàn hảo cho mùa hè.",
            price=60000,
            image_url="https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=400",
            category_id=2
        ),
        Product(
            name="Iced Americano",
            description="Americano đá mát lạnh. Espresso pha loãng với nước lạnh và đá. Vị cà phê thuần túy, thanh mát.",
            price=45000,
            image_url="https://images.unsplash.com/photo-1529042410759-befb1204b468?w=400",
            category_id=2
        ),
        Product(
            name="Frappuccino",
            description="Cà phê xay đá với sữa và kem tươi. Mát lạnh, ngọt ngào, thích hợp cho những ngày nắng nóng.",
            price=65000,
            image_url="https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400",
            category_id=2
        ),
        
        # Specialty
        Product(
            name="Affogato",
            description="Kem vani cao cấp với shot espresso nóng hổi. Sự kết hợp độc đáo giữa nóng và lạnh, ngọt và đắng.",
            price=70000,
            image_url="https://images.unsplash.com/photo-1579992357154-faf4bde95b3d?w=400",
            category_id=3
        ),
        Product(
            name="Caramel Macchiato",
            description="Latte với sốt caramel thơm ngọt. Lớp caramel vàng óng phủ trên bề mặt, tạo nên hương vị độc đáo.",
            price=60000,
            image_url="https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=400",
            category_id=3
        ),
        Product(
            name="Flat White",
            description="Cà phê Úc với microsfoam mịn như nhung. Vị cà phê đậm đà hơn latte, texture mượt mà hơn cappuccino.",
            price=55000,
            image_url="https://images.unsplash.com/photo-1577968897966-3d4325b36b61?w=400",
            category_id=3
        ),
        Product(
            name="Vietnamese Egg Coffee",
            description="Cà phê trứng Hà Nội truyền thống. Lớp kem trứng béo ngậy phủ trên nền cà phê đen đậm đà.",
            price=50000,
            image_url="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400",
            category_id=3
        ),
        
        # Tea & Others
        Product(
            name="Trà Sen Vàng",
            description="Trà ướp hoa sen tự nhiên từ Tây Hồ. Hương thơm thanh nhã, vị ngọt dịu nhẹ.",
            price=40000,
            image_url="https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400",
            category_id=4
        ),
        Product(
            name="Matcha Latte",
            description="Trà xanh Nhật Bản với sữa tươi. Vị đắng nhẹ của matcha hòa quyện cùng vị béo ngậy của sữa.",
            price=55000,
            image_url="https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=400",
            category_id=4
        ),
        Product(
            name="Trà Đào Cam Sả",
            description="Trà đào thơm ngọt với cam tươi và sả. Vị chua ngọt thanh mát, giải nhiệt tuyệt vời.",
            price=45000,
            image_url="https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400",
            category_id=4
        ),
        Product(
            name="Sinh Tố Bơ",
            description="Sinh tố bơ béo ngậy với sữa đặc. Thức uống bổ dưỡng, thơm ngon.",
            price=50000,
            image_url="https://images.unsplash.com/photo-1623065422902-30a2d299ber4?w=400",
            category_id=4
        ),
    ]
    
    for product in products:
        db.add(product)
    db.commit()
    
    print(f"Seeded {len(categories)} categories and {len(products)} products!")
    db.close()


if __name__ == "__main__":
    seed_data()
