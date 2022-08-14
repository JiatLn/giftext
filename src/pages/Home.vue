<script setup lang="ts">
import { usePicStore } from '@/store'

const text = ref<string>('鸣神の 少しとよみて さし昙り 雨も降らんか 君を留めん 鸣神の 少しとよみて 降らずとも 我は止まらん 妹し留めば')

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
  return text.value.repeat(10)
})

const style = ref({ backgroundColor: 'black' })
let keyFrame = 0
function changeBg() {
  keyFrame++
  const colorList = ['black']
  if (keyFrame % 30 === 0) {
    style.value.backgroundColor = colorList[~~(Math.random() * colorList.length)]
  }
  requestAnimationFrame(changeBg)
}

onMounted(() => {
  changeBg()
})
</script>

<template>
  <div w-full h-full flex="c col gap-4">
    <div rounded :style="style">
      <div ref="dropZoneRef" w="400px" h="400px" overflow-hidden class="content" :class="{ isOverDropZone }" leading-6>
        {{ content }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.content {
  color: transparent;
  line-height: 1;
  word-break: break-all;
  background: v-bind("picStore.bindUrlVal") center/cover;
          background-clip: text;
  filter: grayscale(1) invert(1);

  -webkit-background-clip: text;
  mix-blend-mode: hard-light;

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
