<template>
  <div v-if="horizontal" :class="groupClass">
    <div class="form-group row">
      <slot></slot>
    </div>
  </div>
  <div v-else :class="groupClass"><slot></slot></div>
</template>

<script>
export default {
  name: "FormGroup",
  props: {
    widthGroup: Number,
    responsive: String,
    horizontal: Boolean,
  },
  computed: {
    groupClass: function () {
      let groupClass = "";
      if (!this.horizontal) {
        groupClass += "form-group d-flex flex-column justify-content-end";
      }
      if (this.widthGroup) {
        groupClass += " col-" + this.widthGroup;
      } else {
        groupClass += " col";
      }
      if (this.responsive) {
        groupClass += " " + this.responsive;
      }
      return groupClass;
    },
  },
};
</script>
