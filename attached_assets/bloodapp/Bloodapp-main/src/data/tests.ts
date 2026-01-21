export interface TestParameter {
  name: string;
  description: string;
  normalRange?: string;
}

export interface Test {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  parameters: TestParameter[];
  preparation: string[];
  whyThisTest: string;
  sampleType: string;
  reportTime: string;
}

export interface TestBundle {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  originalPrice: number;
  tests: string[]; // Test IDs
  idealFor: string[];
  icon: string;
  gradient: string;
  popular?: boolean;
}

export interface LabPartner {
  id: string;
  name: string;
  logo: string;
  rating: number;
  reviews: number;
  location: string;
  turnaroundTime: string;
  homeCollection: boolean;
  accreditation: string[];
}

export interface LabPrice {
  labId: string;
  bundleId: string;
  price: number;
  discount?: number;
  availability: 'available' | 'limited' | 'unavailable';
  nextAvailableDate?: string;
}

export const tests: Test[] = [
  {
    id: 'cbc',
    name: 'Complete Blood Count (CBC)',
    description: 'Comprehensive analysis of blood cells to assess overall health',
    category: 'General Health',
    price: 80,
    sampleType: 'Blood',
    reportTime: '24 hours',
    whyThisTest: 'CBC helps detect a wide range of disorders including anemia, infection, and many other diseases. It measures several components of blood including red blood cells, white blood cells, and platelets.',
    preparation: [
      'No fasting required',
      'Drink plenty of water before the test',
      'Inform lab about any medications you are taking'
    ],
    parameters: [
      { name: 'Hemoglobin (Hb)', description: 'Oxygen-carrying protein in red blood cells', normalRange: '13.5-17.5 g/dL (men), 12.0-15.5 g/dL (women)' },
      { name: 'Red Blood Cell Count (RBC)', description: 'Number of red blood cells', normalRange: '4.5-5.5 million/μL' },
      { name: 'White Blood Cell Count (WBC)', description: 'Number of white blood cells', normalRange: '4,500-11,000/μL' },
      { name: 'Platelet Count', description: 'Blood clotting cells', normalRange: '150,000-450,000/μL' },
      { name: 'Hematocrit (HCT)', description: 'Percentage of red blood cells in blood', normalRange: '38-50%' },
      { name: 'Mean Corpuscular Volume (MCV)', description: 'Average size of red blood cells', normalRange: '80-100 fL' }
    ]
  },
  {
    id: 'lipid-panel',
    name: 'Lipid Panel',
    description: 'Complete cholesterol and triglyceride analysis for heart health',
    category: 'Heart Health',
    price: 120,
    sampleType: 'Blood',
    reportTime: '24 hours',
    whyThisTest: 'The lipid panel measures cholesterol and triglycerides in your blood. High levels can increase risk of heart disease and stroke. This test helps monitor cardiovascular health.',
    preparation: [
      'Fasting required for 9-12 hours',
      'Only water is allowed during fasting',
      'Take regular medications unless advised otherwise'
    ],
    parameters: [
      { name: 'Total Cholesterol', description: 'Overall cholesterol level', normalRange: '<200 mg/dL' },
      { name: 'LDL Cholesterol', description: 'Low-density lipoprotein (bad cholesterol)', normalRange: '<100 mg/dL' },
      { name: 'HDL Cholesterol', description: 'High-density lipoprotein (good cholesterol)', normalRange: '>40 mg/dL (men), >50 mg/dL (women)' },
      { name: 'Triglycerides', description: 'Fat in the blood', normalRange: '<150 mg/dL' },
      { name: 'VLDL Cholesterol', description: 'Very low-density lipoprotein', normalRange: '<30 mg/dL' }
    ]
  },
  {
    id: 'hba1c',
    name: 'HbA1c (Glycated Hemoglobin)',
    description: 'Average blood sugar levels over the past 2-3 months',
    category: 'Diabetes',
    price: 90,
    sampleType: 'Blood',
    reportTime: '24 hours',
    whyThisTest: 'HbA1c provides a long-term view of blood sugar control. It\'s essential for diagnosing diabetes and monitoring treatment effectiveness in diabetic patients.',
    preparation: [
      'No fasting required',
      'Can be done at any time of day',
      'Continue regular medications'
    ],
    parameters: [
      { name: 'HbA1c Level', description: 'Average glucose over 2-3 months', normalRange: '<5.7% (normal), 5.7-6.4% (prediabetes), ≥6.5% (diabetes)' },
      { name: 'Estimated Average Glucose (eAG)', description: 'Calculated average glucose', normalRange: 'Based on HbA1c value' }
    ]
  },
  {
    id: 'thyroid-profile',
    name: 'Thyroid Function Test (TFT)',
    description: 'Complete thyroid hormone analysis including TSH, T3, and T4',
    category: 'Hormones',
    price: 150,
    sampleType: 'Blood',
    reportTime: '48 hours',
    whyThisTest: 'Thyroid tests help diagnose thyroid disorders like hypothyroidism or hyperthyroidism. The thyroid gland regulates metabolism, energy, and overall body function.',
    preparation: [
      'No fasting required',
      'Best done in the morning',
      'Inform about thyroid medications'
    ],
    parameters: [
      { name: 'TSH (Thyroid Stimulating Hormone)', description: 'Pituitary hormone that regulates thyroid', normalRange: '0.4-4.0 mIU/L' },
      { name: 'Free T4 (Thyroxine)', description: 'Main thyroid hormone', normalRange: '0.8-1.8 ng/dL' },
      { name: 'Free T3 (Triiodothyronine)', description: 'Active thyroid hormone', normalRange: '2.3-4.2 pg/mL' },
      { name: 'Anti-TPO Antibodies', description: 'Autoimmune thyroid marker', normalRange: '<35 IU/mL' }
    ]
  },
  {
    id: 'liver-function',
    name: 'Liver Function Test (LFT)',
    description: 'Comprehensive liver enzyme and protein analysis',
    category: 'Liver Health',
    price: 100,
    sampleType: 'Blood',
    reportTime: '24 hours',
    whyThisTest: 'LFT measures enzymes and proteins produced by the liver. It helps detect liver damage, disease, or monitoring treatment for liver conditions.',
    preparation: [
      'Fasting for 8-12 hours recommended',
      'Avoid alcohol for 24 hours before test',
      'Inform about medications and supplements'
    ],
    parameters: [
      { name: 'ALT (Alanine Aminotransferase)', description: 'Liver enzyme', normalRange: '7-56 U/L' },
      { name: 'AST (Aspartate Aminotransferase)', description: 'Liver enzyme', normalRange: '10-40 U/L' },
      { name: 'ALP (Alkaline Phosphatase)', description: 'Enzyme from liver and bones', normalRange: '44-147 U/L' },
      { name: 'Total Bilirubin', description: 'Breakdown product of red blood cells', normalRange: '0.1-1.2 mg/dL' },
      { name: 'Albumin', description: 'Main protein in blood', normalRange: '3.5-5.5 g/dL' },
      { name: 'Total Protein', description: 'All proteins in blood', normalRange: '6.0-8.3 g/dL' }
    ]
  },
  {
    id: 'kidney-function',
    name: 'Kidney Function Test (KFT)',
    description: 'Comprehensive kidney health assessment',
    category: 'Kidney Health',
    price: 110,
    sampleType: 'Blood',
    reportTime: '24 hours',
    whyThisTest: 'KFT evaluates how well your kidneys are filtering waste from the blood. Early detection of kidney problems can prevent serious complications.',
    preparation: [
      'No special preparation required',
      'Stay well hydrated',
      'Inform about medications'
    ],
    parameters: [
      { name: 'Creatinine', description: 'Waste product filtered by kidneys', normalRange: '0.7-1.3 mg/dL (men), 0.6-1.1 mg/dL (women)' },
      { name: 'Blood Urea Nitrogen (BUN)', description: 'Waste product from protein breakdown', normalRange: '7-20 mg/dL' },
      { name: 'eGFR (Estimated Glomerular Filtration Rate)', description: 'Kidney filtering capacity', normalRange: '>60 mL/min/1.73m²' },
      { name: 'Uric Acid', description: 'Waste product that can form crystals', normalRange: '3.5-7.2 mg/dL (men), 2.6-6.0 mg/dL (women)' },
      { name: 'Electrolytes (Na, K, Cl)', description: 'Minerals in blood', normalRange: 'Na: 136-145 mEq/L, K: 3.5-5.0 mEq/L' }
    ]
  },
  {
    id: 'vitamin-d',
    name: 'Vitamin D (25-OH)',
    description: 'Measures vitamin D levels for bone and immune health',
    category: 'Vitamins',
    price: 130,
    sampleType: 'Blood',
    reportTime: '48 hours',
    whyThisTest: 'Vitamin D is essential for bone health, immune function, and overall wellness. Deficiency is common in UAE despite sunny weather due to indoor lifestyles.',
    preparation: [
      'No fasting required',
      'Can be done at any time',
      'Stop vitamin D supplements 24 hours before test'
    ],
    parameters: [
      { name: '25-Hydroxyvitamin D', description: 'Total vitamin D level', normalRange: '30-100 ng/mL (optimal), 20-30 ng/mL (insufficient), <20 ng/mL (deficient)' }
    ]
  },
  {
    id: 'vitamin-b12',
    name: 'Vitamin B12',
    description: 'Essential vitamin for nerve function and energy',
    category: 'Vitamins',
    price: 100,
    sampleType: 'Blood',
    reportTime: '48 hours',
    whyThisTest: 'B12 is crucial for red blood cell formation, nerve function, and DNA synthesis. Deficiency can cause fatigue, weakness, and neurological problems.',
    preparation: [
      'No fasting required',
      'Avoid B12 supplements for 48 hours before test',
      'Best done in the morning'
    ],
    parameters: [
      { name: 'Serum B12', description: 'Vitamin B12 level in blood', normalRange: '200-900 pg/mL' },
      { name: 'Folate', description: 'Related B vitamin', normalRange: '>3 ng/mL' }
    ]
  },
  {
    id: 'iron-studies',
    name: 'Iron Studies',
    description: 'Complete iron profile including ferritin and TIBC',
    category: 'Anemia Panel',
    price: 140,
    sampleType: 'Blood',
    reportTime: '48 hours',
    whyThisTest: 'Iron studies help diagnose different types of anemia and iron deficiency. Iron is essential for hemoglobin production and oxygen transport.',
    preparation: [
      'Fasting for 8-12 hours required',
      'Best done in the morning',
      'Avoid iron supplements for 24 hours'
    ],
    parameters: [
      { name: 'Serum Iron', description: 'Iron in blood', normalRange: '60-170 μg/dL' },
      { name: 'Ferritin', description: 'Stored iron', normalRange: '12-300 ng/mL (men), 12-150 ng/mL (women)' },
      { name: 'TIBC (Total Iron Binding Capacity)', description: 'Iron transport capacity', normalRange: '240-450 μg/dL' },
      { name: 'Transferrin Saturation', description: 'Percentage of iron binding sites occupied', normalRange: '20-50%' }
    ]
  },
  {
    id: 'testosterone',
    name: 'Testosterone Total & Free',
    description: 'Male hormone analysis for vitality and health',
    category: 'Hormones',
    price: 180,
    sampleType: 'Blood',
    reportTime: '48 hours',
    whyThisTest: 'Testosterone affects muscle mass, bone density, sex drive, and mood. Testing helps diagnose low testosterone (hypogonadism) and monitor treatment.',
    preparation: [
      'Best done between 7-10 AM',
      'No fasting required',
      'Avoid strenuous exercise 24 hours before'
    ],
    parameters: [
      { name: 'Total Testosterone', description: 'Total testosterone in blood', normalRange: '300-1000 ng/dL (men), 15-70 ng/dL (women)' },
      { name: 'Free Testosterone', description: 'Bioavailable testosterone', normalRange: '5-21 ng/dL (men)' },
      { name: 'SHBG (Sex Hormone Binding Globulin)', description: 'Protein that binds testosterone', normalRange: '10-57 nmol/L' }
    ]
  },
  {
    id: 'female-hormones',
    name: 'Female Hormone Panel',
    description: 'Comprehensive hormonal analysis for women',
    category: 'Hormones',
    price: 200,
    sampleType: 'Blood',
    reportTime: '48 hours',
    whyThisTest: 'Evaluates reproductive hormones to diagnose menstrual irregularities, fertility issues, PCOS, and menopause. Essential for women\'s health monitoring.',
    preparation: [
      'Best done on day 2-3 of menstrual cycle',
      'Fasting not required',
      'Note current cycle day when booking'
    ],
    parameters: [
      { name: 'FSH (Follicle Stimulating Hormone)', description: 'Controls egg production', normalRange: 'Varies by cycle phase' },
      { name: 'LH (Luteinizing Hormone)', description: 'Triggers ovulation', normalRange: 'Varies by cycle phase' },
      { name: 'Estradiol (E2)', description: 'Main estrogen hormone', normalRange: 'Varies by cycle phase' },
      { name: 'Progesterone', description: 'Prepares uterus for pregnancy', normalRange: 'Varies by cycle phase' },
      { name: 'Prolactin', description: 'Milk production hormone', normalRange: '4-25 ng/mL' },
      { name: 'AMH (Anti-Müllerian Hormone)', description: 'Ovarian reserve marker', normalRange: '1.0-4.0 ng/mL' }
    ]
  },
  {
    id: 'psa',
    name: 'PSA (Prostate-Specific Antigen)',
    description: 'Prostate health screening for men',
    category: 'Men\'s Health',
    price: 120,
    sampleType: 'Blood',
    reportTime: '48 hours',
    whyThisTest: 'PSA screening helps detect prostate problems including enlargement and cancer. Recommended for men over 50 or with family history.',
    preparation: [
      'Avoid ejaculation for 48 hours before test',
      'No vigorous exercise 24 hours before',
      'Inform about prostate medications'
    ],
    parameters: [
      { name: 'Total PSA', description: 'Prostate-specific antigen level', normalRange: '<4.0 ng/mL' },
      { name: 'Free PSA', description: 'Unbound PSA', normalRange: '>25% of total' },
      { name: 'Free/Total PSA Ratio', description: 'Helps differentiate conditions', normalRange: '>0.25' }
    ]
  }
];

export const bundles: TestBundle[] = [
  {
    id: 'essential-health',
    name: 'Essential Health Checkup',
    description: 'Complete health screening for overall wellness and preventive care',
    category: 'General Health',
    price: 399,
    originalPrice: 580,
    icon: '💊',
    gradient: 'from-blue-500 to-blue-600',
    popular: true,
    idealFor: [
      'Annual health checkups',
      'Adults 18+ years',
      'Preventive health monitoring',
      'First-time comprehensive screening'
    ],
    tests: ['cbc', 'lipid-panel', 'hba1c', 'liver-function', 'kidney-function', 'vitamin-d']
  },
  {
    id: 'heart-health',
    name: 'Advanced Heart Health',
    description: 'Comprehensive cardiovascular risk assessment and monitoring',
    category: 'Heart Health',
    price: 299,
    originalPrice: 440,
    icon: '❤️',
    gradient: 'from-red-500 to-red-600',
    popular: true,
    idealFor: [
      'Family history of heart disease',
      'High cholesterol or blood pressure',
      'Adults over 40',
      'Diabetes patients'
    ],
    tests: ['lipid-panel', 'hba1c', 'cbc', 'kidney-function']
  },
  {
    id: 'womens-wellness',
    name: 'Women\'s Wellness Panel',
    description: 'Complete health package designed specifically for women',
    category: 'Women\'s Health',
    price: 599,
    originalPrice: 850,
    icon: '🩺',
    gradient: 'from-pink-500 to-pink-600',
    popular: true,
    idealFor: [
      'Women 20+ years',
      'Menstrual irregularities',
      'PCOS screening',
      'Fertility planning',
      'Hormonal imbalance symptoms'
    ],
    tests: ['female-hormones', 'thyroid-profile', 'cbc', 'vitamin-d', 'iron-studies', 'vitamin-b12']
  },
  {
    id: 'mens-vitality',
    name: 'Men\'s Vitality Panel',
    description: 'Comprehensive health assessment for men including hormones',
    category: 'Men\'s Health',
    price: 549,
    originalPrice: 780,
    icon: '💪',
    gradient: 'from-indigo-500 to-indigo-600',
    idealFor: [
      'Men 30+ years',
      'Low energy or fatigue',
      'Decreased libido',
      'Muscle mass concerns',
      'Prostate health monitoring'
    ],
    tests: ['testosterone', 'psa', 'thyroid-profile', 'cbc', 'lipid-panel', 'vitamin-d']
  },
  {
    id: 'energy-fatigue',
    name: 'Energy & Fatigue Panel',
    description: 'Identify nutritional deficiencies causing tiredness and low energy',
    category: 'Energy & Wellness',
    price: 449,
    originalPrice: 640,
    icon: '⚡',
    gradient: 'from-amber-500 to-amber-600',
    idealFor: [
      'Chronic fatigue',
      'Low energy levels',
      'Poor concentration',
      'Suspected vitamin deficiencies',
      'Dietary concerns'
    ],
    tests: ['thyroid-profile', 'vitamin-d', 'vitamin-b12', 'iron-studies', 'cbc', 'hba1c']
  }
];

export const labPartners: LabPartner[] = [
  {
    id: 'lab-1',
    name: 'Prime Diagnostics',
    logo: '🏥',
    rating: 4.8,
    reviews: 2847,
    location: 'Dubai Healthcare City',
    turnaroundTime: '24 hours',
    homeCollection: true,
    accreditation: ['CAP', 'JCI', 'MOH']
  },
  {
    id: 'lab-2',
    name: 'HealthFirst Labs',
    logo: '🔬',
    rating: 4.9,
    reviews: 3521,
    location: 'Multiple locations (15+)',
    turnaroundTime: '24-48 hours',
    homeCollection: true,
    accreditation: ['CAP', 'ISO 15189', 'MOH']
  },
  {
    id: 'lab-3',
    name: 'MediCare Diagnostics',
    logo: '⚕️',
    rating: 4.7,
    reviews: 1956,
    location: 'Jumeirah, Dubai Marina',
    turnaroundTime: '48 hours',
    homeCollection: true,
    accreditation: ['JCI', 'MOH']
  },
  {
    id: 'lab-4',
    name: 'QuickTest Pro',
    logo: '🩺',
    rating: 4.6,
    reviews: 1234,
    location: 'Downtown Dubai',
    turnaroundTime: '24 hours',
    homeCollection: false,
    accreditation: ['ISO 15189', 'MOH']
  }
];

export const labPrices: LabPrice[] = [
  // Essential Health Checkup
  { labId: 'lab-1', bundleId: 'essential-health', price: 399, availability: 'available' },
  { labId: 'lab-2', bundleId: 'essential-health', price: 375, discount: 10, availability: 'available' },
  { labId: 'lab-3', bundleId: 'essential-health', price: 420, availability: 'available' },
  { labId: 'lab-4', bundleId: 'essential-health', price: 360, discount: 15, availability: 'limited', nextAvailableDate: '2026-01-17' },
  
  // Heart Health
  { labId: 'lab-1', bundleId: 'heart-health', price: 299, availability: 'available' },
  { labId: 'lab-2', bundleId: 'heart-health', price: 285, discount: 8, availability: 'available' },
  { labId: 'lab-3', bundleId: 'heart-health', price: 310, availability: 'available' },
  { labId: 'lab-4', bundleId: 'heart-health', price: 275, discount: 12, availability: 'available' },
  
  // Women's Wellness
  { labId: 'lab-1', bundleId: 'womens-wellness', price: 599, availability: 'available' },
  { labId: 'lab-2', bundleId: 'womens-wellness', price: 575, discount: 10, availability: 'available' },
  { labId: 'lab-3', bundleId: 'womens-wellness', price: 620, availability: 'limited', nextAvailableDate: '2026-01-16' },
  { labId: 'lab-4', bundleId: 'womens-wellness', price: 550, discount: 15, availability: 'available' },
  
  // Men's Vitality
  { labId: 'lab-1', bundleId: 'mens-vitality', price: 549, availability: 'available' },
  { labId: 'lab-2', bundleId: 'mens-vitality', price: 525, discount: 10, availability: 'available' },
  { labId: 'lab-3', bundleId: 'mens-vitality', price: 570, availability: 'available' },
  { labId: 'lab-4', bundleId: 'mens-vitality', price: 510, discount: 12, availability: 'available' },
  
  // Energy & Fatigue
  { labId: 'lab-1', bundleId: 'energy-fatigue', price: 449, availability: 'available' },
  { labId: 'lab-2', bundleId: 'energy-fatigue', price: 430, discount: 8, availability: 'available' },
  { labId: 'lab-3', bundleId: 'energy-fatigue', price: 465, availability: 'available' },
  { labId: 'lab-4', bundleId: 'energy-fatigue', price: 420, discount: 10, availability: 'limited', nextAvailableDate: '2026-01-18' }
];

// Helper function to get test by ID
export function getTestById(id: string): Test | undefined {
  return tests.find(test => test.id === id);
}

// Helper function to get bundle by ID
export function getBundleById(id: string): TestBundle | undefined {
  return bundles.find(bundle => bundle.id === id);
}

// Helper function to get all tests in a bundle
export function getTestsInBundle(bundleId: string): Test[] {
  const bundle = getBundleById(bundleId);
  if (!bundle) return [];
  
  return bundle.tests
    .map(testId => getTestById(testId))
    .filter((test): test is Test => test !== undefined);
}

// Helper function to get bundles containing a specific test
export function getBundlesContainingTest(testId: string): TestBundle[] {
  return bundles.filter(bundle => bundle.tests.includes(testId));
}

// Get all unique categories
export function getAllCategories(): string[] {
  const bundleCategories = bundles.map(b => b.category);
  return Array.from(new Set(bundleCategories));
}

// Helper function to get lab by ID
export function getLabById(id: string): LabPartner | undefined {
  return labPartners.find(lab => lab.id === id);
}

// Helper function to get prices for a bundle
export function getPricesForBundle(bundleId: string): LabPrice[] {
  return labPrices.filter(price => price.bundleId === bundleId);
}

// Helper function to get lab with price for bundle
export function getLabsWithPrices(bundleId: string): Array<LabPartner & { price: LabPrice }> {
  const prices = getPricesForBundle(bundleId);
  return prices
    .map(price => {
      const lab = getLabById(price.labId);
      if (!lab) return null;
      return { ...lab, price };
    })
    .filter((item): item is LabPartner & { price: LabPrice } => item !== null)
    .sort((a, b) => a.price.price - b.price.price); // Sort by price ascending
}