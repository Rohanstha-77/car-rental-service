"use client"
import { signOut, useSession } from "next-auth/react";
import Navbar from "@/components/Navbar";
import Loader from "@/components/Loader";

export default function Home() {
  const { data: session, status } = useSession();

  if (status === "loading") return <Loader/>
  if (!session) return <p>Not signed in</p>;

  return <>
  <Navbar status={status}/>
  </>;
}
