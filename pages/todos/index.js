import { useRouter } from "next/router";
import useSWR from "swr";
import fetchTodo from "../../utils/fetchTodo";

export default function Home() {
  const router = useRouter();
  const { data: todos, mutate } = useSWR("/api/todos");

  return (
    <>
      <h1>TO-DO App</h1>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          const name = event.target.elements.todoInput.value;
          fetchTodo({ method: "POST", body: { name, isDone: false }, mutate });
        }}
      >
        <label>
          I want to:
          <input required type="text" name="todoInput" />
        </label>
        <button type="submit">add</button>
      </form>

      <ul>
        {todos?.map((todo) => (
          <li key={todo._id}>
            <input
              type="checkbox"
              checked={todo.isDone}
              onChange={() => {
                fetchTodo({
                  method: "PUT",
                  body: {
                    todoID: todo._id,
                    updatedTodo: { ...todo, isDone: !todo.isDone },
                  },
                  mutate,
                });
              }}
            />
            <span style={{ textDecoration: todo.isDone && "line-through" }}>
              {todo.name}
            </span>
            <button
              type="button"
              onClick={() => router.push(`/todos/${todo._id}`)}
            >
              edit
            </button>
          </li>
        ))}
      </ul>

      <hr />
      <button type="button" onClick={() => router.push("/")}>
        back to root.
      </button>
    </>
  );
}
