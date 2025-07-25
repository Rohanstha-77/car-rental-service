"use client"
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();
  console.log(session,status)

  if (status === "loading") return <p>Loading...</p>;
  if (!session) return <p>Not signed in</p>;

  const hadleSignOut = (e:React.MouseEvent<HTMLButtonElement>) => {
    signOut()
  }

  return <>
    <p>Signed in as {session.user.email} </p>
    <button onClick={hadleSignOut}>SignOut</button>
  </>;
}
