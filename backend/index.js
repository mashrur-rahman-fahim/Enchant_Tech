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
app.delete('/api/cart/:id',(req,res)=>{
    const {id}=req.params;
    fs.readFile('./data.json','utf-8',(err,data)=>{
        if(err)
            {
                res.status(500).json({message:"error reading file"})
                return ;
            }
            const user=JSON.parse(data);
            console.log(user);
            const user_find=user.find((usr)=>usr.id===(id-'0'));
            if(!user_find){
                res.status(404).json({message:"user not found"})
                return;}
                res.status(201).json({message:"found"});
                const newUser=user.filter((usr)=>usr.id!=(id-'0'))
                const newData=JSON.stringify(newUser);
                fs.writeFile('./data.json',newData,(err)=>{
                    if(err){
                        res.status(500).json({message:"error writing file"})
                        return;}
                        res.status(201).json({message:"deleted successfully"});
                })
           
            
            


    })
    
})
app.get('/login',(req,res)=>{
    fs.readFile('./login_data.json','utf-8',(err,data)=>{
        if(err){
            return;}
            res.status(201).send(JSON.parse(data));
    })
})
app.post('/login',(req,res)=>{
    const{name,email,password}=req.body;
    fs.readFile('./login_data.json','utf-8',(err,data)=>{
        if(err){
            return;}
            const User=JSON.parse(data);
            const newUser=JSON.stringify([...User,{name,email,password}])
            fs.writeFile('./login_data.json',newUser,(err)=>{
                if(err){
                    return ;}
                    res.status(201).json({message:"user created successfully"});
            })


    })
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
