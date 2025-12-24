const dotenv = require('dotenv');
const app = require('./app');
const connectDB =require('./config/db')
const cookieParser = require('cookie-parser');

app.use(cookieParser())
dotenv.config({ path: './config/config.env' });

connectDB()

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
