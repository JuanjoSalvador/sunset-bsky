import { RichText } from "@atproto/api"

export function useRichText(textRef: string | ComputedRef<string>, agent: any) {
  const segments = ref<any[]>([])

  const parse = async (val: string) => {
    if (!val) {
      segments.value = []
      return
    }
    const rt = new RichText({ text: val })
    await rt.detectFacets(agent)
    segments.value = Array.from(rt.segments())
  }

  watch(() => unref(textRef), (newVal) => {
    parse(newVal)
  }, { immediate: true })

  return { segments }
}