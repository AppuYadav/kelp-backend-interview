const expess = require('express')
const multer = require('multer')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
require('express-group-routes')
const { csv_to_json } = require('./utils')

const upload = multer({ dest: 'tmp/csv/' });

// Set path to .env file
dotenv.config({ path: './.env' });

// Initialize app
const app = expess()

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

// Assign route
app.group('/api', (router) => {
    router.post('/csv-to-json', upload.single('file'), async (req, res) => {
      const jsonData = await csv_to_json(req.file.path)
      res.json(jsonData);
    })
});

// Start server
app.listen(3000, () => {
    console.log('App listening on port 3000');
});