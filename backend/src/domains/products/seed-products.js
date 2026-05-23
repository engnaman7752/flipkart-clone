const db = require('../../../db');

// List of categories and configuration
const CATEGORIES = [
  'Mobiles',
  'Electronics',
  'Fashion',
  'Beauty',
  'Home & Kitchen',
  'Appliances',
  'Toys',
  'Food & Health',
  'Auto Accessories',
  'Sports',
  'Books',
  'Furniture'
];

// Helper to get random item from array
const randomChoice = (arr) => arr[Math.floor(Math.random() * arr.length)];
// Helper to get random number between min and max
const randomBetween = (min, max, step = 1) => {
  const val = Math.random() * (max - min) + min;
  return Math.round(val / step) * step;
};

// Generate 1000+ realistic products
function generateProducts() {
  const products = [];
  let idCounter = 1;

  // 1. Mobiles (~120 products)
  const mobileBrands = [
    { name: 'Apple', models: ['iPhone 15', 'iPhone 15 Pro', 'iPhone 14', 'iPhone 13'] },
    { name: 'Samsung', models: ['Galaxy S24 Ultra', 'Galaxy S23', 'Galaxy A55', 'Galaxy M35 5G'] },
    { name: 'OnePlus', models: ['OnePlus 12', 'OnePlus 12R', 'OnePlus Nord CE4', 'OnePlus Open'] },
    { name: 'Xiaomi', models: ['Redmi Note 13 Pro', 'Xiaomi 14 Ultra', 'Redmi 13C', 'Poco X6 Pro'] },
    { name: 'Realme', models: ['Realme GT 6T', 'Realme 12 Pro+ 5G', 'Realme Narzo 70 Pro', 'Realme C65'] },
    { name: 'Vivo', models: ['Vivo V30 Pro', 'Vivo T3 5G', 'Vivo X100 Pro', 'Vivo Y200'] },
    { name: 'OPPO', models: ['OPPO Reno 11 Pro', 'OPPO F25 Pro', 'OPPO A79 5G', 'OPPO Find N3 Flip'] },
    { name: 'Motorola', models: ['Motorola Edge 50 Pro', 'Moto G64 5G', 'Moto G34 5G', 'Motorola Razr 40 Ultra'] }
  ];
  const mobileColors = ['Black', 'Blue', 'Green', 'Titanium', 'White', 'Purple'];
  const mobileStorages = ['128 GB', '256 GB', '512 GB'];

  mobileBrands.forEach(brand => {
    brand.models.forEach(model => {
      mobileColors.forEach(color => {
        mobileStorages.forEach(storage => {
          const name = `${brand.name} ${model} (${color}, ${storage})`;
          const ram = storage === '512 GB' ? '12 GB' : '8 GB';
          const processor = brand.name === 'Apple' ? 'A16 Bionic' : 'Snapdragon 8 Gen 3';
          const price = brand.name === 'Apple' ? randomBetween(59999, 139999, 1000) : randomBetween(12999, 89999, 1000);
          const mrp = Math.round(price * 1.18);
          
          products.push({
            name,
            description: `Experience the power of ${brand.name} ${model} featuring a premium display, superb cameras, and long-lasting battery life. Comes with ${storage} storage.`,
            price,
            mrp,
            category: 'Mobiles',
            brand: brand.name,
            stock: randomBetween(10, 50),
            rating: randomBetween(4.0, 4.9, 0.1),
            rating_count: randomBetween(100, 15000),
            images: [
              `https://picsum.photos/seed/mobile-${idCounter}-1/400/500`,
              `https://picsum.photos/seed/mobile-${idCounter}-2/400/500`
            ],
            specifications: { RAM: ram, Storage: storage, Processor: processor }
          });
          idCounter++;
        });
      });
    });
  });

  // 2. Electronics (~180 products)
  // Laptops (~60 products)
  const laptopBrands = ['HP', 'Dell', 'Lenovo', 'Asus', 'Apple', 'Acer'];
  const laptopTypes = ['Thin & Light', 'Gaming', 'Business', 'Chromebook'];
  const processors = ['Intel Core i5', 'Intel Core i7', 'AMD Ryzen 5', 'AMD Ryzen 7', 'Apple M2', 'Apple M3'];
  const rams = ['8 GB', '16 GB', '32 GB'];

  for (let i = 0; i < 60; i++) {
    const brand = randomChoice(laptopBrands);
    const type = randomChoice(laptopTypes);
    const processor = brand === 'Apple' ? (i % 2 === 0 ? 'Apple M2' : 'Apple M3') : randomChoice(processors.filter(p => !p.startsWith('Apple')));
    const ram = randomChoice(rams);
    const price = brand === 'Apple' ? randomBetween(79999, 199999, 1000) : randomBetween(29999, 129999, 1000);
    const mrp = Math.round(price * 1.25);
    const name = `${brand} ${type === 'Gaming' ? 'ROG/TUF Gaming' : 'Pavilion/Inspiron'} Laptop (${processor}, ${ram} RAM, 512 GB SSD)`;

    products.push({
      name,
      description: `High performance ${brand} laptop designed for ${type === 'Gaming' ? 'high-end gaming and streaming' : 'productivity and daily office work'}.`,
      price,
      mrp,
      category: 'Electronics',
      brand,
      stock: randomBetween(5, 30),
      rating: randomBetween(3.8, 4.8, 0.1),
      rating_count: randomBetween(50, 4000),
      images: [`https://picsum.photos/seed/laptop-${idCounter}-1/400/500`],
      specifications: { Processor: processor, RAM: ram, Storage: '512 GB SSD', Type: type }
    });
    idCounter++;
  }

  // Audio / Headphones (~60 products)
  const audioBrands = ['Sony', 'Bose', 'JBL', 'boAt', 'Sennheiser', 'Noise'];
  const audioTypes = ['Over-ear Headphones', 'TWS Earbuds', 'Bluetooth Speakers', 'Wireless Neckband'];

  for (let i = 0; i < 60; i++) {
    const brand = randomChoice(audioBrands);
    const type = randomChoice(audioTypes);
    const price = randomChoice([999, 1999, 2999, 4999, 9999, 19999, 29990]);
    const mrp = Math.round(price * 1.4);
    const name = `${brand} ${type} with Active Noise Cancellation`;

    products.push({
      name,
      description: `Immersive sound quality and premium bass. Experience music like never before with ${brand} ${type}.`,
      price,
      mrp,
      category: 'Electronics',
      brand,
      stock: randomBetween(15, 100),
      rating: randomBetween(3.9, 4.8, 0.1),
      rating_count: randomBetween(100, 25000),
      images: [`https://picsum.photos/seed/audio-${idCounter}-1/400/500`],
      specifications: { Type: type, Bluetooth: 'v5.3', Battery: 'Up to 30 Hours' }
    });
    idCounter++;
  }

  // Wearables (~60 products)
  const watchBrands = ['Apple', 'Samsung', 'Noise', 'Fire-Boltt', 'boAt', 'Fitbit'];
  const watchStraps = ['Sport Band', 'Leather Strap', 'Silicon Strap', 'Metal Mesh'];

  for (let i = 0; i < 60; i++) {
    const brand = randomChoice(watchBrands);
    const strap = randomChoice(watchStraps);
    const price = brand === 'Apple' ? randomBetween(29999, 89999, 1000) : brand === 'Samsung' ? randomBetween(14999, 39999, 1000) : randomBetween(1499, 5999, 500);
    const mrp = Math.round(price * 1.5);
    const name = `${brand} Smartwatch (${strap}, Unisex)`;

    products.push({
      name,
      description: `Stay fit and connected. This ${brand} smartwatch tracks heart rate, sleep quality, daily steps, and supports Bluetooth calling.`,
      price,
      mrp,
      category: 'Electronics',
      brand,
      stock: randomBetween(20, 150),
      rating: randomBetween(4.0, 4.7, 0.1),
      rating_count: randomBetween(200, 18000),
      images: [`https://picsum.photos/seed/watch-${idCounter}-1/400/500`],
      specifications: { Display: 'AMOLED', Battery: 'Up to 7 Days', GPS: brand === 'Apple' || brand === 'Samsung' ? 'Built-in' : 'No' }
    });
    idCounter++;
  }

  // 3. Fashion (~200 products)
  const fashionBrands = ["Levi's", 'Roadster', 'U.S. Polo Assn.', 'Allen Solly', 'Biba', 'Vero Moda', 'Adidas', 'Nike', 'Puma'];
  const fashionCategories = [
    { sub: 'Men T-Shirt', specs: { Fit: 'Regular', Fabric: '100% Cotton', Neck: 'Round Neck' } },
    { sub: 'Men Casual Shirt', specs: { Fit: 'Slim', Fabric: 'Linen Blend', Sleeve: 'Full Sleeve' } },
    { sub: 'Men Jeans', specs: { Fit: 'Slim Fit', Fabric: 'Denim', Stretchable: 'Yes' } },
    { sub: 'Women Kurti', specs: { Fabric: 'Rayon', Print: 'Floral', Length: 'Ankle Length' } },
    { sub: 'Women Saree', specs: { Fabric: 'Georgette', Work: 'Embroidered', Occasion: 'Festive' } },
    { sub: 'Sneakers', specs: { Outer: 'Synthetic Leather', Sole: 'Rubber', Closure: 'Lace-Up' } }
  ];
  const fashionColors = ['Blue', 'Red', 'Black', 'White', 'Grey', 'Yellow', 'Olive'];

  for (let i = 0; i < 200; i++) {
    const brand = randomChoice(fashionBrands);
    const cat = randomChoice(fashionCategories);
    const color = randomChoice(fashionColors);
    const price = randomBetween(499, 4999, 100);
    const mrp = Math.round(price * 2.2);
    const name = `${brand} Premium ${color} ${cat.sub}`;

    products.push({
      name,
      description: `Upgrade your style statement with this premium ${brand} ${cat.sub}. Crafted from high quality fabrics for all-day comfort.`,
      price,
      mrp,
      category: 'Fashion',
      brand,
      stock: randomBetween(30, 200),
      rating: randomBetween(3.7, 4.6, 0.1),
      rating_count: randomBetween(50, 9000),
      images: [`https://picsum.photos/seed/fashion-${idCounter}-1/400/500`],
      specifications: { ...cat.specs, Color: color }
    });
    idCounter++;
  }

  // 4. Beauty (~100 products)
  const beautyBrands = ["L'Oreal", 'Garnier', 'Nivea', 'Mamaearth', 'Lakme', 'Maybelline', 'The Derma Co'];
  const beautyTypes = [
    { sub: 'Face Wash', specs: { SkinType: 'All', Form: 'Gel', Benefits: 'Deep Cleansing' } },
    { sub: 'Moisturizer', specs: { SkinType: 'Dry', Form: 'Cream', SPF: '15' } },
    { sub: 'Sunscreen Gel', specs: { SPF: '50 PA+++', Feel: 'Non-greasy', WaterResistant: 'Yes' } },
    { sub: 'Matte Lipstick', specs: { Finish: 'Matte', LongLasting: '12 Hours', Color: 'Crimson Red' } },
    { sub: 'Anti-Hairfall Shampoo', specs: { HairType: 'All', Volume: '400 ml', ActiveIngredient: 'Onion Oil' } }
  ];

  for (let i = 0; i < 100; i++) {
    const brand = randomChoice(beautyBrands);
    const type = randomChoice(beautyTypes);
    const price = randomBetween(199, 1499, 50);
    const mrp = Math.round(price * 1.35);
    const name = `${brand} ${type.sub}`;

    products.push({
      name,
      description: `Enhance your beauty routine with ${brand} ${type.sub}. Lab-tested formulas to give you radiant skin and luscious hair.`,
      price,
      mrp,
      category: 'Beauty',
      brand,
      stock: randomBetween(50, 500),
      rating: randomBetween(3.8, 4.7, 0.1),
      rating_count: randomBetween(100, 35000),
      images: [`https://picsum.photos/seed/beauty-${idCounter}-1/400/500`],
      specifications: type.specs
    });
    idCounter++;
  }

  // 5. Home & Kitchen (~100 products)
  const kitchenBrands = ['Prestige', 'Pigeon', 'Philips', 'Bombay Dyeing', 'Milton', 'Solimo'];
  const kitchenItems = [
    { sub: 'Non-Stick Cookware Set', specs: { Pieces: '3', Coating: '3-Layer Teflon', InductionSafe: 'Yes' } },
    { sub: '3 Burner Gas Stove', specs: { Body: 'Glass Top', Ignition: 'Manual', Burners: 'Brass' } },
    { sub: 'Double Bedsheet with 2 Pillows', specs: { Size: 'Double Queen', ThreadCount: '200 TC', Fabric: 'Cotton' } },
    { sub: 'Stainless Steel Insulated Bottle', specs: { Capacity: '1 Litre', HotCold: '24 Hours', Material: 'Grade 304' } },
    { sub: 'Dry Iron', specs: { Power: '1000W', Coating: 'Non-stick Soleplate', Warranty: '2 Years' } }
  ];

  for (let i = 0; i < 100; i++) {
    const brand = randomChoice(kitchenBrands);
    const item = randomChoice(kitchenItems);
    const price = randomBetween(399, 4999, 100);
    const mrp = Math.round(price * 1.8);
    const name = `${brand} ${item.sub}`;

    products.push({
      name,
      description: `Bring efficiency and comfort to your home. Designed by ${brand}, this ${item.sub} is built to last and look elegant.`,
      price,
      mrp,
      category: 'Home & Kitchen',
      brand,
      stock: randomBetween(10, 80),
      rating: randomBetween(3.9, 4.6, 0.1),
      rating_count: randomBetween(50, 7000),
      images: [`https://picsum.photos/seed/home-${idCounter}-1/400/500`],
      specifications: item.specs
    });
    idCounter++;
  }

  // 6. Appliances (~100 products)
  const applianceBrands = ['LG', 'Samsung', 'Whirlpool', 'Daikin', 'Voltas', 'IFB', 'Kent', 'Dyson'];
  const applianceTypes = [
    { sub: '8 Kg Fully Automatic Front Load Washing Machine', specs: { Capacity: '8 Kg', StarRating: '5 Star', Motor: 'Direct Drive' } },
    { sub: '340 L Double Door Refrigerator', specs: { Capacity: '340 L', Compressor: 'Inverter', DefrostType: 'Frost Free' } },
    { sub: '1.5 Ton 5 Star Split Inverter AC', specs: { Capacity: '1.5 Ton', Star: '5 Star', Condenser: '100% Copper' } },
    { sub: 'Active Shield Water Purifier RO+UV', specs: { Capacity: '8 Litres', Purification: '7 Stage', MineralBooster: 'Yes' } },
    { sub: 'Pure Air Purifier with HEPA H13 Filter', specs: { CADR: '400 m³/h', Filter: 'HEPA H13 & Carbon', WiFi: 'Compatible' } }
  ];

  for (let i = 0; i < 100; i++) {
    const brand = randomChoice(applianceBrands);
    const type = randomChoice(applianceTypes);
    const price = randomChoice([7999, 14999, 24999, 36990, 48999, 59999]);
    const mrp = Math.round(price * 1.3);
    const name = `${brand} ${type.sub}`;

    products.push({
      name,
      description: `Experience state-of-the-art living. This ${brand} ${type.sub} offers superior energy efficiency and robust performance.`,
      price,
      mrp,
      category: 'Appliances',
      brand,
      stock: randomBetween(5, 25),
      rating: randomBetween(4.0, 4.8, 0.1),
      rating_count: randomBetween(100, 10000),
      images: [`https://picsum.photos/seed/appliance-${idCounter}-1/400/500`],
      specifications: type.specs
    });
    idCounter++;
  }

  // 7. Toys (~60 products)
  const toyBrands = ['LEGO', 'Hot Wheels', 'Barbie', 'Nerf', 'Fisher-Price', 'Smartivity'];
  const toyTypes = [
    { sub: 'Classic Building Block Creative Box', specs: { AgeGroup: '4+ Years', Pieces: '484', Skills: 'Creativity' } },
    { sub: 'Die-cast 5-Car Gift Pack Set', specs: { AgeGroup: '3+ Years', Scale: '1:64', Theme: 'Racing' } },
    { sub: 'Elite Soft Dart Blaster Gun', specs: { AgeGroup: '8+ Years', Range: '90 Feet', Darts: '12 Elite Darts' } },
    { sub: 'Robotic Mechanical Hand STEM Toy', specs: { AgeGroup: '8-14 Years', Material: 'Eco Wood', Type: 'Do-It-Yourself' } }
  ];

  for (let i = 0; i < 60; i++) {
    const brand = randomChoice(toyBrands);
    const type = randomChoice(toyTypes);
    const price = randomBetween(499, 4999, 100);
    const mrp = Math.round(price * 1.4);
    const name = `${brand} ${type.sub}`;

    products.push({
      name,
      description: `Perfect gift for kids. This ${brand} toy combines fun and learning to develop motor and cognitive skills.`,
      price,
      mrp,
      category: 'Toys',
      brand,
      stock: randomBetween(10, 120),
      rating: randomBetween(4.1, 4.8, 0.1),
      rating_count: randomBetween(20, 2500),
      images: [`https://picsum.photos/seed/toys-${idCounter}-1/400/500`],
      specifications: type.specs
    });
    idCounter++;
  }

  // 8. Food & Health (~60 products)
  const foodBrands = ['Tata', 'India Gate', 'Fortune', 'Lays', 'Cadbury', 'MuscleBlaze', 'Aashirvaad'];
  const foodTypes = [
    { sub: 'Basmati Rice (Rozana Super, 5kg)', specs: { Weight: '5 kg', Type: 'Long Grain', Packaging: 'Bag' } },
    { sub: 'Premium Shudh Chakki Atta', specs: { Weight: '10 kg', Wheat: '100% MP Lokwan', Nutrition: 'High Fibre' } },
    { sub: 'Whey Protein Isolate (2kg)', specs: { Weight: '2 kg', ProteinPerServing: '25g', Flavor: 'Rich Chocolate' } },
    { sub: 'Assorted Dairy Milk Gift Pack Box', specs: { Weight: '400g', ChocolateType: 'Milk Chocolate', Occasion: 'Celebrations' } }
  ];

  for (let i = 0; i < 60; i++) {
    const brand = randomChoice(foodBrands);
    const type = randomChoice(foodTypes);
    const price = randomChoice([99, 199, 399, 799, 1499, 5499]);
    const mrp = Math.round(price * 1.2);
    const name = `${brand} ${type.sub}`;

    products.push({
      name,
      description: `Fresh, pure and delicious. Made with high standards of quality checking, brought to you by ${brand}.`,
      price,
      mrp,
      category: 'Food & Health',
      brand,
      stock: randomBetween(50, 400),
      rating: randomBetween(4.0, 4.8, 0.1),
      rating_count: randomBetween(500, 40000),
      images: [`https://picsum.photos/seed/food-${idCounter}-1/400/500`],
      specifications: type.specs
    });
    idCounter++;
  }

  // 9. Auto Accessories (~50 products)
  const autoBrands = ['Carrozzeria', '3M', 'Wavex', 'Pioneer', 'Rider'];
  const autoTypes = [
    { sub: 'All Weather Protection Car Body Cover', specs: { WaterProof: 'Yes', Material: 'Polyester', Fit: 'Custom Fit' } },
    { sub: 'Double-Sided Dashboard Phone Holder', specs: { Rotation: '360 Degree', Magnet: 'Neodymium', Placement: 'Dashboard' } },
    { sub: 'Premium Liquid Wax Car Polish', specs: { Volume: '500 ml', Shine: 'High Gloss Mirror', ProtectiveLayer: 'UV Protection' } }
  ];

  for (let i = 0; i < 50; i++) {
    const brand = randomChoice(autoBrands);
    const type = randomChoice(autoTypes);
    const price = randomBetween(299, 3999, 100);
    const mrp = Math.round(price * 1.5);
    const name = `${brand} ${type.sub}`;

    products.push({
      name,
      description: `Keep your vehicle looking brand new and functional. Designed by ${brand} using durable materials.`,
      price,
      mrp,
      category: 'Auto Accessories',
      brand,
      stock: randomBetween(25, 200),
      rating: randomBetween(3.8, 4.5, 0.1),
      rating_count: randomBetween(100, 3000),
      images: [`https://picsum.photos/seed/auto-${idCounter}-1/400/500`],
      specifications: type.specs
    });
    idCounter++;
  }

  // 10. Sports (~40 products)
  const sportsBrands = ['SG', 'SS', 'Cosco', 'Yonex', 'Nivia', 'Decathlon'];
  const sportsTypes = [
    { sub: 'English Willow Cricket Bat', specs: { Wood: 'English Willow', Size: 'Full Size Short Handle', Weight: '1180g' } },
    { sub: 'Carbon Fiber Badminton Racket', specs: { Frame: 'Nanometric Carbon', Tension: '28 lbs', Weight: '4U (83g)' } },
    { sub: 'FIFA Approved Training Soccer Ball', specs: { Size: '5', Stitching: 'Hand Stitched', Bladder: 'Butyl' } },
    { sub: 'Premium Extra Thick TPE Yoga Mat', specs: { Thickness: '6 mm', Material: 'TPE Eco-friendly', AntiSkid: 'Yes' } }
  ];

  for (let i = 0; i < 40; i++) {
    const brand = randomChoice(sportsBrands);
    const type = randomChoice(sportsTypes);
    const price = randomBetween(399, 12999, 200);
    const mrp = Math.round(price * 1.6);
    const name = `${brand} ${type.sub}`;

    products.push({
      name,
      description: `Maximize your game potential. ${brand} ${type.sub} is built according to professional standards.`,
      price,
      mrp,
      category: 'Sports',
      brand,
      stock: randomBetween(10, 60),
      rating: randomBetween(4.0, 4.8, 0.1),
      rating_count: randomBetween(50, 4500),
      images: [`https://picsum.photos/seed/sports-${idCounter}-1/400/500`],
      specifications: type.specs
    });
    idCounter++;
  }

  // 11. Books (~40 products)
  const bookPublishers = ['Penguin', 'HarperCollins', 'Rupa', 'Oxford Press', 'Scholastic'];
  const bookTypes = [
    { sub: 'A Song of Ice and Fire Fantasy Box Set', specs: { Format: 'Paperback', Author: 'George R.R. Martin', Language: 'English' } },
    { sub: 'The Psychology of Money (Self-Help)', specs: { Format: 'Paperback', Author: 'Morgan Housel', Pages: '250' } },
    { sub: 'Introduction to Algorithms (4th Edition)', specs: { Format: 'Hardcover', Author: 'Thomas H. Cormen', Subject: 'Computer Science' } }
  ];

  for (let i = 0; i < 40; i++) {
    const pub = randomChoice(bookPublishers);
    const type = randomChoice(bookTypes);
    const price = randomBetween(250, 3999, 50);
    const mrp = Math.round(price * 1.3);
    const name = `${type.sub} - Published by ${pub}`;

    products.push({
      name,
      description: `Dive deep into this brilliant masterpiece. Perfect for reading, learning and improving your perspective on life.`,
      price,
      mrp,
      category: 'Books',
      brand: pub,
      stock: randomBetween(15, 300),
      rating: randomBetween(4.2, 4.9, 0.1),
      rating_count: randomBetween(100, 50000),
      images: [`https://picsum.photos/seed/books-${idCounter}-1/400/500`],
      specifications: type.specs
    });
    idCounter++;
  }

  // 12. Furniture (~50 products)
  const furnitureBrands = ['Nilkamal', 'Wakefit', 'Sleepwell', 'Godrej Interio', 'Urban Ladder'];
  const furnitureTypes = [
    { sub: '3 Seater L-Shape Fabric Sofa', specs: { Material: 'Solid Wood & Foam', Color: 'Grey', Assembly: 'Pre-assembled' } },
    { sub: 'King Size Engineered Wood Bed with Storage', specs: { Size: 'King Size', Material: 'MDF Wood', BoxStorage: 'Yes' } },
    { sub: 'Ergonomic Mesh Office Chair with High Back', specs: { LumbarSupport: 'Adjustable', ArmRest: '2D Adjustable', GasLift: 'Class 4' } }
  ];

  for (let i = 0; i < 50; i++) {
    const brand = randomChoice(furnitureBrands);
    const type = randomChoice(furnitureTypes);
    const price = randomChoice([4999, 9999, 14999, 18999, 29990]);
    const mrp = Math.round(price * 1.55);
    const name = `${brand} ${type.sub}`;

    products.push({
      name,
      description: `Transform your workspace and living spaces with this premium and highly durable ${type.sub} from ${brand}.`,
      price,
      mrp,
      category: 'Furniture',
      brand,
      stock: randomBetween(3, 15),
      rating: randomBetween(3.9, 4.7, 0.1),
      rating_count: randomBetween(10, 800),
      images: [`https://picsum.photos/seed/furniture-${idCounter}-1/400/500`],
      specifications: type.specs
    });
    idCounter++;
  }

  return products;
}

async function seed() {
  console.log("Starting bulk database reset and seeding exactly ~1000 products...");
  
  // Generate products
  const products = generateProducts();
  console.log(`Generated ${products.length} products to insert.`);

  try {
    // 1. Truncate tables
    console.log("Cleaning existing products and referencing table data...");
    await db.query("TRUNCATE products, cart_items, wishlist RESTART IDENTITY CASCADE;");
    console.log("Tables cleaned successfully!");

    // 2. Insert in batches of 100 to prevent parameter limit errors (max 65,535 parameters in node-pg)
    const batchSize = 100;
    for (let i = 0; i < products.length; i += batchSize) {
      const batch = products.slice(i, i + batchSize);
      
      let queryText = 'INSERT INTO products (name, description, price, mrp, category, brand, stock, rating, rating_count, images, specifications) VALUES ';
      const values = [];
      
      batch.forEach((p, idx) => {
        const offset = idx * 11;
        queryText += `($${offset + 1}, $${offset + 2}, $${offset + 3}, $${offset + 4}, $${offset + 5}, $${offset + 6}, $${offset + 7}, $${offset + 8}, $${offset + 9}, $${offset + 10}, $${offset + 11})${idx === batch.length - 1 ? '' : ', '}`;
        values.push(
          p.name,
          p.description,
          p.price,
          p.mrp,
          p.category,
          p.brand,
          p.stock,
          p.rating,
          p.rating_count,
          p.images,
          p.specifications
        );
      });

      await db.query(queryText, values);
      console.log(`Inserted batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(products.length / batchSize)}`);
    }

    console.log("\nDatabase Seeding Completed Successfully! All 1000+ products added.");
  } catch (err) {
    console.error("Seeding failed with error:", err.message);
  } finally {
    await db.getPool().end();
  }
}

seed();
