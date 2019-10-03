import React from "react";

import { render, cleanup } from "@testing-library/react";
import { act } from 'react-test-renderer';

import Application from "components/Application";

afterEach(cleanup);

it("renders without crashing", () => {
  act(() => {
    render(<Application />);
  });
});
