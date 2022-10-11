
import TestRenderer from 'react-test-renderer'; 
import React from "react";
import ProfileStatus from "./ProfileStatus";

describe("ProfileStatus component", () => {
//   test('Status from props should be in state', () => {
//     const testStatusStr = 'Test status';
//     const component = TestRenderer.create(<ProfileStatus profileStatus={testStatusStr}/>);
//     let statusInSpan = component.toJSON().children[0].children[1]
//     expect(statusInSpan).toBe(testStatusStr)
// })
 test("Status from props should be in the state ", () => {
  const component = TestRenderer.create(<ProfileStatus status = "it-kamasutra.com"/>)
  const instance = component.getInstance();
  expect(instance.state.status).toBe("it-kamasutra.com");
 });

 test("After creation <span> should be displayed with correct status ", () => {
  const component = create(<ProfileStatus status = "it-kamasutra.com"/>)
  const root = component.root;
  let span = root.findByType('span');
  expect(span.length).toBe(1);
 })

})