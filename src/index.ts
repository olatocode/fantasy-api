/** @format */
/** @format */

import app from './app';
import { database } from './config/db';
database.connect();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
