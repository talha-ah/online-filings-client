import { useState } from "react"
import { useIsomorphicLayoutEffect } from "@hooks/useIsomorphicLayoutEffect"

export const useWindowResize = () => {
  const [width, setWidth] = useState<number>(1600)
  const [height, setHeight] = useState<number>(1600)

  const onResize = () => {
    setWidth(window.innerWidth)

    setHeight(window.innerHeight)
  }

  useIsomorphicLayoutEffect(() => {
    onResize()
    addEventListener("resize", onResize)
    return () => removeEventListener("resize", onResize)
  }, [])

  return [width, height]
}
