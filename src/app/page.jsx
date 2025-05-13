"use client";
import SignInScreen from "./pages/SignInScreen";
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();
  const username = localStorage.getItem("username");
  if (!username) return <SignInScreen />;
  router.push("/Homepage");
}
