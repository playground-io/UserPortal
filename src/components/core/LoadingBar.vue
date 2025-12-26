<template>
  <div class="loading-wrapper">
    <div class="loading-text">
      Loading...
    </div>
    <div class="loading-bar">
      <div class="progress-fill"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.loading-wrapper {
  position: relative;
  height: 100%;
  overflow: hidden;
  background-color: rgba(255, 255, 255, 0.4);

  & .loading-text {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    font-size: 2rem;
    font-style: italic;
    font-weight: 300;
    color: rgb(185, 185, 185);
  }

  & .loading-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 4px;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.1);
  
    & .progress-fill {
      height: 100%;
      width: 100%;
      background-color: #349bdb;
      animation: indeterminate 1.5s infinite linear;
      transform-origin: 0% 70%;
    }
  }
}

@keyframes indeterminate {
  0% { transform: translateX(-100%) scaleX(0.1); }
  50% { transform: translateX(0%) scaleX(0.3); }
  100% { transform: translateX(100%) scaleX(0.1); }
}
</style>