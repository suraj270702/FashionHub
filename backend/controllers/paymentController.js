const stripe = require("stripe")("sk_test_51Nec9rSGLrqb7o4Y5agPZP61PmWyuLNue5gWOchb57di7J4S1YNCZWznRABsGEppzsZcKn9RO0ej3x1Zy6F2FoWc00taLXNKOo")

exports.processPayment = async(req,res) => {
    try{
        const myPayment = await stripe.paymentIntents.create({
            amount : req.body.amount * 100,
            currency : "inr",
            automatic_payment_methods: {
                enabled: true,
              },
        })
        return res.status(200).json({success:true,clientSecret : myPayment.client_secret})
    }
    catch(error){
        return res.status(500).json({message : "Internal Server Error",error})
    }

}
exports.verifyPaymentId = async(req,res)=>{
    const paymentIntentId = req.query.payment_intent;

  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status === 'succeeded') {
      res.json({ isValid: true });
    } else {
      res.json({ isValid: false });
    }
  } catch (error) {
    console.error('Error verifying payment intent:', error);
    res.status(500).json({ isValid: false });
  }
}

exports.sendStripeApiKey = async(req,res) => {
    try{
       return res.status(200).json({stripe_api_key : process.env.STRIPE_API_KEY})
    }
    catch(error){
        return res.status(500).json({message : "Internal Server Error"})
    }
}