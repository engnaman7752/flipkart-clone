const db = require('./db.js');

async function insertHeroProducts() {
  const products = [
    {
      name: 'HMD Vibe 2 5G',
      description: 'The all new HMD Vibe 2 5G with excellent battery life and fast performance.',
      price: '9499.00',
      mrp: '12999.00',
      category: 'Mobiles',
      brand: 'HMD',
      stock: 50,
      rating: '4.5',
      rating_count: 120,
      images: ['/banners/hero_hmd_vibe_1779452979660.png'],
      specifications: JSON.stringify({ 'RAM': '6 GB', 'Storage': '128 GB', 'Network': '5G' })
    },
    {
      name: 'Daikin 1.5 Ton Inverter Split AC',
      description: 'The air specialist. Stay cool with Daikin Inverter Split AC.',
      price: '36690.00',
      mrp: '45000.00',
      category: 'Appliances',
      brand: 'Daikin',
      stock: 30,
      rating: '4.7',
      rating_count: 340,
      images: ['/banners/hero_daikin_ac_1779452994249.png'],
      specifications: JSON.stringify({ 'Capacity': '1.5 Ton', 'Energy Rating': '5 Star' })
    },
    {
      name: 'Motorola edge 70 fusion',
      description: 'Pro Shots. Steal Deal. Experience the new Motorola edge 70 fusion.',
      price: '24999.00',
      mrp: '31999.00',
      category: 'Mobiles',
      brand: 'Motorola',
      stock: 100,
      rating: '4.6',
      rating_count: 500,
      images: ['/banners/hero_motorola_edge_1779453010846.png'],
      specifications: JSON.stringify({ 'RAM': '8 GB', 'Storage': '256 GB', 'Display': 'OLED' })
    },
    {
      name: 'Sony Bravia 4K HDR Smart TV',
      description: 'Breathtaking 4K HDR. The ultimate Sony Bravia experience.',
      price: '54999.00',
      mrp: '74990.00',
      category: 'Appliances',
      brand: 'Sony',
      stock: 20,
      rating: '4.8',
      rating_count: 890,
      images: ['/banners/hero_sony_tv_1779453026529.png'],
      specifications: JSON.stringify({ 'Display Size': '55 inch', 'Resolution': '4K HDR' })
    },
    {
      name: 'Realme 12 Pro',
      description: 'Master Storyteller. The Realme 12 Pro.',
      price: '19999.00',
      mrp: '24999.00',
      category: 'Mobiles',
      brand: 'Realme',
      stock: 75,
      rating: '4.4',
      rating_count: 650,
      images: ['/banners/hero_realme_pro_1779453042285.png'],
      specifications: JSON.stringify({ 'RAM': '8 GB', 'Storage': '128 GB' })
    }
  ];

  for (const p of products) {
    await db.query(`
      INSERT INTO products (name, description, price, mrp, category, brand, stock, rating, rating_count, images, specifications)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
    `, [p.name, p.description, p.price, p.mrp, p.category, p.brand, p.stock, p.rating, p.rating_count, p.images, p.specifications]);
    console.log('Inserted:', p.name);
  }
  process.exit();
}

insertHeroProducts().catch(console.error);
