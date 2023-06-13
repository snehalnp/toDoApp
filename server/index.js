const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "crud_task"

});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/api/get", (req, res) => {
    const sqlGet = "SELECT * FROM task";
    db.query(sqlGet, (error, result) => {
        res.send(result);
    });

}); 

app.post("/api/post", (req, res) => {
    const {taskName} = req.body;
    const sqlInsert = "INSERT INTO task (taskName) VALUES (?)";
    db.query(sqlInsert, taskName, (error, result) => {
        if (error){
            console.log(error);
        }
    });

}); 

app.delete("/api/remove/:id", (req, res) => {
    const {id} = req.params;
    const sqlRemove = "DELETE FROM task WHERE id = ?";
    db.query(sqlInsert, id, (error, result) => {
        if (error){
            console.log(error);
        }
    });

}); 

app.get("/api/get/:id", (req, res) => {
    const {id} = req.params;
    const sqlGet = "SELECT * FROM task where id = ?";
    db.query(sqlGet, id, (error, result) => {
        if(error){
            console.log(error);
        }
        res.send(result);
    });
}); 

app.put("/api/update/:id", (req, res) => {
    const { id } = req.params;
    const {taskName}= req.body;
    const sqlUpdate = "UPDATE task SET taskName = ? WHERE id = ? ";
    db.query(sqlUpdate, [taskName, id], (error, result) => {
        if(error){
            console.log(error);
        }
        res.send(result);
    });

}); 

app.get("/", (req, res) => {
    // const sqlInsert = "INSERT INTO task (taskName) VALUES ('fight fears')";
    // db.query(sqlInsert, (error, result) => {
    //     console.log("error",error);
    //     console.log("result", result);
    //     res.send("Hello ");
    // });
});

app.listen(5000, () =>{
    console.log("Server is running on port 5000");
})