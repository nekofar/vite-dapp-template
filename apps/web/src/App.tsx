import { useState } from "react"

import {
  useAccount,
  useBlockNumber,
  useConnect,
  useDisconnect
} from "wagmi"

// shadcn/ui components
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from "@repo/ui/components/card"
import { Button } from "@repo/ui/components/button"
import { useTheme } from "@/components/theme-provider"
import viteLogo from "/vite.svg"
import reactLogo from "./assets/react.svg"

export default function App() {
  const [count, setCount] = useState(0)
  const { theme, toggleTheme } = useTheme()
  const { data: blockNumber } = useBlockNumber()

  // wagmi hooks
  const account = useAccount()
  const { connectors, connect, error } = useConnect()
  const { disconnect } = useDisconnect()

  return (
    <main className="container mx-auto p-4 grid gap-8">
      {/* wallet connect section */}
      <Card>
        <CardHeader>
          <CardTitle>Wallet</CardTitle>
        </CardHeader>
        <CardContent>
          {account.isConnected ? (
            <div className="flex items-center justify-between">
              <div>
                <p>Status: {account.status}</p>
                <p>Address: {account.addresses?.join(", ") || "Not available"}</p>
                <p>Chain: {account.chainId}</p>
              </div>
              <Button variant="destructive" onClick={() => disconnect()}>
                Disconnect
              </Button>
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {connectors.map(connector => (
                <Button
                  key={connector.uid}
                  onClick={() => connect({ connector })}
                >
                  {connector.name}
                </Button>
              ))}
              {error && <p className="text-sm text-red-500">{error.message}</p>}
            </div>
          )}
        </CardContent>
      </Card>

      {/* settings section */}
      <Card>
        <CardHeader>
          <CardTitle>Settings</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <Button variant="outline" onClick={toggleTheme}>
            Switch to {theme === "dark" ? "light" : "dark"}
          </Button>
          <p>Latest block: {blockNumber ?? "..."}</p>
        </CardContent>
      </Card>

      {/* hero section */}
      <Card>
        <CardContent className="flex flex-col items-center space-y-4">
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
          <h1 className="text-4xl font-bold">
            Vite + React + TS + shadcn/ui 🚀
          </h1>
        </CardContent>
      </Card>

      {/* counter section */}
      <Card className="max-w-sm">
        <CardHeader>
          <CardTitle>Counter</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          <Button onClick={() => setCount(c => c + 1)}>
            count is {count}
          </Button>
          <p className="text-sm text-muted-foreground">
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </CardContent>
      </Card>

      {/* footer */}
      <footer className="text-center text-sm text-muted-foreground">
        Click on the Vite and React logos to learn more
      </footer>
    </main>
  )
}
