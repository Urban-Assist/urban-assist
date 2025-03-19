require('dotenv').config();
const app = require('./src/app');
const { connection, db } = require('./src/config/db'); // Fix the import to destructure `db` correctly
const PORT = process.env.PORT || 5000;

connection();

db.sync().then(() => {
  console.log("Database synced");
}).catch((err) => {
  console.error("Error in syncing database", err);
});

app.listen(PORT, () => {
    console.log(`Payment Server is running on port ${PORT}`);
});

module.exports = app; // If needed, export `app` for external use
