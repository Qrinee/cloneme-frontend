import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";

export default function WelcomeSection({ user }) {
  return (
    <section className="w-full py-8 px-4 rounded-xl shadow-md mt-6 border max-w-7xl mx-auto">
      <h1 className="text-gray-400">Welcome back,</h1>
      <Avatar className="h-8 w-8 rounded-lg">
        <AvatarFallback className="rounded-lg">
          {user?.username?.[0]?.toUpperCase() || "U"}
        </AvatarFallback>
      </Avatar>
    </section>
  );
}