<!-- src/layouts/AppLayout.vue -->
<script setup>
import { computed, defineAsyncComponent } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// 1. Automatically find all .vue files in this directory (lazy-loaded)
const layoutFiles = import.meta.glob('./*Layout.vue')

// 2. Map file paths into clean layout names:
//    './DefaultLayout.vue' -> 'default'
//    './PortfolioLayout.vue' -> 'portfolio'
const layouts = {}
for (const path in layoutFiles) {
  const name = path
    .replace('./', '')
    .replace('Layout.vue', '')
    .toLowerCase()
    // Store the async component in the layouts object; lazy-loaded when used in the template
  layouts[name] = defineAsyncComponent(layoutFiles[path])
}

// 3. Pick the layout defined in route.meta.layout, falling back to 'default'
const currentLayout = computed(() => {
  const requested = (route.meta.layout || 'default').toLowerCase()
  return layouts[requested] || layouts['default']
})
</script>

<template>
  <!-- 
    The :key ensures:
    - If layout doesn't change between pages: Layout stays mounted (no flicker).
    - If layout changes (e.g., default -> blank): Smooth layout swap.
  -->
  <component :is="currentLayout" :key="route.meta.layout || 'default'">
    <slot />
  </component>
</template>