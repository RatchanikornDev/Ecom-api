const prisma = require('../config/prisma')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
  try {
    // code
    const { email, password } = req.body
    //step1 Validate body
    if (!email) {
      return res.status(400).json({ message: 'Email is requied!!!' })
    }
    if (!password) {
      return res.status(400).json({ message: 'Password is requied!!!' })
    }
    //step 2 Check email in DB already yet ?
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    })
    if (user) {
      return res.status(400).json({ message: 'Email already exits!!' })
    }
    //step 3 HashPassword
    const hashPassword = await bcrypt.hash(password, 10)

    //step4 Register
    await prisma.user.create({
      data: {
        email: email,
        password: hashPassword,
      },
    })

    res.send('Register Success')
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Server Error' })
  }
}

exports.login = async (req, res) => {
  try {
    //code
    const { email, password } = req.body
    //step1 check Email
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    })
    if (!user || !user.enabled) {
      return res.status(400).json({ message: 'User Not found or Not enabled' })
    }
    //step2 check Password
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: 'Password Invalid!!!' })
    }
    //step3 create Payload
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    }
    //step4 Generate Token
    jwt.sign(payload, process.env.SECRET, { expiresIn: '7d' }, (err, token) => {
      if (err) {
        return res.status(500).json({ message: 'server Error' })
      }
      res.json({ payload, token })
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Server Error' })
  }
}

exports.currentUser = async (req, res) => {
  try {
    //code
    const user = await prisma.user.findFirst({
      where:{ email:req.user.email },
      select:{
        id: true,
        email: true,
        name: true,
        role: true
      }
    })
    res.json({user})
  } catch (err) {
    //err
    console.log(err)
    res.status(500).json({ message: 'Server Error' })
  }
}
