"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, Brain, User, LogOut,Flame} from "lucide-react";
import { useRouter } from "next/navigation";
import { getCurrentUser, signOut } from "../../utils/auth.js";
import { apiService } from "@/utils/APIService.js";
import { trackStreak } from "@/utils/streak.js";


const PrepPalNavbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [currentStreak, setCurrentStreak] = useState(0);
    const [bestStreak, setBestStreak] = useState(0);

    const router = useRouter();

    const accessToken =
        typeof window !== "undefined"
        ? localStorage.getItem("accessToken")
        : null;

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleSignOut = async () => {
        try {
            await signOut();
            router.push("/login");
        } catch (error) {
            console.error("Error signing out:", error);
            // Fallback to manual token removal
            localStorage.removeItem("accessToken");
            router.push("/login");
        }
    };

    // Fetch user info from backend
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await getCurrentUser();
                setUser(userData);
            } catch (error) {
                console.error("Failed to fetch user:", error);
            }
        };

        fetchUser();
    }, []);

useEffect(() => {
  const syncStreakWithBackend = async () => {
    if (!accessToken) return;

    try {
      // Step 1: Run local tracking logic
      const { current, best, updated } = trackStreak();

      // Step 2: Update UI immediately
      setCurrentStreak(current);
      setBestStreak(best);

      // Step 3: If updated locally, sync to backend
      if (updated) {
        await apiService.updateUserStreak(
          { current_streak: current, best_streak: best },
          accessToken
        );
        console.log("✅ Streak synced with backend.");
      } else {
        console.log("📅 No streak update needed today.");
      }
    } catch (error) {
      console.error("❌ Streak sync failed:", error);
    }
  };

  syncStreakWithBackend();
}, []);

    
    const navItems = [
        { name: "Home", href: "/" },
        { name: "Features", href: "/feature" },
        { name: "About", href: "/about" },
        { name: "Pricing", href: "/pricingpage" },
    ];
    
    return (
        <nav className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center animate-pulse">
                            <Brain className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold text-gray-900">
                            PrepPal Dashboard
                        </span>
                    </div>

                    <div className="hidden md:flex items-center space-x-8">
                        {navItems.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className={`text-sm font-medium transition-colors duration-200 text-gray-700 hover:text-blue-600`}
                            >
                                {item.name}
                            </a>
                        ))}
                    </div>

                    <div className="hidden md:flex items-center space-x-4">
                            <div className="flex items-center space-x-2 bg-orange-100 px-3 py-1 rounded-full">
                                <Flame className="w-4 h-4 text-orange-500" />
                                <span className="text-orange-700 font-medium">
                                    {currentStreak} day streak
                                </span>
                            </div>
                        {user ? (
                            <button
                                onClick={handleSignOut}
                                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors px-4 py-2 rounded-lg hover:bg-gray-50"
                            >
                                <LogOut className="w-4 h-4" />
                                <span className="text-sm">Sign Out</span>
                            </button>
                        ) : (
                            <button className="bg-blue-600 text-white text-sm font-medium px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                                Dashboard
                            </button>
                        )}
                    </div>

                    <div className="md:hidden">
                        <button
                            onClick={toggleMobileMenu}
                            className="text-gray-700 hover:text-blue-600 transition-colors duration-200 p-2"
                            aria-label="Toggle mobile menu"
                        >
                            {isMobileMenuOpen ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <Menu className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>

                {isMobileMenuOpen && (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
                            {navItems.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {item.name}
                                </a>
                            ))}

                            <div className="pt-4 pb-2 space-y-2">
                                <div className="flex items-center space-x-2 bg-orange-100 px-3 py-1 rounded-full">
                                <Flame className="w-4 h-4 text-orange-500" />
                                <span className="text-orange-700 font-medium">
                                    {4} day streak
                                </span>
                            </div>
                               

                                {user ? (
                                    <button
                                        onClick={() => {
                                            handleSignOut();
                                            setIsMobileMenuOpen(false);
                                        }}
                                        className="w-full flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors duration-200"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        <span>Sign Out</span>
                                    </button>
                                ) : (
                                    <button
                                        className="w-full bg-blue-600 text-white text-base font-medium px-3 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
                                        onClick={() =>
                                            setIsMobileMenuOpen(false)
                                        }
                                    >
                                        Dashboard
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default PrepPalNavbar;
