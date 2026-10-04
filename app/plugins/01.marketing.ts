import { storeApi } from '~/services/storeApi'

// Fetches the WhatsApp / pixel settings before the first render, so the button is in the SSR html.
// A failure just leaves both features off.
export default defineNuxtPlugin(async () => {
  const marketing = useStoreMarketing()
  if (marketing.value) return
  marketing.value = await storeApi.getMarketing().catch(() => null)
})
