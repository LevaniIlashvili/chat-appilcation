"use client";
import { signOut } from "next-auth/react";

const DashboardPage = () => {
  let chats = [];

  return (
    <main className="pt-32 pl-14">
      <h1 className="text-5xl font-bold mb-6">Recent Chats</h1>
      {chats.length === 0 && <p>No chats yet...</p>}
      <button onClick={() => signOut()}>Sign out</button>
    </main>
  );
};

export default DashboardPage;
