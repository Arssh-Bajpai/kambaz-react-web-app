import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";
import { Button, ListGroup } from "react-bootstrap";

type Todo = {
  id: string;
  title: string;
};

type TodoItemProps = {
  todo: Todo;
};

export default function TodoItem({ todo }: TodoItemProps) { // ✅ Fix: Explicitly type props
  const dispatch = useDispatch();

  return (
    <ListGroup.Item key={todo.id}>
      <Button onClick={() => dispatch(deleteTodo(todo.id))}
              id="wd-delete-todo-click"> 
        Delete 
      </Button>
      <Button onClick={() => dispatch(setTodo(todo))}
              id="wd-set-todo-click"> 
        Edit 
      </Button>
      {todo.title}
    </ListGroup.Item>
  );
}
