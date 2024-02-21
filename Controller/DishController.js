const Dishes = require('../Models/Dishes')

const index = (req, res, next) => {
    Dishes.find({}).then((dishes) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dishes)
    }, (err) => next(err))
        .catch((err) => next(err))
}

const add = (req, res, next) => {
    Dishes.create(req.body)
        .then((dish) => {
            console.log('Dish Created ', dish);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(dish);

        })
        .catch((err) => next(err));
}

const update = (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /dishes');
}

const deleteDish = (req, res, next) => {
    Dishes.deleteMany({})
        .then((resp) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
        })
        .catch((err) => next(err));
}

const getById = (req, res, next) => {
    Dishes.findById(req.params.dishId)
        .then((dish) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(dish);
        }, (err) => next(err))
        .catch((err) => next(err));
}

const updateById = (req, res, next) => {
    Dishes.findByIdAndUpdate(req.params.dishId, {
        $set: req.body
    }, { new: true })
        .then((dish) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(dish);
        }, (err) => next(err))
        .catch((err) => next(err));
}
const deleteById = (req, res, next) => {
    Dishes.findByIdAndRemove(req.params.dishId)
        .then((resp) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
        }, (err) => next(err))
        .catch((err) => next(err));
}
module.exports = {
    index, add, update, deleteDish , getById, updateById, deleteById
}