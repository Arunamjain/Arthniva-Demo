import { type Entrepreneur } from "@/lib/data/demoEntrepreneur";
import { formatCurrency } from "@/lib/utils";

export interface GovernmentScheme {
  id: string;
  name: string;
  ministry: string;
  purpose: string;
  relevance: string;
  fundingType: string;
  description: string;
  eligibilityHints: string[];
  benefits: string[];
  category: "dairy" | "textile" | "agri" | "msme" | "women" | "rural";
  maxFunding?: number;
  subsidyPercentage?: string;
}

export const allGovernmentSchemes: GovernmentScheme[] = [
  {
    id: "nabard-dairy",
    name: "NABARD Dairy Entrepreneurship Development Scheme",
    ministry: "Department of Animal Husbandry, Dairying & Fisheries",
    purpose: "Capital subsidy and subsidized bank loans for dairy farming units",
    relevance: "Directly matches dairy micro-enterprises looking to acquire cattle, cooling units, and sheds.",
    fundingType: "Subsidized Loan + 25%–33.3% Capital Subsidy",
    subsidyPercentage: "25% (33.33% for SC/ST)",
    description:
      "Provides financial assistance to rural entrepreneurs for setting up small dairy farms, purchasing high-yield milch cattle, and constructing milk storage/handling infrastructure.",
    eligibilityHints: [
      "Individual rural entrepreneurs, SHGs, and joint liability groups",
      "Located in rural or semi-urban areas",
      "Minimum 2 to 10 milch animals unit capacity",
      "No mandatory minimum educational qualification",
    ],
    benefits: [
      "Back-ended capital subsidy credited directly to loan account",
      "Term loan up to 75%–80% of eligible project cost",
      "Covers cattle, shed construction, milking equipment, and fodder cultivation",
      "Repayment tenure of 3 to 7 years with initial moratorium",
    ],
    category: "dairy",
  },
  {
    id: "mudra-kishore",
    name: "Pradhan Mantri MUDRA Yojana (Kishore Category)",
    ministry: "Ministry of Finance",
    purpose: "Collateral-free micro loans from ₹50,000 to ₹5 Lakh for expanding enterprises",
    relevance: "Tailor-made for micro-entrepreneurs needing up to ₹5 Lakh without providing property collateral.",
    fundingType: "Collateral-free Term Loan & Working Capital",
    subsidyPercentage: "Competitive interest rate with CGTMSE guarantee",
    description:
      "PMMY Kishore loans support established non-farm and allied micro-enterprises to acquire machinery, equipment, and working capital to take their business to the next growth phase.",
    eligibilityHints: [
      "Any Indian citizen running a micro-enterprise with a viable business plan",
      "Non-defaulter with any commercial or cooperative bank",
      "No collateral or third-party guarantor required",
      "Sanctioned through public/private banks, RRBs, and MFIs",
    ],
    benefits: [
      "Zero collateral or margin money burden for small tickets",
      "Combined term loan for equipment + Mudra Card for daily working capital",
      "Repayment tenure up to 5 years with flexible EMI schedules",
      "Transparent processing without hidden processing charges",
    ],
    category: "msme",
  },
  {
    id: "pmfme-scheme",
    name: "PM Formalization of Micro Food Processing Enterprises (PMFME)",
    ministry: "Ministry of Food Processing Industries",
    purpose: "Credit-linked capital subsidy (35%) for micro food & agro processing units",
    relevance: "Ideal for grain mills, oil expellers, spice processing, and value-added dairy/agri products.",
    fundingType: "Credit-linked Capital Subsidy (35% up to ₹10 Lakh)",
    subsidyPercentage: "35% of eligible project cost",
    description:
      "Supports individual micro-processors, farmer producer organizations, and SHGs with 35% capital subsidy, technical training, and market branding under One District One Product (ODOP).",
    eligibilityHints: [
      "Existing or new micro food processing enterprises",
      "Individual proprietorships, partnerships, or SHGs",
      "Age 18+ with ownership/lease of work premises",
      "Alignment with state ODOP or approved food processing activities",
    ],
    benefits: [
      "35% credit-linked capital subsidy up to a maximum of ₹10 Lakh",
      "Subsidized training on food safety standards (FSSAI) and packaging",
      "Support for local branding, marketing, and common testing infrastructure",
      "Access to low-interest bank finance for balance project cost",
    ],
    category: "agri",
  },
  {
    id: "samarth-handloom",
    name: "SAMARTH — Scheme for Capacity Building in Textile Sector",
    ministry: "Ministry of Textiles",
    purpose: "Skill upgradation, modern looms, and raw material support for weavers",
    relevance: "Specially designed for traditional weavers and handloom artisans seeking modernization and market linkages.",
    fundingType: "Grant for Upgradation + Subsidized Yarn & Toolkits",
    subsidyPercentage: "Up to 90% subsidy on modern loom attachments",
    description:
      "Provides handloom weavers with jacquard loom attachments, subsidized yarn passbooks, certified skill training, and direct access to state and national craft exhibitions.",
    eligibilityHints: [
      "Traditional handloom weavers, artisans, and weaver cooperatives",
      "Possession of Weaver Identity Card or Pehchan Card",
      "Operating in recognized weaving clusters (such as Chanderi, Maheshwar, etc.)",
      "Preference for women artisans and self-help group members",
    ],
    benefits: [
      "Up to 90% subsidy on advanced jacquard and dobby attachments",
      "10% price subsidy on hank yarn purchases through NHDC yarn depots",
      "Free designer intervention and digital catalog development",
      "Direct stall allocation at Dastkar, Surajkund, and National Handloom Expos",
    ],
    category: "textile",
  },
  {
    id: "kisan-credit-card",
    name: "Kisan Credit Card (KCC) for Animal Husbandry & Allied Agri",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    purpose: "Low-interest revolving working capital (effective ~4% interest)",
    relevance: "Provides revolving credit for daily feed, veterinary, and operational costs at highly subsidized interest.",
    fundingType: "Revolving Working Capital with 3% Prompt Repayment Incentive",
    subsidyPercentage: "2% Interest Subvention + 3% Prompt Repayment Incentive (Effective ~4%)",
    description:
      "Extended to animal husbandry, dairy, and fisheries to meet recurring working capital needs (feed, labor, maintenance) without having to pledge agricultural land up to ₹1.6 Lakh.",
    eligibilityHints: [
      "Dairy farmers, poultry/fisheries operators, and allied agri producers",
      "Individual or joint borrowers with verified livestock or production base",
      "No collateral required up to ₹1.60 Lakh limit",
      "Issued through all Scheduled Commercial Banks, RRBs, and Cooperatives",
    ],
    benefits: [
      "Ultra-low effective interest rate of ~4% per annum upon prompt repayment",
      "Flexible revolving drawdowns — interest charged only on amount utilized",
      "No processing fees for limits up to ₹3.00 Lakh",
      "Includes complimentary accidental insurance cover",
    ],
    category: "dairy",
  },
  {
    id: "stand-up-india",
    name: "Stand-Up India Scheme for Women & SC/ST Entrepreneurs",
    ministry: "Department of Financial Services",
    purpose: "Composite bank loans from ₹10 Lakh to ₹1 Crore for greenfield micro-enterprises",
    relevance: "Supports women and SC/ST entrepreneurs setting up larger manufacturing, services, or agri-allied units.",
    fundingType: "Composite Term Loan + Working Capital",
    subsidyPercentage: "Concessional margin money (up to 15%)",
    description:
      "Facilitates bank loans between ₹10 Lakh and ₹1 Crore for at least one SC/ST and one woman borrower per bank branch for setting up a greenfield enterprise in manufacturing, services, or trading.",
    eligibilityHints: [
      "SC/ST and/or women entrepreneurs aged 18+",
      "For setting up a greenfield (new) enterprise",
      "In case of non-individual enterprises, 51% shareholding by SC/ST/Woman",
      "Borrower should not be in default to any financial institution",
    ],
    benefits: [
      "Comprehensive composite loan covering building, machinery, and working capital",
      "Repayment tenure up to 7 years with maximum 18 months moratorium",
      "Handholding support through Lead District Managers and SIDBI portals",
      "Access to credit guarantee coverage under NCGTC",
    ],
    category: "women",
  },
  {
    id: "nrlm-livelihoods",
    name: "National Rural Livelihoods Mission (DAY-NRLM)",
    ministry: "Ministry of Rural Development",
    purpose: "Revolving funds, community investment support, and interest subvention for rural SHG enterprises",
    relevance: "Supports village-level collective enterprises, women micro-entrepreneurs, and rural producer groups.",
    fundingType: "Community Investment Fund + 7% Interest Subvention",
    subsidyPercentage: "Interest subvention to bring bank loan rate to 7%",
    description:
      "Empowers rural micro-entrepreneurs through SHG federation support, revolving capital, collateral-free group loans, and specialized cluster development in MP and across India.",
    eligibilityHints: [
      "Rural women entrepreneurs, SHG members, and producer collectives",
      "Resident of designated rural blocks",
      "Active participation in village organization / SHG federation",
    ],
    benefits: [
      "Collateral-free group loans up to ₹20 Lakh for mature SHGs",
      "Interest subvention bringing borrowing cost down to 7% (3% additional incentive in select districts)",
      "Free marketing support at Aajeevika Melas and SARAS Fairs",
      "Technical mentorship by community resource persons (CRPs)",
    ],
    category: "rural",
  },
];

// Dynamically rank and annotate schemes for the active entrepreneur
export function getPersonalizedSchemes(
  entrepreneur: Entrepreneur,
  categoryFilter: string = "all"
): (GovernmentScheme & { matchScore: number; personalizedWhy: string })[] {
  const cat = entrepreneur.business.category.toLowerCase();
  const funding = entrepreneur.funding.amountRequired;
  const location = entrepreneur.personal.location;
  const isFemale = entrepreneur.personal.name.toLowerCase().includes("devi") || entrepreneur.personal.name.toLowerCase().includes("kumari");

  return allGovernmentSchemes
    .map((scheme) => {
      let matchScore = 50;
      let personalizedWhy = "";

      if (cat.includes("dairy") && scheme.category === "dairy") {
        matchScore += 45;
        personalizedWhy = `Direct match for ${entrepreneur.business.name} in ${location}. Provides subsidized financing for cattle purchase and milk handling equipment for your ${formatCurrency(funding)} expansion.`;
      } else if ((cat.includes("handloom") || cat.includes("textile") || cat.includes("artisan")) && scheme.category === "textile") {
        matchScore += 45;
        personalizedWhy = `Direct match for your handloom weaving business in ${location}. Offers up to 90% subsidy on modern loom attachments and subsidized silk/cotton yarn.`;
      } else if ((cat.includes("agri") || cat.includes("food") || cat.includes("oil") || cat.includes("mill")) && scheme.category === "agri") {
        matchScore += 45;
        personalizedWhy = `Direct match for ${entrepreneur.business.name}. The 35% credit-linked capital subsidy can directly reduce your capital expenditure on new processing machinery.`;
      } else if (scheme.id === "mudra-kishore" && funding <= 500000) {
        matchScore += 35;
        personalizedWhy = `Your ${formatCurrency(funding)} requirement falls directly into MUDRA Kishore (₹50k–₹5L). Zero collateral is required from ${entrepreneur.personal.name}.`;
      } else if (scheme.category === "women" && isFemale) {
        matchScore += 40;
        personalizedWhy = `Specifically prioritizes women micro-entrepreneurs like ${entrepreneur.personal.name} with concessional margin money and bank branch mandates.`;
      } else if (scheme.category === "rural") {
        matchScore += 25;
        personalizedWhy = `Applicable to rural micro-enterprises in ${location}, MP with interest subvention and local cluster marketing benefits.`;
      } else {
        personalizedWhy = `Potentially relevant for general micro-enterprise expansion and working capital support in Madhya Pradesh.`;
      }

      return {
        ...scheme,
        matchScore,
        personalizedWhy,
      };
    })
    .filter((s) => {
      if (categoryFilter === "all") return true;
      if (categoryFilter === "recommended") return s.matchScore >= 70;
      return s.category === categoryFilter;
    })
    .sort((a, b) => b.matchScore - a.matchScore);
}
