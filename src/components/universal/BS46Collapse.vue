<template>
  <div
    class="collapse"
    :id="id"
    :data-parent="parentId ? '#' + parentId : null"
  >
    <div class="collapse-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Collapse",
  props: ["id", "parentId"],
};
</script>
