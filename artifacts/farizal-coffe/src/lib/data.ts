export const menuData = [
  {
    id: "espresso",
    name: "Espresso",
    description: "Strong and bold single origin shot",
    price: 25000,
    category: "hot",
    image: "/src/assets/images/espresso.png"
  },
  {
    id: "latte",
    name: "Latte",
    description: "Silky smooth espresso with steamed milk",
    price: 35000,
    category: "hot",
    image: "/src/assets/images/latte.png"
  },
  {
    id: "cappuccino",
    name: "Cappuccino",
    description: "Balanced espresso, foam, and milk",
    price: 32000,
    category: "hot",
    image: "/src/assets/images/cappuccino.png"
  },
  {
    id: "cold-brew",
    name: "Cold Brew",
    description: "12-hour slow-steeped coffee",
    price: 38000,
    category: "cold",
    image: "/src/assets/images/cold-brew.png"
  },
  {
    id: "matcha-latte",
    name: "Iced Matcha Latte",
    description: "Earthy matcha with oat milk",
    price: 40000,
    category: "cold",
    image: "/src/assets/images/matcha-latte.png"
  },
  {
    id: "hazelnut",
    name: "Signature Hazelnut",
    description: "House-blend with roasted hazelnut",
    price: 42000,
    category: "signature",
    image: "/src/assets/images/hazelnut.png"
  },
  {
    id: "americano",
    name: "Americano",
    description: "Bold espresso diluted with hot water",
    price: 28000,
    category: "hot",
    image: "/src/assets/images/espresso.png"
  },
  {
    id: "caramel-macchiato",
    name: "Caramel Macchiato",
    description: "Espresso with caramel drizzle",
    price: 38000,
    category: "signature",
    image: "/src/assets/images/latte.png"
  },
  {
    id: "vietnamese",
    name: "Vietnamese Iced Coffee",
    description: "Strong drip coffee over condensed milk",
    price: 35000,
    category: "signature",
    image: "/src/assets/images/vietnamese.png"
  }
];

export const formatIDR = (price: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price).replace("Rp", "Rp ");
};
