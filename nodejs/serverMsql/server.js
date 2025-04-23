import expesss from 'express';
import mysql from 'mysql2';
import cors from 'cors';

const app = expesss();
const db = mysql.createConnection({
    host: "xxxxxxxxxx",
    user: "xxxxxxxxxx",
    password: "xxxxxxxx",
    database: "xxxxxxxx"
});

app.use(cors());
app.use(expesss.json());

app.get("/:universalURL", (req, res) => {
    console.log(req.url)
    res.send("404 URL NOT FOUND");
});

app.get('/', (req, res) => {
    console.log(req.url)
    const sql = "SELECT * FROM employee"
    db.query(sql, (err, result) => {
        if (err) return res.json({ message: 'Error inside server' })
        else res.json(result)
    })
})


app.post('/employee', (req, res) => {
    console.log(req.url)
    const sql = "INSERT INTO employee (EmpName, EmpAge, EmpDept) VALUES (?)"
    const values = [
        req.body.EmpName,
        req.body.EmpAge,
        req.body.EmpDept
    ]

    db.query(sql, [values], (err, result) => {
        if (err) return res.json(err)
        return res.json(result)
    })
})


app.get('/read/:id', (req, res) => {
    console.log(req.url)
    const sql = "SELECT * FROM employee WHERE EmpID = ?"
    const empID = req.params.id

    db.query(sql, [empID], (err, result) => {
        if (err) return res.json({ message: 'Error inside server' })
        return res.json(result)
    })
})


app.put('/update/:id', (req, res) => {
    console.log(req.url)
    const sql = "UPDATE employee SET EmpName = ?, EmpAge = ?, EmpDept =? WHERE EmpID =?"

    db.query(sql, [req.body.EmpName, req.body.EmpAge, req.body.EmpDept, req.params.id], (err, result) => {
        if (err) return res.json(err)
        return res.json(result)
    })
})

app.delete('/delete/:id', (req, res) => {
    console.log(req.url)
    const sql = "DELETE FROM employee WHERE EmpID =?"
    db.query(sql, [req.params.id], (err, result) => {
        if (err) return res.json(err)
        return res.json(result)
    })
})

app.listen(8081, () => {
    console.log('Server is running on port 8081');
})
