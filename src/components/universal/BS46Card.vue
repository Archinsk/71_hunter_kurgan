<template>
  <div class="card">
    <div v-if="header" class="card-header w-100 d-flex">
      <slot name="card-header"></slot>
    </div>
    <template v-if="imagePosition === 'top' || imagePosition === 'full'">
      <slot name="card-image-top"></slot>
    </template>
    <div v-if="!noBody" class="card-body">
      <slot name="card-body"></slot>
    </div>
    <template v-if="imagePosition === 'bottom'">
      <slot name="card-image-bottom"></slot>
    </template>
    <div v-if="footer" class="card-footer text-muted">
      <slot name="card-footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    cardData: Object,
    header: Boolean,
    noBody: Boolean,
    footer: Boolean,
    imagePosition: String,
  },
};
</script>
