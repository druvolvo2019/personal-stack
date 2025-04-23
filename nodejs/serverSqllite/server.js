import expesss from 'express';
import cors from 'cors';
import sqllite from 'better-sqlite3';

const app = expesss();
const db = new sqllite('ourApp.db');
db.pragma('journal_mode = WAL');


const createTables = db.transaction(() => {
    db.prepare(`CREATE TABLE IF NOT EXISTS employee (
        EmpID INTEGER PRIMARY KEY AUTOINCREMENT,
        EmpName STRING, 
        EmpAge INTEGER, 
        EmpDept STRING
        )
        `).run();

})

createTables();

app.use(cors());
app.use(expesss.json());

app.get("/:universalURL", (req, res) => {
    console.log(req.url)
    res.send("404 URL NOT FOUND");
});

app.get('/', (req, res) => {
    try {
        console.log(req.url)
        const sql = "SELECT * FROM employee"
        const getEmployeeStatement = db.prepare(sql);
        const employees = getEmployeeStatement.all();
        res.json(employees)
    }
    catch (err) {
        if (err) return res.json(err)
    }
})

app.post('/employee', (req, res) => {
    try {
        console.log(req.url)
        const sql = "INSERT INTO employee (EmpName, EmpAge, EmpDept) VALUES (?,?,?)"
        const ourStatement = db.prepare(sql);
        const result = ourStatement.run(req.body.EmpName, req.body.EmpAge, req.body.EmpDept);
        res.json(result)
    }
    catch (err) {
        if (err) return res.json(err)
    }
})

app.get('/read/:id', (req, res) => {
    try {
        console.log(req.url)
        const sql = "SELECT * FROM employee WHERE EmpID = ?"
        const empID = req.params.id
        const getPostIdStatement = db.prepare(sql); //select the get
        const result = [getPostIdStatement.get(empID)];
        console.log(result)
        res.json(result)
    }
    catch (err) {
        if (err) return res.json(err)
    }
})

app.put('/update/:id', (req, res) => {
    try {
        console.log(req.url)
        const sql = "UPDATE employee SET EmpName = ?, EmpAge = ?, EmpDept =? WHERE EmpID =?"
        const ourStatement = db.prepare(sql);   //update the post
        const result = ourStatement.run(req.body.EmpName, req.body.EmpAge, req.body.EmpDept, req.params.id);
        console.log(result)
        res.json(result)
    }
    catch (err) {
        if (err) return res.json(err)
    }
})

app.delete('/delete/:id', (req, res) => {
    try {
        console.log(req.url)
        const sql = "DELETE FROM employee WHERE EmpID =?"
        const ourStatement = db.prepare(sql);   //delete the post
        const result = ourStatement.run(req.params.id);
        console.log(result)
        res.json(result)
    }
    catch (err) {
        if (err) return res.json(err)
    }
})


app.listen(8082, () => {
    console.log('Server is running on port 8082');
})
