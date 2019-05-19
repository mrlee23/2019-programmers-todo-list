var express = require('express');
var router = express.Router();

const knex = require('knex');
let db, todolist;


(async function () {
  db = require('knex')({
    client: 'mysql',
    connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DBNAME
    }
  });
  const TableInitializer = require('../middleware/TableInitializer');
  const tableInitializer = new TableInitializer(db);
  await tableInitializer.createTable();

  const TodoList = require('../middleware/TodoList');
  todolist = new TodoList(db);
})();

async function executeAndResponse (req, res, func, errorCode) {
  try {
    console.log(req.body);
    res.send(await func() || 200).end();
  } catch (err) {
    console.log(err)
    res.send(errorCode || 500).end();
  }
}


// todo list를 모두 가져온다.
router.get('/lists', async function(req, res, next) {
  executeAndResponse(req, res,
      async () => {
        return await todolist.getList();
      });
});

// todo list를 추가한다.
router.post('/lists', async function(req, res, next) {
  let { body } = req;

  executeAndResponse(req, res,
      async () => {
        await todolist.addElement(body);
      });
});

// todo list를 수정한다.
router.put('/lists/:id', async function(req, res, next) {
  let {body, params} = req;

  executeAndResponse(req, res,
      async () => {
        await todolist.modifyElement(body, params.id);
      });
});

// todo list를 삭제한다.
router.delete('/lists/:id', async function(req, res, next) {
  let {params} = req;

  executeAndResponse(req, res,
      async () => {
        await todolist.deleteElement(params.id);
      });
});

module.exports = router;
