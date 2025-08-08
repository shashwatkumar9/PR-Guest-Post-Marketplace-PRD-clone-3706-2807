// Expanded list of content niches for the platform
export const NICHES = [
  {
    id: 'technology',
    name: 'Technology',
    slug: 'technology',
    description: 'Content related to software, hardware, AI, tech trends, and digital innovations',
    icon: 'FiMonitor',
    subcategories: ['Software Development', 'Artificial Intelligence', 'Cybersecurity', 'Cloud Computing', 'Mobile Technology']
  },
  {
    id: 'health',
    name: 'Health & Wellness',
    slug: 'health-wellness',
    description: 'Content focused on physical health, mental wellbeing, fitness, nutrition, and medical advancements',
    icon: 'FiHeart',
    subcategories: ['Nutrition', 'Fitness', 'Mental Health', 'Medical Research', 'Alternative Medicine']
  },
  {
    id: 'finance',
    name: 'Finance',
    slug: 'finance',
    description: 'Content covering personal finance, investing, cryptocurrency, banking, and financial planning',
    icon: 'FiDollarSign',
    subcategories: ['Investing', 'Cryptocurrency', 'Personal Finance', 'Banking', 'Financial Planning']
  },
  {
    id: 'business',
    name: 'Business',
    slug: 'business',
    description: 'Content about entrepreneurship, management, marketing, startups, and business strategies',
    icon: 'FiBriefcase',
    subcategories: ['Entrepreneurship', 'Marketing', 'Management', 'Startups', 'E-commerce']
  },
  {
    id: 'marketing',
    name: 'Marketing & Advertising',
    slug: 'marketing-advertising',
    description: 'Content focused on digital marketing, SEO, PPC, content marketing, and advertising strategies',
    icon: 'FiTrendingUp',
    subcategories: ['Digital Marketing', 'SEO', 'Content Marketing', 'Social Media Marketing', 'Email Marketing']
  },
  {
    id: 'lifestyle',
    name: 'Lifestyle',
    slug: 'lifestyle',
    description: 'Content about modern living, self-improvement, relationships, and everyday experiences',
    icon: 'FiSunrise',
    subcategories: ['Self Improvement', 'Relationships', 'Work-Life Balance', 'Minimalism', 'Productivity']
  },
  {
    id: 'travel',
    name: 'Travel',
    slug: 'travel',
    description: 'Content covering destinations, travel tips, adventure experiences, and cultural exploration',
    icon: 'FiMap',
    subcategories: ['Destinations', 'Travel Tips', 'Adventure', 'Budget Travel', 'Luxury Travel']
  },
  {
    id: 'food',
    name: 'Food & Cooking',
    slug: 'food-cooking',
    description: 'Content about recipes, cooking techniques, restaurant reviews, and culinary experiences',
    icon: 'FiCoffee',
    subcategories: ['Recipes', 'Restaurant Reviews', 'Cooking Techniques', 'Food Culture', 'Diets']
  },
  {
    id: 'fashion',
    name: 'Fashion',
    slug: 'fashion',
    description: 'Content about clothing trends, style advice, fashion industry news, and accessories',
    icon: 'FiShoppingBag',
    subcategories: ['Trends', 'Style Advice', 'Sustainable Fashion', 'Luxury Fashion', 'Accessories']
  },
  {
    id: 'education',
    name: 'Education',
    slug: 'education',
    description: 'Content focused on learning methods, educational technology, academic research, and teaching',
    icon: 'FiBook',
    subcategories: ['E-Learning', 'Higher Education', 'Early Childhood', 'Educational Technology', 'Teaching Methods']
  },
  {
    id: 'sports',
    name: 'Sports',
    slug: 'sports',
    description: 'Content covering various sports, athletic performance, sports news, and fitness',
    icon: 'FiActivity',
    subcategories: ['Football', 'Basketball', 'Tennis', 'Athletics', 'Extreme Sports']
  },
  {
    id: 'entertainment',
    name: 'Entertainment',
    slug: 'entertainment',
    description: 'Content about movies, music, television, gaming, and celebrity news',
    icon: 'FiFilm',
    subcategories: ['Movies', 'Music', 'Television', 'Gaming', 'Celebrity News']
  },
  {
    id: 'science',
    name: 'Science',
    slug: 'science',
    description: 'Content covering scientific discoveries, research, space exploration, and academic studies',
    icon: 'FiZap',
    subcategories: ['Physics', 'Biology', 'Astronomy', 'Chemistry', 'Environmental Science']
  },
  {
    id: 'environment',
    name: 'Environment',
    slug: 'environment',
    description: 'Content about sustainability, climate change, conservation, and eco-friendly practices',
    icon: 'FiCloud',
    subcategories: ['Climate Change', 'Conservation', 'Renewable Energy', 'Sustainability', 'Pollution']
  },
  {
    id: 'politics',
    name: 'Politics',
    slug: 'politics',
    description: 'Content covering political news, policy analysis, government affairs, and international relations',
    icon: 'FiFlag',
    subcategories: ['Domestic Politics', 'International Relations', 'Policy Analysis', 'Political Commentary', 'Elections']
  },
  {
    id: 'realestate',
    name: 'Real Estate',
    slug: 'real-estate',
    description: 'Content about property investment, home buying, market trends, and real estate development',
    icon: 'FiHome',
    subcategories: ['Property Investment', 'Home Buying', 'Market Trends', 'Commercial Real Estate', 'Real Estate Development']
  },
  {
    id: 'automotive',
    name: 'Automotive',
    slug: 'automotive',
    description: 'Content about cars, motorcycles, vehicle technology, and the automotive industry',
    icon: 'FiTruck',
    subcategories: ['Car Reviews', 'Electric Vehicles', 'Auto Industry', 'Motorcycle', 'Car Maintenance']
  },
  {
    id: 'parenting',
    name: 'Parenting',
    slug: 'parenting',
    description: 'Content focused on child-rearing, family activities, education, and parenting advice',
    icon: 'FiUsers',
    subcategories: ['Baby Care', 'Toddler', 'Teen Parenting', 'Education', 'Family Activities']
  },
  {
    id: 'pets',
    name: 'Pets & Animals',
    slug: 'pets-animals',
    description: 'Content about pet care, animal behavior, wildlife, and veterinary topics',
    icon: 'FiHeart',
    subcategories: ['Dogs', 'Cats', 'Exotic Pets', 'Pet Health', 'Wildlife']
  },
  {
    id: 'beauty',
    name: 'Beauty & Cosmetics',
    slug: 'beauty-cosmetics',
    description: 'Content covering skincare, makeup, beauty products, and personal care',
    icon: 'FiStar',
    subcategories: ['Skincare', 'Makeup', 'Hair Care', 'Natural Beauty', 'Beauty Reviews']
  },
  {
    id: 'design',
    name: 'Design & Architecture',
    slug: 'design-architecture',
    description: 'Content about graphic design, interior design, architecture, and visual arts',
    icon: 'FiPenTool',
    subcategories: ['Graphic Design', 'Interior Design', 'Architecture', 'UX/UI Design', 'Industrial Design']
  },
  {
    id: 'legal',
    name: 'Legal',
    slug: 'legal',
    description: 'Content covering law, legal advice, regulations, and legal industry trends',
    icon: 'FiBook',
    subcategories: ['Business Law', 'Criminal Law', 'Family Law', 'Intellectual Property', 'Legal Tech']
  },
  {
    id: 'ecommerce',
    name: 'E-commerce',
    slug: 'ecommerce',
    description: 'Content about online selling, marketplaces, e-commerce platforms, and digital retail',
    icon: 'FiShoppingCart',
    subcategories: ['Online Marketplaces', 'E-commerce Platforms', 'Digital Retail', 'Dropshipping', 'E-commerce Marketing']
  },
  {
    id: 'crypto',
    name: 'Cryptocurrency & Blockchain',
    slug: 'cryptocurrency-blockchain',
    description: 'Content focused on cryptocurrency, blockchain technology, NFTs, and decentralized finance',
    icon: 'FiHash',
    subcategories: ['Bitcoin', 'Ethereum', 'NFTs', 'DeFi', 'Blockchain Technology']
  },
  {
    id: 'gaming',
    name: 'Gaming',
    slug: 'gaming',
    description: 'Content covering video games, gaming hardware, esports, and gaming culture',
    icon: 'FiTarget',
    subcategories: ['PC Gaming', 'Console Gaming', 'Mobile Gaming', 'Esports', 'Game Development']
  }
];

// Export a flat array of all niches for simpler filtering
export const NICHE_OPTIONS = NICHES.map(niche => ({
  value: niche.id,
  label: niche.name
}));

// Export a function to get a niche by ID
export const getNicheById = (id) => {
  return NICHES.find(niche => niche.id === id) || null;
};

// Export a function to get a niche by slug
export const getNicheBySlug = (slug) => {
  return NICHES.find(niche => niche.slug === slug) || null;
};