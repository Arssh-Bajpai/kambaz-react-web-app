import { useSelector, useDispatch } from "react-redux";
import { addTodo, updateTodo, setTodo } from "./todosReducer";
import { Button, FormControl, ListGroup } from "react-bootstrap";

export default function TodoForm(
) {
  const { todo } = useSelector((state: any) => state.todosReducer);
  const dispatch = useDispatch();
  return (
    <ListGroup.Item>
      <Button onClick={() => dispatch(addTodo(todo))}
              id="wd-add-todo-click"> Add </Button>
      <Button onClick={() => dispatch(updateTodo(todo))}
              id="wd-update-todo-click"> Update </Button>
      <FormControl
        defaultValue={todo.title}
        onChange={(e) => dispatch(setTodo({ ...todo, title: e.target.value }))}/>
    </ListGroup.Item>
);}
