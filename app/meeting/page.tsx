"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { AzureCommunicationTokenCredential } from "@azure/communication-common";

const CallComposite = dynamic(
  () => import("@azure/communication-react").then(mod => mod.CallComposite),
  { ssr: false }
);

export default function Page() {
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  const [entered, setEntered] = useState(false);
  const [error, setError] = useState("");

  if (entered && token && userId) {
    try {
      const cred = new AzureCommunicationTokenCredential(token);
      return (
        <div style={{ height: "100vh", display: "flex", flexDirection: "column", backgroundColor: "black" }}>
          <header style={{ color: "gold", padding: "1rem", fontSize: "1.5rem", fontWeight: "bold" }}>
            🔥 Flame Room — Global Owners' Lounge
          </header>
          <div style={{ flex: 1 }}>
            <CallComposite
              userId={{ communicationUserId: userId }}
              credential={cred}
              locator={{ groupId: "global-flame-luxury-room" }}
              styles={{ root: { height: "100%" } }}
            />
          </div>
        </div>
      );
    } catch (e) {
      setError("Invalid token");
      setEntered(false);
    }
  }

  return (
    <div style={{
      width: "100vw", height: "100vh", backgroundColor: "black",
      color: "gold", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", fontFamily: "sans-serif"
    }}>
      <h1 style={{ fontSize: "3rem" }}>🔥 Flame Room</h1>
      <h2 style={{ fontSize: "1.5rem", opacity: 0.8 }}>Global Owners' Lounge</h2>
      <div style={{ marginTop: "2rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
        <input
          placeholder="Paste ACS Token"
          value={token}
          onChange={e => setToken(e.target.value)}
          style={{ width: "400px", padding: "0.5rem", borderRadius: "8px" }}
        />
        <input
          placeholder="Paste communicationUserId (8:acs:...)"
          value={userId}
          onChange={e => setUserId(e.target.value)}
          style={{ width: "400px", padding: "0.5rem", borderRadius: "8px" }}
        />
        <button
          onClick={() => { if (token && userId) setEntered(true); else setError("Both required"); }}
          style={{ padding: "0.75rem 1.5rem", borderRadius: "8px", border: "none", backgroundColor: "gold", color: "black", fontWeight: "bold" }}
        >
          Enter Room
        </button>
        {error && <div style={{ color: "red" }}>{error}</div>}
      </div>
    </div>
  );
}
