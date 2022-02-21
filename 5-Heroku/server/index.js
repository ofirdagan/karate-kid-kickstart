const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const todo_service = require('./todo_service')

const app = express()
const port = 3000

const items = {};

app.use(cors({
  origin: true,
  credentials: true
}));
app.use(
  express.urlencoded({
    extended: true
  })
);
app.use(express.json());
app.use(cookieParser());

app.get('/todos', todo_service.getItems);

app.post('/todos', todo_service.createItem);

app.put('/todos/:id', todo_service.editItem);

app.delete('/todos/:id', todo_service.deleteItem);

app.listen(port, () => {
  console.log(`My Checklist server listening on port ${port}`)
})
