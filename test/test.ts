const image = await Deno.readFile("image.png")

console.log(image.length)

const res = await fetch("http://localhost:3000/api", {
  method: "POST",
  headers: { "Content-Type": "image/png", "x-api-key": "2"},
  body: image
})

console.log(res)
