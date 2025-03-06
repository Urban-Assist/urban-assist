const db = require('../config/db');

// creates service table if it does not exists
const createServiceTable = () => {
    const query = `CREATE TABLE IF NOT EXISTS services (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;
    db.query(query, (err) => {
        if (err) console.error('Error creating service table:', err);
    });
};

createServiceTable();
