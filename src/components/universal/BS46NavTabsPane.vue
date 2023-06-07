<template>
  <div
    :class="tabPaneClass"
    :id="id"
    role="tabpanel"
    :aria-labelledby="id + '-tab'"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "NavTabsPane",
  props: {
    id: String,
    active: Boolean,
  },
  computed: {
    tabPaneClass: function () {
      let tabPaneClass = "tab-pane fade";
      if (this.active) {
        tabPaneClass += " show active";
      }
      return tabPaneClass;
    },
  },
};
</script>
