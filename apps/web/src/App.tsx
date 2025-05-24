import { useState } from "react";
import { useAccount, useBlockNumber, useConnect, useDisconnect } from "wagmi";

// shadcn/ui components
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from "@repo/ui/components/card";
import { Button } from "@repo/ui/components/button";
import { Badge } from "@repo/ui/components/badge";
import { useTheme } from "@/components/theme-provider";
import viteLogo from "/vite.svg";
import reactLogo from "./assets/react.svg";

export default function App() {
  const [count, setCount] = useState(0);
  const { theme, toggleTheme } = useTheme();
  const { data: blockNumber } = useBlockNumber({
    watch: true,
  });

  // wagmi hooks
  const account = useAccount();
  const { connectors, connect, error } = useConnect();
  const { disconnect } = useDisconnect();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold">Vite + React + shadcn/ui</h1>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Block:</span>
              <Badge
                variant="outline"
                className="animate-pulse bg-green-500/10"
              >
                {blockNumber ? blockNumber.toLocaleString() : "..."}
              </Badge>
            </div>
          </div>
          <Button variant="outline" onClick={toggleTheme}>
            {theme === "dark" ? "Light" : "Dark"} mode
          </Button>
        </div>
      </header>

      <main className="container mx-auto p-4 grid gap-6 md:grid-cols-2 lg:grid-cols-3 my-8">
        {/* Wallet Connect Card */}
        <Card className="md:col-span-2 lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Wallet
              {account.isConnected && (
                <Badge variant="outline" className="ml-2">
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
                      key={connector.uid}
                      onClick={() => connect({ connector })}
                      variant="outline"
                      className="flex-1 min-w-24"
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
              <Button variant="destructive" onClick={() => disconnect()}>
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
                variant="secondary"
                className="animate-pulse bg-green-500/10"
              >
                {blockNumber ? blockNumber.toLocaleString() : "..."}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Hero Section Card */}
        <Card className="md:col-span-2 lg:col-span-3">
          <CardContent className="flex flex-col items-center justify-center py-8 space-y-6">
            <div className="flex items-center gap-8">
              <a
                href="https://vite.dev"
                target="_blank"
                rel="noreferrer"
                className="transition-transform hover:scale-110"
              >
                <img
                  src={viteLogo}
                  alt="Vite logo"
                  className="h-24 w-24 animate-spin"
                  style={{ animationDuration: "10s" }}
                />
              </a>
              <a
                href="https://react.dev"
                target="_blank"
                rel="noreferrer"
                className="transition-transform hover:scale-110"
              >
                <img src={reactLogo} alt="React logo" className="h-24 w-24" />
              </a>
            </div>
            <div className="text-center space-y-2">
              <h1 className="text-4xl font-bold">
                Vite + React + TS + shadcn/ui
              </h1>
              <p className="text-muted-foreground">
                Modern web development stack with type safety and beautiful UI
              </p>
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
                variant="outline"
                size="icon"
                onClick={() => setCount((c) => Math.max(0, c - 1))}
                disabled={count === 0}
              >
                -
              </Button>
              <span className="text-2xl font-bold min-w-10 text-center">
                {count}
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCount((c) => c + 1)}
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

      <footer className="border-t py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Click on the Vite and React logos to learn more</p>
        </div>
      </footer>
    </div>
  );
}
