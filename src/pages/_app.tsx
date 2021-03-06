import { useEffect } from "react"
import { useRouter } from "next/router"
import * as Fathom from "fathom-client"

export default function App({ Component, pageProps }) {
  const router = useRouter()
  useEffect(() => {
    // Initialize Fathom when the app loads
    Fathom.load(process.env.NEXT_PUBLIC_FATHOM_KEY, {
      excludedDomains: ["localhost"],
    })

    function onRouteChangeComplete() {
      Fathom.trackPageview()
    }
    // Record a pageview when route changes
    router.events.on("routeChangeComplete", onRouteChangeComplete)

    // Unassign event listener
    return () => {
      router.events.off("routeChangeComplete", onRouteChangeComplete)
    }
  }, [])

  return <Component {...pageProps} />
}
