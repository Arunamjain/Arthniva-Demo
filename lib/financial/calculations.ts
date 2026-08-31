import { type Entrepreneur } from "@/lib/data/demoEntrepreneur";

export function calculateProfit(revenue: number, expenses: number): number {
  return revenue - expenses;
}

export function calculateProfitMargin(revenue: number, expenses: number): number {
  if (revenue === 0) return 0;
  const profit = calculateProfit(revenue, expenses);
  return Math.round((profit / revenue) * 1000) / 10;
}

export function calculateFinancialHealthScore(entrepreneur: Entrepreneur): number {
  let score = 0;

  const { monthlyRevenue, monthlyExpenses, existingLoan } = entrepreneur.financial;
  const { amountRequired } = entrepreneur.funding;

  const profit = calculateProfit(monthlyRevenue, monthlyExpenses);
  const profitMargin = calculateProfitMargin(monthlyRevenue, monthlyExpenses);
  const annualProfit = profit * 12;

  // 1. Profitability (0-25 points)
  // Ramesh: profit>0 → +12, margin>30 → +8, profit 10-20k → +5 = 25
  if (profit > 0) score += 12;
  if (profitMargin > 30) score += 8;
  else if (profitMargin > 20) score += 5;
  else if (profitMargin > 10) score += 3;
  if (profit > 20000) score += 5;
  else if (profit > 5000) score += 5;

  // 2. Revenue stability (0-20 points)
  // Ramesh: 45k > 30k → +12
  if (monthlyRevenue > 100000) score += 20;
  else if (monthlyRevenue > 50000) score += 16;
  else if (monthlyRevenue > 30000) score += 12;
  else if (monthlyRevenue > 15000) score += 7;

  // 3. Existing debt burden (0-20 points)
  // Ramesh: existingLoan 50k < profit*6 (90k) → +12, existingLoan/annualRevenue = 0.093 < 0.15 → +8 = 20
  const existingDebtToAnnualRevenue = existingLoan / (monthlyRevenue * 12);
  if (existingLoan === 0) score += 14;
  else if (existingDebtToAnnualRevenue < 0.15) score += 12;
  else if (existingDebtToAnnualRevenue < 0.3) score += 8;
  else if (existingDebtToAnnualRevenue < 0.5) score += 4;

  if (existingLoan === 0) score += 6;
  else if (existingLoan < profit * 6) score += 8;
  else if (existingLoan < profit * 12) score += 4;

  // 4. Funding feasibility (0-35 points)
  // Ramesh: fundingToAnnualProfit 1.67 → +7, annualProfit 180k > 0.5*300k=150k → +8 = 15
  const fundingToAnnualProfit = amountRequired / annualProfit;
  if (fundingToAnnualProfit < 0.5) score += 18;
  else if (fundingToAnnualProfit < 1) score += 14;
  else if (fundingToAnnualProfit < 2) score += 7;
  else if (fundingToAnnualProfit < 3) score += 4;
  else score += 1;

  if (annualProfit > amountRequired) score += 17;
  else if (annualProfit > amountRequired * 0.5) score += 8;
  else if (annualProfit > amountRequired * 0.3) score += 4;
  else score += 1;

  return Math.min(score, 100);
}

export function getHealthLabel(score: number): string {
  if (score >= 80) return "Strong";
  if (score >= 60) return "Moderate";
  if (score >= 40) return "Needs Attention";
  return "Critical";
}

export function getHealthColor(score: number): string {
  if (score >= 80) return "text-emerald-600";
  if (score >= 60) return "text-amber-600";
  if (score >= 40) return "text-orange-600";
  return "text-red-600";
}

export function getStrengths(entrepreneur: Entrepreneur): string[] {
  const strengths: string[] = [];
  const { monthlyRevenue, monthlyExpenses } = entrepreneur.financial;
  const profit = calculateProfit(monthlyRevenue, monthlyExpenses);
  const margin = calculateProfitMargin(monthlyRevenue, monthlyExpenses);

  if (profit > 0) strengths.push("Positive monthly profit of " + formatINR(profit));
  if (margin > 25) strengths.push("Healthy operating margin at " + margin + "%");
  if (monthlyRevenue > 30000) strengths.push("Established revenue base above ₹30,000/month");
  if (entrepreneur.financial.existingLoan < monthlyRevenue * 3) {
    strengths.push("Existing loan is manageable relative to income");
  }

  return strengths;
}

export function getWatchOuts(entrepreneur: Entrepreneur): string[] {
  const watchOuts: string[] = [];
  const { monthlyRevenue, monthlyExpenses, existingLoan } = entrepreneur.financial;
  const { amountRequired } = entrepreneur.funding;
  const profit = calculateProfit(monthlyRevenue, monthlyExpenses);

  if (amountRequired > profit * 12) {
    watchOuts.push("Requested funding exceeds annual profit — careful planning needed");
  }
  if (existingLoan > 0) {
    watchOuts.push("Existing loan of " + formatINR(existingLoan) + " should be considered alongside new borrowing");
  }
  if (amountRequired > monthlyRevenue * 6) {
    watchOuts.push("Additional borrowing may increase repayment pressure");
  }
  watchOuts.push("Expansion should generate enough additional income to cover new costs");

  return watchOuts;
}

function formatINR(amount: number): string {
  return "₹" + new Intl.NumberFormat("en-IN").format(amount);
}
