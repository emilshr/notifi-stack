import React from "react";
import { DocsThemeConfig } from "nextra-theme-docs";
import NotifiLogo from "./components/notifi_logo.png";
import Image from "next/image";

const config: DocsThemeConfig = {
  logo: <span style={{ fontWeight: 800 }}>Notifi</span>,
  project: {
    link: "https://github.com/emilshr/notifi-stack",
    icon: <Image alt="Notifi" src={NotifiLogo} width={32} height={32} />,
  },
  footer: {
    text: "Notifi documentation",
  },
  useNextSeoProps() {
    return {
      titleTemplate: "%s - Notifi",
    };
  },
  notFound: {
    labels: "Uh oh! Not found",
    content: <></>,
  },
  sidebar: {
    toggleButton: true,
  },
};

export default config;
