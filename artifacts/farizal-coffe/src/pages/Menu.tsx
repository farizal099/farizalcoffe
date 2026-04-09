import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/hooks/use-toast";

const allMenuItems = [
  { id: "espresso", name: "Espresso", category: "Hot Coffee", description: "Strong and bold single origin shot, rich crema on top", price: 25000, image: "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=400&q=80" },
  { id: "latte", name: "Café Latte", category: "Hot Coffee", description: "Silky smooth espresso with velvety steamed milk", price: 35000, image: "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=400&q=80" },
  { id: "cappuccino", name: "Cappuccino", category: "Hot Coffee", description: "Perfectly balanced espresso, rich foam, and steamed milk", price: 32000, image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&q=80" },
  { id: "americano", name: "Americano", category: "Hot Coffee", description: "Bold espresso diluted with hot water for a smooth finish", price: 28000, image: "https://images.unsplash.com/photo-1551030173-122aabc4489c?w=400&q=80" },
  { id: "flat-white", name: "Flat White", category: "Hot Coffee", description: "Double ristretto with velvety microfoam milk", price: 36000, image: "https://images.unsplash.com/photo-1577968897966-3d4325b36b61?w=400&q=80" },
  { id: "pour-over", name: "Pour Over", category: "Hot Coffee", description: "Hand-crafted pour over, highlighting single-origin notes", price: 38000, image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=80" },
  { id: "cold-brew", name: "Cold Brew", category: "Cold Coffee", description: "12-hour slow-steeped premium cold coffee", price: 38000, image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&q=80" },
  { id: "caramel-macchiato", name: "Caramel Macchiato", category: "Cold Coffee", description: "Espresso layered over milk with caramel drizzle", price: 38000, image: "https://images.unsplash.com/photo-1587734195503-904fca47e0e9?w=400&q=80" },
  { id: "vietnamese", name: "Vietnamese Iced Coffee", category: "Cold Coffee", description: "Strong drip coffee over sweet condensed milk and ice", price: 35000, image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&q=80" },
  { id: "iced-latte", name: "Iced Latte", category: "Cold Coffee", description: "Chilled espresso with cold milk over ice", price: 33000, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80" },
  { id: "iced-matcha", name: "Iced Matcha Latte", category: "Signature", description: "Earthy ceremonial matcha with creamy oat milk", price: 40000, image: "https://images.unsplash.com/photo-1504608524841-42584120d693?w=400&q=80" },
  { id: "hazelnut", name: "Signature Hazelnut", category: "Signature", description: "House-blend espresso with roasted hazelnut sweetness", price: 42000, image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&q=80" },
  { id: "salted-caramel", name: "Salted Caramel Blend", category: "Signature", description: "Sweet caramel with a hint of sea salt, perfectly balanced", price: 44000, image: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=400&q=80" },
  { id: "coconut-coffee", name: "Coconut Coffee", category: "Signature", description: "Tropical espresso blend with real coconut milk and cream", price: 42000, image: "https://images.unsplash.com/photo-1548273989-e90f53ea0501?w=400&q=80" },
];

const categories = ["All", "Hot Coffee", "Cold Coffee", "Signature"];

function FadeInCard({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

function MenuCard({ item }: { item: typeof allMenuItems[0] }) {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart({ id: item.id, name: item.name, price: item.price, image: item.image });
    setAdded(true);
    toast({ title: "Added to cart!", description: `${item.name} — Rp ${item.price.toLocaleString("id-ID")}` });
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <motion.div
      className="bg-card border border-border/50 rounded-2xl overflow-hidden flex flex-col group"
      whileHover={{ y: -6, boxShadow: "0 24px 48px rgba(0,0,0,0.35)" }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative h-48 overflow-hidden shrink-0">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card/60 to-transparent" />
      </div>
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-serif text-lg font-semibold leading-snug">{item.name}</h3>
          <span className="text-primary font-bold text-base shrink-0">
            Rp {item.price.toLocaleString("id-ID")}
          </span>
        </div>
        <p className="text-muted-foreground text-sm leading-relaxed mb-5 flex-1">{item.description}</p>
        <Button
          size="sm"
          onClick={handleAdd}
          data-testid={`button-add-menu-${item.id}`}
          className={`w-full rounded-full transition-all duration-300 ${
            added ? "bg-green-600 hover:bg-green-700" : "bg-primary hover:bg-primary/90"
          } text-primary-foreground font-medium`}
        >
          {added ? "Added to Cart!" : "Add to Cart"}
        </Button>
      </div>
    </motion.div>
  );
}

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = allMenuItems.filter((item) => {
    const matchCat = activeCategory === "All" || item.category === activeCategory;
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Hero Banner */}
      <div className="relative h-64 md:h-80 mb-16 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=1600&q=80"
          alt="Our Menu"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-background/70 flex flex-col items-center justify-center text-center px-4">
          <motion.p
            className="text-primary font-medium tracking-widest uppercase text-sm mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Crafted for You
          </motion.p>
          <motion.h1
            className="font-serif text-4xl md:text-6xl font-bold"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Our Menu
          </motion.h1>
          <motion.p
            className="text-muted-foreground mt-3 max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            From bold single-origin shots to indulgent signature blends — explore our curated collection.
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6">
        {/* Filters & Search */}
        <motion.div
          className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                data-testid={`filter-${cat.toLowerCase().replace(" ", "-")}`}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-card border border-border/50 text-muted-foreground hover:border-primary/40 hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search menu..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              data-testid="input-search-menu"
              className="pl-10 rounded-full bg-card border-border/50 focus:border-primary"
            />
          </div>
        </motion.div>

        {/* Category Label */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory + search}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {filtered.length === 0 ? (
              <div className="text-center py-20 text-muted-foreground">
                <p className="text-xl font-serif mb-2">No items found</p>
                <p className="text-sm">Try a different search or filter.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filtered.map((item, i) => (
                  <FadeInCard key={item.id} delay={i * 0.05}>
                    <MenuCard item={item} />
                  </FadeInCard>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
