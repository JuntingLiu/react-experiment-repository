import { createDOMElement } from '../../DOM'

const createStateNode = fiber => {
  if (fiber.tag === "host_component") {
    return createDOMElement(fiber)
  }
  // else if {
  //   // return createReactInstance(fiber)
  // }
}

export default createStateNode