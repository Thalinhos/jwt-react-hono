import { Hono } from 'hono'
import auth from './auth/auth'

const app = new Hono() //honojs

app.route('/auth', auth)// auth_routes

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

export default app
