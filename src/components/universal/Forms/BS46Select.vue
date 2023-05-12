<template>
  <FormGroup
    :width-group="widthGroup"
    :responsive="responsive"
    :horizontal="horizontal"
  >
    <label :for="id" :class="labelClass"
      >{{ label }} <span v-if="required" class="text-danger">*</span></label
    >
    <!--    Обычный селект с единственным значением для выбора-->

    <template v-if="!multiple">
      <!--      Вертикальный вариант-->
      <select
        v-if="!horizontal"
        :id="id"
        class="form-control"
        :required="required"
        :disabled="disabled"
        v-model="selectedValue"
        @change="$emit('change', changedValues)"
      >
        <option disabled value="">
          {{ defaultValueLabel ? defaultValueLabel : "Выберите..." }}
        </option>
        <template v-if="itemsList.length > 0">
          <option
            v-for="option of itemsList"
            :value="option.value"
            :key="option.id"
          >
            {{ option.label }}
          </option>
        </template>
      </select>
      <!--      Горизонтальный вариант-->
      <div v-else :class="fieldClass">
        <select
          :id="id"
          class="form-control"
          :required="required"
          :disabled="disabled"
          v-model="selectedValue"
          @change="$emit('change', changedValues)"
        >
          <option disabled value="">
            {{ defaultValueLabel ? defaultValueLabel : "Выберите..." }}
          </option>
          <template v-if="itemsList.length > 0">
            <option
              v-for="option of itemsList"
              :value="option.value"
              :key="option.id"
            >
              {{ option.label }}
            </option>
          </template>
        </select>
      </div>
    </template>

    <!--    Селект с множественным выбором без бэйджей-->
    <template v-else-if="!badges">
      <!--      Вертикальный вариант-->
      <select
        v-if="!horizontal"
        :id="id"
        class="form-control"
        :required="required"
        :disabled="disabled"
        :multiple="multiple"
        v-model="selectedForMultiple"
        @change="$emit('change', changedValues)"
      >
        <option disabled value="">
          {{ defaultValueLabel ? defaultValueLabel : "Выберите..." }}
        </option>
        <template v-if="itemsList.length > 0">
          <option
            v-for="option of itemsList"
            :value="option.value"
            :key="option.id"
          >
            {{ option.label }}
          </option>
        </template>
      </select>
      <!--      Горизонтальный вариант-->
      <div v-else :class="fieldClass">
        <select
          :id="id"
          class="form-control"
          :required="required"
          :disabled="disabled"
          :multiple="multiple"
          v-model="selectedForMultiple"
          @change="$emit('change', changedValues)"
        >
          <option disabled value="">
            {{ defaultValueLabel ? defaultValueLabel : "Выберите..." }}
          </option>
          <template v-if="itemsList.length > 0">
            <option
              v-for="option of itemsList"
              :value="option.value"
              :key="option.id"
            >
              {{ option.label }}
            </option>
          </template>
        </select>
      </div>
    </template>

    <!--    Селект с множественным выбором и бейджами выбранных пунктов-->
    <template v-else>
      <!--      Вертикальный вариант-->
      <div
        v-if="!horizontal"
        class="form-control custom-multiple-select"
        :id="id"
        :required="required"
        :disabled="disabled"
      >
        <span
          v-if="
            this.itemsList.length > this.selectedForMultiple.length && !disabled
          "
          class="dropdown"
        >
          <a
            class="btn dropdown-toggle"
            href="#"
            role="button"
            data-toggle="dropdown"
            aria-expanded="false"
            :disabled="disabled"
          >
            {{ defaultValueLabel ? defaultValueLabel : "Выберите..." }}
          </a>
          <div class="dropdown-menu">
            <template v-for="option of itemsList">
              <a
                v-if="!selectedForMultiple.includes(option.value)"
                :key="option.id"
                class="dropdown-item"
                href="#"
                @click.prevent="addItemToMultipleSelect(option.value)"
                >{{ option.label }}</a
              >
            </template>
          </div>
        </span>
        <template v-for="(option, index) of itemsList">
          <span
            v-if="selectedForMultiple.includes(option.value)"
            :key="index"
            class="badge badge-light mr-1"
            >{{ option.label
            }}<span
              v-if="!disabled"
              @click="removeItemFromMultipleSelect(option.value)"
              >&times;</span
            ></span
          >
        </template>
      </div>
      <!--      Горизонтальный вариант-->
      <div v-else :class="fieldClass">
        <div
          class="form-control custom-multiple-select"
          :id="id"
          :required="required"
          :disabled="disabled"
        >
          <span
            v-if="
              this.itemsList.length > this.selectedForMultiple.length &&
              !disabled
            "
            class="dropdown"
          >
            <a
              class="btn dropdown-toggle"
              href="#"
              role="button"
              data-toggle="dropdown"
              aria-expanded="false"
              :disabled="disabled"
            >
              {{ defaultValueLabel ? defaultValueLabel : "Выберите..." }}
            </a>
            <div class="dropdown-menu">
              <template v-for="option of itemsList">
                <a
                  v-if="!selectedForMultiple.includes(option.value)"
                  :key="option.id"
                  class="dropdown-item"
                  href="#"
                  @click.prevent="addItemToMultipleSelect(option.value)"
                  >{{ option.label }}</a
                >
              </template>
            </div>
          </span>
          <template v-for="(option, index) of itemsList">
            <span
              v-if="selectedForMultiple.includes(option.value)"
              :key="index"
              class="badge badge-light mr-1"
              >{{ option.label
              }}<span
                v-if="!disabled"
                @click="removeItemFromMultipleSelect(option.value)"
                >&times;</span
              ></span
            >
          </template>
        </div>
      </div>
    </template>
  </FormGroup>
</template>

<script>
import FormGroup from "./BS46FormGroup";
export default {
  name: "Select",
  components: { FormGroup },
  props: {
    label: String,
    id: String,
    itemsList: Array,
    defaultValueLabel: String,
    values: Array,
    widthGroup: Number,
    responsive: String,
    required: Boolean,
    disabled: Boolean,
    multiple: Boolean,
    badges: Boolean,
    horizontal: Boolean,
    horizontalWidth: Object,
  },
  data() {
    return {
      selectedValue: "",
      selectedForMultiple: [],
    };
  },
  computed: {
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
    changedValues: function () {
      if (!this.multiple) {
        if (this.selectedValue) {
          return [this.selectedValue];
        } else {
          return [];
        }
      } else {
        return this.selectedForMultiple;
      }
    },
  },
  methods: {
    addItemToMultipleSelect(itemValue) {
      this.selectedForMultiple.push(itemValue);
      this.$emit("change", this.changedValues);
    },
    removeItemFromMultipleSelect(itemValue) {
      let indexOfRemovedItem = this.selectedForMultiple.indexOf(itemValue);
      this.selectedForMultiple.splice(indexOfRemovedItem, 1);
      this.$emit("change", this.changedValues);
    },
  },

  created() {
    if (!this.multiple) {
      if (this.values.length === 1) {
        this.selectedValue = this.values[0];
      } else if (this.values.length === 0) {
        this.selectedValue = "";
      }
    }
    if (this.multiple) {
      this.selectedForMultiple = this.values;
    }
  },

  watch: {
    values: function () {
      if (!this.multiple) {
        if (this.values.length === 1) {
          this.selectedValue = this.values[0];
        } else if (this.values.length === 0) {
          this.selectedValue = "";
        }
      }
      if (this.multiple) {
        this.selectedForMultiple = this.values;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.form-control {
  height: unset;

  &.custom-multiple-select {
    &[disabled] {
      background-color: #e9ecef;
      opacity: 1;
      cursor: default;
      min-height: calc(1.5em + 0.75rem + 2px);
    }

    .dropdown {
      font-size: 1.125rem;
      line-height: 1.125rem;
      .dropdown-toggle {
        margin-top: -0.1875rem;
        padding-top: 0px;
        padding-bottom: 0px;
        border: none;
        white-space: normal;
        word-break: break-word;
        text-align: left;
      }
    }

    .badge {
      font-size: 1rem;
      font-weight: 400;
      margin-left: 0.25rem;
      padding-left: 0.5rem;
      padding-right: 0;
      white-space: normal;
      word-break: break-word;
      text-align: left;

      span {
        font-weight: 600;
        padding-left: 0.375rem;
        padding-right: 0.5rem;
        cursor: pointer;
      }
    }
  }
}
</style>
