import mongoose from 'mongoose'

mongoose.connect("mongodb+srv://mokanadev:Man0t4$2024@myprojects.hp8g9bd.mongodb.net/stockapp",
  {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    //useCreateIndex: true
  })
  .then(db => console.log('Connected to the database...'))
  .catch(error => console.log(error))