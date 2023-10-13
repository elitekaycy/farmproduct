var express = require('express');
var router = express.Router();
const pool = require('../db/dbConnect')

/* GET home page. */
router.get('/', async function(req, res, next) {
  const client = await pool.connect()
  console.log("req.query params ", req.query.query)
  const query = req.query.query || ''
  
  try {
    const { rows } = await client.query(`SELECT * from products`)

    if(rows) {
      return res.render('index', {title: 'farmers day', products: rows });
    }else {
      throw new Error("could not finish getting rows")
    }

  }catch(error) {
    console.log("render index error ", error)
    next(error)
  }
});




router.get('/search', async function(req, res, next) {
  const client = await pool.connect()
  console.log("req.query params ", req.query.query)
  const query = req.query.query || ''
  
  try {
    const { rows } = await client.query(`SELECT * from products`)

    if(rows) {
      const resultRows = rows.filter(r => r?.type.trim() === query)
      return res.render('search', {products: query === "" ? rows : resultRows, key: String(query) });
    }else {
      throw new Error("could not finish getting rows")
    }

  }catch(error) {
    console.log("render index error ", error)
    next(error)
  }
});


router.get('/product/:id', async(req, res, next) => {
  const { id } = req.params
  const client = await pool.connect()

  try {

    const { rows } = await client.query('SELECT * from products where id=$1', [id])
    console.log("rows are ", rows[0])
    if(rows) res.render('product', { product: rows})

  }catch(err) {

    next(err)

  }

})




module.exports = router;
