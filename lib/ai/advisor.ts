import { type Entrepreneur } from "@/lib/data/demoEntrepreneur";
import {
  calculateProfit,
  calculateProfitMargin,
  calculateFinancialHealthScore,
} from "@/lib/financial/calculations";
import { formatCurrency } from "@/lib/utils";

export interface AdvisorResponse {
  assessment: string;
  assessmentType: "positive" | "cautious" | "warning";
  financialSnapshot: {
    monthlyProfit: string;
    profitMargin: string;
    existingDebt: string;
    requestedFunding: string;
    estimatedEmi: string;
    profitPostEmi: string;
  };
  whyThisMatters: string[];
  keyRisks: string[];
  whatToConsider: string[];
  nextSteps: string[];
}

export function getSuggestedQuestions(entrepreneur: Entrepreneur): string[] {
  const fundingFormatted = formatCurrency(entrepreneur.funding.amountRequired);

  return [
    `Can I afford a ${fundingFormatted} loan for ${entrepreneur.funding.purpose.toLowerCase()}?`,
    "How can I improve my operating profit margin?",
    `Should I expand ${entrepreneur.business.name} right now?`,
    "What are the biggest financial risks in my business?",
    `How should I allocate my ${fundingFormatted} funding?`,
    "What should I improve before approaching a bank for funding?",
    "How can I increase my monthly revenue sustainably?",
    "Which government schemes offer the best interest subsidies for me?",
  ];
}

export function generateAdvisorResponse(
  question: string,
  entrepreneur: Entrepreneur
): AdvisorResponse {
  const { monthlyRevenue, monthlyExpenses, existingLoan } = entrepreneur.financial;
  const { amountRequired, purpose } = entrepreneur.funding;
  const profit = calculateProfit(monthlyRevenue, monthlyExpenses);
  const margin = calculateProfitMargin(monthlyRevenue, monthlyExpenses);
  const healthScore = calculateFinancialHealthScore(entrepreneur);
  const annualProfit = profit * 12;
  const category = entrepreneur.business.category.toLowerCase();

  // Transparent indicative EMI calculation (~11.5% interest over 36 months => factor ~0.033)
  const estimatedMonthlyEmi = Math.round(amountRequired * 0.033);
  const profitAfterEmi = profit - estimatedMonthlyEmi;
  const totalDebtPostFunding = existingLoan + amountRequired;
  const emiShareOfProfit = Math.round((estimatedMonthlyEmi / (profit || 1)) * 100);

  const snapshot = {
    monthlyProfit: formatCurrency(profit),
    profitMargin: `${margin}%`,
    existingDebt: formatCurrency(existingLoan),
    requestedFunding: formatCurrency(amountRequired),
    estimatedEmi: `~${formatCurrency(estimatedMonthlyEmi)}/mo`,
    profitPostEmi: `${profitAfterEmi > 0 ? "+" : ""}${formatCurrency(profitAfterEmi)}/mo`,
  };

  const normalizedQ = question.toLowerCase();

  // 1. LOAN AFFORDABILITY & BORROWING
  if (
    normalizedQ.includes("loan") ||
    normalizedQ.includes("afford") ||
    normalizedQ.includes("borrow") ||
    normalizedQ.includes("debt") ||
    normalizedQ.includes("lakh")
  ) {
    if (profitAfterEmi < 0) {
      return {
        assessment: `High Repayment Risk: At current revenue, a ${formatCurrency(amountRequired)} loan would create immediate cash deficit. Your monthly profit of ${formatCurrency(profit)} is less than the projected EMI of ${formatCurrency(estimatedMonthlyEmi)}.`,
        assessmentType: "warning",
        financialSnapshot: snapshot,
        whyThisMatters: [
          `Estimated EMI of ${formatCurrency(estimatedMonthlyEmi)}/month exceeds your current surplus of ${formatCurrency(profit)}/month.`,
          `Without immediate revenue expansion, you would face a monthly deficit of ${formatCurrency(Math.abs(profitAfterEmi))}.`,
          `Existing debt of ${formatCurrency(existingLoan)} already represents an ongoing commitment.`,
          `Total post-borrowing liability would reach ${formatCurrency(totalDebtPostFunding)}, which is ${(totalDebtPostFunding / (annualProfit || 1)).toFixed(1)}× your annual profit.`,
        ],
        keyRisks: [
          "Inability to service EMI during initial expansion ramp-up period",
          "Working capital shortfall if unexpected equipment or livestock costs arise",
          "Risk of default or reliance on high-cost informal credit to pay bank EMIs",
        ],
        whatToConsider: [
          "Downscale initial funding to a smaller milestone phase (e.g. 40-50% of current request)",
          "Look into government interest subvention schemes (e.g. MUDRA / NABARD) with capital subsidies",
          "Secure advance purchase orders or guaranteed off-take contracts before borrowing",
        ],
        nextSteps: [
          "Re-evaluate loan requirement to fit within 40% of current monthly profit",
          "Check Scheme Finder for capital subsidy schemes that reduce borrowing amount",
          "Build a 3-month operating cash cushion before applying to lenders",
        ],
      };
    } else if (emiShareOfProfit > 50) {
      return {
        assessment: `Proceed with Caution: Your business generates ${formatCurrency(profit)} monthly profit. A ${formatCurrency(amountRequired)} loan would consume ~${emiShareOfProfit}% of your surplus (${formatCurrency(estimatedMonthlyEmi)}/month), leaving limited cash buffer.`,
        assessmentType: "cautious",
        financialSnapshot: snapshot,
        whyThisMatters: [
          `Monthly profit: ${formatCurrency(profit)} (Margin: ${margin}%) on ${formatCurrency(monthlyRevenue)} revenue.`,
          `Estimated new EMI of ${formatCurrency(estimatedMonthlyEmi)}/month leaves only ${formatCurrency(profitAfterEmi)}/month buffer for emergencies.`,
          existingLoan > 0
            ? `You already carry ${formatCurrency(existingLoan)} in existing loans; total debt would become ${formatCurrency(totalDebtPostFunding)}.`
            : "You currently have zero existing loans, which strengthens your borrowing profile.",
          `The expansion must generate at least ${formatCurrency(Math.round(estimatedMonthlyEmi * 1.4))}/month in extra revenue to safely absorb the new payment.`,
        ],
        keyRisks: [
          category.includes("dairy")
            ? "Seasonal milk price drops or disease/feed inflation reducing net yield"
            : category.includes("handloom")
            ? "Delayed buyer payments or fluctuating raw silk yarn prices"
            : "Fluctuations in raw material prices or local power supply disruptions",
          "Delays in achieving full production capacity after purchasing new assets",
        ],
        whatToConsider: [
          "Can the expansion be staged in two phases rather than taking the full loan at once?",
          "Explore subsidized credit schemes like MUDRA Kishore or NABARD/PMEGP to lower interest.",
          "Ensure at least 3 months of EMI payments are kept as a contingency reserve.",
        ],
        nextSteps: [
          "Use the Business Plan Generator to calculate exact post-expansion cash flows",
          "Explore Scheme Finder for interest subsidy and credit guarantee options",
          "Consult with a local rural bank manager to compare tenure options (3 vs 5 years)",
        ],
      };
    } else {
      return {
        assessment: `Manageable Debt Capacity: Your business is in a solid position to explore a ${formatCurrency(amountRequired)} loan. The projected EMI of ${formatCurrency(estimatedMonthlyEmi)} represents ~${emiShareOfProfit}% of your ${formatCurrency(profit)} monthly surplus.`,
        assessmentType: "positive",
        financialSnapshot: snapshot,
        whyThisMatters: [
          `Healthy operating profit of ${formatCurrency(profit)} (${margin}% margin) provides adequate debt service coverage.`,
          `After servicing the ${formatCurrency(estimatedMonthlyEmi)}/month EMI, you retain an estimated ${formatCurrency(profitAfterEmi)}/month in free surplus.`,
          `Total debt would be ${(totalDebtPostFunding / (annualProfit || 1)).toFixed(1)}× annual profit, which is within prudent micro-enterprise limits.`,
        ],
        keyRisks: [
          "Operational execution risks during setup of new equipment or capacity",
          "Over-relying on single buyer accounts for post-expansion production volume",
        ],
        whatToConsider: [
          "Negotiate longer loan tenure (e.g. 48-60 months) to reduce monthly cash pressure further",
          "Apply through official government credit schemes to avoid collateral requirements",
        ],
        nextSteps: [
          "Generate your official Business Plan to present to commercial or rural banks",
          "Gather KYC and 6 months bank statements for scheme verification",
          "Finalize quotes from verified suppliers for your capital expenditure items",
        ],
      };
    }
  }

  // 2. PROFIT IMPROVEMENT
  if (
    normalizedQ.includes("profit") ||
    normalizedQ.includes("margin") ||
    normalizedQ.includes("improve") ||
    normalizedQ.includes("earn more") ||
    normalizedQ.includes("income")
  ) {
    const isDairy = category.includes("dairy");
    const isHandloom = category.includes("handloom") || category.includes("textile");

    return {
      assessment: `Your current operating margin is ${margin}% (${formatCurrency(profit)} profit on ${formatCurrency(monthlyRevenue)} revenue). For a ${entrepreneur.business.category} enterprise in ${entrepreneur.personal.location}, targeted cost and pricing adjustments can enhance margins by 5–8%.`,
      assessmentType: margin >= 30 ? "positive" : "cautious",
      financialSnapshot: snapshot,
      whyThisMatters: [
        `Monthly operating expenses are ${formatCurrency(monthlyExpenses)} (${((monthlyExpenses / (monthlyRevenue || 1)) * 100).toFixed(1)}% of total revenue).`,
        `Every 5% reduction in costs adds ${formatCurrency(Math.round(monthlyExpenses * 0.05))}/month directly to your bottom line.`,
        `Increasing net profit from ${formatCurrency(profit)} will directly increase your safe borrowing headroom.`,
      ],
      keyRisks: [
        "Cutting quality of inputs (feed, yarn, raw materials) which could harm customer retention",
        "Over-pricing in competitive local village/town markets",
      ],
      whatToConsider: [
        isDairy
          ? "Value addition: Converting 20% of raw milk into curd, paneer, or ghee provides 25-40% higher margins."
          : isHandloom
          ? "Direct-to-consumer sales: Bypassing middlemen through craft exhibitions and local retail brings higher realization per saree/fabric."
          : "Value addition and bulk raw material procurement directly reduce unit processing costs.",
        "Bulk purchasing of core supplies through local producer cooperatives or SHG federations.",
        "Minimizing wastage and transit loss with improved storage.",
      ],
      nextSteps: [
        "Audit top 3 expense categories for renegotiation or bulk discount opportunities",
        "Test market pricing on one premium/value-added product line",
        "Review monthly profit trend on your Dashboard to track margin trajectory",
      ],
    };
  }

  // 3. EXPANSION & GROWTH READINESS
  if (
    normalizedQ.includes("expand") ||
    normalizedQ.includes("growth") ||
    normalizedQ.includes("ready") ||
    normalizedQ.includes("scale")
  ) {
    return {
      assessment: `${entrepreneur.business.name} has proven market traction in ${entrepreneur.personal.location}. Expansion is viable if you maintain disciplined working capital and phase your investment.`,
      assessmentType: healthScore >= 65 ? "positive" : "cautious",
      financialSnapshot: snapshot,
      whyThisMatters: [
        `Consistent ${formatCurrency(monthlyRevenue)} monthly revenue shows established local customer demand.`,
        `Financial Health Score of ${healthScore}/100 indicates ${healthScore >= 70 ? "stable" : "moderate"} operational fundamentals.`,
        `Planned funding of ${formatCurrency(amountRequired)} for ${purpose} represents a significant ${(amountRequired / (annualProfit || 1)).toFixed(1)}× multiplier of annual profit.`,
      ],
      keyRisks: [
        "Gaps between equipment acquisition and first revenue generation (cash crunch)",
        "Underestimating daily operational overheads of running a larger unit",
      ],
      whatToConsider: [
        "Phase the expansion: Acquire 50% capacity first, stabilize operations, then deploy the rest.",
        "Ensure supplier warranties and local maintenance support are available in Vidisha / Madhya Pradesh.",
        "Maintain 2 months of operational expenses as a reserve buffer.",
      ],
      nextSteps: [
        "Generate the detailed 10-section Business Expansion Plan on Arthniva",
        "Review potentially matching government schemes for capital subsidies",
        "Pre-book supply contracts with local buyers to absorb new capacity",
      ],
    };
  }

  // 4. FINANCIAL RISKS & SAFEGUARDS
  if (
    normalizedQ.includes("risk") ||
    normalizedQ.includes("danger") ||
    normalizedQ.includes("threat") ||
    normalizedQ.includes("worst")
  ) {
    return {
      assessment: `The primary financial vulnerabilities for ${entrepreneur.business.name} are debt concentration, working capital volatility, and sector-specific operational shocks.`,
      assessmentType: "cautious",
      financialSnapshot: snapshot,
      whyThisMatters: [
        existingLoan > 0
          ? `Existing debt of ${formatCurrency(existingLoan)} combined with ${formatCurrency(amountRequired)} new funding creates ${formatCurrency(totalDebtPostFunding)} in total obligations.`
          : `At ${formatCurrency(profit)} monthly profit, unexpected cash flow interruptions directly impact family and business reserves.`,
        `Monthly operating cost of ${formatCurrency(monthlyExpenses)} must be funded continuously even during seasonal dry spells.`,
      ],
      keyRisks: [
        category.includes("dairy")
          ? "Livestock disease, cattle mortality, or seasonal milk yield drops"
          : category.includes("handloom")
          ? "Slow-moving finished inventory and seasonal festival demand cycles"
          : "Raw material price spikes and power outage disruptions",
        "Client payment delays while operating expenses remain fixed",
      ],
      whatToConsider: [
        "Enroll in government insurance programs (Livestock Insurance / PMJJBY / PMSBY).",
        "Diversify buyer base so no single buyer controls more than 30% of your sales.",
        "Keep at least 45 days of basic operational expenses in liquid savings.",
      ],
      nextSteps: [
        "Ensure asset and personal insurance coverage is active",
        "Establish formal written payment terms with key institutional or retail buyers",
        "Review Watch-outs section on your Financial Health page",
      ],
    };
  }

  // 5. FUNDING ALLOCATION & USE OF FUNDS
  if (
    normalizedQ.includes("allocate") ||
    normalizedQ.includes("use") ||
    normalizedQ.includes("spend") ||
    normalizedQ.includes("where")
  ) {
    return {
      assessment: `For ${formatCurrency(amountRequired)} in requested funding, a balanced 70-20-10 allocation rule (70% income-generating assets, 20% infrastructure, 10% working capital reserve) is recommended.`,
      assessmentType: "positive",
      financialSnapshot: snapshot,
      whyThisMatters: [
        "Allocating too much to non-productive assets delays revenue growth needed to pay EMIs.",
        "Underfunding working capital often forces micro-entrepreneurs to borrow at high interest rates later.",
      ],
      keyRisks: [
        "Overspending on decorative or oversized infrastructure instead of core productive machinery/livestock",
        "Zero liquidity remaining for unexpected initial operational costs",
      ],
      whatToConsider: [
        `Income Assets (50-60%): Direct yield-generating assets (~${formatCurrency(Math.round(amountRequired * 0.55))}).`,
        `Facility & Tools (20-25%): Quality storage, shed, or power backups (~${formatCurrency(Math.round(amountRequired * 0.22))}).`,
        `Working Capital & Feed/Raw Stock (15-20%): Initial inputs and reserve (~${formatCurrency(Math.round(amountRequired * 0.18))}).`,
      ],
      nextSteps: [
        "Review the proposed allocation donut chart on your Dashboard",
        "Get 2 written quotes for every major equipment or asset purchase",
        "Verify if specific components qualify for government machinery subsidies",
      ],
    };
  }

  // DEFAULT CONTEXTUAL ADVICE
  return {
    assessment: `Advisory Summary for ${entrepreneur.personal.name} (${entrepreneur.business.name}): Your business has a solid base with ${formatCurrency(profit)} monthly profit and a ${healthScore}/100 Financial Health Score.`,
    assessmentType: healthScore >= 70 ? "positive" : "cautious",
    financialSnapshot: snapshot,
    whyThisMatters: [
      `Monthly Revenue: ${formatCurrency(monthlyRevenue)} | Expenses: ${formatCurrency(monthlyExpenses)} | Net Margin: ${margin}%.`,
      `Current Debt: ${formatCurrency(existingLoan)} | Expansion Goal: ${formatCurrency(amountRequired)} for ${purpose}.`,
      `Estimated EMI on proposed funding is ${formatCurrency(estimatedMonthlyEmi)}/month.`,
    ],
    keyRisks: [
      "Over-leveraging beyond monthly surplus capacity",
      "Sector-specific seasonality and operational input costs",
    ],
    whatToConsider: [
      "Ensure all growth decisions are backed by conservative cash flow estimates.",
      "Explore government-backed credit schemes before taking commercial high-interest loans.",
      "Track your monthly revenue and profit trajectory consistently.",
    ],
    nextSteps: [
      "Review your detailed Financial Health breakdown",
      "Check Scheme Finder for eligible rural micro-enterprise support",
      "Generate your personalized Business Plan to share with advisors or lenders",
    ],
  };
}
