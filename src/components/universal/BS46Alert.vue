<template>
  <div :class="alertClass" role="alert">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "VbAlert",
  props: {
    themeColor: String,
  },
  data() {
    return {
      bootstrapTypes: [
        "primary",
        "secondary",
        "success",
        "danger",
        "warning",
        "info",
        "light",
        "dark",
      ],
    };
  },
  computed: {
    alertClass: function () {
      let alertClass = "alert";
      if (this.bootstrapTypes.includes(this.themeColor)) {
        alertClass += " alert-" + this.themeColor;
      } else {
        alertClass += " alert-secondary";
      }
      return alertClass;
    },
  },
};
</script>
