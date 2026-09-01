"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Heart,
  Bot,
  Landmark,
  FileText,
  Menu,
  X,
  Leaf,
  LogOut,
  Edit3,
  ChevronDown,
  Users2,
  Check,
  RotateCcw,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useEntrepreneur } from "@/lib/context/EntrepreneurContext";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/financial-health", label: "Financial Health", icon: Heart },
  { href: "/advisor", label: "AI Advisor", icon: Bot },
  { href: "/schemes", label: "Scheme Finder", icon: Landmark },
  { href: "/business-plan", label: "Business Plan", icon: FileText },
];

export default function AppNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { entrepreneur, switchEntrepreneur, resetToDefault, allPresets } = useEntrepreneur();

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setProfileDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setProfileDropdownOpen(false);
    setMobileOpen(false);
    router.push("/");
  };

  const handleSwitch = (id: string) => {
    switchEntrepreneur(id);
    setProfileDropdownOpen(false);
    setMobileOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 bg-emerald-600 rounded-xl flex items-center justify-center group-hover:bg-emerald-700 transition-colors shadow-xs">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold text-gray-900 tracking-tight block leading-tight">
                ARTHNIVA
              </span>
              <span className="text-[10px] uppercase font-semibold tracking-wider text-emerald-700 block">
                AI Rural Advisory
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-emerald-50 text-emerald-800 shadow-xs"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  <item.icon className={`w-4 h-4 ${isActive ? "text-emerald-700" : "text-gray-500"}`} />
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Active Entrepreneur & Multi-User Switcher */}
          <div className="hidden lg:flex items-center gap-3 pl-4 border-l border-gray-200" ref={dropdownRef}>
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2.5 p-1.5 pr-2.5 rounded-xl hover:bg-gray-100 transition-colors text-left group cursor-pointer border border-transparent hover:border-gray-200"
                aria-expanded={profileDropdownOpen}
              >
                <div className="w-9 h-9 bg-emerald-100 rounded-full flex items-center justify-center border border-emerald-200 text-emerald-800 font-bold text-xs">
                  {entrepreneur.personal.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-gray-900 leading-tight flex items-center gap-1.5">
                    {entrepreneur.personal.name}
                    <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${profileDropdownOpen ? 'rotate-180' : ''}`} />
                  </p>
                  <p className="text-xs text-gray-500 leading-tight">
                    {entrepreneur.business.name}
                  </p>
                </div>
              </button>

              {/* Profile & User Switcher Dropdown */}
              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-gray-200 py-2 z-50 animate-scale-in">
                  {/* Current Active Persona */}
                  <div className="px-4 py-3 border-b border-gray-100 bg-emerald-50/50 rounded-t-xl">
                    <p className="text-[10px] text-emerald-800 uppercase font-bold tracking-wider">Active Entrepreneur</p>
                    <p className="text-sm font-bold text-gray-900 mt-0.5">{entrepreneur.personal.name}</p>
                    <p className="text-xs text-gray-600">{entrepreneur.business.name} • {entrepreneur.business.category}</p>
                    <p className="text-xs text-emerald-700 font-medium mt-1">📍 {entrepreneur.personal.location}, {entrepreneur.personal.state}</p>
                  </div>

                  {/* Switch Demo Profiles */}
                  <div className="py-2 px-3">
                    <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider px-2 mb-1.5 flex items-center gap-1.5">
                      <Users2 className="w-3.5 h-3.5" />
                      Switch Demo Persona
                    </p>
                    <div className="space-y-1">
                      {allPresets.map((preset) => {
                        const isSelected = preset.id === entrepreneur.id;
                        return (
                          <button
                            key={preset.id}
                            onClick={() => handleSwitch(preset.id)}
                            className={`w-full flex items-center justify-between p-2 rounded-xl text-left text-xs transition-colors cursor-pointer ${
                              isSelected
                                ? "bg-emerald-100/70 text-emerald-900 font-semibold"
                                : "hover:bg-gray-100 text-gray-700"
                            }`}
                          >
                            <div>
                              <p className="font-medium text-gray-900">{preset.personal.name}</p>
                              <p className="text-[11px] text-gray-500">{preset.business.name} ({preset.business.category})</p>
                            </div>
                            {isSelected && <Check className="w-4 h-4 text-emerald-700 shrink-0" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="border-t border-gray-100 pt-1.5 px-2">
                    <Link
                      href="/onboarding"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-gray-700 hover:bg-emerald-50 hover:text-emerald-800 rounded-xl transition-colors"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Edit Business & Financial Numbers</span>
                    </Link>

                    <button
                      onClick={() => {
                        resetToDefault();
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-gray-600 hover:bg-gray-100 rounded-xl transition-colors text-left"
                    >
                      <RotateCcw className="w-3.5 h-3.5 text-gray-500" />
                      <span>Reset to Ramesh Kumar (Default)</span>
                    </button>
                  </div>

                  <div className="border-t border-gray-100 pt-1 px-2">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 rounded-xl transition-colors text-left"
                    >
                      <LogOut className="w-3.5 h-3.5 text-red-500" />
                      <span>Exit Demo / Landing Page</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Exit */}
            <button
              onClick={handleLogout}
              title="Exit Demo"
              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 rounded-xl text-gray-600 hover:bg-gray-100"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 animate-fade-in">
          <div className="px-4 py-3 space-y-1">
            {/* Active profile card */}
            <div className="p-3 mb-2 bg-emerald-50/60 rounded-xl border border-emerald-100">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-xs font-bold text-gray-900">{entrepreneur.personal.name}</p>
                  <p className="text-xs text-gray-500">{entrepreneur.business.name} • {entrepreneur.personal.location}</p>
                </div>
                <Link
                  href="/onboarding"
                  onClick={() => setMobileOpen(false)}
                  className="px-2.5 py-1 text-emerald-800 bg-emerald-100 hover:bg-emerald-200 rounded-lg text-xs font-semibold flex items-center gap-1"
                >
                  <Edit3 className="w-3 h-3" />
                  Edit
                </Link>
              </div>

              {/* Mobile Persona Switcher */}
              <div className="pt-2 border-t border-emerald-100">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Switch Demo Profile:</p>
                <div className="grid grid-cols-3 gap-1">
                  {allPresets.map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() => handleSwitch(preset.id)}
                      className={`text-[11px] py-1 px-1.5 rounded-lg text-center truncate ${
                        preset.id === entrepreneur.id
                          ? "bg-emerald-600 text-white font-medium"
                          : "bg-white text-gray-700 border border-gray-200"
                      }`}
                    >
                      {preset.personal.name.split(" ")[0]}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-emerald-50 text-emerald-800 font-semibold"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}

            {/* Mobile Logout */}
            <div className="border-t border-gray-100 pt-2 mt-2">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Exit Demo
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
