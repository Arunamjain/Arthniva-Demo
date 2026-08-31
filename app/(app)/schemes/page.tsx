"use client";

import { useState } from "react";
import {
  Landmark,
  Search,
  ExternalLink,
  Info,
  Tag,
  CheckCircle,
  Sparkles,
  Award,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useEntrepreneur } from "@/lib/context/EntrepreneurContext";
import { getPersonalizedSchemes } from "@/lib/schemes/schemeData";
import { formatCurrency } from "@/lib/utils";

const categories = [
  { value: "all", label: "All Schemes" },
  { value: "recommended", label: "⭐ Top Matches for You" },
  { value: "dairy", label: "Dairy & Livestock" },
  { value: "textile", label: "Handloom & Textiles" },
  { value: "agri", label: "Food & Agri Processing" },
  { value: "msme", label: "MUDRA / MSME" },
  { value: "women", label: "Women & SC/ST" },
  { value: "rural", label: "Rural Livelihoods" },
];

export default function SchemesPage() {
  const { entrepreneur } = useEntrepreneur();
  const e = entrepreneur;

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("recommended");
  const [expandedScheme, setExpandedScheme] = useState<string | null>(null);

  const personalizedSchemes = getPersonalizedSchemes(e, selectedCategory);

  const filteredSchemes = searchQuery
    ? personalizedSchemes.filter(
        (s) =>
          s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.purpose.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.personalizedWhy.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : personalizedSchemes;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1.5">
          <div className="w-8 h-8 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-700">
            <Landmark className="w-5 h-5" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Government Scheme & Subsidy Finder
          </h1>
        </div>
        <p className="text-sm text-gray-600">
          Potentially relevant government support matched to <span className="font-semibold text-gray-900">{e.business.name}</span> ({e.business.category}, {e.personal.location})
        </p>
      </div>

      {/* Illustrative Demo Notice */}
      <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-4">
        <div className="flex items-start gap-2.5">
          <Info className="w-4 h-4 text-amber-700 mt-0.5 shrink-0" />
          <div>
            <p className="text-xs font-bold text-amber-900 uppercase tracking-wide">
              Illustrative Scheme Guidance — Not Formal Sanction
            </p>
            <p className="text-xs text-amber-800 mt-0.5 leading-relaxed">
              Scheme matches are determined based on your business category, rural location, and funding requirement of {formatCurrency(e.funding.amountRequired)}. Always verify current application windows and state nodal guidelines before applying.
            </p>
          </div>
        </div>
      </div>

      {/* Search & Filter Strip */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by scheme name, subsidy type, or keyword..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (e.target.value) setSelectedCategory("all");
              }}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => {
                setSelectedCategory(cat.value);
                setSearchQuery("");
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat.value && !searchQuery
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count & Match Indicator */}
      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>
          Showing <span className="font-bold text-gray-900">{filteredSchemes.length}</span> potentially relevant scheme{filteredSchemes.length !== 1 ? "s" : ""}
        </span>
        <span className="flex items-center gap-1 text-emerald-700 font-medium">
          <Sparkles className="w-3.5 h-3.5" />
          Ranked by match for {e.business.name}
        </span>
      </div>

      {/* Scheme Cards */}
      <div className="space-y-4">
        {filteredSchemes.map((scheme) => {
          const isExpanded = expandedScheme === scheme.id;
          const isHighMatch = scheme.matchScore >= 80;

          return (
            <div
              key={scheme.id}
              className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden ${
                isHighMatch ? "border-emerald-200 shadow-xs" : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="p-5 sm:p-6 space-y-3.5">
                {/* Title & Badge */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      {isHighMatch && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-full text-[11px] font-bold">
                          <Award className="w-3 h-3 text-emerald-700" />
                          Top Recommendation
                        </span>
                      )}
                      <span className="text-xs text-gray-400 font-medium">{scheme.ministry}</span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-snug">
                      {scheme.name}
                    </h3>
                  </div>

                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-semibold whitespace-nowrap shrink-0">
                    <Tag className="w-3 h-3 text-gray-500" />
                    {scheme.category.toUpperCase()}
                  </span>
                </div>

                {/* Purpose */}
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {scheme.purpose}
                </p>

                {/* Personalized Why Card */}
                <div className="bg-emerald-50/70 border border-emerald-100 rounded-xl p-3.5">
                  <p className="text-[11px] font-bold text-emerald-900 uppercase tracking-wider mb-0.5 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-emerald-700" />
                    Why this may be relevant for {e.personal.name}
                  </p>
                  <p className="text-xs text-emerald-800 leading-relaxed font-medium">
                    {scheme.personalizedWhy}
                  </p>
                </div>

                {/* Funding Type Badge */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-800 rounded-lg text-xs font-semibold border border-blue-100">
                    💰 {scheme.fundingType}
                  </span>
                  {scheme.subsidyPercentage && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-50 text-purple-800 rounded-lg text-xs font-semibold border border-purple-100">
                      🎁 Subsidy: {scheme.subsidyPercentage}
                    </span>
                  )}
                </div>

                {/* Toggle Details Button */}
                <div className="pt-2">
                  <button
                    onClick={() => setExpandedScheme(isExpanded ? null : scheme.id)}
                    className="inline-flex items-center gap-1 text-xs text-emerald-700 hover:text-emerald-800 font-bold transition-colors cursor-pointer"
                  >
                    <span>{isExpanded ? "Hide detailed eligibility & benefits" : "View eligibility criteria & benefits"}</span>
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Expandable Section */}
              {isExpanded && (
                <div className="px-5 sm:px-6 pb-6 pt-4 bg-gray-50/70 border-t border-gray-100 space-y-4 animate-fade-in text-xs">
                  <p className="text-gray-700 leading-relaxed">
                    {scheme.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-xl border border-gray-200">
                      <h4 className="font-bold text-gray-900 uppercase tracking-wider mb-2.5">
                        Eligibility Hints
                      </h4>
                      <div className="space-y-1.5">
                        {scheme.eligibilityHints.map((h, i) => (
                          <div key={i} className="flex items-start gap-2 text-gray-600">
                            <CheckCircle className="w-3.5 h-3.5 text-gray-400 mt-0.5 shrink-0" />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-gray-200">
                      <h4 className="font-bold text-gray-900 uppercase tracking-wider mb-2.5">
                        Key Program Benefits
                      </h4>
                      <div className="space-y-1.5">
                        {scheme.benefits.map((b, i) => (
                          <div key={i} className="flex items-start gap-2 text-gray-700">
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                            <span className="font-medium">{b}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-xl p-3 flex items-start gap-2">
                    <ExternalLink className="w-3.5 h-3.5 text-gray-400 mt-0.5 shrink-0" />
                    <p className="text-[11px] text-gray-500 leading-relaxed">
                      Verification Notice: Official scheme eligibility, documentation guidelines, and subsidy release quotas are managed by designated state departments and authorized local bank branches.
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filteredSchemes.length === 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
          <Search className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-700 font-bold text-base">No matching schemes found</p>
          <p className="text-xs text-gray-400 mt-1">
            Try adjusting your search keywords or select &quot;All Schemes&quot; above.
          </p>
        </div>
      )}
    </div>
  );
}
