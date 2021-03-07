const express = require('express')
const path = require('path')
const cors = require('cors')
const e = require('express')
const { error } = require('console')

const app = express()
const port = 4040

app.use(cors())
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, '../', 'public')))

console.log(__dirname)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use((req, res, next) => {
  const error = new Error('404 not found')
  error.status = 404
  next(error);
})

app.use((error , req, res, next) => {
  console.log(error)
  if(error.status == 404) {
    res.status(404);
    return res.render('errors/404');
  }

  res.status(500)
  res.render('errors/500');
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})