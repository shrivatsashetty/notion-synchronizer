const obj = {
  object_type: "block",
  id: "2fa4b8b0",
  "has_children": true,
  "archived": false,
  "in_trash": false,
  type: "para",
  para: { content: "hello world" },
}

const { object_type, type, [type]: typeContent } = obj;

const filteredObj = {
  object_type,
  type,
  [type]: typeContent
}

console.log(filteredObj)