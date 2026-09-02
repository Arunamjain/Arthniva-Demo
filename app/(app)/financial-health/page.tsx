// Financial Health Advisory Page
"use client";

import {
  Heart,
  TrendingUp,
  TrendingDown,
  IndianRupee,
  Percent,
  Wallet,
  Target,
  CheckCircle2,
  AlertTriangle,
  Info,
  Lightbulb,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { useEntrepreneur } from "@/lib/context/EntrepreneurContext";
import {
  calculateProfit,
  calculateProfitMargin,
  calculateFinancialHealthScore,
  getHealthLabel,
  getHealthColor,
  getStrengths,
  getWatchOuts,
} from "@/lib/financial/calculations";
import { formatCurrency } from "@/lib/utils";

export default function FinancialHealthPage() {
  const { entrepreneur } = useEntrepreneur();
  const e = entrepreneur;

  const profit = calculateProfit(e.financial.monthlyRevenue, e.financial.monthlyExpenses);
  const margin = calculateProfitMargin(e.financial.monthlyRevenue, e.financial.monthlyExpenses);
  const healthScore = calculateFinancialHealthScore(e);
  const healthLabel = getHealthLabel(healthScore);
  const healthColor = getHealthColor(healthScore);
  const strengths = getStrengths(e);
  const watchOuts = getWatchOuts(e);

  const metrics = [
    {
      label: "Monthly Revenue",
      value: formatCurrency(e.financial.monthlyRevenue),
      icon: IndianRupee,
      color: "text-emerald-700 bg-emerald-50",
      desc: `Gross sales in ${e.personal.location}`,
    },
    {
      label: "Monthly Operating Cost",
      value: formatCurrency(e.financial.monthlyExpenses),
      icon: TrendingDown,
      color: "text-rose-600 bg-rose-50",
      desc: `${((e.financial.monthlyExpenses / (e.financial.monthlyRevenue || 1)) * 100).toFixed(0)}% of monthly revenue`,
    },
    {
      label: "Net Monthly Surplus",
      value: formatCurrency(profit),
      icon: TrendingUp,
      color: "text-blue-700 bg-blue-50",
      desc: "Free operating cash flow",
    },
    {
      label: "Operating Profit Margin",
      value: `${margin}%`,
      icon: Percent,
      color: "text-amber-700 bg-amber-50",
      desc: margin >= 25 ? "Healthy profit buffer" : "Moderate margin",
    },
    {
      label: "Existing Debt Obligation",
      value: formatCurrency(e.financial.existingLoan),
      icon: Wallet,
      color: "text-purple-700 bg-purple-50",
      desc: e.financial.existingLoan > 0 ? "Ongoing bank/SHG loan" : "Zero existing debt",
    },
    {
      label: "Target Funding Need",
      value: formatCurrency(e.funding.amountRequired),
      icon: Target,
      color: "text-teal-700 bg-teal-50",
      desc: e.funding.purpose,
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1.5">
          <Heart className="w-6 h-6 text-emerald-600" />
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Financial Health Advisory</h1>
        </div>
        <p className="text-sm text-gray-600">
          Transparent, rule-based diagnostic for <span className="font-semibold text-gray-900">{e.business.name}</span> ({e.personal.location}, {e.personal.state})
        </p>
      </div>

      {/* Primary Score & Advisory Explanation Card */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Score Visual Ring */}
          <div className="text-center shrink-0">
            <div className="relative inline-flex items-center justify-center w-40 h-40">
              <svg className="w-40 h-40 -rotate-90" viewBox="0 0 120 120">
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
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={`text-4xl font-extrabold ${healthColor}`}>
                  {healthScore}
                </span>
                <span className="text-xs text-gray-400 font-medium">/ 100</span>
              </div>
            </div>
            <p className={`text-base font-bold mt-2 ${healthColor}`}>
              {healthLabel} Financial Health
            </p>
          </div>

          {/* Detailed Diagnostic Explanation */}
          <div className="flex-1 space-y-3">
            <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-4">
              <div className="flex items-start gap-2.5">
                <Info className="w-4 h-4 text-amber-700 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs font-bold text-amber-900 uppercase tracking-wide">
                    Prototype Advisory Estimate — Not a Credit Score
                  </p>
                  <p className="text-xs text-amber-800 mt-0.5 leading-relaxed">
                    This score is calculated transparently from your business cash flow, debt burden, and requested funding ratio. It does not constitute formal bank credit approval or CIBIL score.
                  </p>
                </div>
              </div>
            </div>

            <p className="text-sm text-gray-700 leading-relaxed">
              <span className="font-semibold text-gray-900">Why this score?</span> {e.business.name} demonstrates a stable <span className="font-semibold text-emerald-800">{margin}% profit margin</span> with {formatCurrency(profit)} monthly cash generation. However, absorbing a {formatCurrency(e.funding.amountRequired)} loan alongside {e.financial.existingLoan > 0 ? `existing debt of ${formatCurrency(e.financial.existingLoan)}` : "new debt obligations"} requires ensuring post-expansion revenue covers projected monthly EMIs.
            </p>
          </div>
        </div>
      </div>

      {/* Financial Metrics Diagnostic Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map((m) => (
          <div
            key={m.label}
            className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${m.color}`}>
                <m.icon className="w-4.5 h-4.5" />
              </div>
              <span className="text-xs text-gray-500 font-medium">{m.label}</span>
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-1">{m.value}</p>
            <p className="text-xs text-gray-400 font-medium">{m.desc}</p>
          </div>
        ))}
      </div>

      {/* Strengths & Watch-outs Side by Side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Strengths */}
        <div className="bg-white rounded-2xl border border-emerald-100 p-6 shadow-xs">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 bg-emerald-100 rounded-lg flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
            </div>
            <h2 className="text-base font-bold text-gray-900">Financial Strengths</h2>
          </div>
          <div className="space-y-3">
            {strengths.map((s, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-3 bg-emerald-50/50 rounded-xl border border-emerald-100/50 text-xs text-gray-700"
              >
                <div className="w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center mt-0.5 shrink-0">
                  <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                </div>
                <p className="leading-relaxed font-medium">{s}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Watch-outs */}
        <div className="bg-white rounded-2xl border border-amber-100 p-6 shadow-xs">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 bg-amber-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-4 h-4 text-amber-700" />
            </div>
            <h2 className="text-base font-bold text-gray-900">Advisory Watch-outs</h2>
          </div>
          <div className="space-y-3">
            {watchOuts.map((w, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-3 bg-amber-50/50 rounded-xl border border-amber-100/50 text-xs text-gray-700"
              >
                <div className="w-5 h-5 bg-amber-100 rounded-full flex items-center justify-center mt-0.5 shrink-0">
                  <AlertTriangle className="w-3 h-3 text-amber-700" />
                </div>
                <p className="leading-relaxed font-medium">{w}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Advisory Action Recommendation */}
      <div className="bg-emerald-800 text-white rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 bg-emerald-700 rounded-xl flex items-center justify-center shrink-0">
            <Lightbulb className="w-5 h-5 text-emerald-200" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">
              Ready to explore your loan affordability?
            </h3>
            <p className="text-xs text-emerald-200 mt-0.5">
              Ask our AI Advisor whether {e.business.name} can safely service a {formatCurrency(e.funding.amountRequired)} loan.
            </p>
          </div>
        </div>
        <Link
          href="/advisor"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-emerald-900 rounded-xl text-xs font-bold hover:bg-emerald-50 transition-colors shrink-0 shadow-xs"
        >
          <span>Ask AI Advisor</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
