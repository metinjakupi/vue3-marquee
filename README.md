# Vue3 Marquee
[![npm](https://img.shields.io/npm/v/@mjakupi/vue-marquee)](https://www.npmjs.com/package/@mjakupi/vue-marquee)

Vue3 Marquee is a Vue 3 component designed to create smooth and customizable marquee animations easily. It's built with Vue 3 and TypeScript, offering a modern and efficient way to add marquee effects to your Vue projects.

## Features

- Easy to use and integrate with Vue 3 projects.
- Supports horizontal and vertical marquee animations.
- Customizable speed and direction.
- Responsive and accessible.

## Installation

```bash
npm install @mjakupi/vue-marquee
or
yarn add @mjakupi/vue-marquee
```
## Props
- items: An array of items to be displayed in the marquee.
- speed: The speed of the marquee animation (default: 20).
- direction: The direction of the marquee ('horizontal' or 'vertical').
- rtl: Reverse.


## Importing and Using the Component in Options API
```
<template>
  <Marquee :items="marqueeItems" :speed="50" direction="horizontal" :rtl="isRtl">
    <template v-slot="{ item }">
      <div>{{ item.text }}</div>
    </template>
  </Marquee>
</template>

<script>
import { Marquee } from "@mjakupi/vue-marquee";
import '@mjakupi/vue-marquee/dist/style.css'
export default {
  components: {
    Marquee
  },
  data() {
    return {
      marqueeItems: [
        { text: 'Item 1' },
        { text: 'Item 2' },
        { text: 'Item 3' }
      ],
      isRtl: false
    };
  }
};
</script>

```
## Composition API
```
<template>
  <Marquee :items="marqueeItems" :speed="50" direction="horizontal" :rtl="isRtl">
    <template v-slot="{ item }">
      <div class="marquee-content">{{ item.text }}</div>
    </template>
  </Marquee>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Marquee } from "@mjakupi/vue-marquee";
import '@mjakupi/vue-marquee/dist/style.css'
const marqueeItems = ref([
  { text: 'Item 1' },
  { text: 'Item 2' },
  { text: 'Item 3' }
]);
const isRtl = ref(false);
</script>
```
## Contributing
Contributions are always welcome! Feel free to open an issue or submit a pull request.

License
MIT License
