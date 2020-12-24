const Pool = require('pg').Pool

// DB Connection
const pool = new Pool({
    user:'postgres',
    host:'localhost',
    database:'test',
    password:'@Nambi205062',
    port:5432
})

// Get All Users
const getAllUsers = (req,res) => {
    pool.query('SELECT * FROM users ORDER BY id ASC',(err,results)=>{
        if(err) {
            console.log(err.message)
            throw err
        }
        res.status(200).json(results.rows)
    })
}
// Get User By ID
const getUserById = (req,res) => {
    const id = parseInt(req.params.id)
    pool.query('SELECT * FROM users WHERE id = $1',[id],(err,results)=>{
        if(err){
            console.log(err.message)
            throw err
        }
        res.status(200).json(results.rows)
    })
}
// post user
const createUser = (req,res) => {
    const {name,email} = req.body
    pool.query('INSERT INTO users(name,email) VALUES ($1,$2)',[name,email],(err,results)=>{
        if(err) {
            console.log(err.message)
            throw err
        }
        res.status(201)
        //.send('User Added')
        .json(results.rows)
    })
}
// delete user
const deleteUser = (req,res) => {
    const id = parseInt(req.params.id)
    pool.query('DELETE FROM users WHERE id = $1',[id],(err,results)=>{
        if(err){
            console.log(err.message)
            throw err
        }
        res.status(200).send(`'User Deleted!! ID: ${id}`)
    })
}
// update user
const updateUser = (req,res) => {
    const id = parseInt(req.params.id)
    const {name,email} = req.body
    pool.query('UPDATE users SET name=$1,email=$2 WHERE id=$3',[name,email,id],(err,results)=>{
        if(err){
            console.log(err.message)
            throw err
        }
        res.status(200).send(`User Updated.. with ID: ${id}`)
    })
}

// exporting
module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    deleteUser,
    updateUser
}