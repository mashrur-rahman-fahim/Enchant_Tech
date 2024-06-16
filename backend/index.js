import express from 'express';
import fs from "fs"

const port =4000;

 const user=JSON.parse(fs.readFileSync('./data.json','utf-8'))
const app=express();
app.use(express.json());

app.get('/',(req,res)=>{
        res.status(200).json({messege:"api is working"})

})
app.get('/api/cart',(req,res)=>{
        fs.readFile('./data.json','utf-8',(err,data)=>{
                if(err){
                        console.log(err);
                        res.status(500).send('error reading');
                        return;
                }
                res.send(JSON.parse(data));
        })
})
app.post("/api/cart",(req,res)=>{
    const {name}=req.body;
 
   const newData=JSON.stringify([...user,{name}])
   
    fs.writeFile('./data.json',newData,(err)=>{
        if(err){
                res.status(500).json({"messege":"error"});
                return;}
                res.status(201).json({"messege":"added successfully"});
    })

      
})
app.listen(port,()=>{
        console.log(`server is running on port ${port}`)
})