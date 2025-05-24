import { Badge } from "@repo/ui/components/badge";
import { Button } from "@repo/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import { useState } from "react";
import { useAccount, useBlockNumber, useConnect, useDisconnect } from "wagmi";

import { useTheme } from "@/components/theme-provider";

export default function App() {
  const [count, setCount] = useState(0);
  const { theme, toggleTheme } = useTheme();
  const { data: blockNumber } = useBlockNumber({
    watch: true,
  });

  const account = useAccount();
  const { connect, connectors, error } = useConnect();
  const { disconnect } = useDisconnect();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold">Vite + React + shadcn/ui</h1>
          </div>
          <Button onClick={toggleTheme} variant="outline">
            {theme === "dark" ? "Light" : "Dark"} mode
          </Button>
        </div>
      </header>

      <main className="container mx-auto p-4 grid gap-6 md:grid-cols-2 lg:grid-cols-3 my-8">
        {/* Wallet Connect Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Wallet
              {account.isConnected && (
                <Badge className="ml-2" variant="outline">
                  Connected
                </Badge>
              )}
            </CardTitle>
            <CardDescription>
              Connect your wallet to interact with the dApp
            </CardDescription>
          </CardHeader>
          <CardContent>
            {account.isConnected ? (
              <div className="space-y-4">
                <div className="grid gap-1">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    <span className="font-medium">{account.status}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Address:</span>
                    <span className="font-medium truncate max-w-[200px]">
                      {account.addresses?.join(", ") || "Not available"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Chain ID:</span>
                    <span className="font-medium">{account.chainId}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid gap-4">
                <p className="text-sm text-muted-foreground">
                  Connect with one of the available wallet providers:
                </p>
                <div className="flex flex-wrap gap-2">
                  {connectors.map((connector) => (
                    <Button
                      className="flex-1 min-w-24"
                      key={connector.uid}
                      onClick={() => connect({ connector })}
                      variant="outline"
                    >
                      {connector.name}
                    </Button>
                  ))}
                </div>
                {error && (
                  <p className="text-sm text-destructive p-2 bg-destructive/10 rounded-md">
                    {error.message}
                  </p>
                )}
              </div>
            )}
          </CardContent>
          {account.isConnected && (
            <CardFooter className="flex justify-end pt-0">
              <Button onClick={() => disconnect()} variant="destructive">
                Disconnect
              </Button>
            </CardFooter>
          )}
        </Card>

        {/* Network Info Card */}
        <Card>
          <CardHeader>
            <CardTitle>Network</CardTitle>
            <CardDescription>Current blockchain network status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between py-2">
              <span className="text-muted-foreground">Latest block:</span>
              <Badge
                className="animate-pulse bg-green-500/10"
                variant="secondary"
              >
                {blockNumber ? blockNumber.toLocaleString() : "..."}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Counter Card */}
        <Card>
          <CardHeader>
            <CardTitle>Counter Demo</CardTitle>
            <CardDescription>Test HMR with state updates</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center space-y-4">
            <div className="flex items-center gap-2">
              <Button
                disabled={count === 0}
                onClick={() => setCount((c) => Math.max(0, c - 1))}
                size="icon"
                variant="outline"
              >
                -
              </Button>
              <span className="text-2xl font-bold min-w-10 text-center">
                {count}
              </span>
              <Button
                onClick={() => setCount((c) => c + 1)}
                size="icon"
                variant="outline"
              >
                +
              </Button>
            </div>
            <Button onClick={() => setCount((c) => c + 1)}>Increment</Button>
          </CardContent>
          <CardFooter className="text-xs text-muted-foreground text-center">
            Edit <code className="text-xs">src/App.tsx</code> and save to test
            HMR
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
