import express from 'express'
import router from './routes'

import trascribeRouter from './routes/transcribe'

const app = express()
app.use(router)
app.use(trascribeRouter)

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})
