require('dotenv').config();

import express from 'express'
import morgan from 'morgan'
import pkg from '../package.json'

import { createDefaultRoles } from './libs/defaultSetup' //Create default roles

import productsRoutes from './routes/products.routes'
import authRoutes from './routes/auth.routes'
import usersRoutes from './routes/users.routes'


const app = express()
createDefaultRoles()

app.set('pkg', pkg)

app.use(morgan('dev'));
app.use(express.json())//Server gets data in JSON format

app.get('/', (req,res) => {
  res.json({
    name: app.get('pkg').name,
    author: app.get('pkg').author,
    description: app.get('pkg').description,
    version: app.get('pkg').version
  })
})

app.use('/api/products', productsRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/user', usersRoutes)

export default app;

