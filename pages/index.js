import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  return (
    <>
      <h1>MongoDB - Sandbox</h1>
      <button type="button" onClick={() => router.push("/todos")}>
        Todo-App Example
      </button>
    </>
  );
}
