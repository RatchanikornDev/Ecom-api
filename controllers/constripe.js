const prisma = require('../config/prisma')
const stripe = require("stripe")('sk_test_51Qj7taPu8CdOZPNUGdUgKBHMOfwxuAe4BUOajoduwN4LGYImuKBh4tP6D2jmfpJ6h1C9YZ9zPUr5tGpCsNUuT4ZF00ak5S5WYF')
exports.payment = async (req, res) => {
  try {
    //code
    //CHeck user
    const cart = await prisma.cart.findFirst({
        where:{
            orderedById: req.user.id
        }
    })
const amountTHB = cart.cartTotal * 100


// Create a PaymentIntent with the order amount and currency
const paymentIntent = await stripe.paymentIntents.create({
    amount: amountTHB,
    currency: "thb",
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });

  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'server Error' })
  }
}
