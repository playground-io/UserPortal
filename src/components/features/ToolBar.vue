<script setup>
import { ref } from 'vue'; 
import ToolBarButton from '@/components/core/ToolBarButton.vue'
import { useOverlaySidebar } from '@/composables/useOverlaySidebar.js'
const { sidebarOpen } = useOverlaySidebar()

const isExtended = defineModel('isExtended');
const isOpened = defineModel('isOpened');
const separatorTitle = defineModel('separatorTitle');
const btnToggled = ref('');
const tabSelected = ref('');

const toggleButton = (button, title) => {
  if (btnToggled.value === button) {
    btnToggled.value = '';
    closeDrawer();
  } else {
    btnToggled.value = button;
    openDrawer(title);
  }
}

const openDrawer = (title) => {
  isExtended.value = true;
  if (isOpened.value) {
    isOpened.value = false;
    setTimeout(() => {
      isOpened.value = true;
      separatorTitle.value = title;
    }, 350);
  } else {
    isOpened.value = true;
    separatorTitle.value = title;
  }
}

const closeDrawer = () => {
  isOpened.value = false;
  isExtended.value = false;
  separatorTitle.value = null;  
}

const selectTab = (tab, title) => {
  setTitle(title);
  tabSelected.value = tabSelected.value === tab ? '' : tab;
}
</script>

<template>
  <nav class="toolbar">
    <div class="toolbar-left">
      <ToolBarButton
        btnLabel="apps"
        :btnPressed="tabSelected"
        :tooltip="$t('nav.button.apps')"
        iconName="apps"
        btnMode="normal"
        @click="sidebarOpen()"
        />
      <ToolBarButton
        btnLabel="menu"
        :btnPressed="tabSelected"
        :tooltip="$t('nav.button.menu')"
        iconName="menu"
        btnMode="normal"
        @click="sidebarOpen()"
        />
<!--      <TopBarBranding />-->
    </div>
    <div class="toolbar-center">
<!--      <SearchBox /> -->
      <ToolBarButton
        btnLabel="portal-shell"
        :btnPressed="btnToggled"
        :tooltip="$t('nav.button.console')"
        iconName="ai"
        btnMode="toggle"
        @click="handleNavigation('profile')"
        style="color: rgba(254, 186, 26)"
      />
    </div>
    <div class="toolbar-right">
      <ToolBarButton
        btnLabel="console"
        :btnPressed="btnToggled"
        :tooltip="$t('nav.button.console')"
        iconName="console"
        btnMode="toggle"
        @click="toggleButton('console', $t('nav.button.console'))"
        />
      <ToolBarButton
        btnLabel="tasks"
        :btnPressed="btnToggled"
        :tooltip="$t('nav.button.tasks')"
        iconName="tasks"
        btnMode="toggle"
        @click="toggleButton('tasks', $t('nav.button.tasks'))"
        />
      <ToolBarButton
        btnLabel="notifications"
        :btnPressed="tabSelected"
        :tooltip="$t('nav.button.notifications')"
        iconName="notifications"
        btnMode="tab"
        @click="selectTab('notifications', $t('nav.button.notifications'))"
        />
      <ToolBarButton
        btnLabel="settings"
        :btnPressed="tabSelected"
        :tooltip="$t('nav.button.settings')"
        iconName="settings"
        btnMode="tab"
        @click="selectTab('settings', $t('nav.button.settings'))"
        />
      <ToolBarButton
        btnLabel="support"
        :btnPressed="tabSelected"
        :tooltip="$t('nav.button.support')"
        iconName="support"
        btnMode="tab"
        @click="selectTab('support', $t('nav.button.support'))"
        />
      <ToolBarButton
        btnLabel="feedback"
        :btnPressed="tabSelected"
        :tooltip="$t('nav.button.feedback')"
        iconName="feedback"
        btnMode="tab"
        @click="selectTab('feedback', $t('nav.button.feedback'))"
        />
<!--      <UserAccount /> -->
    </div>
    <div class="toolbar-shrunk">
      <ToolBarButton
        btnLabel="more"
        :btnPressed="tabSelected"
        :tooltip="$t('nav.button.more')"
        iconName="more"
        btnMode="normal"
        @click="selectTab('normal', $t('nav.button.more'))"
        />
<!--      <UserAccount /> -->
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
