"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ShoppingCart, Heart, Search, Sun, Moon, Menu, X, BookOpen } from "lucide-react"
import { useCart } from "@/context/CartContext"
import { useWishlist } from "@/context/WishlistContext"
import { useTheme } from "@/context/ThemeContext"
import { motion, AnimatePresence } from "framer-motion"

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [scrolled, setScrolled] = useState(false)
  const { totalItems } = useCart()
  const { wishlist } = useWishlist()
  const { dark, toggleTheme } = useTheme()
  const pathname = usePathname()

  useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 30); window.addEventListener("scroll", onScroll, { passive: true }); return () => window.removeEventListener("scroll", onScroll) }, [])

  const links = [
    { href: "/", label: "Home" }, { href: "/shop", label: "Shop" }, { href: "/sell", label: "Sell" },
    { href: "/guidance", label: "Guidance" }, { href: "/about", label: "About" }, { href: "/contact", label: "Contact" },
  ]
  const handleSearch = (e: React.FormEvent) => { e.preventDefault(); if (searchQuery.trim()) window.location.href = `/shop?search=${encodeURIComponent(searchQuery.trim())}`; setSearchOpen(false) }
  const isHome = pathname === "/"
  const transparent = isHome && !scrolled

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 sm:px-6 text-left pt-4">
      <motion.nav
        animate={{
          width: scrolled ? "auto" : "100%",
          maxWidth: scrolled ? "720px" : "1280px",
          borderRadius: scrolled ? "9999px" : "16px",
        }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={`w-full transition-all duration-500 ${
          transparent
            ? "bg-transparent border-transparent shadow-none"
            : "bg-white/70 dark:bg-[#18181b]/70 backdrop-blur-2xl saturate-[1.8] border border-white/20 dark:border-white/[0.06] shadow-2xl shadow-black/5 dark:shadow-black/30"
        }`}
        style={!transparent ? { boxShadow: "0 8px 32px rgba(0,0,0,0.06), 0 0 0 1px rgba(255,255,255,0.05) inset" } : undefined}>
        <div className="flex items-center justify-between px-4 sm:px-6" style={{ height: scrolled ? "48px" : "60px" }}>
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <motion.div whileHover={{ rotate: [0, -10, 10, -5, 0], scale: 1.1 }}
              className="w-8 h-8 rounded-xl gradient-bg flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-shadow duration-300">
              <BookOpen className="w-4 h-4" />
            </motion.div>
            <span className={`font-extrabold tracking-tight transition-all duration-300 ${scrolled ? "text-sm" : "text-base sm:text-lg"} ${transparent ? "text-white" : "text-gray-800 dark:text-white"}`}>
              Swapo<span className="text-primary">Scholar</span>
            </span>
          </Link>
          <div className={`hidden lg:flex items-center gap-0.5 transition-all duration-300 ${scrolled ? "scale-90" : "scale-100"}`}>
            {links.map(link => (
              <Link key={link.href} href={link.href}
                className={`relative px-3 py-1.5 rounded-xl text-xs font-medium tracking-wide transition-all duration-200 whitespace-nowrap ${
                  pathname === link.href
                    ? "bg-gradient-to-r from-primary/20 to-secondary/20 text-gray-900 dark:text-white shadow-sm"
                    : transparent
                      ? "text-white/70 hover:text-white hover:bg-white/[0.08]"
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-900/5 dark:hover:bg-white/5"
                }`}>
                {pathname === link.href && (
                  <motion.span layoutId="nav-indicator" className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/20 to-secondary/20 -z-10" transition={{ type: "spring", stiffness: 400, damping: 30 }} />
                )}
                <span className="relative z-10">{link.label}</span>
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-0.5">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.92 }}
              onClick={toggleTheme}
              className={`p-2 rounded-xl transition-all duration-200 relative ${
                transparent
                  ? "text-white/70 hover:text-white hover:bg-white/[0.08]"
                  : "text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-900/5 dark:hover:bg-white/5"
              }`}>
              <motion.span key={dark ? "sun" : "moon"} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} transition={{ duration: 0.3 }}>
                {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </motion.span>
            </motion.button>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.92 }}
              onClick={() => setSearchOpen(!searchOpen)}
              className={`p-2 rounded-xl transition-all duration-200 ${
                transparent
                  ? "text-white/70 hover:text-white hover:bg-white/[0.08]"
                  : "text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-900/5 dark:hover:bg-white/5"
              }`}>
              <Search className="w-4 h-4" />
            </motion.button>
            <Link href="/wishlist" className={`p-2 rounded-xl transition-all duration-200 relative ${
              transparent
                ? "text-white/70 hover:text-white hover:bg-white/[0.08]"
                : "text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-900/5 dark:hover:bg-white/5"
            }`}>
              <Heart className="w-4 h-4" />
              {wishlist.length > 0 && (
                <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 500, damping: 20 }}
                  className="absolute -top-0.5 -right-0.5 bg-secondary text-white text-[9px] w-[18px] h-[18px] rounded-full flex items-center justify-center font-bold shadow-lg shadow-secondary/40">
                  {wishlist.length > 9 ? "9+" : wishlist.length}
                </motion.span>
              )}
            </Link>
            <Link href="/cart" className={`p-2 rounded-xl transition-all duration-200 relative ${
              transparent
                ? "text-white/70 hover:text-white hover:bg-white/[0.08]"
                : "text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-900/5 dark:hover:bg-white/5"
            }`}>
              <ShoppingCart className="w-4 h-4" />
              {totalItems > 0 && (
                <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 500, damping: 20 }}
                  className="absolute -top-0.5 -right-0.5 bg-primary text-white text-[9px] w-[18px] h-[18px] rounded-full flex items-center justify-center font-bold shadow-lg shadow-primary/40">
                  {totalItems > 9 ? "9+" : totalItems}
                </motion.span>
              )}
            </Link>
            <motion.button whileTap={{ scale: 0.92 }}
              onClick={() => setMenuOpen(!menuOpen)}
              className={`lg:hidden p-2 rounded-xl transition-all duration-200 ${
                transparent
                  ? "text-white/70 hover:text-white hover:bg-white/[0.08]"
                  : "text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-900/5 dark:hover:bg-white/5"
              }`}>
              {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </motion.button>
          </div>
        </div>
        <AnimatePresence>
          {searchOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
              className="border-t border-white/10 dark:border-white/[0.04] overflow-hidden">
              <div className="max-w-xl mx-auto px-6 py-3">
                <form onSubmit={handleSearch} className="flex gap-2">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 dark:text-gray-500" />
                    <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                      placeholder="Search books by title, author, subject..."
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl outline-none transition-all text-xs bg-gray-100/80 dark:bg-white/5 border border-gray-200/60 dark:border-white/[0.06] text-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-primary/40 focus:ring-2 focus:ring-primary/10 backdrop-blur-xl"
                      autoFocus />
                  </div>
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                    type="submit"
                    className="px-5 py-2.5 gradient-bg text-white rounded-xl text-xs font-semibold shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all shrink-0">
                    Search
                  </motion.button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
              className="lg:hidden border-t border-white/10 dark:border-white/[0.04] overflow-hidden">
              <div className="px-6 py-4 space-y-1">
                {links.map(link => (
                  <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)}
                    className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      pathname === link.href
                        ? "bg-gradient-to-r from-primary/15 to-secondary/15 text-gray-900 dark:text-white"
                        : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-900/5 dark:hover:bg-white/5"
                    }`}>{link.label}</Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </header>
  )
}
