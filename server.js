const express = require('express');
const app = express();

app.get('/hello-world', (req, res) => {
    res.send('Hello World!');
});

app.get('/health', (req, res) => {
    res.send('Healthy');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});