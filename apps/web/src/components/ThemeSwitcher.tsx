import { Switch } from "@nextui-org/react";
import { SunIcon } from "@/svg-icons/sun-icon";
import { MoonIcon } from "@/svg-icons/moon-icon";
import { useTheme } from "next-themes";
import { useEffect, useRef } from "react";

export const ThemeSwitcher = () => {
  const { setTheme, theme } = useTheme();
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;

    return () => {
      mounted.current = false;
    };
  }, []);

  return (
    <Switch
      size="md"
      color="primary"
      isSelected={mounted.current ? theme === "dark" : false}
      startContent={<SunIcon />}
      endContent={<MoonIcon />}
      onValueChange={(selected) => {
        console.log({ selected });
        setTheme(theme === "light" ? "dark" : "light");
      }}
    ></Switch>
  );
};
