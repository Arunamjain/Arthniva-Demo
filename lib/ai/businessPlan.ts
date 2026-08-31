import { type Entrepreneur, getFundingAllocationData } from "@/lib/data/demoEntrepreneur";
import { calculateProfit, calculateProfitMargin } from "@/lib/financial/calculations";
import { formatCurrency } from "@/lib/utils";

export interface BusinessPlanSection {
  title: string;
  iconName?: string;
  content: string[];
}

export function generateBusinessPlan(entrepreneur: Entrepreneur): BusinessPlanSection[] {
  const { monthlyRevenue, monthlyExpenses, existingLoan } = entrepreneur.financial;
  const { amountRequired, purpose } = entrepreneur.funding;
  const profit = calculateProfit(monthlyRevenue, monthlyExpenses);
  const margin = calculateProfitMargin(monthlyRevenue, monthlyExpenses);
  const annualRevenue = monthlyRevenue * 12;
  const annualProfit = profit * 12;
  const allocations = getFundingAllocationData(entrepreneur);
  const cat = entrepreneur.business.category.toLowerCase();

  const isDairy = cat.includes("dairy");
  const isHandloom = cat.includes("handloom") || cat.includes("textile");

  // Post expansion projections (conservative 60-75% revenue growth)
  const targetMonthlyRevenueY1 = Math.round(monthlyRevenue * 1.65);
  const targetMonthlyExpensesY1 = Math.round(monthlyExpenses * 1.45);
  const targetMonthlyProfitY1 = targetMonthlyRevenueY1 - targetMonthlyExpensesY1;

  const targetMonthlyRevenueY2 = Math.round(monthlyRevenue * 2.1);
  const targetMonthlyExpensesY2 = Math.round(monthlyExpenses * 1.7);
  const targetMonthlyProfitY2 = targetMonthlyRevenueY2 - targetMonthlyExpensesY2;

  return [
    {
      title: "1. Business Overview & Executive Summary",
      content: [
        `Enterprise Name: ${entrepreneur.business.name}`,
        `Lead Entrepreneur: ${entrepreneur.personal.name}`,
        `Location: ${entrepreneur.personal.location}, District ${entrepreneur.personal.district}, ${entrepreneur.personal.state}`,
        `Sector & Category: ${entrepreneur.business.category} (${entrepreneur.business.type})`,
        "",
        `${entrepreneur.business.name} is an active rural micro-enterprise currently operating in ${entrepreneur.personal.location}. The enterprise possesses an established operational foundation, generating ${formatCurrency(monthlyRevenue)} in regular monthly revenue with consistent customer demand across the local cluster.`,
        `The business is seeking structured expansion capital of ${formatCurrency(amountRequired)} for ${purpose}, aiming to scale production volume, modernize core operating assets, and capture higher-margin market linkages.`,
      ],
    },
    {
      title: "2. Current Financial Baseline & Track Record",
      content: [
        `Monthly Gross Revenue: ${formatCurrency(monthlyRevenue)} (${formatCurrency(annualRevenue)} annualized)`,
        `Monthly Operating Costs: ${formatCurrency(monthlyExpenses)} (${formatCurrency(monthlyExpenses * 12)} annualized)`,
        `Net Monthly Operating Surplus: ${formatCurrency(profit)} / month`,
        `Operating Profit Margin: ${margin}%`,
        `Existing Debt Obligations: ${formatCurrency(existingLoan)}`,
        `Debt-to-Income Ratio: ${((existingLoan / (annualRevenue || 1)) * 100).toFixed(1)}% of annual turnover`,
        "",
        `The business maintains positive cash generation with an operating margin of ${margin}%, demonstrating sound unit economics and operational viability under current scale.`,
      ],
    },
    {
      title: "3. Expansion Objective & Capacity Scalability",
      content: [
        `Primary Objective: Structured deployment of ${formatCurrency(amountRequired)} for ${purpose}.`,
        "",
        "Key Operational Milestones:",
        isDairy
          ? "• Procure 3–4 high-yield milch cattle (Murrah buffaloes / Sahiwal cows) to double daily milk output"
          : isHandloom
          ? "• Install 2 modern motorized jacquard attachments and acquire premium mulberry silk yarn"
          : "• Install modern automatic seed extraction & oil filtration machinery to double daily milling throughput",
        isDairy
          ? "• Construct hygienic cattle sheds with automated water troughs and waste recycling"
          : isHandloom
          ? "• Build a dedicated warping and natural dyeing workstation to expand product variety"
          : "• Upgrade raw seed storage bins to minimize moisture loss and pest infestation",
        "• Establish direct institutional and retail customer channels to reduce intermediary margin leakages",
        "• Implement quality control and digital payment tracking for all daily sales transactions",
      ],
    },
    {
      title: "4. Capital Investment Requirement",
      content: [
        `Total Expansion Capital Required: ${formatCurrency(amountRequired)}`,
        `Promoter Margin / Cash Contribution: ${formatCurrency(Math.round(amountRequired * 0.15))} (15%)`,
        `Debt / Scheme Funding Requested: ${formatCurrency(Math.round(amountRequired * 0.85))} (85%)`,
        "",
        `At current annual net profit of ${formatCurrency(annualProfit)}, the required capital represents ${(amountRequired / (annualProfit || 1)).toFixed(1)}× annual earnings.`,
        `With projected post-expansion profit increases, the estimated capital payback period is approximately 18 to 22 months.`,
      ],
    },
    {
      title: "5. Proposed Use of Funds & Asset Allocation",
      content: allocations.flatMap((item) => [
        `• ${item.name}: ${formatCurrency(item.value)} (${item.percentage}%)`,
        `  Purpose: Direct deployment towards ${item.name.toLowerCase()} to ensure smooth commissioning and productivity.`,
      ]),
    },
    {
      title: "6. Revenue Expansion Strategy & Projections",
      content: [
        "Go-To-Market & Sales Growth Plan:",
        isDairy
          ? "• Increase daily raw milk collection and introduce value-added paneer and curd for local sweet shops"
          : isHandloom
          ? "• Launch premium designer sarees for wedding retail networks and register on state handloom portals"
          : "• Package cold-pressed oil in branded 1L and 5L tins for local Kirana distribution across Narmadapuram",
        "• Secure 3 recurring supply arrangements with regional wholesalers and cooperative federations",
        "• Introduce doorstep delivery and monthly subscription billing for loyal household customers",
        "",
        `Projected Year 1 Financials (Post-Expansion):`,
        `• Projected Monthly Revenue: ${formatCurrency(targetMonthlyRevenueY1)} (+65% growth)`,
        `• Projected Monthly Profit: ${formatCurrency(targetMonthlyProfitY1)} / month`,
        "",
        `Projected Year 2 Financials (Full Scale):`,
        `• Projected Monthly Revenue: ${formatCurrency(targetMonthlyRevenueY2)} (+110% growth)`,
        `• Projected Monthly Profit: ${formatCurrency(targetMonthlyProfitY2)} / month`,
      ],
    },
    {
      title: "7. Expense Structure & Cost Management",
      content: [
        "Projected Monthly Operating Costs Post-Expansion:",
        `• Core Inputs & Raw Materials: ${formatCurrency(Math.round(targetMonthlyExpensesY1 * 0.48))}/month`,
        `• Skilled / Operating Labor: ${formatCurrency(Math.round(targetMonthlyExpensesY1 * 0.24))}/month`,
        `• Logistics, Power & Maintenance: ${formatCurrency(Math.round(targetMonthlyExpensesY1 * 0.18))}/month`,
        `• Loan EMI Servicing Allowance: ~${formatCurrency(Math.round(amountRequired * 0.033))}/month`,
        `• Contingency Reserve: ${formatCurrency(Math.round(targetMonthlyExpensesY1 * 0.10))}/month`,
        "",
        `Estimated Total Monthly Expenditure: ${formatCurrency(targetMonthlyExpensesY1)}/month`,
        `Projected Debt Service Coverage Ratio (DSCR): ${(targetMonthlyProfitY1 / (Math.round(amountRequired * 0.033) || 1)).toFixed(2)}× (Safe bank benchmark: >1.5×)`,
      ],
    },
    {
      title: "8. Risk Analysis & Mitigation Framework",
      content: [
        "1. Input Price Volatility Risk:",
        "• Mitigation: Bulk seasonal procurement and tie-ups with verified farmer/weaver producer groups.",
        "",
        "2. Equipment / Production Downtime Risk:",
        "• Mitigation: Secure 2-year comprehensive Annual Maintenance Contracts (AMC) and maintain critical spare toolkits on-site.",
        "",
        "3. Working Capital Delay Risk:",
        `• Mitigation: Maintain an emergency buffer fund of ${formatCurrency(Math.round(amountRequired * 0.10))} from day one and avoid long credit terms for retail buyers.`,
        "",
        "4. Repayment & Liquidity Risk:",
        `• Mitigation: Existing debt of ${formatCurrency(existingLoan)} is factored into monthly cash allocations. Phased deployment prevents premature cash dry-outs.`,
      ],
    },
    {
      title: "9. Phased Implementation & Growth Roadmap",
      content: [
        "Phase 1 — Months 1 to 2 (Procurement & Setup):",
        "• Finalize vendor contracts, disburse scheme loan, and install productive machinery/cattle.",
        "• Complete shed/workplace infrastructure and power connections.",
        "",
        "Phase 2 — Months 3 to 6 (Ramp-up & Customer Onboarding):",
        "• Scale production to 75% rated capacity.",
        "• Sign formal off-take contracts with 5 local retail partners in the district.",
        "",
        "Phase 3 — Months 7 to 12 (Stabilization & Surplus Reinvestment):",
        "• Achieve 100% target monthly output and maintain prompt loan EMI servicing.",
        "• Reinvest 20% of net monthly profit into reserve fund and working capital expansion.",
      ],
    },
    {
      title: "10. Recommended Funding & Scheme Pathway",
      content: [
        `Recommended Loan Structure: ${formatCurrency(amountRequired)} over 36–48 month repayment tenure.`,
        "",
        "Priority Government Scheme Matches:",
        isDairy
          ? "• NABARD Dairy Entrepreneurship Development Scheme — for 25% capital subsidy on cattle and infrastructure."
          : isHandloom
          ? "• SAMARTH Textile Scheme / Weaver Mudra Scheme — for subsidized jacquard looms and low-interest yarn credit."
          : "• PMFME Scheme — for 35% credit-linked capital subsidy on food processing machinery under ODOP.",
        "• Pradhan Mantri MUDRA Yojana (Kishore) — for collateral-free term and working capital finance.",
        "",
        "Verification Notice: All projections and scheme criteria should be verified with local bank branches and official government portals prior to formal application submission.",
      ],
    },
  ];
}
