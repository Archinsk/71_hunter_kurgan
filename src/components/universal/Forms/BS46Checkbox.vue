<template>
  <FormGroup :width-group="widthGroup" :horizontal="horizontal">
    <template v-if="horizontal">
      <div :class="labelClass"></div>
      <div :class="fieldClass">
        <div class="form-check">
          <input
            type="checkbox"
            class="form-check-input"
            :id="id"
            :checked="value"
            :required="required"
            :disabled="disabled"
            v-model="inputValue"
            @change="$emit('change', inputValue)"
          />
          <label class="form-check-label" :for="id"
            >{{ label }}
            <span v-if="required" class="text-danger">*</span></label
          >
        </div>
      </div>
    </template>
    <div v-else class="form-check">
      <input
        type="checkbox"
        class="form-check-input"
        :id="id"
        :checked="value"
        :required="required"
        :disabled="disabled"
        v-model="inputValue"
        @change="$emit('change', inputValue)"
      />
      <label class="form-check-label" :for="id"
        >{{ label }} <span v-if="required" class="text-danger">*</span></label
      >
    </div>
  </FormGroup>
</template>

<script>
import FormGroup from "./BS46FormGroup";
export default {
  name: "Checkbox",
  components: { FormGroup },
  props: {
    id: String,
    label: String,
    value: Boolean,
    widthGroup: Number,
    required: Boolean,
    readonly: Boolean,
    disabled: Boolean,
    horizontal: Boolean,
    horizontalWidth: Object,
  },
  data() {
    return {
      inputValue: false,
    };
  },
  computed: {
    idFull: function () {
      let idFull = this.id;
      if (this.idPostfix) {
        idFull += "-" + this.idPostfix;
      }
      return idFull;
    },
    labelClass: function () {
      let labelClass = "";
      if (this.horizontalWidth.label.width) {
        labelClass += " col-" + this.horizontalWidth.label.width;
      } else {
        labelClass += " " + "col";
      }
      labelClass += " " + this.horizontalWidth.label.responsive;
      return labelClass;
    },
    fieldClass: function () {
      let fieldClass = "";
      if (this.horizontalWidth.field.width) {
        fieldClass += "col-" + this.horizontalWidth.field.width;
      } else {
        fieldClass += "col";
      }
      fieldClass += " " + this.horizontalWidth.field.responsive;
      return fieldClass;
    },
  },
  created() {
    this.inputValue = this.value;
  },
  watch: {
    value: function () {
      this.inputValue = this.value;
    },
  },
};
</script>
