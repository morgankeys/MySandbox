import React from "react";

import styled, { css } from "styled-components/macro";

export const Frame = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  background-color: #444;
  color: #fff;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  a, a:visited {
      color: #fff;
  }
`;

export const TopFrame = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  background-color: #444;
  color: #fff;

  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;

  a, a:visited {
      color: #fff;
  }
`;