const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors')

const app = express();
const port = 4000;

dotenv.config();

const mailgun = require('mailgun-js')({
    apiKey: 'a286924a58cbb6f3e652bdcf7803954f-4e034d9e-c0476f3b',
    domain: 'sandboxff08f6418bc2444fae4f36c1db5db1c1.mailgun.org'
});

const stripe = require('stripe')('sk_test_51NvpqjDcRCR7ntouBN4t6fMlrU7wMQYDIMKjgCk8DHMHmiO2QUlVjUwdyUgUQIyYioN1Ojc4krEBS6dbmsstYcrk00LRXn0WzK')

const admin = require('firebase-admin');
const serviceAccount = require('./devlink-2fc24-firebase-adminsdk-s4qc7-9cff28ad2b.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})
const db = admin.firestore()

app.use(cors({
  origin: 'http://localhost:3000'
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/api/email', (req, res) => {
    const { email } = req.body;
    const emailInfo = {
        from: '"Josh" <talevjoshua1@gmail.com>',
        to: `${email}`,
        subject: 'Welcome!',
        text: "Welcome to DevLinks's Daily Insider!"
    }
    console.log(emailInfo);

    mailgun.messages().send(emailInfo, (err, body) => {
        if (err) {
            console.log(err);
            res.status(500).send({ message: 'Error in sending email' });
          } else {
            console.log(body);
            res.send({ message: 'Email sent successfully' });
          }
    })
});

app.post('/api/create-checkout-session', async (req, res) => {
  const formData = req.body
  const metadata = {}
  for (let key in formData) {
    metadata[key] = String(formData[key])
  }
  
  const item = {
    price: 'price_1NvpwwDcRCR7ntouRCws9xAY',
    quantity: 1
  }

  const checkoutOptions = {
      line_items: [item],
      mode: 'payment',
      success_url: "http://localhost:3000/success?sessionId={CHECKOUT_SESSION_ID}",
      cancel_url: "http://localhost:3000/cancel",
      metadata: metadata
  }

  const session = await stripe.checkout.sessions.create(checkoutOptions)

  res.json(session)
})

app.get('/api/validate-payment/:sessionId', async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(req.params.sessionId)

  if (session.payment_status === 'paid') {
    const jobData = session.metadata
    
    const jobsCollectionRef = db.collection('jobs')
    await jobsCollectionRef.add(jobData)

    res.json({ status: 'success', message: 'Payment successful and job posted!' });
    
  } else {
    res.json({ status: 'error', message: 'Payment failed!' });
  }
})

app.listen(port, () => {
  console.log(`App is served at port ${port}`);
});
