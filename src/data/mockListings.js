// Mock listings data for marketplace display
import { NICHES } from './niches';
import { LANGUAGES } from './languages';

// Helper function to get a random item from an array
const getRandomItem = (array) => array[Math.floor(Math.random() * array.length)];

// Helper function to get random items from an array
const getRandomItems = (array, min = 1, max = 3) => {
  const count = Math.floor(Math.random() * (max - min + 1)) + min;
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Generate random DA (Domain Authority) with higher values being less common
const generateDA = () => {
  const base = Math.floor(Math.random() * 50) + 20; // 20-70
  const boost = Math.random() > 0.7 ? Math.floor(Math.random() * 30) : 0; // Occasionally boost by up to 30
  return Math.min(base + boost, 98); // Cap at 98
};

// Generate a random price based on DA
const generatePrice = (da) => {
  const basePrice = 50 + (da - 20) * 5; // Higher DA = higher base price
  const variation = basePrice * (0.8 + Math.random() * 0.4); // +/-20% variation
  return Math.round(variation / 5) * 5; // Round to nearest $5
};

// Generate random traffic estimate
const generateTraffic = (da) => {
  const multiplier = da * (0.8 + Math.random() * 1.5); // Higher DA generally means more traffic
  const base = multiplier * 1000;
  
  if (base > 1000000) {
    return `${(base / 1000000).toFixed(1)}M`;
  } else if (base > 1000) {
    return `${(base / 1000).toFixed(0)}K`;
  } else {
    return `${Math.round(base)}`;
  }
};

// Generate turnaround time options
const turnaroundOptions = ['1-2 days', '2-3 days', '3-5 days', '5-7 days', '1-2 weeks'];

// Generate realistic website names
const generateWebsiteName = (niche) => {
  const prefixes = ['The', 'Pro', 'Top', 'Elite', 'Prime', 'Modern', 'Digital', 'Smart', 'Daily', 'Global'];
  const suffixes = ['Hub', 'Post', 'Journal', 'Times', 'Today', 'Review', 'Insider', 'Chronicle', 'Report', 'Digest'];
  const nicheWords = niche.name.split(' ')[0].toLowerCase();
  
  const randomChoice = Math.random();
  if (randomChoice > 0.7) {
    return `${getRandomItem(prefixes)}${nicheWords.charAt(0).toUpperCase() + nicheWords.slice(1)}${getRandomItem(suffixes)}.com`;
  } else if (randomChoice > 0.4) {
    return `${nicheWords}${getRandomItem(suffixes)}.com`;
  } else {
    return `${getRandomItem(prefixes)}${getRandomItem(suffixes)}.com`.toLowerCase();
  }
};

// Generate listing title
const generateListingTitle = (website, niche) => {
  const adjectives = ['Premium', 'High-Authority', 'Established', 'Leading', 'Popular', 'Trusted', 'Top-Ranked', 'Professional'];
  const titles = [
    `${getRandomItem(adjectives)} ${niche.name} Guest Post on ${website}`,
    `${website} - ${getRandomItem(adjectives)} ${niche.name} Publication`,
    `${niche.name} Guest Posting on ${getRandomItem(adjectives)} ${website}`,
    `${website} - DA ${generateDA()} ${niche.name} Platform`
  ];
  return getRandomItem(titles);
};

// Generate publisher names
const generatePublisherName = () => {
  const firstNames = ['John', 'Sarah', 'Michael', 'Emily', 'David', 'Lisa', 'James', 'Jennifer', 'Robert', 'Jessica', 'Daniel', 'Ashley', 'Christopher', 'Amanda', 'Matthew', 'Melissa'];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Miller', 'Davis', 'Garcia', 'Rodriguez', 'Wilson', 'Martinez', 'Anderson', 'Taylor', 'Thomas', 'Hernandez', 'Moore'];
  return `${getRandomItem(firstNames)} ${getRandomItem(lastNames)}`;
};

// Generate sample articles based on niche
const generateSampleArticles = (niche) => {
  const articlesByNiche = {
    technology: [
      'The Future of AI in Modern Software Development',
      '10 Cybersecurity Trends Every Business Should Know',
      'How Cloud Computing is Transforming Small Businesses',
      'Blockchain Beyond Cryptocurrency: Real World Applications',
      'The Evolution of Mobile App Development in 2024'
    ],
    health: [
      'Evidence-Based Approaches to Mental Wellness',
      'The Science Behind Intermittent Fasting',
      'How Fitness Tracking Technology is Changing Healthcare',
      'Understanding the Gut-Brain Connection',
      'Modern Approaches to Holistic Health'
    ],
    finance: [
      'Investment Strategies for Uncertain Economic Times',
      'Cryptocurrency: Beyond Bitcoin and Ethereum',
      'How Fintech is Disrupting Traditional Banking',
      'Retirement Planning for Millennials',
      'Understanding ESG Investing: Beyond the Basics'
    ],
    business: [
      'Remote Work Culture: Building Teams Across Borders',
      'Sustainable Business Practices That Increase Profit',
      'Customer Experience Strategies for E-commerce Growth',
      'Navigating Business Regulations in a Global Market',
      'Data-Driven Decision Making for Small Businesses'
    ],
    marketing: [
      'Content Marketing Strategies That Drive Conversion',
      'The Psychology Behind Effective Social Media Campaigns',
      'SEO in 2024: What\'s Changed and What Works Now',
      'Measuring Marketing ROI in the Digital Age',
      'Personalization at Scale: The New Marketing Standard'
    ]
  };

  // Default articles if niche-specific ones aren't available
  const defaultArticles = [
    `Top 10 Trends in ${niche.name} for 2024`,
    `How to Leverage ${niche.name} for Business Growth`,
    `The Ultimate Guide to ${niche.name}`,
    `${niche.name}: Expert Insights and Analysis`,
    `The Future of ${niche.name}: Predictions and Opportunities`
  ];

  const nicheArticles = articlesByNiche[niche.id] || defaultArticles;
  return getRandomItems(nicheArticles, 2, 5);
};

// Generate guidelines based on listing quality and price
const generateGuidelines = (price) => {
  const baseGuidelines = [
    'Original content only (no plagiarism)',
    'Professional writing style required'
  ];
  
  const premiumGuidelines = [
    `Articles must be ${price > 150 ? '1500+' : '1000+'} words`,
    `Maximum ${price > 200 ? '3' : '2'} do-follow backlinks`,
    'Content must be well-researched with citations',
    'Images must be properly licensed and credited',
    'Content must pass Copyscape verification',
    'Author bio with one link allowed'
  ];
  
  return [...baseGuidelines, ...getRandomItems(premiumGuidelines, 2, 4)];
};

// Generate analytics based on DA and traffic
const generateAnalytics = (da, traffic) => {
  // Convert traffic string to number
  let trafficNum = parseInt(traffic.replace(/[KM]/g, '')) * (traffic.includes('K') ? 1000 : (traffic.includes('M') ? 1000000 : 1));
  
  const bounceRate = Math.max(25, 65 - (da / 5)); // Higher DA = lower bounce rate
  const sessionDuration = 1 + (da / 30); // Higher DA = longer sessions
  
  const countries = ['United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 'France', 'India', 'Netherlands', 'Singapore', 'Spain'];
  
  return {
    monthlyVisitors: traffic,
    bounceRate: `${bounceRate.toFixed(1)}%`,
    avgSessionDuration: `${Math.floor(sessionDuration)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
    topCountries: getRandomItems(countries, 3, 5)
  };
};

// Generate the full mock listings dataset
export const generateMockListings = (count = 50) => {
  const listings = [];
  
  for (let i = 0; i < count; i++) {
    const niche = getRandomItem(NICHES);
    const da = generateDA();
    const basePrice = generatePrice(da);
    const traffic = generateTraffic(da);
    const website = generateWebsiteName(niche);
    const languages = getRandomItems(LANGUAGES, 1, 3);
    
    const listing = {
      id: i + 1,
      title: generateListingTitle(website, niche),
      description: `High-quality ${niche.name.toLowerCase()} blog accepting guest posts. Our audience consists of professionals, enthusiasts, and decision-makers in the ${niche.name.toLowerCase()} industry. We provide excellent exposure and strong backlinks to boost your SEO and authority.`,
      niche: niche.name,
      nicheId: niche.id,
      da: da,
      traffic: traffic,
      price: Math.round(basePrice * 1.25), // Total price with platform fee
      basePrice: basePrice, // Publisher's price
      rating: (4 + Math.random()).toFixed(1) > 5 ? 5.0 : (4 + Math.random()).toFixed(1),
      reviews: Math.floor(Math.random() * 50) + 5,
      turnaround: getRandomItem(turnaroundOptions),
      featured: Math.random() > 0.8, // 20% chance of being featured
      website: website,
      languages: languages.map(lang => ({
        code: lang.code,
        name: lang.name
      })),
      publisher: {
        name: generatePublisherName(),
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(generatePublisherName())}&background=0ea5e9&color=fff`,
        rating: (4 + Math.random()).toFixed(1) > 5 ? 5.0 : (4 + Math.random()).toFixed(1),
        completedOrders: Math.floor(Math.random() * 200) + 10,
        responseTime: `${Math.floor(Math.random() * 12) + 1} hours`
      },
      guidelines: generateGuidelines(basePrice),
      sampleArticles: generateSampleArticles(niche),
      analytics: generateAnalytics(da, traffic),
      createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000))
    };
    
    listings.push(listing);
  }
  
  // Sort by DA descending, then by price ascending
  return listings.sort((a, b) => b.da - a.da || a.price - b.price);
};

// Export the generated mock listings
export const MOCK_LISTINGS = (() => {
  const generated = generateMockListings(50);
  // Add only approved user-created listings from localStorage
  const userListings = JSON.parse(localStorage.getItem('userListings') || '[]');
  const approvedUserListings = userListings.filter(listing => listing.status === 'approved' || !listing.status);
  return [...generated, ...approvedUserListings];
})();

// Export function to get listing by ID
export const getListingById = (id) => {
  return MOCK_LISTINGS.find(listing => listing.id === parseInt(id)) || null;
};

// Export filtered listings by niche
export const getListingsByNiche = (nicheId) => {
  return MOCK_LISTINGS.filter(listing => listing.nicheId === nicheId);
};

// Export premium listings (DA > 60)
export const PREMIUM_LISTINGS = MOCK_LISTINGS.filter(listing => listing.da > 60);

// Export featured listings
export const FEATURED_LISTINGS = MOCK_LISTINGS.filter(listing => listing.featured);