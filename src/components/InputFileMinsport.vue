<template>
  <div :class="groupClass">
    <input
      :type="type"
      class="form-control d-none"
      :id="idFull"
      :value="value"
      :required="required"
      :readonly="readonly"
      :disabled="disabled"
      v-model="inputValue"
      @input="$emit('input', inputValue)"
      @change="fileRead"
    />
    <div class="input-file-minsport">
      <div>
        {{ comment }} <span v-if="required" class="text-danger">*</span>
      </div>
      <div v-if="file.name && file.base64" class="loaded-file">
        <div class="loaded-file-name">{{ file.name }}</div>
        <img src="/icons/close.svg" class="icon-close" @click="deleteFile" />
      </div>
      <button
        v-else
        type="button"
        class="btn-upload btn btn-link text-center"
        @click="selectFile"
      >
        <img v-if="button.icon && button.icon.url" :src="button.icon.url" />
        <span>{{ button.text }}</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "InputFileMinsport",
  components: {},
  props: {
    label: String,
    type: String,
    comment: String,
    button: Object,
    fileData: Object,
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
  },
  data() {
    return {
      inputValue: "",
      inputInstance: null,
      file: {
        name: "",
        type: "",
        base64: "",
      },
    };
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

    idFull: function () {
      let idFull = this.id;
      if (this.idPostfix) {
        idFull += "-" + this.idPostfix;
      }
      return idFull;
    },
  },
  created() {
    this.inputValue = this.value;
    this.file.name = this.fileData.name;
    this.file.type = this.fileData.type;
    this.file.base64 = this.fileData.base64;
  },
  mounted() {
    this.inputInstance = document.getElementById(this.idFull);
  },

  methods: {
    // Клик по скрытому полю файла
    selectFile() {
      this.inputInstance.click();
    },

    // Чтение свойств файла после его выбора
    fileRead() {
      this.file.name = this.inputInstance.files[0].name;
      this.file.type = this.inputInstance.files[0].type;
      this.setBase64(this.inputInstance.files[0]);
    },

    // Кодирование в base64
    setBase64(fileObject) {
      let reader = new FileReader();
      reader.readAsDataURL(fileObject);
      reader.onload = () => {
        let sliceIndex = reader.result.indexOf("base64,") + 7;
        this.file.base64 = reader.result.slice(sliceIndex);
        this.$emit("change", this.file);
        console.log("Сработало событие загрузки файла");
      };
    },

    // Удаление прикрепленного файла
    deleteFile() {
      this.file.name = "";
      this.file.type = "";
      this.file.base64 = "";
      this.inputValue = "";
      this.$emit("change", this.file);
      console.log("Файл удален");
    },
  },

  watch: {
    value: function () {
      this.inputValue = this.value;
    },
  },
};
</script>
