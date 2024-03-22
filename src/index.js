require('dotenv').config();
import app from './app'
import './database'

const PORT = process.env.PORT || 3030;

app.listen(PORT)
console.log('Server running on port: ', PORT);