import { createFileRoute } from "@tanstack/react-router";
import { userQueryOptions } from "../../lib/api";
import { useQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/_authenticated/profile")({
  component: Profile,
});

export default function Profile() {
  const { isPending, error, data } = useQuery(userQueryOptions);

  if (isPending) return <div>Loading</div>;
  if (error) return <div>Not logged in</div>;
  return (
    <div className="p-2">
      <h1 className="text-4xl">Hello from Profile!</h1>
      <p>{data.user.family_name}</p>
      <a href="/api/logout">Logout!</a>
    </div>
  );
}
