const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

const { csv_to_json } = require('./utils')

console.log(process.env.CSV_FILE_PATH)
const jsonData = csv_to_json(process.env.CSV_FILE_PATH, false)