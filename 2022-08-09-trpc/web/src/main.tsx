import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import "./index.css";
import { trpc } from "./trpc";

function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() => {
    const token = localStorage.getItem("token");
    return trpc.createClient({
      url: `${import.meta.env.VITE_API_URL}/trpc`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  });

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <Sample />
      </QueryClientProvider>
    </trpc.Provider>
  );
}

function Sample() {
  const hello = trpc.useQuery(["hello", "My message"]);
  const createTodo = trpc.useMutation(["createTodo"]);

  return (
    <div>
      <div>{hello.isLoading ? "Loading..." : hello.data?.message}</div>
      <button
        disabled={createTodo.isLoading}
        onClick={() => {
          createTodo.mutate({
            title: "My new todo",
          });
        }}
      >
        {createTodo.isLoading ? "Creating..." : "Create"}
      </button>
      <pre>{JSON.stringify(createTodo.data, null, 2)}</pre>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
