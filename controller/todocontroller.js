var bodyparser = require("body-parser");
var data = [{ item: "hi" }];
var urlencodedparser = bodyparser.urlencoded({ extended: false });
var mongoose = require("mongoose");

mongoose.connect("mongodb+srv://user:user@todo-mklyd.mongodb.net/test?retryWrites=true&w=majority", {
    useNewUrlParser: true
});

var todoschema = new mongoose.Schema({
    item: String
});

var todomodel = mongoose.model("todomodel", todoschema);


module.exports = function(app) {

    app.get("/todo", function(req, res) {
        todomodel.find({}, function(err, data) {
            if (err) throw err;
            res.render("todo.ejs", { todos: data });
        })

    });

    app.post("/todo", urlencodedparser, function(req, res) {
        var newitem = todomodel(req.body).save(function(err, data) {
            if (err) throw err;
            res.json(data);
        })

    });

    app.delete("/todo/:item", function(req, res) {
        todomodel.find({ item: req.params.item.replace(/\-/g, " ") }).remove(function(err, data) {
            if (err) throw err;
            res.json({ todos: data });
        })

    });

}