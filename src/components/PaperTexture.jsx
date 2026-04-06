import { useEffect, useRef, useState } from "react"

export function PaperTexture() {
  const [bgUrl, setBgUrl] = useState(null)
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = document.createElement("canvas")
    canvasRef.current = canvas
    const size = 200
    canvas.width = size
    canvas.height = size

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const imageData = ctx.createImageData(size, size)
    const data = imageData.data

    for (let i = 0; i < data.length; i += 4) {
      const val = Math.floor(Math.random() * 140 + 50)
      data[i] = val
      data[i + 1] = val
      data[i + 2] = val
      data[i + 3] = Math.floor(Math.random() * 20 + 5)
    }

    ctx.putImageData(imageData, 0, 0)
    setBgUrl(canvas.toDataURL("image/png"))
  }, [])

  if (!bgUrl) return null

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9998]"
      style={{
        backgroundImage: `url(${bgUrl})`,
        backgroundRepeat: "repeat",
        backgroundSize: "200px 200px",
      }}
    />
  )
}
