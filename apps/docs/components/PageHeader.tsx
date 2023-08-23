import Link from "next/link";
import { useConfig } from "nextra-theme-docs";

export default function PageHeader() {
  const { frontMatter } = useConfig();
  return (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:title" content={frontMatter.title || "Notifi"} />
      <meta
        property="og:description"
        content={frontMatter.description || "Easy error reporting"}
      />
      <Link rel="icon" href="/favicon.ico" />
    </>
  );
}
