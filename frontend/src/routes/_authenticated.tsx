import { createFileRoute, Outlet } from "@tanstack/react-router";
import { userQueryOptions } from "../lib/api";
import { Button } from "../components/ui/button";

const Login = () => {
    return (
        <div className="text-center flex flex-col gap-2">
            <span className="mx-1">
                You have to login to add notes or see profile data
            </span>
            <a href="/api/login">
                <Button variant="color" className="bg-green-700">
                    Login!
                </Button>
            </a>
        </div>
    );
};

export const Route = createFileRoute("/_authenticated")({
    beforeLoad: async ({ context }) => {
        const queryClient = context.queryClient;

        try {
            const data = await queryClient.fetchQuery(userQueryOptions);
            return data;
        } catch (error) {
            return { user: null };
        }
    },
    component: Component,
});

function Component() {
    const { user } = Route.useRouteContext();
    if (!user) {
        return <Login />;
    }
    return <Outlet />;
}
