"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { FacebookIcon, InstagramIcon } from "@/components/ui/social-icons";
import { cn } from "@/lib/utils";

const SOLID_HEADER_PATHS = ["/contact/", "/privacy-policy/"];

/**
 * Fixed header: transparent with the white logo over the hero, switching to a white bar
 * with the colour logo and a soft shadow once the page scrolls.
 */
function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Pages without a dark photo banner start with the solid header.
  const lightTop = SOLID_HEADER_PATHS.includes(usePathname());
  const solid = scrolled || open || lightTop;

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,color] duration-500",
        solid
          ? "bg-white text-ink shadow-[0_3px_45px_rgba(0,0,0,0.15)]"
          : "bg-transparent text-white",
      )}
    >
      <div
        className={cn(
          "flex items-center justify-between px-6 transition-[height] duration-500 lg:px-9",
          scrolled ? "h-[72px] lg:h-[90px]" : "h-[80px] lg:h-[128px]",
        )}
      >
        <Link prefetch={false} href="/" aria-label={siteConfig.name} className="relative block h-[60px] w-[120px] lg:h-[75px] lg:w-[150px]">
          <Image
            src="/images/Web-Logo-White.png"
            alt=""
            fill
            priority
            sizes="150px"
            className={cn("object-contain transition-opacity duration-500", solid ? "opacity-0" : "opacity-100")}
          />
          <Image
            src="/images/Web-Logo.png"
            alt={siteConfig.name}
            fill
            priority
            sizes="150px"
            className={cn("object-contain transition-opacity duration-500", solid ? "opacity-100" : "opacity-0")}
          />
        </Link>

        <nav className="hidden items-center gap-7 text-[15px] font-medium xl:flex xl:text-base" aria-label="Primary">
          {siteConfig.nav.map((item) =>
            item.children ? (
              <div key={item.label} className="group relative">
                <button
                  type="button"
                  className="flex items-center gap-1.5 py-3 opacity-90 transition-opacity hover:opacity-100"
                  aria-haspopup="true"
                >
                  {item.label}
                  <ChevronDown size={14} strokeWidth={1.75} />
                </button>
                <div className="invisible absolute left-1/2 top-full min-w-[230px] -translate-x-1/2 translate-y-2 rounded-[6px] bg-white py-3 text-ink opacity-0 shadow-[0_15px_45px_rgba(0,0,0,0.15)] transition-all duration-300 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  {item.children.map((child) => (
                    <Link prefetch={false}
                      key={child.href + child.label}
                      href={child.href}
                      className="block px-6 py-2 leading-[22px] transition-colors hover:text-brand-teal"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <NavLink key={item.href} href={item.href}>
                {item.label}
              </NavLink>
            ),
          )}
          <div className="ml-6 flex items-center gap-4">
            <a href={siteConfig.social.facebook} aria-label="Facebook" target="_blank" rel="noopener noreferrer" className="opacity-90 hover:opacity-100">
              <FacebookIcon className="h-[14px] w-[14px]" />
            </a>
            <a href={siteConfig.social.instagram} aria-label="Instagram" target="_blank" rel="noopener noreferrer" className="opacity-90 hover:opacity-100">
              <InstagramIcon className="h-[14px] w-[14px]" />
            </a>
          </div>
          {siteConfig.secondaryNav.map((item) => (
            <NavLink key={item.href} href={item.href}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center xl:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            aria-label="Mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="overflow-hidden bg-white text-ink xl:hidden"
          >
            <div className="flex flex-col px-6 pb-8 pt-2 text-lg font-medium">
              {siteConfig.nav.flatMap((item) => item.children ?? [item]).map((item) => (
                <Link prefetch={false} key={item.href + item.label} href={item.href} onClick={() => setOpen(false)} className="py-2.5">
                  {item.label}
                </Link>
              ))}
              {siteConfig.secondaryNav.map((item) => (
                <Link prefetch={false} key={item.href} href={item.href} onClick={() => setOpen(false)} className="py-2.5">
                  {item.label}
                </Link>
              ))}
              <div className="mt-4 flex gap-5">
                <a href={siteConfig.social.facebook} aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                  <FacebookIcon className="h-5 w-5" />
                </a>
                <a href={siteConfig.social.instagram} aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                  <InstagramIcon className="h-5 w-5" />
                </a>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

/** Nav link with the underline that grows in from the left on hover. */
function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const active = usePathname() === href;
  return (
    <Link
      prefetch={false}
      href={href}
      aria-current={active ? "page" : undefined}
      className="group relative py-3 opacity-90 transition-opacity hover:opacity-100"
    >
      {children}
      <span
        className={cn(
          "absolute bottom-2 left-0 h-px w-full origin-left bg-current transition-transform duration-300 ease-out group-hover:scale-x-100",
          active ? "scale-x-100" : "scale-x-0",
        )}
      />
    </Link>
  );
}

export { SiteHeader };
