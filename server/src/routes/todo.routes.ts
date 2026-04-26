import { Router } from 'express';
import * as controller from '../controllers/todo.controller';
import { validate } from '../middlewares/validate';
import { createTodoSchema, updateTodoSchema, idParamSchema, getTodosQuerySchema} from '../schemas/todo.schema';
import { asyncHandler } from '../utils/asyncHandler';
import { auth } from '../middlewares/auth';

const router = Router();

/*router.get('/', asyncHandler(controller.getTodos));*/

router.use(auth);

router.get(
  "/",
  validate({ query: getTodosQuerySchema }),
  asyncHandler(controller.getTodos)
);

router.get(
  '/:id',
  validate({ params: idParamSchema }),
  asyncHandler(controller.getTodoById)
);

router.post(
  '/',
  validate({ body: createTodoSchema }),
  asyncHandler(controller.createTodo)
);

router.put(
  '/:id',
  validate({
    params: idParamSchema,
    body: updateTodoSchema,
  }),
  asyncHandler(controller.updateTodo)
);

router.delete(
  '/completed',
  asyncHandler(controller.deleteCompleted)
);

router.delete(
  '/:id',
  validate({ params: idParamSchema }),
  asyncHandler(controller.deleteTodo)
);

export default router;

/*
import { Router } from 'express';
import * as controller from '../controllers/todo.controller';

const router = Router();

router.get('/', controller.getTodos);
router.get('/:id', controller.getTodoById); 
router.post('/', controller.createTodo);
router.put('/:id', controller.updateTodo);
router.delete('/:id', controller.deleteTodo);

export default router;


router.get(
  '/',
  validate({ query: getTodosQuerySchema }),
  controller.getTodos
);
*/ 