const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'farmerdb',
  password: 'root',
  port: 5432, // PostgreSQL default port
});


// product table schema
const createProductTable = `
  CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price INT NOT NULL,
    description TEXT,
    type VARCHAR(255),
    image VARCHAR(255),
    source VARCHAR(255),
    quantity INT DEFAULT 1
  );
`;

// Function to create the table
async function createProductsTable() {
  try {
    await pool.query(createProductTable);
    console.log('Table "products" created successfully (if it didn\'t already exist).');
  } catch (error) {
    console.error('Error creating "products" table:', error);
  }
}

// Call the function to create the table
createProductsTable();

module.exports = pool;
