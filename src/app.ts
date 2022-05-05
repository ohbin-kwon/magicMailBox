import express from 'express'

const app = express()
const PORT = 3000

app.get('/', (req, res) => {
  res.send('server is ready')
})

app.listen(PORT, () => {
	console.log(`App listening at PORT: ${PORT}`)
})

export default app