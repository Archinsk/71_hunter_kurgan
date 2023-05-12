<template>
  <button
    class="btn btn-collapse"
    type="button"
    data-toggle="collapse"
    :data-target="'#' + targetId"
    aria-expanded="false"
    :aria-controls="targetId"
    @click="$emit('click')"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "CollapseButton",
  props: ["targetId"],
};
</script>
