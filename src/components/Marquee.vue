<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'Marquee',
  props: {
    rtl: {
      type: Boolean,
      default: false,
    },
    speed: {
      type: Number,
      default: 20,
    },
    gap: {
      type: Number,
      default: 0,
    },
    outset: {
      type: Number,
      default: 0,
      validator: (value: number): boolean => value >= -0.5 && value <= 3,
    },
    rtlOutset: {
      type: Number,
      default: -1,
      validator: (value: number): boolean => value >= -3 && value <= -0.5,
    },
    items: {
      type: Array as PropType<Array<any>>,
      default: () => [],
    },
    direction: {
      type: String,
      default: 'horizontal',
      validator: (value: string) => ['horizontal', 'vertical'].includes(value),
    }
  },
  setup(props) {
    const marqueeStyle = computed(() => ({
      '--count': props.items.length,
      '--speed': props.speed,
      '--outset': props.outset,
      '--rtl-outset': props.rtlOutset,
    }));
    const itemStyle = (index: number) => ({
      '--index': index.toString(),
      '--rtl-index': (props.items.length - index - 1).toString(),
    });
    return {
      marqueeStyle,
      itemStyle
    }
  },
});
</script>


<template>
  <section class="marquee-container" :style="marqueeStyle" :rtl="rtl" :dir="direction">
    <div class="marquee-wrapper">
      <div class="marquee-item" v-for="(item, index) in items" :key="index" :style="itemStyle(index)">
        <slot :item="item"></slot>
      </div>
    </div>
  </section>
</template>


<style>
.marquee-container {
  width: 100%;
  height: 300px;
  mask-image: linear-gradient(to right, transparent 0%, rgb(0, 0, 0) 10%, rgb(0, 0, 0) 90%, transparent 100%);
}

.marquee-container[dir=horizontal] {
  aspect-ratio: 16 / 9;
  min-height: 300px;
  min-width: 300px;
}

.marquee-container[dir=vertical] {
  aspect-ratio: 9 / 16;
  min-width: 180px;
  min-height: 300px;
}

.marquee-wrapper {
  display: flex;
  gap: 1rem;
  padding: 0;
  margin: 0;
  list-style-type: none;
}


.marquee-container[dir=horizontal] .marquee-wrapper {
  height: 100%;
  width: fit-content;
  align-items: center;
  overflow: hidden;
}

.marquee-container[dir=vertical] .marquee-wrapper {
  width: 100%;
  height: fit-content;
  justify-items: center;
  flex-direction: column;
}

.marquee-item {
  height: 80%;
  aspect-ratio: 4 / 3;
}


@media (prefers-reduced-motion: no-preference) {
  /* Base styling for the unordered list */
  .marquee-wrapper {
    gap: 0;
  }

  /* Styling for horizontal containers */
  .marquee-container[dir=horizontal] {
    padding-inline: 0;
  }

  marquee-container[dir=vertical] {
    padding-block: 0;
  }

  /* Common styling for list items */
  .marquee-item {
    --inset: 0;
    --duration: calc(var(--speed) * 1s);
    --base-delay: calc(var(--duration) / var(--count));
    --index-adjustment: calc(var(--index, 0) - (var(--count) * 0.5));
    --delay: calc(var(--base-delay) * var(--index-adjustment));
    animation: slide var(--duration) calc(var(--delay) - (var(--speed) * 0.5s)) infinite linear;
    translate: var(--origin-x) var(--origin-y);
  }

  /* Styling for horizontal LTR (left-to-right) list items */
  .marquee-container[dir=horizontal][rtl="false"] .marquee-item {
    --origin-x: calc(((var(--count) - var(--index)) + var(--inset)) * 100%);
    --origin-y: 0;
    --x: calc(((var(--index) + 1 + var(--outset)) * -100%));
    --y: 0;
  }

  .marquee-container[dir=vertical][rtl="false"] .marquee-item {
    --origin-x: 0;
    --origin-y: calc(((var(--count) - var(--index)) + var(--inset, 0)) * 100%);
    --x: 0;
    --y: calc(calc((var(--index) + 1 + var(--outset, 0)) * -100%));
  }

  /* Adjustments for RTL (right-to-left) list items */
  .marquee-container[rtl=true] .marquee-item {
    --rtl-inset: 1;
    --rtl-index-adjustment: calc(var(--rtl-index, 0) - (var(--count) * 0.5));
    --delay: calc(var(--base-delay) * var(--rtl-index-adjustment));
  }

  /* Styling for horizontal RTL list items */
  .marquee-container[dir=horizontal][rtl="true"] .marquee-item {
    --origin-x: calc(((var(--rtl-index) - var(--count)) - var(--rtl-inset)) * 100%);
    --origin-y: 0;
    --x: calc(((var(--rtl-index) - 1 - var(--rtl-outset)) * 100%));
    --y: 0;
  }

  /* Keyframes for slide animation */
  @keyframes slide {
    100% {
      translate: var(--x) var(--y);
    }
  }
}


</style>
