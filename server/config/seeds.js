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
      title: 'Kids Zinc',
      description:
        'Zinc 120 Chewable Tablets',
      image: 'cookie-tin.jpg',
      category: "Bio Island",
      price: 10,
      quantity: 10
    },
  ]);

  console.log('products seeded');

  await User.deleteMany();

  await User.create({
    firstName: 'Pamela',
    lastName: 'Washington',
    email: 'pamela@testmail.com',
    password: 'password12345',
    orders: [
      {
        products: [products[0]._id, products[0]._id, products[1]._id]
      }
    ]
  });

  await User.create({
    firstName: 'Elijah',
    lastName: 'Holt',
    email: 'eholt@testmail.com',
    password: 'password12345'
  });

  console.log('users seeded');

  process.exit();
});
