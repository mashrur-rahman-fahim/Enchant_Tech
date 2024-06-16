import express from 'express';
import fs from 'fs';
import cors from "cors"


const port = 4000;
const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.status(200).json({ message: "API is working" });
});

app.get('/api/cart', (req, res) => {
    fs.readFile('./data.json', 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error reading file');
            return;
        }
        res.status(200).send(JSON.parse(data));
    });

});

app.post('/api/cart', (req, res) => {
    const { id, img, title, description, price, cat, brand, date } = req.body;
  const newProduct = { id, img, title, description, price, cat, brand,date};
    fs.readFile('./data.json', 'utf-8', (err, data) => {
        if (err) {
            res.status(500).json({ message: "Error reading file" });
            return;
        }

        const users = JSON.parse(data);
       
       const newData = JSON.stringify([...users,newProduct]);

        fs.writeFile('./data.json', newData, (err) => {
            if (err) {
                res.status(500).json({ message: "Error writing file" });
                return;
            }
            res.status(201).json({ message: "Added successfully" });
        });
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
