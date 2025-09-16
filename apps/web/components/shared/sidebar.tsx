"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Boxes,
  Bot,
  Store,
  Settings,
  UserCircle,
  Menu,
  X,
  ChevronLeft,
} from "lucide-react";
import { cn } from "@repo/lib";

// Navigation items configuration
const navItems = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Inventory", href: "/inventory", icon: Boxes },
  { name: "AI Assistant", href: "/ai-assistant", icon: Bot },
  { name: "Marketplace Integrations", href: "/integrations", icon: Store },
  { name: "Settings", href: "/settings", icon: Settings },
];

/**
 * The main sidebar component for navigation.
 * It is collapsible on smaller screens.
 */
export default function Sidebar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen(!isMobileMenuOpen);
  const toggleSidebarCollapse = () => setSidebarCollapsed(!isSidebarCollapsed);

  const sidebarContent = (
    <div className="flex h-full flex-col">
      {/* Logo and App Name */}
      <div className="flex h-16 items-center border-b border-gray-800 px-6">
        <Link href="/" className="text-primary-text flex items-center gap-2">
          <Bot className="h-7 w-7 text-sky-500" />
          {!isSidebarCollapsed && (
            <span className="text-xl font-semibold tracking-tight">
              Resell AI
            </span>
          )}
        </Link>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 space-y-2 px-4 py-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "group text-secondary-text relative flex items-center rounded-md px-3 py-2.5 text-sm font-medium transition-all duration-200 ease-in-out hover:text-sky-400",
                isActive && "text-sky-400",
                isSidebarCollapsed ? "justify-center" : ""
              )}
            >
              {/* Glow effect for active/hover states */}
              <span
                className={cn(
                  "absolute inset-0 rounded-md bg-sky-500/10 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100",
                  isActive && "opacity-100"
                )}
              />
              <item.icon
                className={cn("h-5 w-5", !isSidebarCollapsed && "mr-3")}
              />
              {!isSidebarCollapsed && (
                <span className="relative">{item.name}</span>
              )}

              {/* Tooltip for collapsed sidebar */}
              {isSidebarCollapsed && (
                <span className="text-primary-text absolute left-full ml-4 hidden -translate-y-1/2 rounded-md bg-gray-800 px-2 py-1 text-xs font-medium group-hover:block">
                  {item.name}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer - User Account */}
      <div className="mt-auto border-t border-gray-800 p-4">
        <Link
          href="/settings/account"
          className={cn(
            "group text-secondary-text hover:text-primary-text flex items-center rounded-md p-2 text-sm font-medium hover:bg-gray-700/50",
            isSidebarCollapsed ? "justify-center" : ""
          )}
        >
          <UserCircle className="h-8 w-8 rounded-full" />
          {!isSidebarCollapsed && (
            <div className="relative ml-3">
              <p className="text-primary-text font-semibold">John Doe</p>
              <p className="text-xs">Account</p>
            </div>
          )}
        </Link>
      </div>

      {/* Collapse Toggle Button */}
      <div className="absolute top-1/2 -right-3 hidden -translate-y-1/2 transform lg:block">
        <button
          onClick={toggleSidebarCollapse}
          className="text-secondary-text flex h-6 w-6 items-center justify-center rounded-full bg-gray-800 hover:bg-sky-500 hover:text-white"
        >
          <ChevronLeft
            className={cn(
              "h-4 w-4 transition-transform",
              isSidebarCollapsed && "rotate-180"
            )}
          />
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Header */}
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-gray-800 bg-[#111111] px-4 lg:hidden">
        <Link href="/" className="text-primary-text flex items-center gap-2">
          <Bot className="h-6 w-6 text-sky-500" />
          <span className="text-lg font-semibold">Resell AI</span>
        </Link>
        <button
          onClick={toggleMobileMenu}
          className="text-secondary-text hover:text-primary-text rounded-md p-2 hover:bg-gray-800"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </header>

      {/* Mobile Sidebar (Drawer) */}
      <div
        className={cn(
          "fixed inset-0 z-40 h-full w-full transform bg-black/60 lg:hidden",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full",
          "transition-transform duration-300 ease-in-out"
        )}
        onClick={toggleMobileMenu}
      >
        <aside
          className="fixed top-0 left-0 h-full w-72 max-w-[80vw] border-r border-gray-800 bg-[#1C1C1E]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* We need to render the sidebar content but without the collapse toggle */}
          <div className="flex h-full flex-col">
            <div className="flex h-16 items-center border-b border-gray-800 px-6">
              <Link
                href="/"
                className="text-primary-text flex items-center gap-2"
              >
                <Bot className="h-7 w-7 text-sky-500" />
                <span className="text-xl font-semibold tracking-tight">
                  Resell AI
                </span>
              </Link>
            </div>
            <nav className="flex-1 space-y-2 px-4 py-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={toggleMobileMenu}
                  className={cn(
                    "group text-secondary-text relative flex items-center rounded-md px-3 py-2.5 text-sm font-medium hover:text-sky-400",
                    pathname === item.href && "text-sky-400"
                  )}
                >
                  <span
                    className={cn(
                      "absolute inset-0 rounded-md bg-sky-500/10 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100",
                      pathname === item.href && "opacity-100"
                    )}
                  />
                  <item.icon className="mr-3 h-5 w-5" />
                  <span className="relative">{item.name}</span>
                </Link>
              ))}
            </nav>
            <div className="mt-auto border-t border-gray-800 p-4">
              <Link
                href="/settings/account"
                onClick={toggleMobileMenu}
                className="group text-secondary-text hover:text-primary-text flex items-center rounded-md p-2 text-sm font-medium hover:bg-gray-700/50"
              >
                <UserCircle className="h-8 w-8 rounded-full" />
                <div className="relative ml-3">
                  <p className="text-primary-text font-semibold">John Doe</p>
                  <p className="text-xs">Account</p>
                </div>
              </Link>
            </div>
          </div>
        </aside>
      </div>

      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "relative hidden h-screen border-r border-gray-800 bg-[#1C1C1E] transition-all duration-300 ease-in-out lg:block",
          isSidebarCollapsed ? "w-20" : "w-72"
        )}
      >
        {sidebarContent}
      </aside>
    </>
  );
}
