const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 5000
// db queries
const db = require('./queries')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

app.get('/',(req,res)=>{
    res.json({
        info:"Home Route"
    })
})
app.get('/users',db.getAllUsers)
app.get('/users/:id',db.getUserById)
app.post('/users',db.createUser)
app.put('/users/:id',db.updateUser)
app.delete('/users/:id',db.deleteUser)

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})