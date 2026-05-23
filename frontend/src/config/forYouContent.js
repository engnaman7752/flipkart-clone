// Promo shelf config — images resolved at runtime from API products via match hints, falling back to real photos

export const HERO_SLIDES = [
  {
    id: 'hmd',
    bgClass: 'bg-gradient-to-br from-emerald-800 via-green-700 to-teal-900',
    badge: 'BACK TO CAMPUS',
    title: 'HMD Vibe 2',
    subtitle: 'Introducing Vibe 2 5G',
    price: 'From ₹9,499*',
    categoryFilter: 'Mobiles',
    searchQuery: 'HMD',
    match: { nameMatch: 'HMD' },
    image: '/banners/hero_hmd_vibe_1779452979660.png',
    isDirectProduct: true
  },
  {
    id: 'daikin',
    bgClass: 'bg-gradient-to-br from-sky-100 via-blue-50 to-cyan-100',
    badge: 'DAIKIN',
    title: 'The air specialist',
    subtitle: 'Easy EMI | Cashback: upto Rs.3000',
    price: 'From ₹3,669/M*',
    categoryFilter: 'Appliances',
    searchQuery: 'Daikin',
    match: { nameMatch: 'Daikin' },
    image: '/banners/hero_daikin_ac_1779452994249.png',
    isDirectProduct: true
  },
  {
    id: 'motorola',
    bgClass: 'bg-gradient-to-br from-emerald-800 via-green-700 to-teal-900',
    badge: 'BACK TO CAMPUS',
    title: 'edge 70 fusion',
    subtitle: 'Pro Shots. Steal Deal',
    price: 'From ₹24,999*',
    categoryFilter: 'Mobiles',
    searchQuery: 'Motorola',
    match: { nameMatch: 'Motorola' },
    image: '/banners/hero_motorola_edge_1779453010846.png',
    isDirectProduct: true
  },
  {
    id: 'sony_tv',
    bgClass: 'bg-gradient-to-br from-gray-900 via-gray-800 to-black',
    badge: 'NEW ARRIVAL',
    title: 'Sony Bravia',
    subtitle: 'Breathtaking 4K HDR',
    price: 'From ₹54,999*',
    categoryFilter: 'Appliances',
    searchQuery: 'Smart TV',
    match: { nameMatch: 'Sony Bravia' },
    image: '/banners/hero_sony_tv_1779453026529.png',
    isDirectProduct: true
  },
  {
    id: 'realme',
    bgClass: 'bg-gradient-to-br from-yellow-500 via-amber-500 to-orange-500',
    badge: 'HOT DEAL',
    title: 'Realme 12 Pro',
    subtitle: 'Master Storyteller',
    price: 'From ₹19,999*',
    categoryFilter: 'Mobiles',
    searchQuery: 'Realme',
    match: { nameMatch: 'Realme' },
    image: '/banners/hero_realme_pro_1779453042285.png',
    isDirectProduct: true
  },
];

export const DEAL_PROMOS = [
  {
    offer: 'Up to 25% Off',
    caption: 'Fresh & plump',
    categoryFilter: 'Beauty',
    searchQuery: '',
    match: { nameMatch: 'Garnier' },
    image: 'https://images.unsplash.com/photo-1596462502278-27bf85033e5a?w=400&h=400&fit=crop'
  },
  {
    offer: 'Min. 50% Off',
    caption: 'Edgy sneakers',
    categoryFilter: 'Fashion',
    searchQuery: 'sneakers',
    match: { nameMatch: 'sneakers' },
    image: 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=400&h=400&fit=crop'
  },
  {
    offer: 'Up to 70% Off',
    caption: "Kids' carnival",
    categoryFilter: 'Toys',
    searchQuery: '',
    match: { nameMatch: 'LEGO' },
    image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=400&h=400&fit=crop'
  },
];

export const INTERESTING_FINDS = [
  { label: 'Shoes', offer: 'From ₹129', categoryFilter: 'Fashion', match: { nameMatch: 'US Polo' }, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop' },
  { label: 'Watches', offer: 'Upto 70% off', categoryFilter: 'Electronics', match: { nameMatch: 'JBL' }, image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=300&h=300&fit=crop' },
  { label: 'boAt, realme & more', offer: 'Buy Now!', categoryFilter: 'Electronics', match: { nameMatch: 'Boult' }, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop' },
  { label: 'Top deals', offer: 'Min 60% off', categoryFilter: 'Fashion', match: { nameMatch: 'Puma' }, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop' },
];

export const GRAB_OR_GONE = [
  { label: "Don't Miss", offer: 'Under ₹199', categoryFilter: 'Electronics', match: { nameMatch: 'Realme Buds' }, image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=300&h=300&fit=crop' },
  { label: 'Big Savings', offer: 'Top Rated', categoryFilter: 'Fashion', match: { nameMatch: 'Allen Solly' }, image: 'https://images.unsplash.com/photo-1550639525-c97d455acf70?w=300&h=300&fit=crop' },
  { label: 'Popular', offer: 'Min. 70% Off', categoryFilter: 'Fashion', match: { nameMatch: 'Roadster' }, image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&h=300&fit=crop' },
  { label: 'Widest Range', offer: 'Min. 70% Off', categoryFilter: 'Fashion', match: { nameMatch: 'Adidas' }, image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=300&h=300&fit=crop' },
];

export const BRANDS_SPOTLIGHT = [
  { brand: 'TIMEX', offer: 'Min. 50% Off', description: 'Elegance redefined', categoryFilter: 'Fashion', match: { brand: 'Nike' }, image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=300&h=300&fit=crop' },
  { brand: 'noise', offer: 'Min. 50% Off', description: 'Track your fitness', categoryFilter: 'Electronics', match: { nameMatch: 'Fire-Boltt' }, image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=300&h=300&fit=crop' },
  { brand: 'adidas', offer: 'Up to 90% Off', description: 'Biggest price drop', categoryFilter: 'Fashion', match: { brand: 'Adidas' }, image: 'https://images.unsplash.com/photo-1518002171953-a080ee817e1f?w=300&h=300&fit=crop' },
  { brand: 'boat', offer: 'Min. 50% Off', description: 'True wireless', categoryFilter: 'Electronics', match: { nameMatch: 'Boult' }, image: 'https://images.unsplash.com/photo-1606220588913-b3eea4ceb47a?w=300&h=300&fit=crop' },
  { brand: 'FIRE-BOLTT', offer: 'Min. 50% Off', description: 'Smart wearables', categoryFilter: 'Electronics', match: { nameMatch: 'Fire-Boltt' }, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop' },
  { brand: 'Forest Essentials', offer: 'Premium Care', description: 'Luxury Ayurveda', categoryFilter: 'Beauty', match: { nameMatch: 'Forest Essentials' }, image: 'https://images.unsplash.com/photo-1615397323861-12503d274dc5?w=300&h=300&fit=crop' },
];

export const TRENDS = [
  { tag: 'FusionLehenga', categoryFilter: 'Fashion', match: { nameMatch: 'Allen Solly' }, image: 'https://images.unsplash.com/photo-1583391733959-b05423f03b57?w=300&h=300&fit=crop' },
  { tag: 'Oversized', categoryFilter: 'Fashion', match: { nameMatch: 'Roadster' }, image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&h=300&fit=crop' },
  { tag: 'CargoStyle', categoryFilter: 'Fashion', match: { nameMatch: 'Puma' }, image: 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=300&h=300&fit=crop' },
  { tag: 'Stackable', categoryFilter: 'Fashion', match: { nameMatch: 'Adidas' }, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop' },
];

export const SHOP_COOL_SUMMER = [
  { label: 'Face Wash', offer: 'Min. 50% Off', categoryFilter: 'Beauty', match: { nameMatch: 'Garnier' }, image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=300&h=300&fit=crop' },
  { label: "Men's Casual Shoes", offer: 'Min. 70% Off', categoryFilter: 'Fashion', match: { nameMatch: 'Nike' }, image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=300&h=300&fit=crop' },
  { label: "Men's Slippers & Flip Flops", offer: 'Min. 70% Off', categoryFilter: 'Fashion', match: { nameMatch: 'US Polo' }, image: 'https://images.unsplash.com/photo-1562183241-b937e95585b6?w=300&h=300&fit=crop' },
  { label: "Men's Sandals & Floaters", offer: 'Min. 70% Off', categoryFilter: 'Fashion', match: { nameMatch: 'Puma' }, image: 'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=300&h=300&fit=crop' },
];

export const APPLIANCE_COOL_SUMMER = [
  { label: 'True Wireless', offer: 'Min. 50% Off', categoryFilter: 'Electronics', match: { nameMatch: 'Boult' }, image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=300&h=300&fit=crop' },
  { label: 'Power Banks', offer: 'Min. 50% Off', categoryFilter: 'Electronics', match: { nameMatch: 'JBL' }, image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=300&h=300&fit=crop' },
  { label: 'Mixer Juicer Grinder', offer: 'Min. 50% Off', categoryFilter: 'Appliances', match: { nameMatch: 'Microwave' }, image: 'https://images.unsplash.com/photo-1585659722983-39cb86d4e5ff?w=300&h=300&fit=crop' },
  { label: 'Neckband', offer: 'Min. 50% Off', categoryFilter: 'Electronics', match: { nameMatch: 'Realme Buds' }, image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=300&h=300&fit=crop' },
];

export const FESTIVE_FASHION = [
  { label: 'Sarees', offer: 'Min. 50% Off', categoryFilter: 'Fashion', match: { nameMatch: 'Nike' }, image: 'https://images.unsplash.com/photo-1610030469983-98e550d61dc9?w=300&h=300&fit=crop' },
  { label: 'Kurtas & Sets', offer: 'Min. 60% Off', categoryFilter: 'Fashion', match: { nameMatch: 'US Polo' }, image: 'https://images.unsplash.com/photo-1583391733959-b05423f03b57?w=300&h=300&fit=crop' },
  { label: 'Jewellery', offer: 'Min. 70% Off', categoryFilter: 'Fashion', match: { nameMatch: 'Puma' }, image: 'https://images.unsplash.com/photo-1599643478514-4a4e320478cc?w=300&h=300&fit=crop' },
  { label: 'Handbags', offer: 'Min. 40% Off', categoryFilter: 'Fashion', match: { nameMatch: 'Adidas' }, image: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=300&h=300&fit=crop' },
  { label: 'Watches', offer: 'Min. 30% Off', categoryFilter: 'Electronics', match: { nameMatch: 'JBL' }, image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=300&h=300&fit=crop' },
  { label: 'Heels & Flats', offer: 'Min. 50% Off', categoryFilter: 'Fashion', match: { nameMatch: 'Boult' }, image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=300&h=300&fit=crop' },
];

export const HOME_UPGRADES = [
  { label: 'Bedsheets', offer: 'From ₹199', categoryFilter: 'Home & Kitchen', match: { nameMatch: 'Realme Buds' }, image: 'https://images.unsplash.com/photo-1522771731470-fea14eb16e3c?w=300&h=300&fit=crop' },
  { label: 'Wall Decor', offer: 'Under ₹499', categoryFilter: 'Home & Kitchen', match: { nameMatch: 'Allen Solly' }, image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=300&h=300&fit=crop' },
  { label: 'Lighting', offer: 'Min. 60% Off', categoryFilter: 'Home & Kitchen', match: { nameMatch: 'Roadster' }, image: 'https://images.unsplash.com/photo-1507676184212-d0c30a59ed8a?w=300&h=300&fit=crop' },
  { label: 'Cookware', offer: 'Up to 70% Off', categoryFilter: 'Home & Kitchen', match: { nameMatch: 'Adidas' }, image: 'https://images.unsplash.com/photo-1583778176476-4a8b02a64c54?w=300&h=300&fit=crop' },
];
