<script setup>
import ToolBarButton from '@/components/core/ToolBarButton.vue'
</script>

<template>
  <nav class="toolbar">
    <div class="toolbar-left">
      <ToolBarButton
        label="cloud-apps"
        :tooltip="$t('nav.button.app')"
        mode="toggle"
        iconName="apps"
      />
      <ToolBarButton
        label="services-admin"
        :tooltip="$t('nav.button.menu')"
        mode="normal"
        iconName="menu"
      />
      <TopBarBranding />
    </div>
    <div class="toolbar-center">
      <SearchBox />
      <ToolBarButton
        label="portal-shell"
        :tooltip="$t('nav.button.console')"
        mode="toggle"
        iconName="ai"
        @click="handleNavigation('profile')"
        style="color: rgba(254, 186, 26)"
      />
      <img src="@/assets/images/logo.png" alt="AI Badge" style="height: 30px" />
    </div>
    <div class="toolbar-right">
      <ToolBarButton
        label="portal-shell"
        :tooltip="$t('nav.button.console')"
        mode="toggle"
        iconName="console"
      />
      <ToolBarButton
        label="running-tasks"
        :tooltip="$t('nav.button.tasks')"
        mode="toggle"
        iconName="tasks"
      />
      <ToolBarButton
        label="notifications"
        :tooltip="$t('nav.button.notifications')"
        mode="tab"
        iconName="notifications"
      />
      <ToolBarButton
        label="settings"
        :tooltip="$t('nav.button.settings')"
        mode="tab"
        iconName="settings"
      />
      <ToolBarButton
        label="support"
        :tooltip="$t('nav.button.support')"
        mode="tab"
        iconName="support"
      />
      <ToolBarButton
        label="fedback"
        :tooltip="$t('nav.button.feedback')"
        mode="tab"
        iconName="feedback"
      />
      <UserAccount />
    </div>
    <div class="toolbar-shrunk">
      <ToolBarButton label="more" :tooltip="$t('nav.button.more')" mode="toggle" iconName="more" />
      <UserAccount />
    </div>
  </nav>
</template>

<style lang="scss" scoped>
.toolbar {
  display: flex;
  justify-content: space-between;
  height: var(--toolbar-height);
  color: var(--toolbar-color);
  background-color: var(--toolbar-bg);

  .toolbar-left,
  .toolbar-center,
  .toolbar-right {
    display: flex;
  }

  .toolbar-left {
    justify-content: left;
    min-width: 260px;
    max-width: 350px;
  }

  .toolbar-center {
    justify-content: center;
  }

  .toolbar-right {
    justify-content: right;
    min-width: 470px;
    max-width: 550px;
  }

  .toolbar-shrunk {
    display: none;
  }
}

@media (max-width: $viewport-md) {
  .toolbar {
    .toolbar-right {
      min-width: 290px;
      max-width: 300px;
    }
    .toolbar-left {
      min-width: 260px;
      max-width: 270px;
    }
  }
}

@media (max-width: $viewport-sm) {
  .toolbar {
    .toolbar-right {
      display: none;
    }
    .toolbar-left {
      min-width: 180px;
      max-width: 190px;
    }
    .toolbar-shrunk {
      display: flex;
      justify-content: right;
      min-width: 90px;
      max-width: 100px;
    }
  }
}
</style>
