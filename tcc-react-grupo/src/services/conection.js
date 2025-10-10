import mysql2 from "mysql2"

const conection = await mysql2.createConnection({
    host: `localhost`,
    password: `1234`,
    user:`root`,
    database: 'tcc_frei'
})

export {conection}