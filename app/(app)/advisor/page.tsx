"use client";

import { useState } from "react";
import {
  Bot,
  Send,
  MessageSquare,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  Info,
  Sparkles,
} from "lucide-react";
import { useEntrepreneur } from "@/lib/context/EntrepreneurContext";
import {
  generateAdvisorResponse,
  getSuggestedQuestions,
  type AdvisorResponse,
} from "@/lib/ai/advisor";
import { formatCurrency } from "@/lib/utils";

export default function AdvisorPage() {
  const { entrepreneur } = useEntrepreneur();
  const e = entrepreneur;

  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState<AdvisorResponse | null>(null);
  const [askedQuestion, setAskedQuestion] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [currentId, setCurrentId] = useState(e.id);

  // Derive/reset response when entrepreneur ID changes
  if (currentId !== e.id) {
    setCurrentId(e.id);
    setResponse(null);
    setAskedQuestion("");
    setQuestion("");
  }

  const suggestedQuestions = getSuggestedQuestions(e);

  const handleAsk = (q: string) => {
    if (!q.trim()) return;
    setIsThinking(true);
    setAskedQuestion(q);
    setQuestion("");

    // Realistic brief thinking delay
    setTimeout(() => {
      const result = generateAdvisorResponse(q, e);
      setResponse(result);
      setIsThinking(false);
    }, 900);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1.5">
          <div className="w-8 h-8 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-700">
            <Bot className="w-5 h-5" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">AI Business Advisor</h1>
        </div>
        <p className="text-sm text-gray-600">
          Personalized financial advisory engine for <span className="font-semibold text-gray-900">{e.personal.name}</span> ({e.business.name}, {e.personal.location})
        </p>
      </div>

      {/* Input Box Card */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-xs">
        <div className="flex gap-3">
          <div className="w-9 h-9 bg-emerald-100 rounded-full flex items-center justify-center shrink-0 text-emerald-800 font-bold text-xs">
            {e.personal.name.split(" ").map(n => n[0]).join("")}
          </div>
          <div className="flex-1">
            <div className="flex gap-2">
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAsk(question)}
                placeholder={`Ask a question (e.g. "Can I afford a ${formatCurrency(e.funding.amountRequired)} loan?")...`}
                className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors text-sm"
              />
              <button
                onClick={() => handleAsk(question)}
                disabled={!question.trim() || isThinking}
                className="px-5 py-2.5 bg-emerald-600 text-white rounded-xl font-semibold text-sm hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <Send className="w-4 h-4" />
                <span>Ask</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Suggested Questions Grid */}
      {!response && !isThinking && (
        <div className="space-y-3">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            Recommended Questions for {e.business.name}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {suggestedQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleAsk(q)}
                className="flex items-start gap-2.5 p-3.5 bg-white border border-gray-200 hover:border-emerald-300 hover:bg-emerald-50/50 rounded-xl text-left text-xs text-gray-700 hover:text-emerald-900 transition-all duration-200 shadow-2xs group cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-gray-400 group-hover:text-emerald-600 mt-0.5 shrink-0" />
                <span className="leading-relaxed font-medium">{q}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Thinking State */}
      {isThinking && (
        <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center animate-fade-in shadow-xs">
          <div className="inline-flex items-center gap-3">
            <div className="w-9 h-9 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700">
              <Bot className="w-5 h-5 animate-pulse" />
            </div>
            <div className="text-left">
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                <span>Analyzing {e.business.name}&apos;s Cash Flows</span>
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
              <p className="text-xs text-gray-500">Cross-referencing revenue {formatCurrency(e.financial.monthlyRevenue)}, expenses {formatCurrency(e.financial.monthlyExpenses)}, and debt {formatCurrency(e.financial.existingLoan)}...</p>
            </div>
          </div>
        </div>
      )}

      {/* Structured AI Response */}
      {response && !isThinking && (
        <div className="space-y-4 animate-slide-up">
          {/* User Asked Question */}
          <div className="bg-emerald-50/70 border border-emerald-100 rounded-2xl p-4 flex items-start gap-3">
            <div className="w-8 h-8 bg-emerald-200 rounded-full flex items-center justify-center shrink-0 text-emerald-800 font-bold text-xs">
              {e.personal.name.split(" ").map(n => n[0]).join("")}
            </div>
            <div className="flex-1 pt-1">
              <p className="text-xs text-emerald-800 font-semibold uppercase tracking-wider">Question Asked</p>
              <p className="text-sm text-gray-900 font-medium mt-0.5">{askedQuestion}</p>
            </div>
          </div>

          {/* AI Response Card */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-7 shadow-xs space-y-6">
            {/* Top Badge & Assessment */}
            <div>
              <div className="flex items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-700">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-900">Arthniva Advisory Engine</h3>
                    <p className="text-[11px] text-gray-400">Deterministic Financial Risk Analysis</p>
                  </div>
                </div>
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                    response.assessmentType === "positive"
                      ? "bg-emerald-100 text-emerald-800"
                      : response.assessmentType === "cautious"
                      ? "bg-amber-100 text-amber-800"
                      : "bg-rose-100 text-rose-800"
                  }`}
                >
                  {response.assessmentType === "positive"
                    ? "✓ Manageable / Positive"
                    : response.assessmentType === "cautious"
                    ? "⚠ Proceed With Caution"
                    : "✕ High Repayment Risk"}
                </span>
              </div>

              {/* Assessment Text Box */}
              <div className={`p-4 rounded-xl border text-sm leading-relaxed font-medium ${
                response.assessmentType === "positive"
                  ? "bg-emerald-50/50 border-emerald-100 text-emerald-950"
                  : response.assessmentType === "cautious"
                  ? "bg-amber-50/50 border-amber-100 text-amber-950"
                  : "bg-rose-50/50 border-rose-100 text-rose-950"
              }`}>
                {response.assessment}
              </div>
            </div>

            {/* Financial Picture Strip */}
            <div>
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2.5">
                Financial Breakdown Behind Advice
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-100 text-center">
                  <p className="text-[10px] text-gray-500 font-medium">Monthly Profit</p>
                  <p className="text-xs font-bold text-emerald-700 mt-0.5">{response.financialSnapshot.monthlyProfit}</p>
                </div>
                <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-100 text-center">
                  <p className="text-[10px] text-gray-500 font-medium">Profit Margin</p>
                  <p className="text-xs font-bold text-amber-700 mt-0.5">{response.financialSnapshot.profitMargin}</p>
                </div>
                <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-100 text-center">
                  <p className="text-[10px] text-gray-500 font-medium">Current Debt</p>
                  <p className="text-xs font-bold text-purple-700 mt-0.5">{response.financialSnapshot.existingDebt}</p>
                </div>
                <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-100 text-center">
                  <p className="text-[10px] text-gray-500 font-medium">Funding Goal</p>
                  <p className="text-xs font-bold text-teal-700 mt-0.5">{response.financialSnapshot.requestedFunding}</p>
                </div>
                <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-100 text-center">
                  <p className="text-[10px] text-gray-500 font-medium">Estimated EMI</p>
                  <p className="text-xs font-bold text-rose-700 mt-0.5">{response.financialSnapshot.estimatedEmi}</p>
                </div>
                <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-100 text-center">
                  <p className="text-[10px] text-gray-500 font-medium">Buffer Post-EMI</p>
                  <p className="text-xs font-bold text-blue-700 mt-0.5">{response.financialSnapshot.profitPostEmi}</p>
                </div>
              </div>
            </div>

            {/* Why This Matters */}
            <div>
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Why This Matters for {e.business.name}
              </h4>
              <div className="space-y-2">
                {response.whyThisMatters.map((r, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-gray-700 bg-gray-50/70 p-2.5 rounded-xl">
                    <span className="text-emerald-600 font-bold mt-0.5">•</span>
                    <span className="leading-relaxed">{r}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Risks */}
            <div>
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                Key Operational & Financial Risks
              </h4>
              <div className="space-y-2">
                {response.keyRisks.map((k, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-gray-700 bg-amber-50/40 p-2.5 rounded-xl border border-amber-100/50">
                    <span className="text-amber-600 font-bold mt-0.5">•</span>
                    <span className="leading-relaxed">{k}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actionable Next Steps */}
            <div>
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4 text-blue-600" />
                Recommended Next Action Steps
              </h4>
              <div className="space-y-2">
                {response.nextSteps.map((s, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-gray-800 bg-blue-50/40 p-3 rounded-xl border border-blue-100/50 font-medium">
                    <ArrowRight className="w-3.5 h-3.5 text-blue-600 mt-0.5 shrink-0" />
                    <span className="leading-relaxed">{s}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Disclaimer */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-3.5 flex items-start gap-2.5">
              <Info className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
              <p className="text-[11px] text-gray-500 leading-relaxed">
                Prototype Advisory Disclaimer: This guidance is deterministically generated to model financial trade-offs for rural micro-enterpreneurs. It is not loan approval, does not guarantee scheme sanctions, and does not replace formal bank appraisals.
              </p>
            </div>
          </div>

          {/* Ask Another Question Bar */}
          <div className="text-center pt-2">
            <p className="text-xs font-semibold text-gray-400 mb-2">Ask another question for {e.business.name}:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {suggestedQuestions
                .filter((q) => q !== askedQuestion)
                .slice(0, 3)
                .map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAsk(q)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-xl text-xs text-gray-700 hover:border-emerald-300 hover:text-emerald-800 hover:bg-emerald-50 transition-all cursor-pointer"
                  >
                    <MessageSquare className="w-3 h-3 text-emerald-600" />
                    <span>{q}</span>
                  </button>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
