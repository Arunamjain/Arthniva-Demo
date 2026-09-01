"use client";

import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Bot,
  FileText,
  Heart,
  Landmark,
  Leaf,
  ChevronRight,
  TrendingUp,
  Shield,
  Users,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Top bar */}
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-sm border-b border-gray-100 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">
              ARTHNIVA
            </span>
          </div>
          <Link
            href="/onboarding"
            className="hidden sm:inline-flex items-center gap-2 bg-emerald-600 text-white px-5 py-2.5 rounded-lg font-medium text-sm hover:bg-emerald-700 transition-colors"
          >
            Try Demo
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-8">
            <Shield className="w-4 h-4" />
            Smart India Hackathon 2026 — PS 26091
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight leading-tight mb-6">
            AI-Powered Business &
            <br />
            Financial Guidance for
            <br />
            <span className="text-emerald-600">Rural Entrepreneurs</span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Turn your business numbers into smarter decisions. Understand your
            finances, explore funding, discover schemes, and build a business
            plan.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/onboarding"
              className="inline-flex items-center gap-2 bg-emerald-600 text-white px-8 py-3.5 rounded-xl font-semibold text-base hover:bg-emerald-700 transition-all duration-200 shadow-lg shadow-emerald-200 hover:shadow-xl hover:shadow-emerald-200 hover:-translate-y-0.5"
            >
              Try Demo
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 text-gray-600 px-6 py-3.5 rounded-xl font-medium text-base hover:text-emerald-700 hover:bg-emerald-50 transition-colors"
            >
              See How It Works
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Heart,
                title: "Understand Your Finances",
                desc: "Simple financial health assessment with clear explanations",
                color: "bg-rose-50 text-rose-600",
              },
              {
                icon: TrendingUp,
                title: "Explore Funding",
                desc: "See how much you can grow and what funding options may exist",
                color: "bg-blue-50 text-blue-600",
              },
              {
                icon: Landmark,
                title: "Discover Schemes",
                desc: "Find potentially relevant government schemes for your business",
                color: "bg-amber-50 text-amber-600",
              },
              {
                icon: FileText,
                title: "Build a Plan",
                desc: "Generate a structured business plan personalized to your needs",
                color: "bg-emerald-50 text-emerald-600",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-emerald-100 transition-all duration-300"
              >
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${item.color}`}
                >
                  <item.icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-white scroll-mt-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              How Arthniva Works
            </h2>
            <p className="text-gray-500 text-lg">
              From business data to actionable growth planning in five steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-start">
            {[
              {
                icon: BarChart3,
                label: "Business Data",
                desc: "Enter your basic business and financial information",
                step: 1,
              },
              {
                icon: Heart,
                label: "Financial Health",
                desc: "Get a clear picture of your financial position",
                step: 2,
              },
              {
                icon: Bot,
                label: "AI Guidance",
                desc: "Ask questions and get personalized business advice",
                step: 3,
              },
              {
                icon: Landmark,
                label: "Schemes",
                desc: "Discover potentially relevant funding and schemes",
                step: 4,
              },
              {
                icon: FileText,
                label: "Business Plan",
                desc: "Generate a structured expansion plan",
                step: 5,
              },
            ].map((item, i) => (
              <div key={item.label} className="flex flex-col items-center text-center group">
                <div className="relative">
                  <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-emerald-100 transition-colors">
                    <item.icon className="w-7 h-7 text-emerald-600" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {item.step}
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-gray-900 mb-1">
                  {item.label}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed max-w-[140px]">
                  {item.desc}
                </p>
                {i < 4 && (
                  <ArrowRight className="w-4 h-4 text-gray-300 mt-3 hidden md:block rotate-0" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Target Users */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 text-emerald-700 mb-4">
            <Users className="w-5 h-5" />
            <span className="text-sm font-semibold">WHO IS IT FOR</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Built for Rural Micro-Entrepreneurs
          </h2>
          <p className="text-gray-500 text-lg mb-12 max-w-2xl mx-auto">
            Dairy farmers, artisans, food processors, small traders, and village-level entrepreneurs who want to understand their business better and plan for growth
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                emoji: "🐄",
                title: "Dairy & Livestock",
                desc: "Milk production, cattle farming, poultry",
              },
              {
                emoji: "🌾",
                title: "Agri-Business",
                desc: "Food processing, organic farming, farm produce",
              },
              {
                emoji: "🧶",
                title: "Artisan & Crafts",
                desc: "Handloom, pottery, handicrafts, local products",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
              >
                <div className="text-3xl mb-3">{item.emoji}</div>
                <h3 className="text-base font-semibold text-gray-900 mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-emerald-600">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to See Arthniva in Action?
          </h2>
          <p className="text-emerald-100 text-lg mb-8">
            Explore the demo with a sample dairy entrepreneur&apos;s business data
          </p>
          <Link
            href="/onboarding"
            className="inline-flex items-center gap-2 bg-white text-emerald-700 px-8 py-3.5 rounded-xl font-semibold text-base hover:bg-emerald-50 transition-colors shadow-lg"
          >
            Try Demo
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-900 text-gray-400">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-emerald-600 rounded-md flex items-center justify-center">
              <Leaf className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-sm font-semibold text-gray-300">
              ARTHNIVA
            </span>
          </div>
          <p className="text-xs text-center sm:text-right">
            Smart India Hackathon 2026 — PS 26091 — AI-Driven Business Advisory
            for Rural Micro-Entrepreneurs
          </p>
        </div>
      </footer>
    </div>
  );
}
