export const recipes = [
  {
    id: 0,
    name: "Vegan Pasta Bolognese",
    slug: "vegan-pasta-bolognese",
    image: {
      src: "https://biancazapatka.com/wp-content/uploads/2018/07/spaghetti-vegan-bolognese-720x882.jpg",
      alt: "pasta bolognese",
    },
    portions: 4,
    ingredients: [
      { amount: 2, ingredient: { id: 0, name: "Onion", unit: "" } },
      { amount: 2, ingredient: { id: 1, name: "Garlic", unit: "cloves" } },
      { amount: 5, ingredient: { id: 2, name: "Carrots", unit: "" } },
      {
        amount: 1,
        ingredient: { id: 11, name: "Cherry Tomatos", unit: "" },
      },
      {
        amount: 180,
        ingredient: { id: 3, name: "Vegan minced meat", unit: "g" },
      },
      {
        amount: 1000,
        ingredient: { id: 4, name: "Sieved tomatos", unit: "g" },
      },
      { amount: 80, ingredient: { id: 5, name: "Tomato paste", unit: "g" } },
      { amount: 500, ingredient: { id: 6, name: "Pasta", unit: "g" } },
      {
        amount: 1,
        ingredient: { id: 7, name: "Sprinkled Cheese", unit: "" },
      },
    ],
    spices: ["Salt", "Pepper", "Oregano", "Sugar"],
    preperation:
      "Lorem daskm slakm flsdkmfl kkasm lsd laksmd lakms fldsasd asdm asf laksdm laksdmalkdm laksdm lakdsm asdkdm a.",
  },
  {
    id: 1,
    name: "Vegan Burger",
    slug: "vegan-burger",
    image: {
      src: "https://biancazapatka.com/wp-content/uploads/2023/07/vegan-burger.jpg",
      alt: "vegan burger",
    },
    portions: 2,
    ingredients: [
      { amount: 1, ingredient: { id: 0, name: "Onion", unit: "" } },
      {
        amount: 2,
        ingredient: { id: 8, name: "Vegan patties", unit: "" },
      },
      { amount: 1, ingredient: { id: 9, name: "Lettuce", unit: "" } },
      { amount: 1, ingredient: { id: 10, name: "Tomatos", unit: "" } },
      {
        amount: 0.5,
        ingredient: { id: 11, name: "Cucumbers", unit: "" },
      },
      { amount: 2, ingredient: { id: 12, name: "Cheese", unit: "slices" } },
      { amount: 750, ingredient: { id: 13, name: "Fries", unit: "g" } },
    ],
    spices: ["Salt", "French Fries Spice"],
    sauces: ["mayonaise", "Curryketchup", "Burger sauce"],
    preperation:
      "Lorem daskm slakm flsdkmfl kkasm lsd laksmd lakms fldsasd asdm asf laksdm laksdmalkdm laksdm lakdsm asdkdm a.",
  },
];
