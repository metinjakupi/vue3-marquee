import {ref, computed} from 'vue';


export function useMarquee(items: any[], speed = 1) {
    const itemCount = ref(items.length);
    const marqueeStyle = computed(() => ({
        '--count': itemCount.value,
        '--speed': speed,
    }));

    const itemStyle = (index: number) => ({
        '--index': index.toString(),
        '--rtl-index': (items.length - index - 1).toString(),
    });

    return {
        itemCount,
        itemStyle,
        marqueeStyle,
    };
}
