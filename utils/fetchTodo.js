export default async function fetchTodo({
  method,
  body,
  mutate = () => console.log("fetched without mutate"),
}) {
  try {
    const response = await fetch("/api/todos", {
      method,
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      mutate();
    }
  } catch (error) {
    console.error(error.message);
  }
}
