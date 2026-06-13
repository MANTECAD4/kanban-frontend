import { useAuthStore } from "@/providers/store/auth.store";

export const Dashboard = () => {
  const name = useAuthStore((state) => state.name);
  return <div>Dashboard - hello {name}</div>;
};
