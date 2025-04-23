const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'xxxxxxx',
  host: 'xxxxxxx',
  database: 'xxx',
  password: 'xxxxxxxx',
  port: 5432,
});

const getEmployees = (req, res) => {
  console.log(req.url)
  const sql = "SELECT * FROM employee"
  pool.query(sql, (err, result) => {
    const rows = []
    if (result.rows.length > 0) {
      result.rows.forEach((data) => {
        const value = {
          EmpID: data.empid,
          EmpName: data.empname,
          EmpAge: data.empage,
          EmpDept: data.empdept
        }
        rows.push(value)
      });
    }
    if (err) return res.json(err)
    else res.json(rows)
  });
};


const getEmployeeById = (req, res) => {
  console.log(req.url)
  const sql = "SELECT * FROM employee WHERE empid = $1"
  const empID = req.params.id
  pool.query(sql, [empID], (err, result) => {
    const rows = []
    if (result.rows.length > 0) {
      result.rows.forEach((data) => {
        const value = {
          EmpID: data.empid,
          EmpName: data.empname,
          EmpAge: data.empage,
          EmpDept: data.empdept
        }
        rows.push(value)
      });
    }
    if (err) return res.json(err)
    return res.json(rows)
  })
};

const createEmployee = (req, res) => {
  console.log(req.url)
  const sql = "INSERT INTO employee (empName, empage, empdept) VALUES ($1,$2,$3)"
  pool.query(sql, [req.body.EmpName, req.body.EmpAge, req.body.EmpDept], (err, result) => {
    if (err) return res.json(err)
    return res.json(result.rows)
  })
}

const updateEmployee = (req, res) => {
  console.log(req.url)
  const sql = "UPDATE employee SET empname = $1, empage = $2, empdept = $3 WHERE empid = $4"
  pool.query(sql, [req.body.EmpName, req.body.EmpAge, req.body.EmpDept, req.params.id], (err, result) => {
    if (err) return res.json(err)
    return res.json(result.rows)
  })
}

const deleteEmployee = (req, res) => {
  console.log(req.url)
  const sql = "DELETE FROM employee WHERE empid =$1"
  pool.query(sql, [req.params.id], (err, result) => {
    if (err) return res.json(err)
    return res.json(result.rows)
  })
}

module.exports = {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
