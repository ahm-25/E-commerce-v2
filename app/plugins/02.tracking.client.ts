// Loads the ad / analytics pixels configured in the dashboard (Marketing page).
// Snippets are the platforms' official ones; ids are re-checked here before being put in a script.
const ID = {
  meta: /^\d{15,16}$/,
  tiktok: /^[A-Z0-9]{20}$/,
  snap: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
  ga4: /^G-[A-Z0-9]{4,12}$/
}

const inline = (code: string) => {
  const s = document.createElement('script')
  s.text = code
  document.head.appendChild(s)
}

export default defineNuxtPlugin(() => {
  const t = useStoreMarketing().value?.tracking
  if (!t) return

  if (t.metaPixelId && ID.meta.test(t.metaPixelId)) {
    inline(`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${t.metaPixelId}');fbq('track','PageView');`)
  }

  if (t.tiktokPixelId && ID.tiktok.test(t.tiktokPixelId)) {
    inline(`!function(w,d,t){w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script");n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};ttq.load('${t.tiktokPixelId}');ttq.page();}(window,document,'ttq');`)
  }

  if (t.snapPixelId && ID.snap.test(t.snapPixelId)) {
    inline(`(function(e,t,n){if(e.snaptr)return;var a=e.snaptr=function(){a.handleRequest?a.handleRequest.apply(a,arguments):a.queue.push(arguments)};a.queue=[];var s='script';var r=t.createElement(s);r.async=!0;r.src=n;var u=t.getElementsByTagName(s)[0];u.parentNode.insertBefore(r,u);})(window,document,'https://sc-static.net/scevent.min.js');snaptr('init','${t.snapPixelId}',{});snaptr('track','PAGE_VIEW');`)
  }

  if (t.ga4MeasurementId && ID.ga4.test(t.ga4MeasurementId)) {
    const s = document.createElement('script')
    s.async = true
    s.src = `https://www.googletagmanager.com/gtag/js?id=${t.ga4MeasurementId}`
    document.head.appendChild(s)
    // GA4's enhanced measurement records client-side navigations by itself
    inline(`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${t.ga4MeasurementId}');`)
  }

  // The snippets above send the first page view; later ones are client-side navigations
  useRouter().afterEach((to, from) => {
    if (to.path === from.path) return
    const w = window as any
    w.fbq?.('track', 'PageView')
    w.ttq?.page?.()
    w.snaptr?.('track', 'PAGE_VIEW')
  })
})
