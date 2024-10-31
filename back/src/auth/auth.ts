import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { sign, verify } from 'hono/jwt'

const auth = new Hono()

auth.use('/*', cors({
  origin: "*"
}))

const api_key = Bun.env.SECRET_API_KEY

auth.get('/', (c) => {
  return c.text('hellou from auth api')
})

auth.post('/authWithUserAndPass', async (c) => {    
    const body = await c.req.json()
    const { identity, password } = body

    if (identity == "" || password == ""){
      return c.json({'message': 'bad credentials'}, 400)
    }
    
    const payload = { name: identity, exp: Math.floor(Date.now() / 1000) + 10 } //60 * 60
    const token = await sign(payload, api_key)

    return c.json({'message': 'everything is allraight', 'token': token})
})

//////////////////////////////////////////////////////////////////////////
auth.get('/protected', async (c) => {
  const authHeader = c.req.header('Authorization');
  console.log('header: ' + authHeader)
  
  if (!authHeader) {
    return c.json({ message: 'Authorization header is missing' }, 401);
  }
  
  const token = authHeader.split(' ')[1];
  console.log('token:' + token)
  

  try {
    const verifiedToken = await verify(token, api_key);
    console.log(verifiedToken)
    return c.json(verifiedToken)
    
  } catch (error) {
    return c.json({ message: 'Invalid token' }, 401);
  }
})



export default auth
