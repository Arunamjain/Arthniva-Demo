"use client";

import { useState } from "react";
import {
  FileText,
  Sparkles,
  Printer,
  Info,
  MapPin,
  Leaf,
  RefreshCw,
} from "lucide-react";
import { useEntrepreneur } from "@/lib/context/EntrepreneurContext";
import { generateBusinessPlan, type BusinessPlanSection } from "@/lib/ai/businessPlan";
import { calculateProfit } from "@/lib/financial/calculations";
import { formatCurrency } from "@/lib/utils";

export default function BusinessPlanPage() {
  const { entrepreneur } = useEntrepreneur();
  const e = entrepreneur;

  const [plan, setPlan] = useState<BusinessPlanSection[] | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentId, setCurrentId] = useState(e.id);

  // Derive/reset plan when entrepreneur ID changes without cascading render
  if (currentId !== e.id) {
    setCurrentId(e.id);
    setPlan(null);
  }

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const generated = generateBusinessPlan(e);
      setPlan(generated);
      setIsGenerating(false);
    }, 1200);
  };

  const handlePrint = () => {
    window.print();
  };

  const profit = calculateProfit(e.financial.monthlyRevenue, e.financial.monthlyExpenses);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in space-y-6">
      {/* Header */}
      <div className="no-print">
        <div className="flex items-center gap-2 mb-1.5">
          <div className="w-8 h-8 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-700">
            <FileText className="w-5 h-5" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Business Expansion Plan Generator
          </h1>
        </div>
        <p className="text-sm text-gray-600">
          Structured 10-section expansion blueprint tailored for <span className="font-semibold text-gray-900">{e.business.name}</span> ({e.personal.location}, {e.personal.state})
        </p>
      </div>

      {/* Business Snapshot Card */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6 no-print shadow-xs">
        <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center shrink-0 text-emerald-700 font-bold text-base">
              {e.personal.name.split(" ").map(n => n[0]).join("")}
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900 leading-snug">
                {e.business.name}
              </h2>
              <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                <MapPin className="w-3.5 h-3.5 text-gray-400" />
                <span>{e.personal.location}, {e.personal.state}</span>
                <span className="text-gray-300">•</span>
                <span className="font-medium text-emerald-700">{e.business.category}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 text-xs">
            <span className="px-3 py-1 bg-emerald-50 text-emerald-800 rounded-lg font-semibold border border-emerald-100">
              Revenue: {formatCurrency(e.financial.monthlyRevenue)}/mo
            </span>
            <span className="px-3 py-1 bg-blue-50 text-blue-800 rounded-lg font-semibold border border-blue-100">
              Profit: {formatCurrency(profit)}/mo
            </span>
            <span className="px-3 py-1 bg-purple-50 text-purple-800 rounded-lg font-semibold border border-purple-100">
              Goal: {formatCurrency(e.funding.amountRequired)}
            </span>
          </div>
        </div>
      </div>

      {/* Generate Call to Action */}
      {!plan && !isGenerating && (
        <div className="bg-white rounded-2xl border border-gray-200 p-10 text-center no-print shadow-xs space-y-4">
          <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto text-emerald-600">
            <Sparkles className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              Ready to Generate {e.business.name}&apos;s Expansion Blueprint
            </h3>
            <p className="text-xs text-gray-500 max-w-md mx-auto mt-1 leading-relaxed">
              We&apos;ll synthesize {e.personal.name}&apos;s baseline revenue, cost structures, and {formatCurrency(e.funding.amountRequired)} funding goal into a structured 10-section business proposal.
            </p>
          </div>
          <button
            onClick={handleGenerate}
            className="inline-flex items-center gap-2 bg-emerald-600 text-white px-8 py-3.5 rounded-xl font-bold text-sm hover:bg-emerald-700 transition-all shadow-md shadow-emerald-200 hover:-translate-y-0.5 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Generate Business Plan</span>
          </button>
        </div>
      )}

      {/* Generating Progress State */}
      {isGenerating && (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center animate-fade-in no-print shadow-xs">
          <div className="w-10 h-10 border-3 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm font-bold text-gray-900">
            Structuring 10-Section Expansion Plan...
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Synthesizing revenue projections, DSCR ratios, and risk mitigation for {e.business.name}...
          </p>
        </div>
      )}

      {/* Generated Business Plan Content */}
      {plan && !isGenerating && (
        <div className="animate-slide-up space-y-4">
          {/* Plan Header Card */}
          <div className="bg-emerald-800 rounded-2xl p-6 text-white shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1 text-emerald-200 text-xs font-bold uppercase tracking-wider">
                  <Leaf className="w-4 h-4" />
                  <span>ARTHNIVA Business Proposal</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold">
                  Business Expansion Plan
                </h2>
                <p className="text-emerald-100 text-xs mt-1">
                  Prepared for: <span className="font-bold text-white">{e.business.name}</span> • {e.personal.name} ({e.personal.location}, {e.personal.state})
                </p>
              </div>

              <div className="flex items-center gap-2 no-print">
                <button
                  onClick={handlePrint}
                  className="px-3.5 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-white/20"
                  title="Print / Save as PDF"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print / PDF</span>
                </button>
              </div>
            </div>
          </div>

          {/* Structured Plan Sections */}
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs divide-y divide-gray-100">
            {plan.map((section, idx) => (
              <div key={idx} className="p-6 space-y-3">
                <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                  <span className="w-6 h-6 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-bold flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <span>{section.title.replace(/^\d+\.\s*/, '')}</span>
                </h3>

                <div className="space-y-1.5 text-xs sm:text-sm text-gray-700 leading-relaxed pl-8">
                  {section.content.map((line, i) => {
                    if (line === "") return <div key={i} className="h-1.5" />;
                    if (line.startsWith("•")) {
                      return (
                        <div key={i} className="flex items-start gap-2 pl-2 text-gray-700">
                          <span className="text-emerald-600 font-bold mt-0.5">•</span>
                          <span>{line.substring(2)}</span>
                        </div>
                      );
                    }
                    if (line.includes(":") && !line.startsWith("Note") && line.split(":")[0].length < 35) {
                      const parts = line.split(":");
                      return (
                        <p key={i} className="text-gray-700">
                          <span className="font-semibold text-gray-900">{parts[0]}:</span>
                          <span>{parts.slice(1).join(":")}</span>
                        </p>
                      );
                    }
                    return <p key={i} className="text-gray-600">{line}</p>;
                  })}
                </div>
              </div>
            ))}

            {/* Verification Disclaimer */}
            <div className="p-5 bg-gray-50 border-t border-gray-200 no-print">
              <div className="flex items-start gap-2.5">
                <Info className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                <p className="text-[11px] text-gray-500 leading-relaxed">
                  Advisory Notice: This business plan is generated by Arthniva&apos;s deterministic financial modeling engine for rural micro-enterpreneurs. Before submitting to financial institutions, verify project cost quotations and local statutory norms.
                </p>
              </div>
            </div>
          </div>

          {/* Regenerate Action */}
          <div className="text-center pt-2 no-print">
            <button
              onClick={handleGenerate}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 hover:border-emerald-300 hover:text-emerald-800 hover:bg-emerald-50 transition-all cursor-pointer shadow-2xs"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Regenerate Blueprint</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
