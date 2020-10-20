const express = require('express');
const router = express.Router();
const { pool, query } = require('../models/db');

/* GET users listing. */
router.get('/', function(req, res, next) {
  const sql = 'SELECT * FROM users'

  pool.query(sql, function (err, result, fields) {
    if (err) throw err;
    res.json({
      status: 200, 
      result: result
    })
  });
});

router.get('/:id', async function (req, res, next) {
  try {
    const user = await query(
      'SELECT * FROM users WHERE id = ?',
      req.params.id
    );

    res.json({
      status: 200,
      user: user
    });

  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;
