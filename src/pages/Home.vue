<script setup lang="ts">
import { usePicStore } from '@/store'

const text = ref<string>('█')

const picStore = usePicStore()

const dropZoneRef = ref<any>()
function onDrop(files: File[] | null) {
  if (!files)
    return
  const fileReader = new FileReader()
  fileReader.onload = (e) => {
    const url = e.target?.result as string
    picStore.setPicUrl(url)
  }
  fileReader.readAsDataURL(files[0])
}
const { isOverDropZone } = useDropZone(dropZoneRef, onDrop)
const isHovered = useElementHover(dropZoneRef)
const content = computed(() => {
  if (isOverDropZone.value || isHovered.value) {
    return 'Drop a picture to try.'
  }
  return text.value.repeat(10000)
})
</script>

<template>
  <div w-full h-full flex="c col gap-4">
    <div ref="dropZoneRef" w="400px" h="400px" overflow-hidden class="content" :class="{ isOverDropZone }" leading-6>
      {{ content }}
    </div>
  </div>
</template>

<style scoped lang="less">
.content {
  color: transparent;
  line-height: 1;
  word-wrap: break-word;
  background: v-bind("picStore.bindUrlVal") center/cover;
          background-clip: text;

  -webkit-background-clip: text;

  &.isOverDropZone,
  &:hover {
    display: flex;
    justify-content: center;
    align-items: center;
    color: yellowgreen;
    font-size: 24px;
    background: transparent;
    border: 2px dashed gray;
    border-radius: 8px;
    cursor: pointer;
  }
}
</style>
