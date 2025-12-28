<script setup>
import SvgToIcon from '@/components/core/SvgToIcon.vue'
</script>

<template>
  <div class="bottom-bar">
    <div class="bottom-bar-left">
      <SvgToIcon name="waiting_anime1" :size="16" class="icon" />
      {{ $t('footer.tasks') }}
    </div>
    <div class="bottom-bar-center">
      {{ $t('footer.rights') }}
    </div>
    <div class="bottom-bar-right">
      {{ $t('footer.copyright') }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bottom-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 20px;
  font-size: 1.2rem;
  border-top: 1px solid var(--status-bar-border);
  background-color: var(--status-bar-bg);
  color: var(--status-bar-txt);
  height: var(--status-bar-height);
}

.bottom-bar-left,
.bottom-bar-center,
.bottom-bar-right {
  display: flex;
  align-items: center;
}

.bottom-bar-left {
  gap: 8px;
  font-weight: 600;
}
</style>
