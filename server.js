//step import ...
const express = require('express')
const app = express()
const morgan = require('morgan')
const { readdirSync } = require('fs')
const cors = require('cors')

// const authRouter = require('./routes/auth')
// const categoryRouter = require('./routes/category')

//middleware
app.use(morgan('dev'))
app.use(express.json({ limit: '50mb' }))
app.use(cors())
// app.use('/api',authRouter)
// app.use('/api',categoryRouter)
readdirSync('./routes').map((c) => app.use('/api', require('./routes/' + c))) //map คือการ loop โดยที่ไม่ต้องเขียนคำสั่งแบบข้างบนตลอดๆ

// step3 router
// app.post('/api',(req,res)=>{
//     // code
//     const { username,password} = req.body
//     console.log(username,password)
//     res.send('Pack')
// })

// step 2 Start Server
app.listen(5500, () => console.log('server is running on port 5500'))
