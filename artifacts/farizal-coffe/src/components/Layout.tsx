import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { ShoppingBag, Menu, X, Coffee, Instagram, Twitter, Facebook, MapPin, Phone, Mail } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";

export function Layout({ children }: { children: React.ReactNode }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const { totalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    setMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Menu", href: "/menu" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background text-foreground font-sans">
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-background/95 backdrop-blur-md shadow-md py-3" : "bg-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <Coffee className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
            <span className="font-serif text-xl font-bold tracking-wider uppercase text-foreground">
              Farizal<span className="text-primary">Coffe</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium tracking-wide transition-colors hover:text-primary ${
                  location === link.href ? "text-primary" : "text-foreground/80"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link href="/order" className="relative group">
              <Button variant="outline" size="icon" className="rounded-full border-primary/20 hover:border-primary hover:bg-primary/10">
                <ShoppingBag className="w-5 h-5 text-foreground" />
              </Button>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shadow-sm animate-in zoom-in">
                  {totalItems}
                </span>
              )}
            </Link>
          </nav>

          {/* Mobile Toggle */}
          <div className="flex items-center gap-4 md:hidden">
            <Link href="/order" className="relative">
              <Button variant="ghost" size="icon" className="rounded-full">
                <ShoppingBag className="w-5 h-5" />
              </Button>
              {totalItems > 0 && (
                <span className="absolute 1 top-0 right-0 bg-primary text-primary-foreground w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold">
                  {totalItems}
                </span>
              )}
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-foreground"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-background border-b border-border/50 shadow-lg p-4 flex flex-col gap-4 md:hidden animate-in slide-in-from-top-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-lg font-medium p-2 rounded-md ${
                  location === link.href ? "bg-primary/10 text-primary" : "text-foreground hover:bg-card"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        )}
      </header>

      <main className="flex-1 flex flex-col">
        {children}
      </main>

      <footer className="bg-card border-t border-border/50 py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div className="md:col-span-1">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <Coffee className="w-6 h-6 text-primary" />
                <span className="font-serif text-lg font-bold tracking-wider uppercase">
                  Farizal<span className="text-primary">Coffe</span>
                </span>
              </Link>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                Premium Indonesian coffee brand crafting moments of warmth and coziness since 2020.
              </p>
              <div className="flex items-center gap-4">
                <a href="#" className="w-8 h-8 rounded-full bg-background flex items-center justify-center text-muted-foreground hover:text-primary transition-colors">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-background flex items-center justify-center text-muted-foreground hover:text-primary transition-colors">
                  <Twitter className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-background flex items-center justify-center text-muted-foreground hover:text-primary transition-colors">
                  <Facebook className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-serif font-semibold text-lg mb-4 text-primary">Quick Links</h3>
              <ul className="space-y-3">
                <li><Link href="/" className="text-muted-foreground hover:text-primary transition-colors text-sm">Home</Link></li>
                <li><Link href="/menu" className="text-muted-foreground hover:text-primary transition-colors text-sm">Our Menu</Link></li>
                <li><Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors text-sm">Contact Us</Link></li>
                <li><Link href="/order" className="text-muted-foreground hover:text-primary transition-colors text-sm">Order Online</Link></li>
              </ul>
            </div>

            <div className="md:col-span-2">
              <h3 className="font-serif font-semibold text-lg mb-4 text-primary">Contact Info</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-muted-foreground text-sm">Kota Baru, Jambi, Indonesia</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-muted-foreground text-sm">+62 812-3456-7890</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-muted-foreground text-sm">farizzaldn@gmail.com</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-border/50 text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Farizal Coffe. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
