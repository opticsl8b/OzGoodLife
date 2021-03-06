const db = require("./connection");
const { User, Product, Category } = require("../models");

db.once("open", async () => {
  await Category.deleteMany();

  const categories = await Category.insertMany([
    { name: "Blackmores" },
    { name: "Bio Island" },
    { name: "Life Space" },
    { name: "B.Box" },
    { name: "Thursday Plantation" },
  ]);

  console.log("categories seeded");

  await Product.deleteMany();

  const products = await Product.insertMany([
    {
      name: "Fish Oil",
      description: "Omega Triple High Strength Fish Oil 150 Capsules",
      image: "Fish-oil.png",
      category: categories[0]._id,
      price: 28,
      quantity: 500,
    },
    {
      name: "Vitamin B",
      description: "Executive B Vitamin B Stress Support 62 Tablets",
      image: "Vitamin-B.png",
      category: categories[0]._id,
      price: 17,
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
      price: 19,
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
      price: 24,
      quantity: 30,
    },
    {
      name: "Travel Bib Disney Mickey",
      category: categories[3]._id,
      description: "Busy parents can feed on the go.",
      image: "MickeyBib.png",
      price: 16,
      quantity: 30,
    },
    {
      name: "Travel Bib Disney SnowWhite",
      category: categories[3]._id,
      description: "Busy parents can feed on the go.",
      image: "SnowWhiteBib.png",
      price: 16,
      quantity: 30,
    },
    {
      name: "Sippy Cup Disney Woody",
      category: categories[3]._id,
      description: "The iconic b.box sippy cup with iconic Disney characters.",
      image: "WoodyCup.png",
      price: 13,
      quantity: 30,
    },
    {
      name: "Disney Sippy Cup Elsa",
      category: categories[3]._id,
      description: "The iconic b.box sippy cup with iconic Disney characters.",
      image: "ElsaCup.png",
      price: 13,
      quantity: 30,
    },
    {
      name: "100% Pure Eucalyptus Oil 200ml",
      category: categories[4]._id,
      description: "A wide range pharmaceutical grade oil.",
      image: "Eucalyptus200ml.png",
      price: 15.5,
      quantity: 30,
    },
    {
      name: "Lavender Oil 100% Pure 50ml",
      category: categories[4]._id,
      description:
        "Supports restful sleep and promotes a clam and peaceful mid. ",
      image: "LavenderOil50ml.png",
      price: 15,
      quantity: 30,
    },
    {
      name: "Tea Tree Oil 100ml",
      category: categories[4]._id,
      description:
        "Tea Tree Oil Antiseptic is a multipurpose liquid 100% pure.",
      image: "Teatree100ml.png",
      price: 22,
      quantity: 30,
    },
    {
      name: "Tea Tree Face Wipes for Acne 25",
      category: categories[4]._id,
      description:
        "Help clear the skin from acne and maintain a clear complexion.",
      image: "TeaTreeFaceWipes.png",
      price: 9,
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
