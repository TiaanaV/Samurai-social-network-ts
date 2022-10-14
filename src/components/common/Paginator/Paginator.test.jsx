import React from "react";
import { create } from "react-test-renderer";
import Paginator from "./Paginator";

describe("Paginator component tests", () => {
  test("Paged count is 11 but should be showed only 10", () => {
    const component = create(
      <Paginator totalItemCount={11} pageSize={1} portionSize={10} />
    );
    const root = component.root;
    let span = root.findAllByType("span");
    expect(span.length).toBe(10);
  });
  test("If paged count is more then 10 button NEXT should be present", () => {
    const component = create(
      <Paginator totalItemCount={11} pageSize={1} portionSize={10} />
    );
    const root = component.root;
    let button = root.findAllByType("button");
    expect(button.length).toBe(1);
  });
});
