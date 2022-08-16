
const router = require('express').Router();

router.get('/', (req, res) => {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to RESTHub crafted with love!',
    });
});

const todoController = require('./todoController');
const optionsController = require("./optionsController")

router.route('/todos')
    .get(todoController.index)
    .post(todoController.new);
router.route('/todos/:todo_id')
    .get(todoController.view)
    .patch(todoController.update)
    .put(todoController.update)
    .delete(todoController.delete);
router.route('/options')
    .get(optionsController.indexOptions)
    .post(optionsController.newOptions);
router.route('/options/:options_id')
    .get(optionsController.view)
    .patch(optionsController.update)
    .put(optionsController.update)
    .delete(optionsController.delete);    

module.exports = router;