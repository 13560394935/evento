"use client";
import Link from "next/link";
import React from "react";
import Logo from "./Logo";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
const routes = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "All Events",
    path: "/events/all",
  },
];

export default function Header() {
  const activePathName = usePathname();

  return (
    <header className="flex justify-between items-center border-b border-white/10 h-14 px-3 sm:px-9">
      <Link href="/">
        <Logo />
      </Link>
      <nav className="h-full">
        <ul className="flex h-full items-center gap-x-6 text-sm">
          {routes.map((route) => {
            return (
              <li
                key={route.path}
                className={cn(
                  "relative h-full flex items-center hover:text-white transition",
                  {
                    "text-white": activePathName === route.path,
                    "text-white/50": activePathName !== route.path,
                  }
                )}
              >
                <Link href={route.path}>{route.name}</Link>
                {activePathName === route.path && (
                  <motion.div
                    layoutId="header-active-link"
                    className="text-accent h-1 w-full absolute bottom-0"
                  ></motion.div>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
