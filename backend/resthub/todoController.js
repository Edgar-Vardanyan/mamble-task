
const Todo = require("./todoModel");

exports.index = (req, res) => {
  Todo.get((err, todos) => {
    if (err) {
      res.json({
        status: "error",
        message: err,
      });
    }
    res.json({
      status: "success",
      message: "Todos retrieved successfully",
      data: todos,
    });
  });
};

exports.new = (req, res) => {
  const todo = new Todo();
  todo.id = req.body.id ? req.body.id : todo.id;
  todo.text = req.body.text;
  todo.completed = req.body.completed;

  todo.save((err) => {
    if (err) res.json(err);

    res.json({
      message: "New todo created!",
      data: todo,
    });
  });
};

exports.view = (req, res) => {
  Todo.findById(req.params.todo_id, (err, todo) => {
    if (err) res.send(err);
    res.json({
      message: "Todo details loading..",
      data: todo,
    });
  });
};

exports.update = (req, res) => {
  Todo.findById(req.params.todo_id, (err, todo) => {
    if (err) res.send(err);
    todo.id = req.body.id ? req.body.id : todo.id;
    todo.text = req.body.text;
    todo.completed = req.body.completed;

    todo.save((err) => {
      if (err) res.json(err);
      res.json({
        message: "Todo Info updated",
        data: todo,
      });
    });
  });
};

exports.delete = (req, res) => {
  Todo.remove(
    {
      _id: req.params.todo_id,
    },
     (err, todo) => {
      if (err) res.send(err);
      res.json({
        status: "success",
        message: "Todo deleted",
      });
    }
  );
};
