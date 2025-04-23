const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 8083;


const db = require('./queries');
app.use(express.json());
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/', db.getEmployees);
app.get('/read/:id', db.getEmployeeById);
app.post('/employee', db.createEmployee);
app.put('/update/:id', db.updateEmployee);
app.delete('/delete/:id', db.deleteEmployee);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
