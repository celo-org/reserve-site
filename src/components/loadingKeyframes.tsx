import { css, keyframes } from "@emotion/react"

const loadingKeyframes = keyframes`
    from {
      opacity: 0.15
    }

    to {opacity: 0.40}
`
export const loadingStyle = css({
  opacity: 0,
  animationDirection: "alternate-reverse",
  animationDuration: "1.4s",
  animationDelay: "20ms",
  animationFillMode: "none",
  animationIterationCount: "infinite",
  animationTimingFunction: "ease-in-out",
  animationName: loadingKeyframes,
})
