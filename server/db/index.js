const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  max: 20,
});

const schema = 'myeoswallet.';

module.exports = {
  getClient: async () => {
    const client = await pool.connect();
    try {
      return client;
    } catch (e) {
      throw e;
    }
  },

  closeConnection: async (client) => {
    client.release();
    // client.end()
  },

  beginTx: async () => {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      return client;
    } catch (e) {
      throw e;
    }
  },

  commit: async (client) => {
    try {
      await client.query('COMMIT');
      client.release();
    } catch (e) {
      throw e;
    }
  },

  rollback: async (client) => {
    try {
      await client.query('ROLLBACK');
      await client.release();
    } catch (e) {
      throw e;
    }
  },

  saveAccount: async (adaName, client) => {
    const data = [
      adaName.toLowerCase().substring(0, 12),
    ];
    return new Promise((resolve, reject) => {
      client.query(`INSERT INTO ${schema}.added_accounts(ada_name) VALUES($1) ON CONFLICT (ada_name) DO UPDATE SET ada_name = EXCLUDED.ada_name RETURNING ada_id`, data, (error, results) => {
        if (error != null) {
          return reject(error);
        }
        return resolve(results.rows[0].ada_id);
      });
    });
  },

};
