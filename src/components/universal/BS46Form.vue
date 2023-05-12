<template>
  <form class="">
    <fieldset :disabled="formData.disabled ? true : false">
      <div class="row">
        <template v-for="formItem of formData.fields">
          <Input
            v-if="
              formItem.type === 'input' &&
              formItem.subtype !== 'file' &&
              formItem.visibility
            "
            :key="formItem.id"
            :id="formItem.id"
            :label="formItem.label"
            :type="formItem.subtype"
            :value="formItem.value"
            :required="formItem.required"
            :readonly="formItem.readonly"
            :disabled="formItem.disabled"
            :width-group="formItem.width"
            :responsive="formItem.responsive"
            :horizontal="formItem.horizontal"
            :horizontal-width="formItem.horizontalWidth"
            :focusable="formItem.focusable"
            @input="$emit('change-form', { id: formItem.id, value: $event })"
            @focus="$emit('focus', formItem.id)"
          />
          <InputFileMinsport
            v-if="
              formItem.type === 'input' &&
              formItem.subtype === 'file' &&
              formItem.visibility
            "
            :key="formItem.id"
            :id="formItem.id"
            :label="formItem.label"
            :type="formItem.subtype"
            :comment="formItem.comment"
            :button="formItem.button"
            :file-data="formItem.file"
            :value="formItem.value"
            :required="formItem.required"
            :readonly="formItem.readonly"
            :disabled="formItem.disabled"
            :width-group="formItem.width"
            :responsive="formItem.responsive"
            :horizontal="formItem.horizontal"
            :horizontal-width="formItem.horizontalWidth"
            @change="$emit('change-form', { id: formItem.id, value: $event })"
          />
          <TextArea
            v-if="formItem.type === 'textarea' && formItem.visibility"
            :key="formItem.id"
            :id="formItem.id"
            :label="formItem.label"
            :value="formItem.value"
            :required="formItem.required"
            :readonly="formItem.readonly"
            :disabled="formItem.disabled"
            :without-label="formItem.withoutLabel"
            :width-group="formItem.width"
            :responsive="formItem.responsive"
            :horizontal="formItem.horizontal"
            :horizontal-width="formItem.horizontalWidth"
            @input="$emit('change-form', { id: formItem.id, value: $event })"
          />
          <Select
            v-if="formItem.type === 'select' && formItem.visibility"
            :key="formItem.id"
            :id="formItem.id"
            :label="formItem.label"
            :items-list="formItem.itemsList"
            :default-value-label="formItem.defaultValueLabel"
            :values="formItem.values"
            :required="formItem.required"
            :disabled="formItem.disabled"
            :multiple="formItem.multiple"
            :badges="formItem.badges"
            :width-group="formItem.width"
            :responsive="formItem.responsive"
            :horizontal="formItem.horizontal"
            :horizontal-width="formItem.horizontalWidth"
            @change="$emit('change-form', { id: formItem.id, values: $event })"
          />
          <Checkbox
            v-if="formItem.type === 'checkbox' && formItem.visibility"
            :key="formItem.id"
            :id="formItem.id"
            :label="formItem.label"
            :value="formItem.value"
            :required="formItem.required"
            :disabled="formItem.disabled"
            :width-group="formItem.width"
            :responsive="formItem.responsive"
            :horizontal="formItem.horizontal"
            :horizontal-width="formItem.horizontalWidth"
            @change="$emit('change-form', { id: formItem.id, value: $event })"
          />
          <FilterRange
            v-if="formItem.type === 'range' && formItem.visibility"
            :key="formItem.id"
            :filter-data="formItem"
            @input="
              $emit('change-form', {
                id: formItem.id,
                index: $event.index,
                value: $event.value,
              })
            "
          />
        </template>
      </div>
    </fieldset>
  </form>
</template>

<script>
import Input from "./Forms/BS46Input";
import Select from "./Forms/BS46Select";
import Checkbox from "./Forms/BS46Checkbox";
import FilterRange from "./BS46FilterRange";
import InputFileMinsport from "../InputFileMinsport";
import TextArea from "./Forms/BS46TextArea";
export default {
  name: "Form",
  components: {
    TextArea,
    InputFileMinsport,
    Input,
    Select,
    Checkbox,
    FilterRange,
  },
  props: {
    formData: Object,
  },
};
</script>
