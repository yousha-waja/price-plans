import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import * as sqlite from 'sqlite';

const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use(cors());

const  db = await sqlite.open({
    filename:  './data-plan.db',
    driver:  sqlite3.Database
});
console.log('You are now connected to the database!')
await db.migrate(); 

const PORT = process.env.PORT || 3011;
app.listen(PORT, () => console.log(`Server started ${PORT}`));

app.get('/api/price_plans/', async (req,res)=>{
    const price_plans = await db.all('Select * from price_plan limit 10')
    res.json({
     price_plans
    })
});

app.post('/api/phonebill/', async (req,res)=>{
   const price_plan = await db.get('select * from price_plan where plan_name=?', req.body.price_plan.toLowerCase());
   if(price_plan){
    const action = req.body.actions;
    let total =0;
    let error = '';
    let array = action.split(",");
    for(let i=0;i<array.length;i++){
     if(array[i].trim().toLowerCase() === 'sms'){
         total += price_plan.sms_price
     }
     else if (array[i].trim().toLowerCase() === 'call'){
         total += price_plan.call_price
     }
     else {
          error = "incorrect data input! Data usage should only contain 'sms' or 'call' separated by commas."
     }
    };
 
    if(error){
     res.json({
         error
       }) 
    }else{ 
     res.json({
         total : `Your total phone bill = R${total.toFixed(2)}`
   })};
   }
   else{
    res.json({
        error : "There is no data plan with that name."
      }) 
   }
});

app.post('/api/price_plan/create', async (req,res)=>{
   const check = await db.get("select * from price_plan where plan_name = ?", req.body.plan_name);
   
   if(check){
     res.json({
        error: "price plan already exists."
     })
   }
   else{
    await db.run("insert into price_plan (plan_name, sms_price, call_price) values (?, ?, ?);", [req.body.plan_name, req.body.sms_price, req.body.call_price]);
    res.json({
     message: 'The new price plan you entered was successfully created.'
    })
   }
});

app.post('/api/price_plan/update', async (req,res)=>{
    const check = await db.get("select * from price_plan where plan_name = ?", req.body.plan_name);
    if(check){
        await db.run("update price_plan set sms_price=?, call_price=? where plan_name =?",[req.body.sms_price,req.body.call_price,req.body.plan_name]);
        res.json({
            message : "The price plan you entered was successfully updated.",
        })
    }
    else {
        res.json({
            error : "There is no price plan with that name."
        })
    }
});


app.post('/api/price_plan/delete', async (req,res)=>{
    const check = await db.get("select * from price_plan where plan_name = ?", req.body.plan_name);
    if(check){
        await db.run("delete from price_plan where plan_name=?", req.body.plan_name);
        res.json({
            message : "The price plan you entered was successfully deleted.",
        })
    }
    else {
        res.json({
            error : "There is no price plan with that name."
        })
    }
});




