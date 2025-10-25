/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn, shadowDepthPrimary } from "@/app/utils";
import { IoIosCloseCircleOutline } from "react-icons/io";

const navItems = [
  { label: "Portfolio", href: "https://somani09.github.io/portfolio/" },
  { label: "Projects", href: "https://vaibhav-somani.vercel.app/projects" },
];

const sidebarContainerClasses = cn(
  "flex h-max w-96 flex-col justify-center overflow-hidden rounded-r-4xl p-6",
  "bg-glass/20",
  "border-primary/10 border-2",
  "backdrop-blur-[6px]",
  shadowDepthPrimary,
);

const navLinkBaseClasses =
  "flex h-16 items-center rounded-2xl border px-8 py-2 text-lg transition";

const activeNavLinkClasses = cn(
  "bg-accent-2 border-secondary text-primary font-bold backdrop-blur-[6px] hover:border-accent-2 ",
  shadowDepthPrimary,
);

const inactiveNavLinkClasses =
  "bg-glass text-secondary border-primary hover:text-primary  hover:font-bold";

const Sidebar: React.FC = () => {
  const pathname = usePathname();

  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setSidebarOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setSidebarOpen]);

  return (
    <div className="relative flex h-max">
      <button
        onClick={() => setSidebarOpen(true)}
        className={cn(
          "z-50 flex h-16 w-16 items-center justify-center rounded-full",
          "bg-glass/20 border-primary/10 border-2 backdrop-blur-[6px]",
          shadowDepthPrimary,
          "translate-z-0 transition-opacity duration-300 ease-in-out will-change-[opacity]",
          "fixed bottom-2 left-2 sm:top-[161px] sm:bottom-auto sm:left-[34px]",
          sidebarOpen ? "pointer-events-none opacity-0" : "opacity-100",
        )}
      >
        <div className="space-y-1">
          <span className="bg-primary block h-0.5 w-6"></span>
          <span className="bg-primary block h-0.5 w-6"></span>
          <span className="bg-primary block h-0.5 w-6"></span>
        </div>
      </button>

      <aside
        ref={sidebarRef}
        className={cn(
          "fixed left-0 z-50 origin-[30px_calc(100%-30px)] transition-transform duration-300 ease-in-out sm:origin-[64px_64px]",
          "bottom-2 sm:top-32 sm:bottom-auto",
          sidebarOpen
            ? "pointer-events-auto visible scale-100"
            : "pointer-events-none scale-0",
          sidebarContainerClasses,
        )}
      >
        <IoIosCloseCircleOutline
          onClick={() => setSidebarOpen(false)}
          className="text-primary absolute top-14 right-4 h-6 w-6 cursor-pointer"
        />

        <div>
          <div className="flex items-center space-x-4">
            <div className="bg-secondary border-primary relative h-20 w-20 shrink-0 overflow-hidden rounded-full border-2">
              <img
                src="/avatar.jpeg"
                alt="Avatar"
                className="h-full w-full object-cover"
              />
            </div>{" "}
            <div>
              <p className="text-primary text-2xl font-bold">Vaibhav Somani</p>
              <p className="text-secondary text-lg font-semibold">
                Software Developer
              </p>
            </div>
          </div>

          <p className="text-text mt-4 text-base leading-relaxed">
            Full-Stack Software Engineer | 3+ years of experience | Master’s in
            CS, ASU | Expert in React.js, Next.js, TanStack, Tailwind, Figma |
            Bringing designs to life.
          </p>

          <hr className="border-accent-1 my-6 border-1" />

          <nav className="space-y-3">
            {navItems.map(({ label, href }) => {
              const isActive = pathname === href;

              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    navLinkBaseClasses,
                    isActive ? activeNavLinkClasses : inactiveNavLinkClasses,
                  )}
                >
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
