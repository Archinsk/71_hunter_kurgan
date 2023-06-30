<template>
  <div id="application-page" class="container">
    <router-link to="/">Вернуться на главную</router-link>
    <div id="application-form" class="row pt-2">
      <div class="col-12">
        <h4 v-if="!isLoading" class="text-center py-2">
          {{ service.info.name + ": " + service.applicationDTO.form.name }}
        </h4>
      </div>

      <!--<div class="col-10">
          <Form
            :form="appForm.form.scheme"
            :submission="appForm"
            language="ru"
            :options="{
              readOnly: !appForm.active,
              i18n: formOptions.i18n,
            }"
            ref="vueForm"
          />
        </div>-->
      <div v-if="isLoading" class="col-12">
        <div class="card mt-2">
          <div class="card-body text-center">
            <div class="spinner-border text-primary" role="status">
              <span class="sr-only">Loading...</span>
            </div>
            <div>{{ loadingComment }}</div>
          </div>
        </div>
      </div>

      <div class="col-10" :style="isLoading ? 'opacity:0' : 'opacity:1'">
        <div id="formio" ref="vueForm"></div>
      </div>
      <div
        v-if="
          service.applicationDTO.form.actions &&
          service.applicationDTO.form.actions.length > 0
        "
        id="action-buttons"
        class="col-2"
        :style="isLoading ? 'opacity:0' : 'opacity:1'"
      >
        <template v-for="action of service.applicationDTO.form.actions">
          <template
            v-if="
              !action.hidden &&
              (service.applicationDTO.active ||
                (action.alwaysActive && !isLastForm))
            "
          >
            <button
              :key="action.id"
              type="button"
              class="btn btn-block btn-primary"
              @click="invokeAction(action)"
            >
              {{ action.name }}
            </button>
          </template>
        </template>
        <!--          <button class="btn btn-warning" @click="hideLoaders">убрать лоадеры</button>-->
      </div>
    </div>

    <b-modal
      id="signature"
      ref="modal-signature"
      title="Подпись файла"
      size="xl"
      cancel-title="Отмена"
      ok-title="Подписать"
      @ok="signAction"
    >
      <label for="CertListBox">Выберите сертификат</label>
      <select name="CertListBox" id="CertListBox" class="form-control">
        <!--        <option disabled value="-1" selected>Выберите сертификат</option>-->
      </select>
      <div class="row">
        <div class="col-6" id="cryptoProStatusDiv" style="margin-top: 1rem">
          <h4>Информация о программном обеспечении</h4>
          <div id="info_msg">
            <span id="ExtensionEnabledTxt">Расширение не загружено</span>
            <img
              src="Img/red_dot.png"
              width="10"
              height="10"
              alt="Расширение не загружено"
              id="ExtensionEnabledImg"
            />
            <br />
            <span id="PlugInEnabledTxt"
              >Плагин: ожидание загрузки расширения</span
            >
            <img
              src="Img/grey_dot.png"
              width="10"
              height="10"
              alt="Плагин не загружен"
              id="PluginEnabledImg"
            />
            <br />
            <span id="CspEnabledTxt"
              >Криптопровайдер: ожидание загрузки плагина</span
            >
            <img
              src="Img/grey_dot.png"
              width="10"
              height="10"
              alt="КриптоПро CSP не загружен"
              id="CspEnabledImg"
            />
            <br />
            <span id="PlugInVersionTxt" lang="ru"></span>
            <span id="CSPVersionTxt" lang="ru"></span>
            <br />
            <span id="CSPNameTxt" lang="ru"></span>
          </div>

          <div id="boxdiv" style="display: none">
            <span id="errorarea">
              У вас отсутствуют личные сертификаты. Вы можете
              <a
                href="#"
                onClick="Common_RetrieveCertificate();"
                style="color: #0837ff"
              >
                получить</a
              >
              сертификат от тестового УЦ, предварительно установив
              <a
                href="https://testca.cryptopro.ru/certsrv/certnew.cer?ReqID=CACert&Renewal=1&Enc=bin"
                style="color: #0837ff"
                >корневой сертификат тестового УЦ</a
              >
              в доверенные.
            </span>
          </div>
        </div>
        <div class="col-6" id="cert_info" name="CertInfo" style="display: none">
          <h4>Информация о сертификате</h4>
          <p class="info_field" id="subject"></p>
          <p class="info_field" id="issuer"></p>
          <p class="info_field" id="from"></p>
          <p class="info_field" id="till"></p>
          <p class="info_field" id="provname"></p>
          <p class="info_field" id="privateKeyLink"></p>
          <p class="info_field" id="algorithm"></p>
          <p class="info_field" id="status"></p>
          <p class="info_field" id="location"></p>
        </div>
      </div>

      <template #modal-footer="{ cancel }">
        <b-button size="sm" variant="outline-secondary" @click="cancel()">
          Отмена
        </b-button>
        <b-button size="sm" variant="primary" @click="signAction">
          Подписать
        </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
/*import { Form } from "vue-formio";*/
import axios from "axios";

export default {
  name: "ApplicationView",
  /*components: {
    Form,
  },*/
  props: ["url", "user", "theme", "service", "loadedServiceForm"],

  data() {
    return {
      measure: {},
      measureForms: [
        {
          actions: [],
          id: 0,
          modelId: 0,
          name: "Заявление",
          scheme: {},
        },
      ],
      isResponse: false,
      isLoading: false,
      isFirstLoad: true,
      loadingComment: "",
      appForm: {
        active: false,
        data: {},
        form: {
          actions: [],
          id: 0,
          modelId: 0,
          scheme: {},
        },
        id: 0,
        orderId: "",
        status: "",
      },
      formOptions: {
        i18n: {
          lng: "ru",
          ru: {
            Name: "Имя",
            "Last name": "Фамилия",
            dict: "Тип заявителя",
            "Type to search": "Поиск...",
            "Last name is required": "Фамилия - это обязательное поле",
            "No results found": "Поиск не дал результатов",
            "is required": "обязательное поле",
            Number: "Число",
            Submit: "Подтвердить",
            Layout: "Расположение",
            "Drag and Drop a form component": "Переместите компонент сюда",
            "No Matches Found": "Ничего не найдено",
            "Text Field": "Текстовое поле",
            Email: "Электронная почта",
            "Text Area": "Текстовая область",
            "Phone Number": "Номер телефона",
            Checkbox: "Флажок",
            Select: "Выпадающий список",
            Radio: "Радио кнопка",
            Url: "Ссылка",
            "Data Map": "Ключ - Значение",
            "Data Grid": "Динамический список",
            "Edit Grid": "Сетка данных",
            Table: "Таблица",
            "Date / Time": "Дата / Время",
            Day: "День",
            Time: "Время",
            File: "Файл",
            Signature: "Подпись",
            Content: "Контент",
            Columns: "Столбцы",
            "Field Set": "Набор полей",
            Panel: "Панель",
            Tabs: "Вкладки",
            Well: "Лист",
            Label: "Название",
            "Please fix the following errors before submitting":
              "Пожалуйста исправьте ошибки перед теп как продолжить",
            "Email: Email must be a valid email.": "Не правильный e-mail",
            Placeholder: "Заполнитель",
            Description: "Описание",
            Tooltip: "Подсказка",
            "To add a tooltip to this field,enter text here.":
              "Введите подсказку здесь",
            "Input Mask": "Маска ввода",
            Hidden: "Скрытый",
            "Hide Label": "Скрыть название",
            Save: "Сохранить",
            Cancel: "Отмена",
            Remove: "Удалить",
            Preview: "Предварительный просмотр",
            Disabled: "Отключен",
            Validation: "Проверка",
            Data: "Данные",
            "Property Name": "Имя переменной",
            Display: "Отображение",
            Widget: "Тип компонента",
            required: "обязательно для заполнения",
            pattern: "не соответствует маске!",
            error: "Пожалуйста исправьте ошибки прежде чем продолжить.",
            submitError:
              "Пожалуйста исправьте все ошибки прежде чем продолжить.",
            invalid_regex: "не соответствует маске!",
            mask: "{{field}} не соответствует маске.",
            valueIsNotAvailable: "неправильное значение.",
            Edit: "Редактировать",
            "Label Position": "Расположение",
            "Label Width": "Ширина",
            "Label Margin": "Отступ",
            Prefix: "Прификс",
            Suffix: "Суффикс",
            "Custom CSS Class": "CSS класс",
            "Show Word Counter": "Показать счетчик слов",
            "Show Character Counter": "Показать счетчик символов",
            "Hide Input": "Скрыть ввод",
            "Initial Focus": "Начальный фокус",
            "Allow Spellcheck": "Проверка орфографии",
            "Modal Edit": "Показать во всплывающем окне",
            "Tab Index": "Индекс вкладки",
            Autocomplete: "Автозавершение",
            month: "Месяц",
            day: "День",
            year: "Год",
            january: "Январь",
            february: "Февраль",
            march: "Март",
            april: "Апрель",
            may: "Май",
            june: "Июнь",
            july: "Июль",
            July: "Июль",
            august: "Август",
            september: "Сентябрь",
            october: "Октябрь",
            november: "Ноябрь",
            december: "Декабрь",
            next: "Далее",
            previous: "Назад",
            cancel: "Отмена",
            submit: "Отправить",
            "File Name": "Имя файла",
            Size: "Размер",
            "Add Another": "Добавить",
            "Drop files to attach,": "Перетащите файл сюда,",
            or: "или",
            browse: "выберите с диска",
          },
        },
      },
      isValidFormData: false,
      signActionId: null,
      hashToSign: "",
      signedFileName: "",
      cspIntervalId: null,
      signatureTimeoutId: null,
      signatureIntervalId: null,

      formInstance: null,
    };
  },

  computed: {
    isLastForm: function () {
      return (
        this.service.forms[this.service.forms.length - 1].id ===
        this.service.applicationDTO.form.id
      );
    },
  },

  methods: {
    // ----------Методы для формио из formio.full.min.js----------
    createAppForm() {
      this.formInstance = window.Formio.createForm(
        document.getElementById("formio"),
        this.service.applicationDTO.form.scheme,
        { readOnly: !this.service.applicationDTO.active, language: "ru" }
      ).then((form) => {
        // console.log("---Создается форма---");
        form.submission = this.service.applicationDTO;
        this.formInstance = form;
        form.on("change", (submission) => {
          let applicationDTO = submission;
          this.isValidFormData = submission.isValid;
          if (this.isFirstLoad) {
            this.isValidFormData = form.checkValidity(form.submission.data);
            this.isFirstLoad = false;
          }
          this.$emit("change-app-form", applicationDTO);
        });
      });
    },
    invokeAction(action) {
      console.groupCollapsed("Выполнение действия " + action.id);
      console.log(action);
      console.groupEnd();
      // Вернуть проверку при обработке действий v2
      // if (!action.version) {
      //   console.log("Действие 1 версии");
      if (!action.notRequiredAction) {
        // console.log("Действие требует проверки");
        if (this.isValidFormData) {
          // console.log("форма валидна");
          this.loadingComment = "Выполнение действия по обращению";
          this.isLoading = true;
          setTimeout(this.invoke, 1000, action, action.backAction);
        } else {
          // console.log("форма не валидна");
          this.formInstance.submit();
        }
      } else {
        // console.log("Действие без проверки");
        this.loadingComment = "Выполнение действия по обращению";
        this.isLoading = true;
        setTimeout(this.invoke, 1000, action, action.backAction);
      }
      // }
    },
    invoke(action, isBackAction = false) {
      if (action.signAction) {
        this.signActionId = action.id;
        this.openModalSignature();
        this.cspIntervalId = setInterval(this.cspWaiting, 500);
        return;
      }
      const request = {
        actionId: action.id,
        userId: 0,
        roleId: 0,
        orgId: 0,
        appId: this.service.applicationDTO.id,
        data: JSON.stringify(this.service.applicationDTO.data),
      };
      axios
        .post(this.url + "api/app/action-invoke", request, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        })
        .then((response) => {
          console.groupCollapsed("Ответ на запрос выполнения действия");
          console.log(response);
          console.groupEnd();
          if (response.data.responseObject) {
            this.downloadFileFromObject(
              JSON.parse(response.data.responseObject)
            );
          } else {
            if (isBackAction) {
              if (+this.$route.params.appId) {
                this.$router.go(-1);
              } else {
                this.$router.go(-2);
              }
            } else {
              this.getNextForm(response);
            }
          }
        })
        .then(() => {
          this.isLoading = false;
          this.loadingComment = "";
        });
    },
    // Переход к следующей форме (стандартное действие)
    getNextForm(response) {
      // console.log("Следующая форма");
      // console.log(response);
      let nextForm = response.data.applicationDTO;
      nextForm.data = JSON.parse(nextForm.data);
      nextForm.form.scheme = JSON.parse(nextForm.form.scheme);
      this.$emit("change-app-form", nextForm);
      setTimeout(this.createAppForm, 500);
    },

    // Скачивание файла из объекта
    downloadFileFromObject(fileObject) {
      // console.log("Объект файла");
      // console.log(fileObject);
      let link = document.createElement("a");
      if (fileObject.fileName) {
        link.setAttribute("download", fileObject.fileName);
      }
      if (fileObject.name) {
        link.setAttribute("download", fileObject.name);
      }
      link.setAttribute(
        "href",
        "data:application/octet-stream;base64," + fileObject.fileData
      );
      link.click();
    },

    // Необходимо для подписи
    cspWaiting() {
      console.log("Проверка загрузки Крипто-ПРО");
      if (window.cspEnabled) {
        // this.isResponse = true;
        // this.isLoading = false;
        // this.isFirstLoad = true;
        clearInterval(this.cspIntervalId);
        console.log("Крипто-ПРО загружен");
      }
    },
    openModalSignature() {
      console.log("---Точка 4");
      console.log("Открытие модального окна");
      this.$refs["modal-signature"].show();
      window.checkExtension(true);
    },
    // Загрузка скриптов КриптоПро
    loadCrypto() {
      var file1 = document.createElement("script");
      file1.setAttribute("type", "text/javascript");
      file1.setAttribute("src", "extensionLoading.js");
      document.getElementsByTagName("head")[0].appendChild(file1);
      var file2 = document.createElement("script");
      file2.setAttribute("type", "text/javascript");
      file2.setAttribute("src", "cadesplugin_api.js");
      document.getElementsByTagName("head")[0].appendChild(file2);
      var file3 = document.createElement("script");
      file3.setAttribute("type", "text/javascript");
      file3.setAttribute("src", "Code.js");
      document.getElementsByTagName("head")[0].appendChild(file3);
      var file4 = document.createElement("script");
      file4.setAttribute("type", "text/javascript");
      file4.setAttribute("src", "pluginLoading.js");
      document.getElementsByTagName("body")[0].appendChild(file4);
    },
    // Подпись файла
    signAction() {
      // window.Common_SignCadesBES('CertListBox');
      // alert("Привет от BV");
      const request = {
        certificate: {
          thumbprint: window.dataToSign.thumbprint,
          subject: window.dataToSign.subject,
          from: window.dataToSign.from,
          validDue: window.dataToSign.validDue,
        },
        actionPayloadDTO: {
          actionId: this.signActionId,
          userId: 0,
          roleId: 0,
          orgId: 0,
          appId: this.appForm.id,
          data: JSON.stringify(this.appForm.data),
        },
      };
      console.log(request);
      axios
        .post(this.url + "api/app/action-pdfstamp", request, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        })
        .then((response) => {
          console.log("Ответ на экшн");
          console.log(response);
          console.log("Содержимое data.applicationDTO.data");
          console.log(JSON.parse(response.data.applicationDTO.data));
          console.log("Содержимое data.responseObject");
          console.log(JSON.parse(response.data.responseObject));
          console.log("Содержимое hashToSign");
          console.log(JSON.parse(response.data.responseObject).hashToSign);
          this.hashToSign = JSON.parse(response.data.responseObject).hashToSign;
          window.dataToSign.hashToSign = JSON.parse(
            response.data.responseObject
          ).hashToSign;
          console.log(this.hashToSign);
          this.signedFileName = JSON.parse(
            response.data.responseObject
          ).fileName;
          console.log(this.signedFileName);
          window.Common_SignCadesBES("CertListBox");
          let hashField = document.getElementById("DataToSignTxtBox");
          console.log(hashField);
          // hashField.textContent = JSON.parse(response.data.responseObject).hashToSign
          this.signatureIntervalId = setInterval(this.signWaiting, 1000);
          this.$bvModal.hide("signature");
        });
    },
    signWaiting() {
      this.signatureTimeoutId = setTimeout(this.clearSignWaitingTimers, 600000);
      console.log("Проверка наличия подписи");
      if (window.dataToSign.signature) {
        this.requestSignAction();
        this.clearSignWaitingTimers();
        window.dataToSign = {};
      }
    },
    clearSignWaitingTimers() {
      clearInterval(this.signatureIntervalId);
      clearTimeout(this.signatureTimeoutId);
    },
    requestSignAction() {
      console.log(window.dataToSign);
      const request = {
        applicationId: this.appForm.id,
        signature: window.dataToSign.signature,
        hashToSign: this.hashToSign,
        filename: this.signedFileName,
      };
      console.log("Данные отправляемые для подписанного файла");
      console.log(request);
      axios
        .post(this.url + "api/app/action-insert-signdata", request, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        })
        .then((response) => {
          console.log(response);
          if (response.data.fileData) {
            console.log(response.data);
            this.downloadFileFromObject(response.data);
          }
        });
    },
  },

  created() {
    console.log("Создан компонент AppView");
    if (!+this.$route.params.appId) {
      if (!this.service.info.id) {
        this.loadingComment = "Загрузка формы обращения";
        this.$emit("show-service-first-form", this.$route.params.modelId);
      }
    } else {
      this.loadingComment = "Загрузка обращения";
      this.$emit("show-app-form", {
        serviceId: this.$route.params.modelId,
        appId: this.$route.params.appId,
      });
    }
    this.isLoading = true;
  },

  mounted: function () {
    // console.log("Смонтирован AppView");
    this.loadCrypto();
  },

  watch: {
    loadedServiceForm: function () {
      this.createAppForm();
      this.isLoading = false;
      this.loadingComment = "";
    },
  },
};
</script>
