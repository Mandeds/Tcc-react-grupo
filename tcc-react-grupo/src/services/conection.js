import mysql2 from "mysql2"
import dotenv from 'dotenv'
dotenv.config();

const conection = await mysql2.createPool({
    host: process.env.db_host,
    password: process.env.db_password,
    user:  process.env.db.db_user,
    database: 'tcc_frei'
})

export {conection}