var express = require('express');
const pool = require('../db/dbConnect');
var router = express.Router();

const bulkData = [
  {
    "name": "Fresh Tomatoes",
    "price": 100,
    "quantity": 2,
    "description": "Ripe and succulent tomatoes, perfect for salads, sauces, or sandwiches. Sourced from a local farm in Legon.",
    "type": "vegetable",
    "source": "Legon Farm",
    "image": "tomatoes.png"
  },
  {
    "name": "Onions",
    "price": 200,
    "quantity": 2,
    "description": "Crisp and pungent onions, a kitchen staple for various culinary delights. Sourced from Legon Farm's finest crops.",
    "type": "vegetable",
    "source": "Legon Farm",
    "image": "onion.png"
  },
  {
    "name": "Oranges",
    "price": 120,
    "quantity": 12,
    "description": "Sweet and tangy oranges, bursting with vitamin C goodness. Great for fresh juices or snacking. Grown on Legon Farm's citrus groves.",
    "type": "fruit",
    "source": "Legon Farm",
    "image": "oranges.png"
  },
  {
    "name": "Pear",
    "price": 40,
    "quantity": 4,
    "description": "Juicy and flavorful pears, a delightful addition to fruit salads or as a healthy snack. Harvested from Tomoe Farm's orchards.",
    "type": "fruit",
    "source": "Tomoe Farm",
    "image": "pear.png"
  },
  {
    "name": "Plantain",
    "price": 50,
    "quantity": 4,
    "description": "Slightly sweet and starchy plantains, perfect for frying or roasting. Grown on Tomoe Farm's plantations.",
    "type": "vegetable",
    "source": "Tomoe Farm",
    "image": "plantain.png"
  },
  {
    "name": "Strawberries",
    "price": 150,
    "quantity": 10,
    "description": "Plump and juicy strawberries, bursting with natural sweetness. Perfect for snacking, desserts, or making delicious jams and smoothies. Sourced from Legon Farm's berry fields.",
    "type": "fruit",
    "source": "Legon Farm",
    "image": "strawberries.png"
  },
  {
    "name": "Apples",
    "price": 180,
    "quantity": 8,
    "description": "Crisp and refreshing apples, known for their crisp texture and slightly sweet flavor. Great for eating fresh, making pies, or pairing with cheese. Harvested from Countryside Farm's apple orchards.",
    "type": "fruit",
    "source": "Countryside Farm",
    "image": "apples.png"
  },
  {
    "name": "Chicken Eggs",
    "price": 70,
    "quantity": 24,
    "description": "Farm-fresh chicken eggs, rich in protein and perfect for breakfast or baking. Collected daily from free-range chickens at Sunrise Farm.",
    "type": "dairy",
    "source": "Sunrise Farm",
    "image": "eggs.png"
  },
  {
    "name": "Pork Chops",
    "price": 350,
    "quantity": 3,
    "description": "Tender and flavorful pork chops, ideal for grilling or pan-frying. Sourced from Happy Pig Farm's heritage breed pigs.",
    "type": "meat",
    "source": "Happy Pig Farm",
    "image": "porkchops.png"
  },
  {
    "name": "Fresh Milk",
    "price": 90,
    "quantity": 6,
    "description": "Creamy and wholesome fresh milk, great for drinking, cooking, or making dairy products. Produced at Moonbeam Dairy's farm.",
    "type": "dairy",
    "source": "Moonbeam Dairy",
    "image": "milk.png"
  },
  {
    "name": "Cucumbers",
    "price": 70,
    "quantity": 8,
    "description": "Crisp and refreshing cucumbers, ideal for salads, pickling, or as a healthy snack. Harvested from Greenfield Farm's cucumber patch.",
    "type": "vegetable",
    "source": "Greenfield Farm",
    "image": "cucumber.png"
  },
  {
    "name": "Grapes",
    "price": 130,
    "quantity": 6,
    "description": "Sweet and juicy grapes, perfect for snacking, making wine, or adding to fruit platters. Grown in the vineyards of Vintner's Estate.",
    "type": "fruit",
    "source": "Vintner's Estate",
    "image": "grapes.png"
  },
  {
    "name": "Bacon",
    "price": 250,
    "quantity": 4,
    "description": "Delicious, smoky bacon strips, a breakfast favorite. Made from high-quality pork at Sunrise Farm.",
    "type": "meat",
    "source": "Sunrise Farm",
    "image": "bacon.png"
  },
  {
    "name": "Tilapia Fillet",
    "price": 180,
    "quantity": 6,
    "description": "Mild and flaky tilapia fillet, versatile for grilling, baking, or frying. Responsibly sourced from Clearwater Aquaculture.",
    "type": "fish",
    "source": "Clearwater Aquaculture",
    "image": "tillapia.png"
  },
  {
    "name": "Spinach",
    "price": 85,
    "quantity": 5,
    "description": "Fresh and leafy spinach, rich in nutrients. Perfect for salads, smoothies, or sautéing. Grown at Evergreen Farm.",
    "type": "vegetable",
    "source": "Evergreen Farm",
    "image": "spinach.png"
  },
  {
    "name": "Ground Beef",
    "price": 320,
    "quantity": 4,
    "description": "High-quality ground beef, perfect for making burgers, meatballs, or hearty Bolognese sauce. Sourced from Rolling Hills Farm.",
    "type": "meat",
    "source": "Rolling Hills Farm",
    "image": "groundbeef.png"
  },
  {
    "name": "Carrots",
    "price": 80,
    "quantity": 5,
    "description": "Fresh and crunchy carrots, perfect for salads, snacking, or adding to soups. Harvested from Greenfield Farm's carrot patch.",
    "type": "vegetable",
    "source": "Greenfield Farm",
    "image": "carrots.png"
  },
  {
    "name": "Bananas",
    "price": 60,
    "quantity": 10,
    "description": "Sweet and nutritious bananas, a convenient and healthy snack. Grown in the lush orchards of Sunshine Farm.",
    "type": "fruit",
    "source": "Sunshine Farm",
    "image": "bananas.png"
  },
  {
    "name": "Beef Steaks",
    "price": 400,
    "quantity": 4,
    "description": "Premium beef steaks, known for their tenderness and rich flavor. Sourced from Rolling Hills Farm's grass-fed cattle.",
    "type": "meat",
    "source": "Rolling Hills Farm",
    "image": "beefsteaks.png"
  },

  {
    "name": "Lamb Chops",
    "price": 380,
    "quantity": 3,
    "description": "Tender and succulent lamb chops, known for their unique flavor. Raised at Meadowview Farm.",
    "type": "meat",
    "source": "Meadowview Farm",
    "image": "lambchops.png"
  },
  {
    "name": "Pineapples",
    "price": 160,
    "quantity": 3,
    "description": "Tropical and juicy pineapples, great for fresh fruit salads, grilling, or making refreshing pineapple juice. Grown at Tropicana Plantations.",
    "type": "fruit",
    "source": "Tropicana Plantations",
    "image": "pineapple.png"
  },
  {
    "name": "Bell Peppers",
    "price": 90,
    "quantity": 5,
    "description": "Colorful and crisp bell peppers, perfect for adding flavor and crunch to salads, stir-fries, or fajitas. Harvested from Rainbow Farms.",
    "type": "vegetable",
    "source": "Rainbow Farms",
    "image": "pepper.png"
  },
  {
    "name": "Watermelons",
    "price": 200,
    "quantity": 2,
    "description": "Sweet and refreshing watermelons, a summer favorite for picnics and desserts. Grown at Sunshine Farm's watermelon patch.",
    "type": "fruit",
    "source": "Sunshine Farm",
    "image": "watermelon.png"
  },

  {
    "name": "cassava",
    "price": 100,
    "quantity": 4,
    "description": "Fresh and versatile cassava, perfect for making yam, roasting, or mashing. Grown at Evergreen Farm.",
    "type": "other",
    "source": "Evergreen Farm",
    "image": "cassava.png"
  },
  {
    "name": "Honey",
    "price": 150,
    "quantity": 10,
    "description": "Pure and golden honey, harvested from the bees at Golden Meadows Apiary. Ideal for sweetening tea, drizzling on yogurt, or as a natural sweetener for baking.",
    "type": "other",
    "source": "Golden Meadows Apiary",
    "image": "honey.png"
  },
  {
    "name": "Maple Syrup",
    "price": 200,
    "quantity": 5,
    "description": "Rich and natural maple syrup, tapped from the maple trees at Maple Grove Estates. Perfect for pancakes, waffles, or drizzling on desserts.",
    "type": "other",
    "source": "Maple Grove Estates",
    "image": "maple.png"
  },
  {
    "name": "Sunflower Seeds",
    "price": 50,
    "quantity": 12,
    "description": "Roasted and salted sunflower seeds, a nutritious and satisfying snack. Grown at Sunshine Farm's sunflower fields.",
    "type": "other",
    "source": "Sunshine Farm",
    "image": "seed.png"
  },
  {
    "name": "Chicken",
    "price": 400,
    "quantity": 29,
    "description": "Premium chicken, known for their tenderness and rich flavor. Sourced from Rolling Hills Farm's corn fed chicken.",
    "type": "meat",
    "source": "Rolling Hills Farm",
    "image": "chicken.png",
  },

  {
    "name": "Chicken Thighs",
    "price": 250,
    "quantity": 6,
    "description": "Juicy and flavorful chicken thighs, perfect for marinating and grilling, baking, or slow-cooking. Sourced from a trusted poultry farm.",
    "type": "meat",
    "source": "Poultry Farm",
    "image": "chickenthigh.png"
  },
  {
    "name": "Chicken Wings",
    "price": 180,
    "quantity": 8,
    "description": "Delicious chicken wings, great for parties or as a tasty appetizer. Ideal for frying, baking, or grilling. Sourced from a trusted poultry farm.",
    "type": "meat",
    "source": "Poultry Farm",
    "image": "chickenwing.png"
  },

  {
    "name": "Crab",
    "price": 350,
    "quantity": 4,
    "description": "Fresh and succulent blue crab, known for its sweet and delicate meat. Perfect for crab boils, crab cakes, or crab salad. Sourced from Coastal Seafoods.",
    "type": "other",
    "source": "Coastal Seafoods",
    "image": "rab.png"
  },
  {
    "name": "Lobster",
    "price": 600,
    "quantity": 3,
    "description": "Gourmet lobster, prized for its tender tail meat and sweet flavor. Great for lobster bisque, grilled lobster tails, or lobster rolls. Sourced from Ocean Delights Fisheries.",
    "type": "other",
    "source": "Ocean Delights Fisheries",
    "image": "lobster.png"
  },
  {
    "name": "Squid",
    "price": 200,
    "quantity": 5,
    "description": "Fresh squid, versatile for calamari, stir-fries, or grilled squid dishes. Known for its tender texture and mild, briny flavor. Sourced from Neptune's Bounty Seafood.",
    "type": "other",
    "source": "Neptune's Bounty Seafood",
    "image": "squid.png"
  },
  {
    "name": "Shrimp",
    "price": 250,
    "quantity": 8,
    "description": "Plump and juicy shrimp, perfect for shrimp scampi, grilled shrimp skewers, or shrimp cocktail. Sourced from Gulf Shores Shrimp Co.",
    "type": "other",
    "source": "Gulf Shores Shrimp Co.",
    "image": "shrimp.png"
  }, {
    "name": "Octopus",
    "price": 280,
    "quantity": 4,
    "description": "Tender and flavorful octopus, known for its unique taste and firm texture. Perfect for grilling, marinating, or adding to seafood pasta dishes. Sourced from Deep Sea Delights Fisheries.",
    "type": "other",
    "source": "Deep Sea Delights Fisheries",
    "image": "octopus.png"
  }

]
/* GET users listing. */
router.post('/', async function(req, res, next) {

  const insertQuery = `INSERT into products (name, price, description, type, image, source, quantity) VALUES ($1, $2, $3, $4, $5, $6, $7)`
  const values = bulkData.map(product => [product.name, product.price, product.description, product.type, product.image, product.source, product.quantity])

  const client = await pool.connect();
  try {
    
    await client.query('BEGIN');

    for (const product of values) {
      // Execute the insert query for each product
      await client.query(insertQuery, product);
    }

    await client.query('COMMIT'); 

    console.log('Bulk insert completed successfully.');
    res.json({ msg: "success"})
  } catch (error) {

    console.error('Error:', error);
    await client.query('ROLLBACK'); 
    next(error)

  } finally {
    client.release(); 
  }
});

module.exports = router;
