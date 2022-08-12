<script setup lang="ts">
const text = ref<string>('春江潮水连海平海上明月共潮生滟滟随波千万里何处春江无月明江流宛转绕芳甸月照花林皆似霰空里流霜不觉飞汀上白沙看不见江天一色无纤尘皎皎空中孤月轮江畔何人初见月江月何年初照人人生代代无穷已江月年年望相似不知江月待何人但见长江送流水白云一片去悠悠青枫浦上不胜愁谁家今夜扁舟子何处相思明月楼可怜楼上月裴回应照离人妆镜台玉户帘中卷不去捣衣砧上拂还来此时相望不相闻愿逐月华流照君鸿雁长飞光不度鱼龙潜跃水成文昨夜闲潭梦落花可怜春半不还家江水流春去欲尽江潭落月复西斜斜月沉沉藏海雾碣石潇湘无限路不知乘月几人归落月摇情满江树')

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
    <div ref="dropZoneRef" w="400px" h="400px" overflow-hidden class="content" :class="{ isOverDropZone }" leading-6>
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
