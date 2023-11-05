import { uid } from "uid";

export const initialRecipes = [
  {
    id: uid(),
    name: "Vegan Pasta Bolognese",
    slug: "vegan-pasta-bolognese",
    image: {
      src: "https://biancazapatka.com/wp-content/uploads/2018/07/spaghetti-vegan-bolognese-720x882.jpg",
    },
    portions: 4,
    ingredients: [
      { amount: 2, ingredient: { id: "123", name: "Onion", unit: "" } },
      { amount: 2, ingredient: { id: uid(), name: "Garlic", unit: "cloves" } },
      { amount: 5, ingredient: { id: uid(), name: "Carrots", unit: "" } },
      {
        amount: 1,
        ingredient: { id: uid(), name: "Cherry Tomatos", unit: "" },
      },
      {
        amount: 180,
        ingredient: { id: uid(), name: "Vegan minced meat", unit: "g" },
      },
      {
        amount: 1000,
        ingredient: { id: uid(), name: "Sieved tomatos", unit: "g" },
      },
      {
        amount: 80,
        ingredient: { id: uid(), name: "Tomato paste", unit: "g" },
      },
      { amount: 500, ingredient: { id: uid(), name: "Pasta", unit: "g" } },
      {
        amount: 1,
        ingredient: { id: uid(), name: "Sprinkled Cheese", unit: "" },
      },
    ],
    isFavorite: false,
    onList: false,
    spices: [
      { id: uid(), name: "Salt" },
      { id: uid(), name: "Pepper" },
      { id: uid(), name: "Oregano" },
      { id: uid(), name: "Sugar" },
    ],
    sauces: [],
    preperation:
      "Lorem daskm slakm flsdkmfl kkasm lsd laksmd lakms fldsasd asdm asf laksdm laksdmalkdm laksdm lakdsm asdkdm a.",
  },
  {
    id: uid(),
    name: "Vegan Burger",
    slug: "vegan-burger",
    image: {
      src: "https://biancazapatka.com/wp-content/uploads/2023/07/vegan-burger.jpg",
      alt: "vegan burger",
    },
    portions: 2,
    ingredients: [
      { amount: 1, ingredient: { id: "123", name: "Onion", unit: "" } },
      {
        amount: 2,
        ingredient: { id: uid(), name: "Vegan patties", unit: "" },
      },
      { amount: 1, ingredient: { id: uid(), name: "Lettuce", unit: "" } },
      { amount: 1, ingredient: { id: uid(), name: "Tomatos", unit: "" } },
      {
        amount: 0.5,
        ingredient: { id: uid(), name: "Cucumbers", unit: "" },
      },
      { amount: 2, ingredient: { id: uid(), name: "Cheese", unit: "slices" } },
      { amount: 750, ingredient: { id: uid(), name: "Fries", unit: "g" } },
    ],
    isFavorite: false,
    onList: false,
    spices: [
      { id: uid(), name: "Salt" },
      { id: uid(), name: "French Fries Spice" },
    ],
    sauces: [
      { id: uid(), name: "mayonaise" },
      { id: uid(), name: "Curryketchup" },
      { id: uid(), name: "Burger sauce" },
    ],
    preperation:
      "Lorem daskm slakm flsdkmfl kkasm lsd laksmd lakms fldsasd asdm asf laksdm laksdmalkdm laksdm lakdsm asdkdm a.",
  },
];
