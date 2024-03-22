import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URL,
  {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    //useCreateIndex: true
  })
  .then(db => console.log('Connected to the database...'))
  .catch(error => console.log(error))