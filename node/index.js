const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'node_db',
    user: 'root',
    password: 'root',
    database:'node_db'
}
const mysql = require('mysql')

const names = ["John", "Jane", "Mary", "James", "Emma", "Jacob", "Sophia", "Michael", "Olivia", "Ethan"]
const listNames = []
function getRandomName() {
    const randomIndex = Math.floor(Math.random() * names.length)
    return names[randomIndex]
}

const connection = mysql.createConnection(config)
connection.query(`CREATE TABLE IF NOT EXISTS people(id int not null auto_increment, name varchar(255), primary key(id))`)
connection.end()

app.get('/', (req, res) => {
    const name = getRandomName()
    const connection = mysql.createConnection(config)
    connection.query(`INSERT INTO people(name) VALUES ('${name}')`)

    let text = '<h1>Full Cycle Rocks!</h1><br>'

    listNames.push(name)

    for (let i = 0; i < listNames.length; i++) {
        text += `<p>${listNames[i]}</p>`
    }

    connection.end()
    res.send(text)
})

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})