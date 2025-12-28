import { ref, onUnmounted } from 'vue';

/**
 * @param {ref} modelValue - The reactive ref to update (height or width)
 * @param {object} options 
 * @param {string} options.axis - 'x' or 'y'
 * @param {boolean} options.inverted - Invert delta calculation (e.g., resizing from left/top)
 */
export function useResizable(modelValue, options = {}) {
  const {
    axis = 'y',
    min = 100,
    max = 500,
    snapPoints = [],
    snapOffset = 25,
    inverted = false
  } = options;

  // Axis mapping configuration
  const config = {
    coord: axis === 'x' ? 'clientX' : 'clientY',
    cssVar: axis === 'x' ? '--resizer-w' : '--resizer-h',
    cursor: axis === 'x' ? 'col-resize' : 'row-resize'
  };

  const isDragging = ref(false);
  let startCoord = 0;
  let startSize = 0;
  let rafId = null;

  const getSnappedSize = (val) => {
    if (snapPoints.length === 0) return val;
    const closest = snapPoints.reduce((prev, curr) =>
      Math.abs(curr - val) < Math.abs(prev - val) ? curr : prev
    );
    return Math.abs(val - closest) < snapOffset ? closest : val;
  };

  const updateSize = (currentClientCoord) => {
    // Math Logic: delta = start - current (inverted if needed)
    // Using LaTeX for the formula logic:
    // $ \Delta = (start - current) \times (inverted ? -1 : 1) $
    const delta = (startCoord - currentClientCoord) * (inverted ? -1 : 1);
    
    let newSize = getSnappedSize(startSize + delta);
    const finalSize = Math.max(min, Math.min(max, newSize));

    if (modelValue.value !== finalSize) {
      modelValue.value = finalSize;
      document.documentElement.style.setProperty(config.cssVar, `${finalSize}px`);
    }
  };

  const onDrag = (e) => {
    if (rafId) return;
    rafId = requestAnimationFrame(() => {
      updateSize(e[config.coord]);
      rafId = null;
    });
  };

  const stopDrag = () => {
    isDragging.value = false;
    if (rafId) cancelAnimationFrame(rafId);
    document.removeEventListener('pointermove', onDrag);
    document.removeEventListener('pointerup', stopDrag);
    document.documentElement.classList.remove('resizing-active');
    document.documentElement.style.removeProperty('--resizer-cursor');
  };

  const startDrag = (e) => {
    isDragging.value = true;
    startCoord = e[config.coord];
    startSize = modelValue.value;

    document.addEventListener('pointermove', onDrag, { passive: true });
    document.addEventListener('pointerup', stopDrag);
    
    // Set global cursor state
    document.documentElement.style.setProperty('--resizer-cursor', config.cursor);
    document.documentElement.classList.add('resizing-active');
  };

  onUnmounted(stopDrag);

  return { isDragging, startDrag };
}