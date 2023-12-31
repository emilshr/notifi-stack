import { HomeScreenWidget } from "@/components/home-screen/HomeScreenWidget";
import { GithubIcon } from "@/svg-icons/github-icon";
import { Navbar, NavbarBrand, NavbarContent } from "@nextui-org/react";
import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>Notifi</title>
        <meta name="description" content="Notifi - Error reporting made easy" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-full w-full flex-col items-center">
        <div className="flex-1">
          <HomeScreenWidget />
        </div>
        <div className="flex w-full justify-between text-sm text-gray-700">
          <Navbar maxWidth="2xl">
            <NavbarBrand className="text-sm">
              <div>&copy; {new Date().getFullYear()} @emilshr</div>
            </NavbarBrand>
            <div>
              <NavbarContent>
                <Link
                  href="https://github.com/emilshr/notifi-stack"
                  target="_blank"
                >
                  <GithubIcon />
                </Link>
              </NavbarContent>
            </div>
          </Navbar>
        </div>
      </main>
    </>
  );
}
