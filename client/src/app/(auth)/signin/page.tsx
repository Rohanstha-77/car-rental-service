"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";

export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const res = await signIn("credentials", {
      redirect: false, // important: handle redirect manually
      email,
      password,
    });

    if (res?.error) {
      setError(res.error);
    } else if (res?.ok) {
      // You can redirect manually on success:
      window.location.href = "/dashboard"; // or "/"
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 320, margin: "auto" }}>
      <div>
        <label htmlFor="email">Email</label><br />
        <input
          id="email"
          type="email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          style={{ width: "100%", padding: 8, marginBottom: 12 }}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label><br />
        <input
          id="password"
          type="password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          style={{ width: "100%", padding: 8, marginBottom: 12 }}
        />
      </div>
      <button type="submit" style={{ width: "100%", padding: 10 }}>
        Sign In
      </button>
      {error && (
        <p style={{ color: "red", marginTop: 12 }}>
          {error}
        </p>
      )}
    </form>
  );
}
