import React, { ReactNode } from "react";
import { Global } from "@emotion/react";
import { globalStyles } from "../styles/globalStyles";


type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    
   <>
      <Global styles={globalStyles} />
      <main>{children}</main>
    </>
  );
};

export default Layout;
