import { useRouter } from "next/router";
import { useState } from "react";
import useSWR from "swr";
import fetchTodo from "../../utils/fetchTodo";

export default function Home() {
  const {
    query: { id },
    push,
  } = useRouter();

  const { data: todo, mutate } = useSWR(id ? `/api/todos/${id}` : null);
  const [editMode, setEditMode] = useState(false);
  const [inputValue, setInputValue] = useState("");

  if (!todo) {
    return <p>404, sag ich jetzt einfach mal so.</p>;
  }

  return (
    <>
      <h1>Details</h1>
      {editMode ? (
        <form
          onSubmit={(event) => {
            event.preventDefault();

            fetchTodo({
              method: "PUT",
              body: {
                todoID: todo._id,
                updatedTodo: {
                  ...todo,
                  name: inputValue,
                },
              },
              mutate,
              // Instead of passing mutate you could push to root to revalidate.
            });
            //like this: push("/");
            setEditMode(false);
          }}
        >
          <input
            type="text"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
          />
          <button type="submit">save changes</button>
        </form>
      ) : (
        <>
          <span>{todo.name}</span>
          <br />
          <span>
            {todo.isDone ? "Is already done." : "Still needs to be done."}
          </span>
          <br />
          <button
            type="button"
            onClick={() => {
              setInputValue(todo.name);
              setEditMode(true);
            }}
          >
            edit
          </button>
          <hr />
          <span>created at: {todo.createdAt}</span>
          <br />
          <span>last update: {todo.updatedAt}</span>
        </>
      )}
      <hr />
      <button type="button" onClick={() => push("/todos")}>
        back to todo-app overview
      </button>
    </>
  );
}
