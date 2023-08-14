import { Button, Header } from "ui";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <Header text="Random docs" />
      <Button />
      <button
        onClick={() => {
          throw new Error("Hello");
        }}
      >
        Error
      </button>
      <button
        onClick={() => {
          console.log("sentence");
        }}
      >
        Log
      </button>
      <Link href="/second">Second</Link>
    </>
  );
}
