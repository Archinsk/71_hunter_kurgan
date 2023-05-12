<template>
  <FormGroup
    :width-group="widthGroup"
    :responsive="responsive"
    :horizontal="horizontal"
  >
    <label :for="id" :class="labelClass"
      >{{ label }} <span v-if="required" class="text-danger">*</span></label
    >
    <template v-if="focusable">
      <div v-if="horizontal" :class="fieldClass">
        <input
          :type="type"
          class="form-control"
          :id="idFull"
          :value="value"
          :title="value"
          :required="required"
          :readonly="readonly"
          :disabled="disabled"
          v-model="inputValue"
          @input="$emit('input', inputValue)"
          @focus="$emit('focus')"
        />
      </div>
      <input
        v-else
        :type="type"
        class="form-control"
        :id="idFull"
        :value="value"
        :title="value"
        :required="required"
        :readonly="readonly"
        :disabled="disabled"
        v-model="inputValue"
        @input="$emit('input', inputValue)"
        @focus="$emit('focus')"
      />
    </template>
    <template v-else>
      <div v-if="horizontal" :class="fieldClass">
        <input
          :type="type"
          class="form-control"
          :id="idFull"
          :value="value"
          :title="value"
          :required="required"
          :readonly="readonly"
          :disabled="disabled"
          v-model="inputValue"
          @input="$emit('input', inputValue)"
        />
      </div>
      <input
        v-else
        :type="type"
        class="form-control"
        :id="idFull"
        :value="value"
        :title="value"
        :required="required"
        :readonly="readonly"
        :disabled="disabled"
        v-model="inputValue"
        @input="$emit('input', inputValue)"
      />
    </template>
  </FormGroup>
</template>

<script>
import FormGroup from "./BS46FormGroup";
export default {
  name: "Input",
  components: { FormGroup },
  props: {
    label: String,
    type: String,
    id: String,
    idPostfix: String,
    value: String,
    widthGroup: Number,
    responsive: String,
    required: Boolean,
    readonly: Boolean,
    disabled: Boolean,
    horizontal: Boolean,
    horizontalWidth: Object,
    focusable: Boolean,
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
