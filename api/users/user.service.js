const pool = require("../../config/database");

module.exports = {
  getUsers: async (req, res) => {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  }
};
