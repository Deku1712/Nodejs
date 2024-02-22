const express =  require('express');
const bodyParser = require('body-parser');
var authenticate = require('../authenticate');
const dishRouter = express.Router();
const DishController = require('../Controller/DishController')
var authenticate = require('../authenticate');

// dishRouter.route('/')
//   .get((req,res,next) => {
//     res.end('Will send all dishes to hahaha')
//   })
//   .post((req,res,next) => {
//     res.end('Will add the dish: ' + req.body.name +'with details: ' + req.body.decriptions)
//   });
// dishRouter.route('/:dishId')
//   .get((req,res,next) => {
//     res.end('will send dish : ' + req.params.dishId)
//   })
//   .put((req, res, next) => {
//     res.statusCode = 200;
//     res.end('update dished : ' + req.params.dishId + ' dish name: ' + req.body.name + 'dish des :' + req.body.decriptions);
//   })
//   .delete((req,res,next) => {
//     res.statusCode = 200;
//     res.end('deleting dish susscess : ' + req.params.dishId);
//   })

dishRouter.get('/' , DishController.index )
dishRouter.post('/' ,authenticate.verifyUser, DishController.add)
dishRouter.put('/',authenticate.verifyUser, DishController.update)
dishRouter.delete('/' ,authenticate.verifyUser, DishController.deleteDish)

// By Id
dishRouter.route('/:dishId').get(authenticate.verifyUser, DishController.getById)
                            .put(authenticate.verifyUser, DishController.updateById)
                            .delete(authenticate.verifyUser, DishController.deleteById)
module.exports = dishRouter;

