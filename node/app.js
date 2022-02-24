const express = require('express')
const cors = require('cors')
const mysql = require('mysql')

const app = express()
const port = 3000

app.use(cors())

const connection = mysql.createConnection({
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'people'
})
let sql = 'CREATE TABLE people (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255))'
connection.query(sql)

sql = `INSERT INTO people (name) VALUES ('Caio')`
connection.query(sql)

app.get('/', (request, response) => {

  sql = 'SELECT * FROM people'
  connection.query(sql, (err, result, fields) => {
    if (err) response.send('Error in DB')

    const nameList = () => {
      return result.map(people => {
        return `<li>${people.name}</li>`
      })
    }
    response.send(`
      <h1>Full Cycle Rocks!</h1>
      <ul>
        ${nameList()}
      </ul>
    `)
  })

})

app.listen(port, () => console.log('App running on port 3000'))
