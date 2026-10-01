// Proxies /store-api/* to the dashboard's storefront API (/api/storefront/*).
// Hop-by-hop headers from the upstream response are dropped: forwarding them
// breaks keep-alive between the client and this server (intermittent 400s).
const HOP_BY_HOP = ['connection', 'keep-alive', 'transfer-encoding', 'upgrade']

export default defineEventHandler((event) => {
  const { dashboardUrl } = useRuntimeConfig(event)
  const path = event.path.replace(/^\/store-api/, '')

  return proxyRequest(event, `${dashboardUrl}/api/storefront${path}`, {
    onResponse(event) {
      for (const header of HOP_BY_HOP) event.node.res.removeHeader(header)
    }
  })
})
