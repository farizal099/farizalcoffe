import { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Trash2, Plus, Minus, Coffee, ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";

export default function Order() {
  const { items, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice } = useCart();
  const [checkedOut, setCheckedOut] = useState(false);

  const handleCheckout = () => {
    setCheckedOut(true);
    clearCart();
  };

  if (checkedOut) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center px-4">
        <motion.div
          className="text-center max-w-md"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: "spring" }}
        >
          <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-8">
            <Check className="w-12 h-12 text-primary" />
          </div>
          <h1 className="font-serif text-4xl font-bold mb-4">Order Placed!</h1>
          <p className="text-muted-foreground text-lg mb-2">
            Thank you for your order. Our baristas are crafting your drinks with care.
          </p>
          <p className="text-muted-foreground mb-10 text-sm">
            You'll receive a WhatsApp confirmation shortly at your registered number.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8">
                Back to Home
              </Button>
            </Link>
            <Link href="/menu">
              <Button variant="outline" className="rounded-full border-primary/30 hover:bg-primary/10 px-8">
                Browse Menu
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        {/* Header */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/menu" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6 text-sm">
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </Link>
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-8 h-8 text-primary" />
            <h1 className="font-serif text-4xl font-bold">Your Order</h1>
            {totalItems > 0 && (
              <span className="bg-primary text-primary-foreground text-sm font-bold px-3 py-1 rounded-full">
                {totalItems} {totalItems === 1 ? "item" : "items"}
              </span>
            )}
          </div>
        </motion.div>

        {items.length === 0 ? (
          <motion.div
            className="text-center py-24"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-20 h-20 rounded-full bg-card flex items-center justify-center mx-auto mb-6">
              <Coffee className="w-10 h-10 text-muted-foreground" />
            </div>
            <h2 className="font-serif text-2xl font-semibold mb-3">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8">
              Explore our menu and add your favorite drinks to get started.
            </p>
            <Link href="/menu">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8">
                Browse Menu
              </Button>
            </Link>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="md:col-span-2 space-y-4">
              <AnimatePresence>
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-card border border-border/50 rounded-2xl p-5 flex gap-4 items-center"
                    data-testid={`cart-item-${item.id}`}
                  >
                    <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-serif font-semibold text-base mb-1 truncate">{item.name}</h3>
                      <p className="text-primary font-semibold text-sm">
                        Rp {item.price.toLocaleString("id-ID")}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        data-testid={`button-decrease-${item.id}`}
                        className="w-8 h-8 rounded-full bg-background border border-border/50 flex items-center justify-center hover:border-primary/50 hover:text-primary transition-colors"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-8 text-center font-semibold" data-testid={`quantity-${item.id}`}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        data-testid={`button-increase-${item.id}`}
                        className="w-8 h-8 rounded-full bg-background border border-border/50 flex items-center justify-center hover:border-primary/50 hover:text-primary transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-right shrink-0 hidden sm:block">
                      <p className="font-bold text-base">
                        Rp {(item.price * item.quantity).toLocaleString("id-ID")}
                      </p>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      data-testid={`button-remove-${item.id}`}
                      className="text-muted-foreground hover:text-destructive transition-colors ml-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>

              <div className="text-right">
                <button
                  onClick={clearCart}
                  data-testid="button-clear-cart"
                  className="text-muted-foreground hover:text-destructive transition-colors text-sm"
                >
                  Clear all items
                </button>
              </div>
            </div>

            {/* Summary */}
            <motion.div
              className="bg-card border border-border/50 rounded-2xl p-6 h-fit sticky top-28"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="font-serif text-xl font-semibold mb-6">Order Summary</h2>

              <div className="space-y-3 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground truncate pr-2">
                      {item.name} × {item.quantity}
                    </span>
                    <span className="font-medium shrink-0">
                      Rp {(item.price * item.quantity).toLocaleString("id-ID")}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-border/50 pt-4 mb-4">
                <div className="flex justify-between text-sm text-muted-foreground mb-2">
                  <span>Subtotal</span>
                  <span>Rp {totalPrice.toLocaleString("id-ID")}</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground mb-4">
                  <span>Service charge (5%)</span>
                  <span>Rp {Math.round(totalPrice * 0.05).toLocaleString("id-ID")}</span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-primary">Rp {Math.round(totalPrice * 1.05).toLocaleString("id-ID")}</span>
                </div>
              </div>

              <Button
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full py-5 font-semibold text-base shadow-lg"
                onClick={handleCheckout}
                data-testid="button-checkout"
              >
                Checkout Now
              </Button>

              <p className="text-center text-muted-foreground text-xs mt-4">
                Pickup ready in 15–20 minutes
              </p>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
