import React from "react";
import { DocsThemeConfig, useConfig } from "nextra-theme-docs";
import Link from "next/link";
import PageHeader from "./components/PageHeader";
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
  head: PageHeader,
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
