const express = require('express');
const app = express();

const PORT = process.env.PORT || 5000;


// Landing page
app.get('/', (req, res) => {
    res.send('landing page');
});



app.listen(PORT, console.log(`Server running on port ${PORT}`));