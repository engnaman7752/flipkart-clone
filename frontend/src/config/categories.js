// Flipkart-style category strip — order and truncated labels match reference UI
export const CATEGORIES = [
  {
    label: 'For You', displayLabel: 'For You', filter: '', icon: 'forYou',
    subcategories: [],
  },
  {
    label: 'Fashion', displayLabel: 'Fashion', filter: 'Fashion', icon: 'fashion',
    subcategories: [
      { name: "Men's Top Wear", items: ['T-Shirts', 'Casual Shirts', 'Formal Shirts', 'Jackets', 'Sweatshirts'] },
      { name: "Men's Bottom Wear", items: ['Jeans', 'Trousers', 'Shorts', 'Track Pants'] },
      { name: 'Women Ethnic', items: ['Sarees', 'Kurtis', 'Lehengas', 'Dress Material', 'Blouses'] },
      { name: 'Women Western', items: ['Dresses', 'Tops', 'Jeans', 'Skirts'] },
      { name: 'Footwear', items: ['Men Casual', 'Men Sports', 'Women Heels', 'Women Flats', 'Sneakers'] },
      { name: 'Accessories', items: ['Watches', 'Sunglasses', 'Bags', 'Wallets', 'Belts'] },
    ],
  },
  {
    label: 'Mobiles', displayLabel: 'Mobiles', filter: 'Mobiles', icon: 'mobiles',
    subcategories: [
      { name: 'By Brand', items: ['Samsung', 'Apple', 'Xiaomi', 'OnePlus', 'Vivo', 'realme', 'OPPO'] },
      { name: 'By Price', items: ['Under ₹10,000', '₹10,000 - ₹20,000', '₹20,000 - ₹30,000', 'Above ₹30,000'] },
      { name: 'By Feature', items: ['5G Mobiles', 'Camera Phones', 'Gaming Phones', 'Battery Phones'] },
      { name: 'Accessories', items: ['Mobile Cases', 'Screen Guards', 'Chargers', 'Power Banks'] },
    ],
  },
  {
    label: 'Beauty', displayLabel: 'Beauty', filter: 'Beauty', icon: 'beauty',
    subcategories: [
      { name: 'Skincare', items: ['Moisturizers', 'Sunscreen', 'Face Wash', 'Serums', 'Face Masks', 'Toners'] },
      { name: 'Makeup', items: ['Lipstick', 'Foundation', 'Mascara', 'Nail Polish', 'Eye Shadow', 'Compact'] },
      { name: 'Hair Care', items: ['Shampoo', 'Conditioner', 'Hair Oil', 'Hair Serum', 'Hair Color'] },
      { name: 'Fragrance', items: ['Perfumes', 'Deodorants', 'Body Mists', 'Attars'] },
      { name: 'Bath & Body', items: ['Soap', 'Body Lotion', 'Body Wash', 'Scrubs'] },
    ],
  },
  {
    label: 'Electronics', displayLabel: 'Electronics', filter: 'Electronics', icon: 'electronics',
    subcategories: [
      { name: 'Audio', items: ['Headphones', 'TWS Earbuds', 'Speakers', 'Soundbars', 'Neckbands'] },
      { name: 'Laptops', items: ['Gaming Laptops', 'Business Laptops', 'Thin & Light', 'Chromebooks'] },
      { name: 'Wearables', items: ['Smartwatches', 'Fitness Bands', 'Smart Glasses'] },
      { name: 'Cameras', items: ['DSLR', 'Mirrorless', 'Action Cameras', 'Drones'] },
      { name: 'Computer Peripherals', items: ['Keyboards', 'Mouse', 'Monitors', 'Webcams', 'Routers'] },
      { name: 'Storage', items: ['Hard Drives', 'SSD', 'Pen Drives', 'Memory Cards'] },
    ],
  },
  {
    label: 'Home & Kitchen', displayLabel: 'Home', filter: 'Home & Kitchen', icon: 'home',
    subcategories: [
      { name: 'Kitchen', items: ['Cookware', 'Gas Stoves', 'Pressure Cookers', 'Storage Containers'] },
      { name: 'Home Decor', items: ['Wall Art', 'Showpieces', 'Clocks', 'Photo Frames', 'Candles'] },
      { name: 'Bedding', items: ['Bedsheets', 'Pillows', 'Comforters', 'Mattress Protectors'] },
      { name: 'Lighting', items: ['LED Bulbs', 'Ceiling Lights', 'Table Lamps', 'Decorative Lights'] },
      { name: 'Cleaning', items: ['Mops', 'Brooms', 'Vacuum Cleaners', 'Cleaning Liquids'] },
    ],
  },
  {
    label: 'Appliances', displayLabel: 'Appliances', filter: 'Appliances', icon: 'appliances',
    subcategories: [
      { name: 'Large Appliances', items: ['Washing Machines', 'Refrigerators', 'Dishwashers', 'Air Conditioners'] },
      { name: 'Small Appliances', items: ['Mixer Grinder', 'Air Fryer', 'Microwave', 'Toaster', 'Electric Kettle'] },
      { name: 'Cooling', items: ['Air Coolers', 'Ceiling Fans', 'Table Fans', 'Tower Fans'] },
      { name: 'Purifiers', items: ['Water Purifiers', 'Air Purifiers'] },
    ],
  },
  {
    label: 'Toys', displayLabel: 'Toys, ba...', filter: 'Toys', icon: 'toys',
    subcategories: [
      { name: 'By Age', items: ['0-2 Years', '3-5 Years', '6-8 Years', '9-12 Years', '12+ Years'] },
      { name: 'By Type', items: ['Building Sets', 'Board Games', 'Action Figures', 'RC Cars', 'Dolls'] },
      { name: 'Educational', items: ['STEM Toys', 'Puzzles', 'Science Kits', 'Art Supplies'] },
      { name: 'Brands', items: ['LEGO', 'Hot Wheels', 'Barbie', 'Nerf', 'Fisher-Price'] },
    ],
  },
  {
    label: 'Food & Health', displayLabel: 'Food & H...', filter: 'Food & Health', icon: 'food',
    subcategories: [
      { name: 'Grocery', items: ['Rice & Atta', 'Pulses', 'Oil & Ghee', 'Spices', 'Dry Fruits'] },
      { name: 'Snacks', items: ['Chips', 'Biscuits', 'Namkeen', 'Chocolates', 'Nuts'] },
      { name: 'Beverages', items: ['Tea', 'Coffee', 'Juices', 'Health Drinks', 'Water'] },
      { name: 'Health Supplements', items: ['Protein Powders', 'Vitamins', 'Omega-3', 'Herbal'] },
      { name: 'Organic', items: ['Organic Honey', 'Organic Ghee', 'Organic Spices', 'Organic Tea'] },
    ],
  },
  {
    label: 'Auto Accessories', displayLabel: 'Auto Acc...', filter: 'Auto Accessories', icon: 'auto',
    subcategories: [
      { name: 'Interior', items: ['Seat Covers', 'Floor Mats', 'Steering Covers', 'Sun Shades'] },
      { name: 'Exterior', items: ['Car Covers', 'Wiper Blades', 'Bumper Guards'] },
      { name: 'Electronics', items: ['Dash Cams', 'GPS', 'Phone Holders', 'Chargers'] },
      { name: 'Care', items: ['Car Wash', 'Polish', 'Air Fresheners', 'Vacuum Cleaners'] },
    ],
  },
  {
    label: '2 Wheelers', displayLabel: '2 Wheele...', filter: '2 Wheelers', icon: 'wheelers',
    subcategories: [
      { name: 'Accessories', items: ['Helmets', 'Lights', 'Locks', 'Repair Tools'] },
      { name: 'Parts', items: ['Tires', 'Brakes', 'Chains', 'Pedals'] },
      { name: 'Clothing', items: ['Riding Jackets', 'Gloves', 'Knee Guards'] },
    ],
  },
  {
    label: 'Sports', displayLabel: 'Sports & ...', filter: 'Sports', icon: 'sports',
    subcategories: [
      { name: 'Cricket', items: ['Bats', 'Balls', 'Pads', 'Gloves', 'Helmets'] },
      { name: 'Fitness', items: ['Dumbbells', 'Yoga Mats', 'Resistance Bands', 'Treadmills'] },
      { name: 'Badminton', items: ['Rackets', 'Shuttlecocks', 'Shoes', 'Nets'] },
      { name: 'Football', items: ['Footballs', 'Cleats', 'Shin Guards', 'Jerseys'] },
    ],
  },
  {
    label: 'Books', displayLabel: 'Books & ...', filter: 'Books', icon: 'books',
    subcategories: [
      { name: 'Fiction', items: ['Novels', 'Thrillers', 'Romance', 'Sci-Fi', 'Fantasy'] },
      { name: 'Non-Fiction', items: ['Self-Help', 'Business', 'Science', 'History', 'Biography'] },
      { name: 'Academic', items: ['Engineering', 'Medical', 'Competitive Exams', 'School Books'] },
      { name: 'Children', items: ['Story Books', 'Activity Books', 'Comics', 'Coloring Books'] },
    ],
  },
  {
    label: 'Furniture', displayLabel: 'Furniture', filter: 'Furniture', icon: 'furniture',
    subcategories: [
      { name: 'Living Room', items: ['Sofas', 'TV Units', 'Coffee Tables', 'Bookshelves'] },
      { name: 'Bedroom', items: ['Beds', 'Wardrobes', 'Dressers', 'Bedside Tables'] },
      { name: 'Office', items: ['Office Chairs', 'Desks', 'Storage Cabinets'] },
      { name: 'Outdoor', items: ['Garden Chairs', 'Swings', 'Planters'] },
    ],
  },
];

export const PROMO_TILES = [
  {
    title: 'Top Collection',
    subtitle: 'Top Rated',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop',
  },
  {
    title: 'Widest Range',
    subtitle: 'Under ₹199',
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop',
  },
  {
    title: 'Best Picks',
    subtitle: 'Min. 50% Off',
    category: 'Beauty',
    image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=200&h=200&fit=crop',
  },
  {
    title: 'Best Deals',
    subtitle: 'Top Rated',
    category: 'Appliances',
    image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=200&h=200&fit=crop',
  },
];
