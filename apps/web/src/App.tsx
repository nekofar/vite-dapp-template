import { useState } from "react";

import { useAccount, useBlockNumber, useConnect, useDisconnect } from "wagmi";

// shadcn/ui components
import { Card, CardContent } from "@repo/ui/components/card";
import { Button } from "@repo/ui/components/button";
import { useTheme } from "@/components/theme-provider";
import viteLogo from "/vite.svg";
import reactLogo from "./assets/react.svg";

function App() {
  const [count, setCount] = useState(0);
  const { theme, toggleTheme } = useTheme();
  const { data: blockNumber } = useBlockNumber();

  // wagmi hooks
  const account = useAccount();
  const { connectors, connect, status, error } = useConnect();
  const { disconnect } = useDisconnect();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 space-y-8">
      {/* wallet connect */}
      <div className="flex space-x-2">
        <div>
          status: {account.status}
          <br />
          addresses: {JSON.stringify(account.addresses)}
          <br />
          chainId: {account.chainId}
        </div>

        {account.isConnected ? (
          <Button variant="destructive" onClick={() => disconnect()}>
            Disconnect
          </Button>
        ) : (
          <>
            {connectors.map((connector) => (
              <Button
                key={connector.uid}
                onClick={() => connect({ connector })}
                type="button"
              >
                {connector.name}
              </Button>
            ))}
            <div>{status}</div>
            <div>{error?.message}</div>
          </>
        )}
      </div>

      {/* Theme toggle */}
      <Button variant="outline" onClick={toggleTheme} className="self-end">
        Switch to {theme === "dark" ? "light" : "dark"}
      </Button>

      {/* Logos */}
      <div className="flex space-x-8">
        <a href="https://vite.dev" target="_blank" rel="noreferrer">
          <img
            src={viteLogo}
            alt="Vite logo"
            className="h-24 w-24 animate-spin"
          />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img
            src={reactLogo}
            alt="React logo"
            className="h-24 w-24 hover:opacity-75 transition"
          />
        </a>
      </div>

      {/* Heading */}
      <h1 className="text-4xl font-bold">Vite + React + TS + shadcn/ui 🚀</h1>

      {/* Latest block number */}
      <p>Latest block: {blockNumber ?? "..."}</p>

      {/* Counter Card */}
      <Card className="w-full max-w-sm">
        <CardContent className="flex flex-col items-center space-y-4">
          <Button onClick={() => setCount((c) => c + 1)}>
            count is {count}
          </Button>
          <p className="text-sm text-muted-foreground">
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </CardContent>
      </Card>

      {/* Footer text */}
      <p className="text-sm text-center text-muted-foreground">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;
