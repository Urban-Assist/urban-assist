const db = require('../config/db');

// create a new service
exports.createService = async ({ name, description, price }) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO services (name, description, price) VALUES (?, ?, ?)';
        db.query(query, [name, description, price], (err, results) => {
            if (err) reject(err);
            else resolve({ id: results.insertId, name, description, price });
        });
    });
};

// function to delete a service
exports.deleteService = async (id) => {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM services WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) reject(err);
            else resolve(results);
        });
    });
};
