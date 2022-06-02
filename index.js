const express = require('express');
const app = express();
const pool = require('./db')
const port = 5000;
const cors = require('cors');

// MIDDLEWARE
app.use(cors());
app.get(express.json());

//ROUTES//


// GET ALL FIELDS ON THE DATABASE
 app.get('/',async(req,res)=>{
     try {
        const item = await pool.query("SELECT * FROM student");
        res.json(item.rows);
     } catch (error) {
         
     }
 });

//  INSERT DATA INTO DATABASE

app.post('/todos',async(request,response)=>{
    try {
        const { first_name,last_name,middle_name,grade_1,grade_2 } = request.body;
        const todo = await pool.query(
          `INSERT INTO student (first_name,last_name,middle_name,grade_1,grade_2) VALUES($1,$2,$3,$4,$5)  RETURNING *`,
          [first_name,last_name,middle_name,grade_1,grade_2]
        );
        response.json(todo);
    } catch (error) {
        console.error(error.message);
    }
});

//GET A SPECIFIC ITEM

app.get('/todo/:id',async(request,response)=>{
    try {
        const {id} = request.body;
        const todo = await pool.query("SELECT * FROM student WHERE id = $1",[id])
        console.log(todo.rows)
    } catch (error) {
        console.error(error)
    }
});


// DELETE A TODO

app.put("/todo/:id", async (request, response) => {
  try {
    const { id } = request.body;
    const todo = await pool.query("DELETE student WHERE id = $1", [id]);
    console.log(todo.rows);
  } catch (error) {
    console.error(error);
  }
});


app.listen(port,()=>{
    console.log("Server has started on port 5000");
});

