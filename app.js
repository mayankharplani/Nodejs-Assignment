const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const schoolRoutes = require('./routes/schoolRoutes');

dotenv.config();


app.use(bodyParser.json());

app.use('/', schoolRoutes);

const PORT =  3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});