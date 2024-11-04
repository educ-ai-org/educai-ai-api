import express from 'express'
import router from './routes'

const app = express()
app.use(express.json())
app.use((req, res, next) => {
    const allowedOrigins = ['http://localhost:5173', 'http://20.51.193.153', 'http://educai.eastus.cloudapp.azure.com', "https://main.d1xp88b22uwwmk.amplifyapp.com", "https://www.educai.xyz"];
    const origin = req.headers.origin as string;

    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    next()
})
app.use(router)

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})
