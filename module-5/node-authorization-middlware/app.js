import express from 'express';
import jwt from 'jsonwebtoken';


const app = express();

const port = process.env.PORT || 3000;

// Request a token
app.get('/token', (req, res) => {
    const payload = {
        name: 'John Doe'
    };
    const token = jwt.sign(payload, 'my super secret key');
    res.send(token);
});

app.get('/', (req, res) => {
    res.send('Custom Information');
});

const server = app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

