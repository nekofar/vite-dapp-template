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
import {
  useAccount,
  useBlockNumber,
  useConnect,
  useDisconnect,
  useWatchBlocks,
} from "wagmi";

import { useTheme } from "@/components/theme-provider";
import {
  useReadCounterNumber,
  useWriteCounterIncrement,
  useWriteCounterSetNumber,
} from "@/hooks/contracts";

export default function App() {
  const [count, setCount] = useState(0);
  const { theme, toggleTheme } = useTheme();
  const { data: blockNumber } = useBlockNumber({
    watch: true,
  });

  const account = useAccount();
  const { connect, connectors, error } = useConnect();
  const { disconnect } = useDisconnect();

  const { data: counterNumber, refetch: refetchCounterNumber } =
    useReadCounterNumber({});
  const { writeContract: setCounterNumber } = useWriteCounterSetNumber();
  const { writeContract: increaseCounterNumber } = useWriteCounterIncrement();

  useWatchBlocks({
    onBlock: () => {
      refetchCounterNumber();

      const currentCount = Number(counterNumber ?? 0n);
      if (currentCount !== count) {
        return setCount(currentCount);
      }
    },
  });

  return (
    <div className="bg-background min-h-screen">
      <header className="border-b">
        <div className="container mx-auto flex items-center justify-between p-4">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold">Vite + React + shadcn/ui</h1>
          </div>
          <Button onClick={toggleTheme} variant="outline">
            {theme === "dark" ? "Light" : "Dark"} mode
          </Button>
        </div>
      </header>

      <main className="container mx-auto my-8 grid gap-6 p-4 md:grid-cols-2 lg:grid-cols-3">
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
                    <span className="max-w-[200px] truncate font-medium">
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
                <p className="text-muted-foreground text-sm">
                  Connect with one of the available wallet providers:
                </p>
                <div className="flex flex-wrap gap-2">
                  {connectors.map((connector) => (
                    <Button
                      className="min-w-24 flex-1"
                      key={connector.uid}
                      onClick={() => connect({ connector })}
                      variant="outline"
                    >
                      {connector.name}
                    </Button>
                  ))}
                </div>
                {error && (
                  <p className="text-destructive bg-destructive/10 rounded-md p-2 text-sm">
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
                onClick={() => {
                  setCounterNumber({ args: [BigInt(Math.max(1, count - 1))] });
                  refetchCounterNumber();
                }}
                size="icon"
                variant="outline"
              >
                -
              </Button>
              <span className="min-w-10 text-center text-2xl font-bold">
                {count}
              </span>
              <Button
                onClick={() => {
                  setCounterNumber({ args: [BigInt(count + 1)] });
                  refetchCounterNumber();
                }}
                size="icon"
                variant="outline"
              >
                +
              </Button>
            </div>
            <Button
              onClick={() => {
                increaseCounterNumber({});
                refetchCounterNumber();
              }}
            >
              Increment
            </Button>
          </CardContent>
          <CardFooter className="text-muted-foreground text-center text-xs">
            Edit <code className="text-xs">src/App.tsx</code> and save to test
            HMR
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
