// Dashboard Page
"use client";

import {
  TrendingUp,
  TrendingDown,
  IndianRupee,
  Percent,
  Wallet,
  Target,
  Heart,
  MapPin,
  ArrowRight,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  Lightbulb,
  Bot,
  Landmark,
  FileText,
} from "lucide-react";
import Link from "next/link";
import { useEntrepreneur } from "@/lib/context/EntrepreneurContext";
import {
  getMonthlyTrendData,
  getFundingAllocationData,
} from "@/lib/data/demoEntrepreneur";
import {
  calculateProfit,
  calculateProfitMargin,
  calculateFinancialHealthScore,
  getHealthLabel,
  getHealthColor,
} from "@/lib/financial/calculations";
import { formatCurrency } from "@/lib/utils";
import RevenueExpenseChart from "@/components/dashboard/RevenueExpenseChart";
import ProfitTrendChart from "@/components/dashboard/ProfitTrendChart";
import FundingAllocationChart from "@/components/dashboard/FundingAllocationChart";

export default function DashboardPage() {
  const { entrepreneur, allPresets, switchEntrepreneur } = useEntrepreneur();
  const e = entrepreneur;

  const profit = calculateProfit(e.financial.monthlyRevenue, e.financial.monthlyExpenses);
  const margin = calculateProfitMargin(e.financial.monthlyRevenue, e.financial.monthlyExpenses);
  const healthScore = calculateFinancialHealthScore(e);
  const healthLabel = getHealthLabel(healthScore);
  const healthColor = getHealthColor(healthScore);

  const monthlyTrendData = getMonthlyTrendData(e);
  const fundingAllocationData = getFundingAllocationData(e);

  // Financial calculations for advisory insights
  const estimatedEmi = Math.round(e.funding.amountRequired * 0.033);
  const emiShareOfProfit = Math.round((estimatedEmi / (profit || 1)) * 100);
  const totalDebtPostFunding = e.financial.existingLoan + e.funding.amountRequired;

  const summaryCards = [
    {
      label: "Monthly Revenue",
      value: formatCurrency(e.financial.monthlyRevenue),
      sub: "/ month",
      icon: IndianRupee,
      color: "bg-emerald-50 text-emerald-700",
    },
    {
      label: "Monthly Expenses",
      value: formatCurrency(e.financial.monthlyExpenses),
      sub: "/ month",
      icon: TrendingDown,
      color: "bg-rose-50 text-rose-600",
    },
    {
      label: "Net Monthly Profit",
      value: formatCurrency(profit),
      sub: "/ month",
      icon: TrendingUp,
      color: "bg-blue-50 text-blue-700",
    },
    {
      label: "Operating Margin",
      value: `${margin}%`,
      sub: margin > 25 ? "Healthy" : "Moderate",
      icon: Percent,
      color: "bg-amber-50 text-amber-700",
    },
    {
      label: "Existing Debt",
      value: formatCurrency(e.financial.existingLoan),
      sub: e.financial.existingLoan > 0 ? "Active Loan" : "No Debt",
      icon: Wallet,
      color: "bg-purple-50 text-purple-700",
    },
    {
      label: "Funding Goal",
      value: formatCurrency(e.funding.amountRequired),
      sub: e.funding.purpose.split(" ")[0],
      icon: Target,
      color: "bg-teal-50 text-teal-700",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in space-y-8">
      {/* Top Banner: Greeting + Business Context & Persona Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-full text-xs font-semibold">
              {e.business.category} Micro-Enterprise
            </span>
            <span className="text-gray-300">•</span>
            <div className="flex items-center gap-1 text-gray-500 text-xs font-medium">
              <MapPin className="w-3.5 h-3.5 text-gray-400" />
              {e.personal.location}, {e.personal.state}
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            Good morning, {e.personal.name.split(" ")[0]} 👋
          </h1>
          <p className="text-sm text-gray-600 mt-0.5">
            Managing <span className="font-semibold text-gray-900">{e.business.name}</span> — {e.business.type}
          </p>
        </div>

        {/* Quick Demo Switcher Pill */}
        <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-xl border border-gray-200">
          <span className="text-xs text-gray-500 font-medium pl-1">Demo Persona:</span>
          <div className="flex gap-1">
            {allPresets.map((preset) => (
              <button
                key={preset.id}
                onClick={() => switchEntrepreneur(preset.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  preset.id === e.id
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "bg-white text-gray-700 hover:bg-gray-200 border border-gray-200"
                }`}
              >
                {preset.personal.name.split(" ")[0]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* AI Advisory Synthesis: "What this means for your business" */}
      <div className="bg-gradient-to-br from-emerald-900 to-emerald-950 rounded-2xl p-6 text-white shadow-md">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center border border-emerald-400/30">
              <Sparkles className="w-4 h-4 text-emerald-300" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-wide">
                Arthniva AI Executive Advisory Synthesis
              </h2>
              <p className="text-xs text-emerald-200">
                Actionable evaluation for {e.business.name}
              </p>
            </div>
          </div>
          <Link
            href="/advisor"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-500 text-white rounded-xl text-xs font-semibold hover:bg-emerald-400 transition-colors shadow-xs"
          >
            <Bot className="w-3.5 h-3.5" />
            Ask AI Advisor
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          {/* Strength & Surplus */}
          <div className="bg-white/10 backdrop-blur-xs rounded-xl p-4 border border-white/10">
            <div className="flex items-center gap-1.5 text-emerald-300 font-semibold mb-1.5">
              <CheckCircle2 className="w-4 h-4" />
              Operating Surplus
            </div>
            <p className="text-emerald-100 leading-relaxed">
              Your business generates <span className="font-bold text-white">{formatCurrency(profit)}/month</span> in net profit ({margin}% margin). This establishes a stable baseline for servicing structured borrowing.
            </p>
          </div>

          {/* Debt & Risk Check */}
          <div className="bg-white/10 backdrop-blur-xs rounded-xl p-4 border border-white/10">
            <div className="flex items-center gap-1.5 text-amber-300 font-semibold mb-1.5">
              <AlertTriangle className="w-4 h-4" />
              Funding & Debt Exposure
            </div>
            <p className="text-emerald-100 leading-relaxed">
              A {formatCurrency(e.funding.amountRequired)} loan adds ~<span className="font-bold text-white">{formatCurrency(estimatedEmi)}/mo</span> in EMI (~{emiShareOfProfit}% of surplus). Total liability will reach {formatCurrency(totalDebtPostFunding)}.
            </p>
          </div>

          {/* Recommended Next Action */}
          <div className="bg-white/10 backdrop-blur-xs rounded-xl p-4 border border-white/10">
            <div className="flex items-center gap-1.5 text-blue-300 font-semibold mb-1.5">
              <Lightbulb className="w-4 h-4" />
              Recommended Next Step
            </div>
            <p className="text-emerald-100 leading-relaxed">
              Verify matching government capital subsidies (e.g. MUDRA / NABARD / SAMARTH) and generate your 10-section expansion plan.
            </p>
          </div>
        </div>
      </div>

      {/* Financial Snapshot Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {summaryCards.map((card) => (
          <div
            key={card.label}
            className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md hover:border-emerald-200 transition-all duration-200"
          >
            <div className="flex items-center gap-2 mb-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${card.color}`}>
                <card.icon className="w-4 h-4" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mb-1">{card.label}</p>
            <p className="text-lg font-bold text-gray-900 leading-tight">
              {card.value}
            </p>
            <p className="text-[11px] text-gray-400 mt-1 font-medium">{card.sub}</p>
          </div>
        ))}
      </div>

      {/* Financial Health Score + Revenue vs Expenses Decision Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Financial Health Advisory Card */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-emerald-600" />
                <h2 className="text-base font-bold text-gray-900">
                  Financial Health Score
                </h2>
              </div>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${healthScore >= 70 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                {healthLabel}
              </span>
            </div>

            <div className="text-center py-4">
              <div className="relative inline-flex items-center justify-center w-36 h-36">
                <svg className="w-36 h-36 -rotate-90" viewBox="0 0 120 120">
                  <circle
                    cx="60"
                    cy="60"
                    r="52"
                    fill="none"
                    stroke="#f1f5f9"
                    strokeWidth="10"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="52"
                    fill="none"
                    stroke="#059669"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray={`${(healthScore / 100) * 327} 327`}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className={`text-4xl font-extrabold ${healthColor}`}>
                    {healthScore}
                  </span>
                  <span className="text-xs text-gray-400 font-medium">/ 100</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-gray-500 text-center leading-relaxed">
              Based on monthly surplus of {formatCurrency(profit)}, debt-to-revenue ratio, and {formatCurrency(e.funding.amountRequired)} funding feasibility.
            </p>
          </div>

          <div className="pt-4 border-t border-gray-100 mt-4">
            <p className="text-[10px] text-gray-400 text-center bg-gray-50 rounded-lg py-1.5 px-2 mb-3">
              Prototype estimate — not a credit score.
            </p>
            <Link
              href="/financial-health"
              className="w-full flex items-center justify-center gap-1.5 py-2 px-3 bg-emerald-50 text-emerald-800 rounded-xl text-xs font-semibold hover:bg-emerald-100 transition-colors"
            >
              View Full Breakdown & Strengths
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Revenue vs Expenses (Decision-Oriented Visualization) */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 lg:col-span-2 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-base font-bold text-gray-900">
                Revenue vs Expenses (Last 6 Months)
              </h2>
              <span className="text-xs text-gray-400 font-medium">
                Surplus gap indicates debt capacity
              </span>
            </div>
            <p className="text-xs text-gray-500 mb-4">
              Decision Question: <span className="font-semibold text-gray-800">Is the business consistently generating surplus above operating costs?</span>
            </p>
            <RevenueExpenseChart data={monthlyTrendData} />
          </div>

          <div className="bg-gray-50 rounded-xl p-3 mt-3 flex items-start gap-2 border border-gray-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
            <p className="text-xs text-gray-600">
              <span className="font-semibold text-gray-900">Advisory Takeaway:</span> Revenue has grown from {formatCurrency(monthlyTrendData[0].revenue)} to {formatCurrency(e.financial.monthlyRevenue)} while expenses remained stable, providing a consistent monthly cash cushion.
            </p>
          </div>
        </div>
      </div>

      {/* Decision-Oriented Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profit Trend Chart */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-base font-bold text-gray-900">
                Monthly Net Profit Trajectory
              </h2>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                +{formatCurrency(profit - monthlyTrendData[0].profit)} / mo Growth
              </span>
            </div>
            <p className="text-xs text-gray-500 mb-4">
              Decision Question: <span className="font-semibold text-gray-800">Is profit trajectory stable enough to commit to monthly EMIs?</span>
            </p>
            <ProfitTrendChart data={monthlyTrendData} />
          </div>

          <div className="bg-emerald-50/70 border border-emerald-100 rounded-xl p-3 mt-3 text-xs text-emerald-900">
            <p>
              <span className="font-semibold">Cash Flow Insight:</span> Net profit increased steadily across the last 6 months, reaching {formatCurrency(profit)} in August.
            </p>
          </div>
        </div>

        {/* Proposed Funding Allocation Chart */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-base font-bold text-gray-900">
                Proposed {formatCurrency(e.funding.amountRequired)} Allocation
              </h2>
              <span className="text-xs font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md">
                {e.funding.purpose}
              </span>
            </div>
            <p className="text-xs text-gray-500 mb-4">
              Decision Question: <span className="font-semibold text-gray-800">Are funds prioritized towards direct income-generating assets?</span>
            </p>
            <FundingAllocationChart data={fundingAllocationData} />
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 mt-3 text-xs text-gray-600">
            <p>
              <span className="font-semibold text-gray-900">Allocation Health:</span> Over 60% of capital is deployed into direct yield assets, which accelerates post-expansion revenue generation.
            </p>
          </div>
        </div>
      </div>

      {/* Advisory Action Hub (The 3 Pillars of Decision-Making) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        <Link
          href="/advisor"
          className="bg-white border-2 border-blue-100 hover:border-blue-400 rounded-2xl p-5 transition-all duration-200 group shadow-xs hover:shadow-md"
        >
          <div className="w-10 h-10 bg-blue-50 text-blue-700 rounded-xl flex items-center justify-center mb-3 group-hover:bg-blue-600 group-hover:text-white transition-colors">
            <Bot className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-gray-900 group-hover:text-blue-700 transition-colors">
            1. Ask AI Advisor
          </h3>
          <p className="text-xs text-gray-500 mt-1 leading-relaxed">
            Get personalized answers on loan affordability, profit expansion, and risk management tailored to {e.business.name}.
          </p>
          <div className="flex items-center gap-1 text-xs font-semibold text-blue-700 mt-4">
            <span>Explore advisory questions</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        <Link
          href="/schemes"
          className="bg-white border-2 border-amber-100 hover:border-amber-400 rounded-2xl p-5 transition-all duration-200 group shadow-xs hover:shadow-md"
        >
          <div className="w-10 h-10 bg-amber-50 text-amber-700 rounded-xl flex items-center justify-center mb-3 group-hover:bg-amber-600 group-hover:text-white transition-colors">
            <Landmark className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-gray-900 group-hover:text-amber-700 transition-colors">
            2. Matched Government Schemes
          </h3>
          <p className="text-xs text-gray-500 mt-1 leading-relaxed">
            Discover credit subsidies (NABARD / MUDRA / PMFME) matched specifically to your {e.business.category} enterprise.
          </p>
          <div className="flex items-center gap-1 text-xs font-semibold text-amber-700 mt-4">
            <span>View matched schemes</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        <Link
          href="/business-plan"
          className="bg-white border-2 border-emerald-100 hover:border-emerald-400 rounded-2xl p-5 transition-all duration-200 group shadow-xs hover:shadow-md"
        >
          <div className="w-10 h-10 bg-emerald-50 text-emerald-700 rounded-xl flex items-center justify-center mb-3 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
            <FileText className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">
            3. Business Expansion Plan
          </h3>
          <p className="text-xs text-gray-500 mt-1 leading-relaxed">
            Generate a comprehensive 10-section expansion plan ready to present to banks and financial institutions.
          </p>
          <div className="flex items-center gap-1 text-xs font-semibold text-emerald-700 mt-4">
            <span>Generate business plan</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </div>
    </div>
  );
}
