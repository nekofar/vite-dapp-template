import { useState } from "react";
import viteLogo from "/vite.svg";
import reactLogo from "./assets/react.svg";

import { Card, CardContent } from "@repo/ui/components/card";
import { Button } from "@repo/ui/components/button";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 space-y-8">
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
      <h1 className="text-4xl font-bold">Vite + React + shadcn/ui 🚀</h1>

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
