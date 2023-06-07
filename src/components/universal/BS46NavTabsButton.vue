<template>
  <li class="nav-item" role="presentation">
    <button
      :class="navLinkClass"
      :id="id + '-tab'"
      data-toggle="tab"
      :data-target="'#' + id"
      type="button"
      role="tab"
      :aria-controls="id"
      aria-selected="active"
      @click="$emit('click', id)"
    >
      <slot></slot>
    </button>
  </li>
</template>

<script>
export default {
  name: "NavTabsButton",
  props: {
    id: String,
    active: Boolean,
  },
  computed: {
    navLinkClass() {
      let navLinkClass = "nav-link";
      if (this.active) {
        navLinkClass += " active";
      }
      return navLinkClass;
    },
  },
};
</script>

<style scoped></style>
