import {
  Avatar,
  Button,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Navbar,
  NavbarBrand,
  NavbarContent,
  Tooltip,
} from "@nextui-org/react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { useRouter } from "next/router";
import { UpgradeIcon } from "@/svg-icons/upgrade-icon";

export const CustomNavbar = () => {
  const { data, status } = useSession();
  const router = useRouter();
  return (
    <Navbar isBordered isBlurred position="sticky" maxWidth="xl">
      <NavbarBrand>
        <div className="flex items-center gap-x-2">
          <Link href="/" className="font-bold text-inherit">
            Notifi
          </Link>
          <Tooltip showArrow content="Notifi beta is available now!">
            <Chip
              color="success"
              variant="dot"
              size="sm"
              radius="sm"
              classNames={{
                content: "font-bold text-xs",
              }}
            >
              beta
            </Chip>
          </Tooltip>
        </div>
      </NavbarBrand>

      <NavbarContent as="div" justify="end">
        <ThemeSwitcher />
        {status === "authenticated" ? (
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="rounded-full transition-transform"
                color="secondary"
                size="sm"
                classNames={{
                  img: "h-[28px] rounded-full ring",
                }}
                src={data?.user.image || ""}
              />
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Profile Actions"
              variant="flat"
              onAction={(key) => {
                if (key === "logout") {
                  signOut({ redirect: true, callbackUrl: "/" });
                } else {
                  router.push(`/${key}`);
                }
              }}
            >
              <DropdownSection showDivider>
                <DropdownItem
                  key="profile"
                  className="h-14 gap-2"
                  disableAnimation
                >
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold">{data.user.email}</p>
                </DropdownItem>
                <DropdownItem key="dashboard">Dashboard</DropdownItem>
                <DropdownItem
                  key="pricing"
                  endContent={<UpgradeIcon />}
                  description="You're currently on the free tier. Click to upgrade!"
                  color="success"
                >
                  Upgrade
                </DropdownItem>
              </DropdownSection>
              <DropdownItem key="logout" color="danger">
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : (
          <Button color="primary" onClick={() => signIn("github")}>
            Sign in
          </Button>
        )}
      </NavbarContent>
    </Navbar>
  );
};
