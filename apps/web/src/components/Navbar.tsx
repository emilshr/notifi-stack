import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export const CustomNavbar = () => {
  const { data } = useSession();
  return (
    <Navbar
      fluid
      className="sticky top-0 z-50 border-b-[1px] border-b-slate-800 bg-slate-950/50 drop-shadow-md backdrop-blur"
    >
      <div className="flex w-full justify-between">
        <Link href="/">
          <div className="cursor-pointer font-extrabold">Notifi</div>
        </Link>
        <Dropdown
          inline
          label={
            <Avatar
              alt="User settings"
              img={data?.user.image ?? ""}
              rounded
              size="xs"
            />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">{data?.user.name}</span>
            <span className="block truncate text-sm font-medium">
              {data?.user.email}
            </span>
          </Dropdown.Header>
          <Dropdown.Item href="/dashboard">Dashboard</Dropdown.Item>
          <Dropdown.Item href="/settings">Settings</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item
            onClick={() => {
              signOut({ redirect: true, callbackUrl: "/" });
            }}
          >
            Sign out
          </Dropdown.Item>
        </Dropdown>
      </div>
    </Navbar>
  );
};
