<template>
  <div class="toolbar-branding">
    <span class="toolbar-branding-text">Axians <strong>Velastic</strong></span>
<!--    <div class="toolbar-branding-tooltip">{{ $t('nav.branding.title') }}</div>
    <div class="branding-label">{{ $t('nav.branding.label') }}</div>
    <div class="service-label">{{ $t('nav.branding.service') }}</div>-->
    
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.toolbar-branding {
  display: inline-flex; align-items: center;
  position: relative;
  padding: 0 10px;
  user-select: none;
  max-width: 250px;
  min-width: 0;
}

/* --- Tooltip Styling --- */
.toolbar-branding-tooltip {
  position: absolute;
  visibility:hidden;
  opacity: 0;
  transition: opacity var(--transition-medium) ease;
  padding: 5px 10px;
  border: 1px solid var(--top-bar-btn-border-tooltip);
  border-radius: 4px;
  white-space: nowrap;
  color: var(--top-bar-btn-txt-tooltip);
  background-color: var(--top-bar-btn-bg-tooltip);
  font-size: 1.2rem;
  left: 0;
  top: 90%;
  font-weight: 100;
  transform: translateX(125%);
}
.toolbar-branding:hover {
  //cursor: pointer;
  background-color: var(--toolbar-btn-hover);
}
.toolbar-branding:hover .toolbar-branding-tooltip {
  visibility: visible;
  opacity: 1;
}

.toolbar-branding:active {
    color: var(--top-bar-btn-txt-active);
  }

.toolbar-branding-text {
flex: 1;

  white-space: nowrap;      /* 1. Prevent wrapping to next line */
  overflow: hidden;         /* 2. Hide the text that goes outside the box */
  text-overflow: ellipsis;  /* 3. Add the "..." */

  font-size: 1.6rem;
  color: var(--text-primary);

  /* The Constraint */
  display: block;           /* Spans are inline by default; ellipsis needs block or inline-block */
  min-width: 0; 
  width: 100%;        /* Adjust this value based on your toolbar space */
}

.toolbar-branding-text strong {

  color: var(--green-velastic);
  font-weight: 600;

}

  .branding-label {
    font-size: 1.3rem;
    white-space: nowrap;
    letter-spacing: 0.5px;
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
    text-transform: uppercase;
  }

  .service-label {
    font-size: 1.1rem;
    white-space: nowrap;
    letter-spacing: 1px;
  }

@media (max-width: $viewport-sm) {
  .service-label {
    display: none;
  }

  .branding-label {
    max-width: 90px;
  }
}
</style>