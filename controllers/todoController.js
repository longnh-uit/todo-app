// var data = [{item: 'get milk'}, {item: 'walk dog'}, {item: 'kick some coding ass'}];
var mongoose = require('mongoose');

// Connect to the database
mongoose.connect('mongodb+srv://test:test@todo.aszqi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology: true })

// Create a schema - this is like a blueprint
var todoSchema = new mongoose.Schema({
    item: String
});

var Todo = mongoose.model('Todo', todoSchema);

module.exports = app => {
    app.get('/todo', (req, res) => {
        // get data from mongodb and pass it to view
        Todo.find({}, (err, data) => {
            if (err) throw err;
            res.render('todo', {todos: data});
        });
    });

    app.post('/todo', (req, res) => {
        // get data from the view and add it to mongodb
        var newTodo = Todo(req.body).save((err, data) => {
            if (err) throw err;
            res.json(data);
        });
    });

    app.delete('/todo/:item', (req, res) => {
        // delete the requested item from mongodb
        Todo.deleteOne({item: req.params.item.replace(/\-/g, " ")}, (err, data) =>{
            if (err) throw err;
            res.json(data);
        });
    });
}