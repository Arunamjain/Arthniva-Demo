"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Building2,
  IndianRupee,
  Target,
  ArrowRight,
  Leaf,
  Sparkles,
  Check,
  RotateCcw,
} from "lucide-react";
import { useEntrepreneur } from "@/lib/context/EntrepreneurContext";

export default function OnboardingPage() {
  const router = useRouter();
  const {
    entrepreneur,
    updateEntrepreneur,
    switchEntrepreneur,
    resetToDefault,
    allPresets,
  } = useEntrepreneur();

  // Local form state initialized from active entrepreneur
  const [formData, setFormData] = useState({
    name: entrepreneur.personal.name,
    location: entrepreneur.personal.location,
    district: entrepreneur.personal.district,
    state: entrepreneur.personal.state,
    businessName: entrepreneur.business.name,
    category: entrepreneur.business.category,
    type: entrepreneur.business.type,
    monthlyRevenue: entrepreneur.financial.monthlyRevenue,
    monthlyExpenses: entrepreneur.financial.monthlyExpenses,
    existingLoan: entrepreneur.financial.existingLoan,
    amountRequired: entrepreneur.funding.amountRequired,
    purpose: entrepreneur.funding.purpose,
  });

  const [currentId, setCurrentId] = useState(entrepreneur.id);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync form data when active entrepreneur changes without cascading effect
  if (currentId !== entrepreneur.id) {
    setCurrentId(entrepreneur.id);
    setFormData({
      name: entrepreneur.personal.name,
      location: entrepreneur.personal.location,
      district: entrepreneur.personal.district,
      state: entrepreneur.personal.state,
      businessName: entrepreneur.business.name,
      category: entrepreneur.business.category,
      type: entrepreneur.business.type,
      monthlyRevenue: entrepreneur.financial.monthlyRevenue,
      monthlyExpenses: entrepreneur.financial.monthlyExpenses,
      existingLoan: entrepreneur.financial.existingLoan,
      amountRequired: entrepreneur.funding.amountRequired,
      purpose: entrepreneur.funding.purpose,
    });
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    updateEntrepreneur({
      personal: {
        name: formData.name,
        location: formData.location,
        district: formData.district,
        state: formData.state,
      },
      business: {
        name: formData.businessName,
        category: formData.category,
        type: formData.type,
      },
      financial: {
        monthlyRevenue: Number(formData.monthlyRevenue) || 0,
        monthlyExpenses: Number(formData.monthlyExpenses) || 0,
        existingLoan: Number(formData.existingLoan) || 0,
      },
      funding: {
        amountRequired: Number(formData.amountRequired) || 0,
        purpose: formData.purpose,
      },
    });

    setTimeout(() => {
      router.push("/dashboard");
    }, 600);
  };

  const handleSelectPreset = (id: string) => {
    switchEntrepreneur(id);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-emerald-600 rounded-xl flex items-center justify-center text-white">
              <Leaf className="w-4 h-4" />
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">ARTHNIVA</span>
          </div>
          <button
            onClick={() => router.push("/dashboard")}
            className="text-xs font-bold text-gray-600 hover:text-emerald-700 transition-colors cursor-pointer px-3 py-1.5 rounded-lg hover:bg-gray-100"
          >
            ← Back to Dashboard
          </button>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 animate-fade-in space-y-6">
        {/* Title */}
        <div className="text-center space-y-1.5">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Entrepreneur & Business Profile Setup
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 max-w-lg mx-auto leading-relaxed">
            Customize financial numbers or load a pre-configured rural demo persona. All advisory models and business plans update instantly.
          </p>
        </div>

        {/* Persona Quick Loader */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              Quick-Load Sample Rural Entrepreneurs
            </p>
            <button
              type="button"
              onClick={resetToDefault}
              className="text-[11px] font-semibold text-emerald-700 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              Reset to Ramesh (Default)
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {allPresets.map((preset) => {
              const isSelected = preset.id === entrepreneur.id;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => handleSelectPreset(preset.id)}
                  className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                    isSelected
                      ? "bg-emerald-50/80 border-emerald-500 text-emerald-950 shadow-xs"
                      : "bg-gray-50/60 border-gray-200 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-xs font-bold text-gray-900">{preset.personal.name}</p>
                    {isSelected && <Check className="w-3.5 h-3.5 text-emerald-700" />}
                  </div>
                  <p className="text-[11px] text-gray-500 truncate">{preset.business.name}</p>
                  <p className="text-[10px] text-emerald-700 font-semibold mt-1">
                    Rev: ₹{(preset.financial.monthlyRevenue / 1000).toFixed(0)}k • Loan: ₹{(preset.funding.amountRequired / 100000).toFixed(1)}L
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Profile Edit Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 1. Personal Info */}
          <div className="bg-white rounded-2xl shadow-xs border border-gray-200 p-6 space-y-4">
            <div className="flex items-center gap-2.5 text-blue-700 font-bold text-sm border-b border-gray-100 pb-3">
              <User className="w-4 h-4" />
              <span>1. Entrepreneur Details</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Entrepreneur Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Location / Village / Town
                </label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors"
                />
              </div>
            </div>
          </div>

          {/* 2. Business Info */}
          <div className="bg-white rounded-2xl shadow-xs border border-gray-200 p-6 space-y-4">
            <div className="flex items-center gap-2.5 text-emerald-700 font-bold text-sm border-b border-gray-100 pb-3">
              <Building2 className="w-4 h-4" />
              <span>2. Business Profile</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Business Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Business Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors"
                >
                  <option value="Dairy">Dairy</option>
                  <option value="Handloom & Textiles">Handloom & Textiles</option>
                  <option value="Agri-Processing">Agri-Processing</option>
                  <option value="Artisan & Handicrafts">Artisan & Handicrafts</option>
                  <option value="Retail & Trading">Retail & Trading</option>
                </select>
              </div>
            </div>
          </div>

          {/* 3. Financial Information */}
          <div className="bg-white rounded-2xl shadow-xs border border-gray-200 p-6 space-y-4">
            <div className="flex items-center gap-2.5 text-amber-700 font-bold text-sm border-b border-gray-100 pb-3">
              <IndianRupee className="w-4 h-4" />
              <span>3. Financial Baseline (Monthly)</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Monthly Revenue (₹)
                </label>
                <input
                  type="number"
                  required
                  min="1000"
                  step="1000"
                  value={formData.monthlyRevenue}
                  onChange={(e) => setFormData({ ...formData, monthlyRevenue: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors font-medium"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Monthly Expenses (₹)
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  step="1000"
                  value={formData.monthlyExpenses}
                  onChange={(e) => setFormData({ ...formData, monthlyExpenses: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors font-medium"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Existing Loan (₹)
                </label>
                <input
                  type="number"
                  min="0"
                  step="5000"
                  value={formData.existingLoan}
                  onChange={(e) => setFormData({ ...formData, existingLoan: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors font-medium"
                />
              </div>
            </div>
          </div>

          {/* 4. Funding Information */}
          <div className="bg-white rounded-2xl shadow-xs border border-gray-200 p-6 space-y-4">
            <div className="flex items-center gap-2.5 text-purple-700 font-bold text-sm border-b border-gray-100 pb-3">
              <Target className="w-4 h-4" />
              <span>4. Target Funding Requirement</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Funding Amount Required (₹)
                </label>
                <input
                  type="number"
                  required
                  min="10000"
                  step="10000"
                  value={formData.amountRequired}
                  onChange={(e) => setFormData({ ...formData, amountRequired: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors font-medium"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Funding Purpose
                </label>
                <input
                  type="text"
                  required
                  value={formData.purpose}
                  onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                  placeholder="e.g. Business Expansion, New Machinery"
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 bg-emerald-600 text-white px-10 py-3.5 rounded-xl font-bold text-sm hover:bg-emerald-700 transition-all shadow-md shadow-emerald-200 hover:-translate-y-0.5 disabled:opacity-60 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Updating Dashboard...
                </>
              ) : (
                <>
                  <span>Save & Build My Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
