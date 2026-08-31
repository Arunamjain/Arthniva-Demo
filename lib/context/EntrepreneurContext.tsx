"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  type Entrepreneur,
  demoEntrepreneurs,
  demoEntrepreneur,
} from "@/lib/data/demoEntrepreneur";

interface EntrepreneurContextType {
  entrepreneur: Entrepreneur;
  updateEntrepreneur: (updated: Partial<Entrepreneur>) => void;
  updateFinancials: (financial: Partial<Entrepreneur["financial"]>) => void;
  updateFunding: (funding: Partial<Entrepreneur["funding"]>) => void;
  updateBusiness: (business: Partial<Entrepreneur["business"]>) => void;
  updatePersonal: (personal: Partial<Entrepreneur["personal"]>) => void;
  switchEntrepreneur: (id: string) => void;
  resetToDefault: () => void;
  allPresets: Entrepreneur[];
  isLoaded: boolean;
}

const STORAGE_KEY = "arthniva_active_entrepreneur";

const EntrepreneurContext = createContext<EntrepreneurContextType | undefined>(undefined);

export function EntrepreneurProvider({ children }: { children: React.ReactNode }) {
  const [entrepreneur, setEntrepreneurState] = useState<Entrepreneur>(demoEntrepreneur);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on client mount using hydration check
  useEffect(() => {
    try {
      const saved = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.personal && parsed.financial) {
          // Wrap in microtask to prevent sync cascading render warning
          queueMicrotask(() => {
            setEntrepreneurState(parsed);
          });
        }
      }
    } catch (e) {
      console.warn("Failed to load active entrepreneur from storage", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const saveToStorage = (updated: Entrepreneur) => {
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      }
    } catch (e) {
      console.warn("Failed to save entrepreneur to storage", e);
    }
  };

  const updateEntrepreneur = (updated: Partial<Entrepreneur>) => {
    setEntrepreneurState((prev) => {
      const next: Entrepreneur = {
        ...prev,
        ...updated,
        personal: { ...prev.personal, ...(updated.personal || {}) },
        business: { ...prev.business, ...(updated.business || {}) },
        financial: { ...prev.financial, ...(updated.financial || {}) },
        funding: { ...prev.funding, ...(updated.funding || {}) },
      };
      saveToStorage(next);
      return next;
    });
  };

  const updateFinancials = (financial: Partial<Entrepreneur["financial"]>) => {
    setEntrepreneurState((prev) => {
      const next: Entrepreneur = {
        ...prev,
        financial: { ...prev.financial, ...financial },
      };
      saveToStorage(next);
      return next;
    });
  };

  const updateFunding = (funding: Partial<Entrepreneur["funding"]>) => {
    setEntrepreneurState((prev) => {
      const next: Entrepreneur = {
        ...prev,
        funding: { ...prev.funding, ...funding },
      };
      saveToStorage(next);
      return next;
    });
  };

  const updateBusiness = (business: Partial<Entrepreneur["business"]>) => {
    setEntrepreneurState((prev) => {
      const next: Entrepreneur = {
        ...prev,
        business: { ...prev.business, ...business },
      };
      saveToStorage(next);
      return next;
    });
  };

  const updatePersonal = (personal: Partial<Entrepreneur["personal"]>) => {
    setEntrepreneurState((prev) => {
      const next: Entrepreneur = {
        ...prev,
        personal: { ...prev.personal, ...personal },
      };
      saveToStorage(next);
      return next;
    });
  };

  const switchEntrepreneur = (id: string) => {
    const found = demoEntrepreneurs.find((e) => e.id === id);
    if (found) {
      setEntrepreneurState(found);
      saveToStorage(found);
    }
  };

  const resetToDefault = () => {
    setEntrepreneurState(demoEntrepreneur);
    saveToStorage(demoEntrepreneur);
  };

  return (
    <EntrepreneurContext.Provider
      value={{
        entrepreneur,
        updateEntrepreneur,
        updateFinancials,
        updateFunding,
        updateBusiness,
        updatePersonal,
        switchEntrepreneur,
        resetToDefault,
        allPresets: demoEntrepreneurs,
        isLoaded,
      }}
    >
      {children}
    </EntrepreneurContext.Provider>
  );
}

export function useEntrepreneur() {
  const context = useContext(EntrepreneurContext);
  if (!context) {
    throw new Error("useEntrepreneur must be used within an EntrepreneurProvider");
  }
  return context;
}
