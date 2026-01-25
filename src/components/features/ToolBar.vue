<script setup>
import { ref } from 'vue';

import ToolbarButton from '@/components/features/Toolbar/ToolbarButton.vue'
import ToolbarBranding from '@/components/features/Toolbar/ToolbarBranding.vue'
import SearchBox from '@/components/features/Toolbar/SearchBox.vue'
import UserAccount from '@/components/features/Toolbar/UserAccount.vue'

import { storeToRefs } from 'pinia';
import { useToolbarButtonStore } from '@/stores/useToolbarButtonStore';

// Initialize the Store
const toolbarButtonStore = useToolbarButtonStore();
// Destructure refs to use them directly in the template
const { activeLauncher, activeDrawer, activeSidebar } = storeToRefs(toolbarButtonStore);
// Use actions directly from the store
const { toggleLauncher, toggleDrawer, toggleSidebar } = toolbarButtonStore;



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
      <ToolbarButton
        btnLabel="apps"
        :btnPressed="activeLauncher === 'btnA'"
        :btnTooltip="$t('nav.button.apps')"
        iconName="apps"
        btnMode="toggle"
        @click="toggleLauncher('btnA')"
      />
      <ToolbarButton
        btnLabel="menu"
        :btnPressed="activeLauncher === 'btnB'"
        :btnTooltip="$t('nav.button.menu')"
        iconName="menu"
        btnMode="toggle"
        @click="toggleLauncher('btnB')"
      />
      <ToolbarBranding />
    </div>
    <div class="toolbar-center">
      <SearchBox />
      <ToolbarButton
        btnLabel="portal-shell"
        :btnPressed="false"
        :btnTooltip="$t('nav.button.console')"
        iconName="ai"
        btnMode="toggle"
        @click="handleServiceClick($t('nav.button.console'))"
        style="color: rgba(254, 186, 26)"
      />
    </div>
    <div class="toolbar-right">
      <ToolbarButton
        btnLabel="console"
        :btnPressed="activeDrawer === 'btnA'"
        :btnTooltip="$t('nav.button.console')"
        iconName="console"
        btnMode="toggle"
        @click="toggleDrawer('btnA')"
      />
      <ToolbarButton
        btnLabel="tasks"
        :btnPressed="activeDrawer === 'btnB'"
        :btnTooltip="$t('nav.button.tasks')"
        iconName="tasks"
        btnMode="toggle"
        @click="toggleDrawer('btnB')"
      />
      <ToolbarButton
        btnLabel="notifications"
        :btnPressed="activeSidebar === 'btnA'"
        :btnTooltip="$t('nav.button.notifications')"
        iconName="notifications"
        btnMode="tab"
        @click="toggleSidebar('btnA')"
      />
      <ToolbarButton
        btnLabel="settings"
        :btnPressed="activeSidebar === 'btnB'"
        :btnTooltip="$t('nav.button.settings')"
        iconName="settings"
        btnMode="tab"
        @click="toggleSidebar('btnB')"
      />
      <ToolbarButton
        btnLabel="support"
        :btnPressed="activeSidebar === 'btnC'"
        :btnTooltip="$t('nav.button.support')"
        iconName="support"
        btnMode="tab"
        @click="toggleSidebar('btnC')"
      />
      <ToolbarButton
        btnLabel="feedback"
        :btnPressed="activeSidebar === 'btnD'"
        :btnTooltip="$t('nav.button.feedback')"
        iconName="feedback"
        btnMode="tab"
        @click="toggleSidebar('btnD')"
      />
      <UserAccount />
    </div>
    <div class="toolbar-shrunk">
      <ToolbarButton
        btnLabel="more"
        :btnPressed="tabSelected"
        :btnTooltip="$t('nav.button.more')"
        iconName="more"
        btnMode="normal"
        @click="selectTab('normal', $t('nav.button.more'))"
      />
      <UserAccount />
    </div>
  </nav>
</template>

<style lang="scss" scoped>
  .toolbar {
    position: relative;
    display: flex;
    justify-content: space-between;
    height: var(--toolbar-height);
    color: var(--toolbar-color);
    background-color: var(--toolbar-bg);
    z-index: 1010;
  
    .toolbar-left,
    .toolbar-center,
    .toolbar-right {
      display: flex;
    }

    .toolbar-left {
      justify-content: left;
      min-width: 60px; //260
      max-width: 350px;
    }

    .toolbar-center {
      justify-content: center;
      flex: 1;
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
