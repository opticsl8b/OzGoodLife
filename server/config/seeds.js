const db = require("./connection");
const { User, Product, Category } = require("../models");

db.once("open", async () => {
  await Category.deleteMany();

  const categories = await Category.insertMany([
    { name: "Blackmores" },
    { name: "Bio Island" },
    { name: "Life Space" },
  ]);

  console.log("categories seeded");

  await Product.deleteMany();

  const products = await Product.insertMany([
    {
      name: "Fish Oil",
      description: "Omega Triple High Strength Fish Oil 150 Capsules",
      image: "Fish-oil.png",
      category: categories[0]._id,
      price: 15,
      quantity: 500,
    },
    {
      name: "Vitamin B",
      description: "Executive B Vitamin B Stress Support 62 Tablets",
      image: "Vitamin-B.png",
      category: categories[0]._id,
      price: 10,
      quantity: 500,
    },
    {
      name: "Kids Chewable Zinc",
      category: categories[1]._id,
      description: "Zinc 120 Chewable Tablets",
      image: "Zinc.png",
      price: 16,
      quantity: 200,
    },
    {
      name: "Kids Fish Oil",
      category: categories[1]._id,
      description: "Cod Liver + Fish Oil Kids 90 Capsules",
      image: "Kids-Fish-Oil.png",
      price: 14,
      quantity: 100,
    },
    {
      name: "Broad Spectrum Probiotic",
      category: categories[2]._id,
      description: "Broad Spectrum Probiotic 60 Capsules",
      image: "Probiotic.png",
      price: 24,
      quantity: 30,
    },
    {
      name: "Probiotic For 60+ Years",
      category: categories[2]._id,
      description: "Probiotic For 60+ Years 60 Capsules",
      image: "60+Probiotic.png",
      price: 199.99,
      quantity: 30,
    },
  ]);

  console.log("products seeded");

  await User.deleteMany();

  await User.create({
    firstName: "Pamela",
    lastName: "Washington",
    email: "pamela@testmail.com",
    password: "password12345",
    orders: [
      {
        products: [products[0]._id, products[0]._id, products[1]._id],
      },
    ],
  });

  await User.create({
    firstName: "Elijah",
    lastName: "Holt",
    email: "eholt@testmail.com",
    password: "password12345",
  });

  console.log("users seeded");

  process.exit();
});
