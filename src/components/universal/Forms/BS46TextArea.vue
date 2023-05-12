<template>
  <FormGroup
    :width-group="widthGroup"
    :responsive="responsive"
    :horizontal="horizontal"
  >
    <label v-if="!withoutLabel" :for="id" :class="labelClass"
      >{{ label }} <span v-if="required" class="text-danger">*</span></label
    >
    <div v-if="horizontal" :class="fieldClass">
      <textarea
        class="form-control"
        :id="idFull"
        :required="required"
        :readonly="readonly"
        :disabled="disabled"
        v-model="inputValue"
        @input="$emit('input', inputValue)"
        rows="10"
        maxlength="75"
      />
    </div>
    <textarea
      v-else
      class="form-control"
      :id="idFull"
      :required="required"
      :readonly="readonly"
      :disabled="disabled"
      v-model="inputValue"
      @input="$emit('input', inputValue)"
      rows="10"
      maxlength="255"
    />
  </FormGroup>
</template>

<script>
import FormGroup from "./BS46FormGroup";
export default {
  name: "TextArea",
  components: { FormGroup },
  props: {
    label: String,
    id: String,
    idPostfix: String,
    value: String,
    widthGroup: Number,
    responsive: String,
    required: Boolean,
    readonly: Boolean,
    disabled: Boolean,
    withoutLabel: Boolean,
    horizontal: Boolean,
    horizontalWidth: Object,
  },
  data() {
    return {
      inputValue: "",
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
      if (!this.horizontal) {
        labelClass += "form-label";
      } else {
        // labelClass += "col-form-label";
        if (this.horizontalWidth.label.width) {
          labelClass += " col-" + this.horizontalWidth.label.width;
        } else {
          labelClass += " " + "col";
        }
        labelClass += " " + this.horizontalWidth.label.responsive;
      }
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
  methods: {
    testFocus() {
      console.log("Фокус на поле сообщения");
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
