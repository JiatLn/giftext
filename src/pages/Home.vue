<script setup lang="ts">
const text = ref<string>('床前明月光')

const gifUrl = ref<string>('/demo.gif')

const bindGifVal = computed(() => `url(${gifUrl.value})`)

const dropZoneRef = ref<any>()
function onDrop(files: File[] | null) {
  if (!files)
    return
  const url = window.URL.createObjectURL(files[0])
  gifUrl.value = url
}
const { isOverDropZone } = useDropZone(dropZoneRef, onDrop)
const isHovered = useElementHover(dropZoneRef)
const content = computed(() => {
  if (isOverDropZone.value || isHovered.value) {
    return 'Drop a picture to try.'
  }
  return text.value.repeat(100)
})
</script>

<template>
  <div w-full h-full flex="c col gap-4">
    <div ref="dropZoneRef" w="400px" h="400px" overflow-hidden class="content" flex-c :class="{ isOverDropZone }" leading-6>
      {{ content }}
    </div>
  </div>
</template>

<style scoped lang="less">
.content {
  color: transparent;
  background: v-bind("bindGifVal") center/cover;
          background-clip: text;

  -webkit-background-clip: text;

  &.isOverDropZone,
  &:hover {
    color: yellowgreen;
    font-size: 24px;
    background: transparent;
    border: 2px dashed gray;
    border-radius: 8px;
    cursor: pointer;
  }
}
</style>
