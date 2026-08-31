export interface PersonalInfo {
  name: string;
  location: string;
  district: string;
  state: string;
}

export interface BusinessInfo {
  name: string;
  category: "Dairy" | "Handloom & Textiles" | "Agri-Processing" | "Artisan & Handicrafts" | "Retail & Trading" | string;
  type: string;
}

export interface FinancialInfo {
  monthlyRevenue: number;
  monthlyExpenses: number;
  existingLoan: number;
}

export interface FundingInfo {
  amountRequired: number;
  purpose: string;
}

export interface Entrepreneur {
  id: string;
  personal: PersonalInfo;
  business: BusinessInfo;
  financial: FinancialInfo;
  funding: FundingInfo;
}

// Preset demo entrepreneurs
export const demoEntrepreneurs: Entrepreneur[] = [
  {
    id: "ramesh-dairy",
    personal: {
      name: "Ramesh Kumar",
      location: "Vidisha",
      district: "Vidisha",
      state: "Madhya Pradesh",
    },
    business: {
      name: "Shree Dairy Farm",
      category: "Dairy",
      type: "Dairy Farming & Milk Production",
    },
    financial: {
      monthlyRevenue: 45000,
      monthlyExpenses: 30000,
      existingLoan: 50000,
    },
    funding: {
      amountRequired: 300000,
      purpose: "Business Expansion (Cattle & Shed)",
    },
  },
  {
    id: "sunita-handloom",
    personal: {
      name: "Sunita Devi",
      location: "Chanderi",
      district: "Ashoknagar",
      state: "Madhya Pradesh",
    },
    business: {
      name: "Chanderi Weaves & Sarees",
      category: "Handloom & Textiles",
      type: "Traditional Silk & Cotton Weaving",
    },
    financial: {
      monthlyRevenue: 28000,
      monthlyExpenses: 16000,
      existingLoan: 0,
    },
    funding: {
      amountRequired: 150000,
      purpose: "Loom Modernization & Raw Silk Yarn",
    },
  },
  {
    id: "rajesh-agri",
    personal: {
      name: "Rajesh Verma",
      location: "Hoshangabad",
      district: "Narmadapuram",
      state: "Madhya Pradesh",
    },
    business: {
      name: "Narmada Agro Processing",
      category: "Agri-Processing",
      type: "Mustard Oil Expelling & Flour Milling",
    },
    financial: {
      monthlyRevenue: 75000,
      monthlyExpenses: 56000,
      existingLoan: 120000,
    },
    funding: {
      amountRequired: 500000,
      purpose: "Automatic Oil Extraction & Filter Unit",
    },
  },
];

// Default entrepreneur (Ramesh Kumar)
export const demoEntrepreneur = demoEntrepreneurs[0];

// Dynamic trend generator based on current entrepreneur's monthly financials
export function getMonthlyTrendData(entrepreneur: Entrepreneur) {
  const rev = entrepreneur.financial.monthlyRevenue;
  const exp = entrepreneur.financial.monthlyExpenses;

  return [
    {
      month: "Mar",
      revenue: Math.round(rev * 0.86),
      expenses: Math.round(exp * 0.93),
      profit: Math.round(rev * 0.86 - exp * 0.93),
    },
    {
      month: "Apr",
      revenue: Math.round(rev * 0.89),
      expenses: Math.round(exp * 0.96),
      profit: Math.round(rev * 0.89 - exp * 0.96),
    },
    {
      month: "May",
      revenue: Math.round(rev * 0.93),
      expenses: Math.round(exp * 0.95),
      profit: Math.round(rev * 0.93 - exp * 0.95),
    },
    {
      month: "Jun",
      revenue: Math.round(rev * 0.96),
      expenses: Math.round(exp * 0.98),
      profit: Math.round(rev * 0.96 - exp * 0.98),
    },
    {
      month: "Jul",
      revenue: Math.round(rev * 0.98),
      expenses: Math.round(exp * 1.0),
      profit: Math.round(rev * 0.98 - exp * 1.0),
    },
    {
      month: "Aug",
      revenue: rev,
      expenses: exp,
      profit: rev - exp,
    },
  ];
}

// Dynamic funding allocation data based on category and funding amount
export function getFundingAllocationData(entrepreneur: Entrepreneur) {
  const total = entrepreneur.funding.amountRequired;
  const cat = entrepreneur.business.category.toLowerCase();

  if (cat.includes("dairy")) {
    return [
      { name: "Cattle Purchase", value: Math.round(total * 0.40), percentage: 40 },
      { name: "Infrastructure / Shed", value: Math.round(total * 0.25), percentage: 25 },
      { name: "Milking Equipment", value: Math.round(total * 0.15), percentage: 15 },
      { name: "Feed & Medical Stock", value: Math.round(total * 0.12), percentage: 12 },
      { name: "Working Capital Buffer", value: Math.round(total * 0.08), percentage: 8 },
    ];
  } else if (cat.includes("handloom") || cat.includes("textile") || cat.includes("artisan")) {
    return [
      { name: "Jacquard Loom Upgrades", value: Math.round(total * 0.45), percentage: 45 },
      { name: "Raw Silk & Zari Yarn", value: Math.round(total * 0.30), percentage: 30 },
      { name: "Dyeing & Finishing Tools", value: Math.round(total * 0.12), percentage: 12 },
      { name: "Packaging & Direct Sales", value: Math.round(total * 0.08), percentage: 8 },
      { name: "Working Capital Buffer", value: Math.round(total * 0.05), percentage: 5 },
    ];
  } else if (cat.includes("agri") || cat.includes("food") || cat.includes("processing")) {
    return [
      { name: "Extraction Machinery", value: Math.round(total * 0.50), percentage: 50 },
      { name: "Storage & Filtration", value: Math.round(total * 0.22), percentage: 22 },
      { name: "Bulk Raw Seed Stock", value: Math.round(total * 0.15), percentage: 15 },
      { name: "Food Safety & Packaging", value: Math.round(total * 0.08), percentage: 8 },
      { name: "Operating Buffer", value: Math.round(total * 0.05), percentage: 5 },
    ];
  }

  return [
    { name: "Core Equipment", value: Math.round(total * 0.45), percentage: 45 },
    { name: "Premises & Setup", value: Math.round(total * 0.25), percentage: 25 },
    { name: "Raw Material Inventory", value: Math.round(total * 0.18), percentage: 18 },
    { name: "Operating Buffer", value: Math.round(total * 0.12), percentage: 12 },
  ];
}

// Dynamic expense breakdown
export function getExpenseBreakdownData(entrepreneur: Entrepreneur) {
  const exp = entrepreneur.financial.monthlyExpenses;
  const cat = entrepreneur.business.category.toLowerCase();

  if (cat.includes("dairy")) {
    return [
      { name: "Feed & Fodder", value: Math.round(exp * 0.40) },
      { name: "Labor", value: Math.round(exp * 0.27) },
      { name: "Transport", value: Math.round(exp * 0.12) },
      { name: "Veterinary", value: Math.round(exp * 0.10) },
      { name: "Utilities & Power", value: Math.round(exp * 0.07) },
      { name: "Other Overheads", value: Math.round(exp * 0.04) },
    ];
  } else if (cat.includes("handloom") || cat.includes("textile")) {
    return [
      { name: "Raw Yarn & Silk", value: Math.round(exp * 0.48) },
      { name: "Weaving Labor / Assistance", value: Math.round(exp * 0.25) },
      { name: "Dyes & Chemicals", value: Math.round(exp * 0.12) },
      { name: "Transport & Courier", value: Math.round(exp * 0.08) },
      { name: "Loom Maintenance", value: Math.round(exp * 0.07) },
    ];
  }

  return [
    { name: "Raw Material Procurement", value: Math.round(exp * 0.52) },
    { name: "Electricity & Fuel", value: Math.round(exp * 0.20) },
    { name: "Labor & Operator Wages", value: Math.round(exp * 0.15) },
    { name: "Transport & Logistics", value: Math.round(exp * 0.08) },
    { name: "Maintenance & Spares", value: Math.round(exp * 0.05) },
  ];
}
