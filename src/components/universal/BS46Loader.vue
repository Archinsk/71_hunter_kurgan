<template>
  <div
    class="w-100 h-100 text-center d-flex flex-column justify-content-center align-items-center my-auto"
  >
    <div :class="loaderStyleClass" role="status">
      <span class="sr-only">Loading...</span>
    </div>
    <div v-if="comment">{{ comment }}</div>
  </div>
</template>

<script>
export default {
  name: "Loader",
  props: {
    comment: String,
    theme: String,
    type: String,
  },
  computed: {
    loaderStyleClass: function () {
      let loaderClass = "";
      if (this.type) {
        loaderClass += "spinner-" + this.type;
      } else {
        loaderClass += "spinner-border";
      }
      if (this.theme) {
        loaderClass += " text-" + this.theme;
      } else {
        loaderClass += " text-primary";
      }
      return loaderClass;
    },
  },
};
</script>
