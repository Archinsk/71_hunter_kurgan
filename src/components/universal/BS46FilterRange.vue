<template>
  <div :class="filterClass">
    <div class="row">
      <Input
        :id="filterData.id"
        id-postfix="start"
        :label="filterData.label + filterData.itemsList[0].label"
        :type="filterData.subtype"
        :value="filterData.itemsList[0].value"
        :required="filterData.required || filterData.itemsList[0].required"
        :readonly="filterData.readonly || filterData.itemsList[0].readonly"
        :disabled="filterData.disabled || filterData.itemsList[0].disabled"
        :width-group="6"
        :horizontal="filterData.horizontal"
        :horizontal-width="filterData.horizontalWidth"
        @input="$emit('input', { index: 0, value: $event })"
      />
      <Input
        :id="filterData.id"
        id-postfix="finish"
        :label="filterData.label + filterData.itemsList[1].label"
        :type="filterData.subtype"
        :value="filterData.itemsList[1].value"
        :required="filterData.required || filterData.itemsList[1].required"
        :readonly="filterData.readonly || filterData.itemsList[1].readonly"
        :disabled="filterData.disabled || filterData.itemsList[1].disabled"
        :width-group="6"
        :horizontal="filterData.horizontal"
        :horizontal-width="filterData.horizontalWidth"
        @input="$emit('input', { index: 1, value: $event })"
      />
    </div>
  </div>
</template>

<script>
import Input from "./Forms/BS46Input";
export default {
  name: "FilterRange",
  components: { Input },
  props: {
    filterData: Object,
  },
  computed: {
    filterClass: function () {
      let filterClass =
        "form-group d-flex flex-column justify-content-end mb-0 col";
      if (this.filterData.width) {
        filterClass += "-" + this.filterData.width;
      }
      if (this.responsive) {
        filterClass += " " + this.filterData.responsive;
      }
      return filterClass;
    },
  },
};
</script>
