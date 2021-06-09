const express = require('express')
const linksRoute = require('./routes/links')
const redirRoute = require('./routes/redirection')
const adminRoute = require("./routes/admin")
const cors = require("cors")
const PORT = 4445;
const app = express()

app.use(cors({
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true
}));

app.use(express.json());

app.use('/', redirRoute);
app.use('/api/links', linksRoute);
app.use('/admin/all', adminRoute);


app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`)
});