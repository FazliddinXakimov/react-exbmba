import React from "react";
import styled from "styled-components";

const WrapperDiv = styled.div`
  padding-left: 10px;
  padding-right: 10px;
  padding-top: calc(10px + var(--navbar-height));
  padding-bottom: var(--bottom-navigation-height);
  min-width: 320px;
  max-width: 968px;
  margin: 0 auto;
`;

const SiteContainer = ({ children }) => {
  return <WrapperDiv>{children}</WrapperDiv>;
};

export default SiteContainer;
