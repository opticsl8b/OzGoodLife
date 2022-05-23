const db = require('./connection');
const { User, Product } = require('../models');

db.once('open', async () => {
  
  await Product.deleteMany();

  const products = await Product.insertMany([
    {
      title: 'Fish Oil',
      description:
        'Omega Triple High Strength Fish Oil 150 Capsules',
      image: 'cookie-tin.jpg',
      category: "Blackmores",
      price: 10,
      quantity: 10
    },
    {
      title: 'Vitamin B',
      description:
        'Executive B Vitamin B Stress Support 62 Tablets',
      image: 'cookie-tin.jpg',
      category: "Blackmores",
      price: 10,
      quantity: 10
    },
    {
      title: 'Kids Zinc',
      description:
        'Zinc 120 Chewable Tablets',
      image: 'cookie-tin.jpg',
      category: "Bio Island",
      price: 10,
      quantity: 10
    },
    {
      title: 'Kids Fish Oil',
      description:
        'Cod Liver + Fish Oil Kids 90 Capsules',
      image: 'cookie-tin.jpg',
      category: "Bio Island",
      price: 10,
      quantity: 10
    },
    {
      title: 'Broad Spectrum Probiotic',
      description:
        'Broad Spectrum Probiotic 60 Capsules',
      image: 'cookie-tin.jpg',
      category: "Life Space",
      price: 10,
      quantity: 10
    },
    {
      title: 'Probiotic For 60+ Years',
      description:
        'Probiotic For 60+ Years 60 Capsules',
      image: 'cookie-tin.jpg',
      category: "Life Space",
      price: 10,
      quantity: 10
    },
  ]);

  console.log('products seeded🚗🚗');

  await User.deleteMany();

  await User.create({
    username: 'george',
    email: 'george@testmail.com',
    password: '123456',
    orders: [
      // {
      //   products: [products[0]._id, products[2]._id, products[1]._id]
      // }
    ]
  });

  await User.create({
    username: 'admin',
    email: 'admin@test.com',
    password: '123456',
    orders: [
      // {
      //   products: [products[4]._id, products[3]._id, products[5]._id]
      // }
    ]
  });

  console.log('users seeded🚙🚙');

  process.exit();
});
