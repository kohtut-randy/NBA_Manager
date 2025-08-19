import { ReactNode } from "react";
import Head from "next/head";

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

const Layout = ({ children, title = "NBA Team Manager" }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Manage your NBA teams and players" />
        <link rel="icon" href="/favicon.ico" />
        {/* Google Fonts: Geist or Inter fallback */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div style={{ minHeight: "100vh", width: "100vw", background: "none" }}>
        {children}
      </div>
    </>
  );
};

export default Layout;
