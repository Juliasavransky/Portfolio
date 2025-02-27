import React, { ReactNode } from "react";
import { Global, css } from "@emotion/react";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Global
        styles={css`
          main {
            display: flex;
            font-size: 1.2rem;
            font-weight: 100;
          }
        `}
      />
      <main>{children}</main>
    </>
  );
};

export default Layout;
