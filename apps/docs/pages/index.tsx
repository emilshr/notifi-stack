import { Button, Header } from "ui";
import { Connection } from "@emilshr/notifi";
import { useEffect, useState } from "react";
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
      <Link href="/second">Second</Link>
    </>
  );
}
