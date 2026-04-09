import { useRef, useEffect, useState } from "react";
import { Link } from "wouter";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ChevronDown, Star, Coffee, Award, Users, Wind, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/hooks/use-toast";

const menuItems = [
  {
    id: "espresso",
    name: "Espresso",
    category: "Hot Coffee",
    description: "Strong and bold single origin shot",
    price: 25000,
    image: "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=400&q=80",
  },
  {
    id: "latte",
    name: "Café Latte",
    category: "Hot Coffee",
    description: "Silky smooth espresso with steamed milk",
    price: 35000,
    image: "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=400&q=80",
  },
  {
    id: "cappuccino",
    name: "Cappuccino",
    category: "Hot Coffee",
    description: "Balanced espresso, rich foam, and steamed milk",
    price: 32000,
    image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&q=80",
  },
  {
    id: "cold-brew",
    name: "Cold Brew",
    category: "Cold Coffee",
    description: "12-hour slow-steeped premium cold coffee",
    price: 38000,
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&q=80",
  },
  {
    id: "iced-matcha",
    name: "Iced Matcha Latte",
    category: "Signature",
    description: "Earthy ceremonial matcha with creamy oat milk",
    price: 40000,
    image: "https://images.unsplash.com/photo-1504608524841-42584120d693?w=400&q=80",
  },
  {
    id: "hazelnut",
    name: "Signature Hazelnut",
    category: "Signature",
    description: "House-blend espresso with roasted hazelnut",
    price: 42000,
    image: "https://images.unsplash.com/photo-1587734195503-904fca47e0e9?w=400&q=80",
  },
];

const features = [
  { icon: Award, title: "Premium Beans", desc: "Single-origin beans sourced from Indonesia's finest highlands" },
  { icon: Users, title: "Expert Baristas", desc: "Trained artisans who craft each cup with passion and precision" },
  { icon: Wind, title: "Cozy Atmosphere", desc: "A warm sanctuary designed for relaxation and connection" },
  { icon: Zap, title: "Fast Service", desc: "Your perfect cup ready in minutes, never compromising quality" },
];

const testimonials = [
  { name: "Budi Santoso", rating: 5, review: "Best coffee I've ever had in Jakarta! The espresso is incredibly rich and smooth. I come here every morning now." },
  { name: "Sari Wijaya", rating: 5, review: "Amazing atmosphere and incredible latte art! The baristas are so skilled and friendly. Perfect spot to work or unwind." },
  { name: "Agus Pratama", rating: 5, review: "FARIZAL COFFE never disappoints. It's become my daily ritual. The Signature Hazelnut is absolutely divine." },
];

function FadeInSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

function MenuCard({ item }: { item: typeof menuItems[0] }) {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart({ id: item.id, name: item.name, price: item.price, image: item.image });
    setAdded(true);
    toast({ title: "Added to cart!", description: `${item.name} has been added to your order.` });
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <motion.div
      className="bg-card border border-border/50 rounded-2xl overflow-hidden group cursor-pointer"
      whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative h-52 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent" />
        <span className="absolute top-3 right-3 bg-primary/90 text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
          {item.category}
        </span>
      </div>
      <div className="p-5">
        <h3 className="font-serif text-lg font-semibold mb-1">{item.name}</h3>
        <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{item.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-primary font-semibold text-lg">
            Rp {item.price.toLocaleString("id-ID")}
          </span>
          <Button
            size="sm"
            onClick={handleAdd}
            data-testid={`button-add-cart-${item.id}`}
            className={`rounded-full transition-all duration-300 ${
              added ? "bg-green-600 hover:bg-green-700" : "bg-primary hover:bg-primary/90"
            } text-primary-foreground`}
          >
            {added ? "Added!" : "Add to Cart"}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

export default function Home() {
  const heroRef = useRef(null);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, 180]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <div className="overflow-x-hidden">
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden" ref={heroRef}>
        <motion.div className="absolute inset-0" style={{ y: heroY }}>
          <img
            src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1600&q=90"
            alt="Premium coffee"
            className="w-full h-[120%] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
        </motion.div>

        <motion.div
          className="relative z-10 text-center px-4 max-w-4xl mx-auto"
          style={{ opacity: heroOpacity }}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 text-primary px-4 py-2 rounded-full text-sm font-medium mb-8 backdrop-blur-sm"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Coffee className="w-4 h-4" />
            Premium Indonesian Coffee
          </motion.div>

          <motion.h1
            className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Experience the Taste of{" "}
            <span className="text-primary italic">Premium Coffee</span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-foreground/70 mb-12 font-light"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Freshly brewed happiness in every cup
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <Link href="/order">
              <Button
                size="lg"
                data-testid="button-order-now-hero"
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-10 py-6 text-base font-semibold shadow-lg hover:shadow-primary/20 hover:shadow-2xl transition-all duration-300"
              >
                Order Now
              </Button>
            </Link>
            <Link href="/menu">
              <Button
                variant="outline"
                size="lg"
                data-testid="button-view-menu-hero"
                className="border-foreground/30 text-foreground hover:bg-foreground/10 rounded-full px-10 py-6 text-base font-semibold backdrop-blur-sm"
              >
                View Menu
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-foreground/40"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-8 h-8" />
        </motion.div>
      </section>

      {/* ABOUT */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <FadeInSection>
              <div className="relative">
                <div className="absolute -inset-4 bg-primary/10 rounded-3xl -rotate-3" />
                <div className="relative rounded-2xl overflow-hidden aspect-[4/5] shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=800&q=80"
                    alt="Expert barista crafting coffee"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground rounded-2xl p-5 shadow-xl">
                  <div className="font-serif text-3xl font-bold">4+</div>
                  <div className="text-sm font-medium opacity-90">Years of Excellence</div>
                </div>
              </div>
            </FadeInSection>

            <FadeInSection delay={0.2}>
              <div>
                <p className="text-primary font-medium tracking-widest uppercase text-sm mb-4">Our Story</p>
                <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 leading-tight">
                  Crafted with Passion,<br />
                  <span className="text-primary italic">Brewed to Perfection</span>
                </h2>
                <p className="text-foreground/70 text-lg leading-relaxed mb-6">
                  FARIZAL COFFE was born from a deep love for coffee and a desire to bring premium, authentic flavors to every cup. We source our beans from Indonesia's finest highlands — Aceh, Toraja, and Java — where the rich volcanic soil creates coffee with unparalleled depth and complexity.
                </p>
                <p className="text-foreground/70 leading-relaxed mb-10">
                  Our baristas aren't just coffee makers — they're artists who treat each cup as a canvas. Every pour, every steam, every blend is executed with meticulous care to deliver the perfect experience.
                </p>
                <div className="flex gap-12">
                  {[["500+", "Daily Cups"], ["50+", "Coffee Varieties"], ["10K+", "Happy Customers"]].map(([num, label]) => (
                    <div key={label}>
                      <div className="font-serif text-3xl font-bold text-primary">{num}</div>
                      <div className="text-muted-foreground text-sm mt-1">{label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* FEATURED MENU */}
      <section className="py-24 bg-card/50">
        <div className="container mx-auto px-4 md:px-6">
          <FadeInSection>
            <div className="text-center mb-16">
              <p className="text-primary font-medium tracking-widest uppercase text-sm mb-4">Our Specialties</p>
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">Featured Menu</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                From bold espresso shots to our exclusive signature blends, every item on our menu is a masterpiece.
              </p>
            </div>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuItems.map((item, i) => (
              <FadeInSection key={item.id} delay={i * 0.1}>
                <MenuCard item={item} />
              </FadeInSection>
            ))}
          </div>

          <FadeInSection delay={0.3}>
            <div className="text-center mt-12">
              <Link href="/menu">
                <Button
                  variant="outline"
                  size="lg"
                  data-testid="button-view-full-menu"
                  className="rounded-full border-primary/30 hover:bg-primary/10 hover:border-primary px-10"
                >
                  View Full Menu
                </Button>
              </Link>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <FadeInSection>
            <div className="text-center mb-16">
              <p className="text-primary font-medium tracking-widest uppercase text-sm mb-4">Why Us</p>
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">Why Choose FARIZAL COFFE</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                We don't just serve coffee — we create an experience that brings you back every single day.
              </p>
            </div>
          </FadeInSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <FadeInSection key={feature.title} delay={i * 0.1}>
                  <motion.div
                    className="bg-card border border-border/50 rounded-2xl p-8 text-center group hover:border-primary/30 transition-all duration-300"
                    whileHover={{ y: -4 }}
                  >
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-serif text-xl font-semibold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{feature.desc}</p>
                  </motion.div>
                </FadeInSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 bg-card/50">
        <div className="container mx-auto px-4 md:px-6">
          <FadeInSection>
            <div className="text-center mb-16">
              <p className="text-primary font-medium tracking-widest uppercase text-sm mb-4">Reviews</p>
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">What Our Guests Say</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Don't take our word for it — hear from the people who make our café worth visiting every day.
              </p>
            </div>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <FadeInSection key={t.name} delay={i * 0.15}>
                <motion.div
                  className="bg-background border border-border/50 rounded-2xl p-8 h-full flex flex-col"
                  whileHover={{ y: -4, boxShadow: "0 12px 30px rgba(0,0,0,0.2)" }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex gap-1 mb-6">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="w-5 h-5 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-foreground/80 leading-relaxed flex-1 italic text-lg mb-8">
                    "{t.review}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-primary font-bold text-sm">{t.name[0]}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{t.name}</p>
                      <p className="text-muted-foreground text-xs">Verified Customer</p>
                    </div>
                  </div>
                </motion.div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1600&q=80"
            alt="Coffee atmosphere"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/80" />
        </div>
        <FadeInSection>
          <div className="relative z-10 text-center px-4">
            <h2 className="font-serif text-4xl md:text-6xl font-bold text-primary-foreground mb-6">
              Ready to enjoy your coffee?
            </h2>
            <p className="text-primary-foreground/80 text-xl mb-10 max-w-xl mx-auto">
              Order your favorite brew now and experience the warmth of FARIZAL COFFE wherever you are.
            </p>
            <Link href="/order">
              <Button
                size="lg"
                data-testid="button-order-now-cta"
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 rounded-full px-12 py-6 text-lg font-semibold shadow-2xl"
              >
                Order Now
              </Button>
            </Link>
          </div>
        </FadeInSection>
      </section>
    </div>
  );
}
