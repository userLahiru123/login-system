const pool = require("../../config/database");

module.exports = {
    saveUser: async (data, callBack)=>{
        const query = 'INSERT INTO users (google_id, name, email) VALUES ($1, $2, $3) ON CONFLICT (google_id) DO NOTHING';
        const values = [user.id, user.name, user.email];
        await pool.query(query, values);
    }
};