import { createFileRoute } from "@tanstack/react-router";
import NoteList from "../components/NoteList";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="text-3xl font-bold bg-gray-700 text-white h-screen text-center">
      <h3>Welcome Home!</h3>
      <NoteList />
    </div>
  );
}
