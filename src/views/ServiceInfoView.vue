<template>
  <div class="page-wrapper">
    <section class="support">
      <div class="container">
        <div class="support-card">
          <div class="support-card-header row align-items-center">
            <div class="support-owner col-3"></div>
            <h4 class="support-name col-6 py-2">
              {{ serviceInfo.name }}
            </h4>

            <div class="support-buttons col-3">
              <button
                class="btn btn-primary"
                @click="$emit('show-service-first-form', serviceInfo.id)"
              >
                Подать заявку
              </button>
            </div>
          </div>
          <hr />
          <div class="container">
            <div class="row">
              <div class="col-12 col-md-3">
                <ul class="nav nav-tabs flex-column" id="myTab" role="tablist">
                  <NavTabsButton
                    v-for="(tab, index) of serviceInfo.newDescription.chapters"
                    :key="'' + index"
                    :id="'' + index"
                    :active="activeTab === '' + index"
                    @click="activeTab = '' + index"
                    >{{ tab.name }}</NavTabsButton
                  >
                </ul>
              </div>
              <div class="col">
                <div class="tab-content pt-3" id="myTabContent">
                  <NavTabsPane
                    v-for="(tab, index) of serviceInfo.newDescription.chapters"
                    :key="'' + index"
                    :id="
                      'measure-info-chapter-description-' +
                      String(index).padStart(4, '0')
                    "
                    :active="activeTab === '' + index"
                  >
                    <div class="card-list row my-0"></div>
                  </NavTabsPane>
                </div>
              </div>
            </div>
          </div>
          <!--<b-card no-body>
            <b-tabs pills card vertical nav-wrapper-class="col-12 col-md-3">
              <b-tab title="Общая информация" active>
                <b-card-text>
                  <div id="measure-basic-info"></div>
                </b-card-text>
              </b-tab>
              <b-tab
                v-for="(measureInfo, index) of measure.newDescription.chapters"
                :key="measureInfo.name"
                :title="measureInfo.name"
              >
                <b-card-text>
                  <div
                    :id="
                      'measure-info-chapter-description-' +
                      String(index).padStart(4, '0')
                    "
                  ></div>
                </b-card-text>
              </b-tab>
            </b-tabs>
          </b-card>-->
        </div>
      </div>
      <div id="measure-basic-info"></div>
    </section>
  </div>
</template>

<script>
/*import { Form } from "vue-formio";
import axios from "axios";*/
import EditorJS from "@editorjs/editorjs";
import AlignmentBlockTune from "editorjs-text-alignment-blocktune";
import Header from "@editorjs/header";
import Paragraph from "@editorjs/paragraph";
import List from "@editorjs/list";
import Checklist from "@editorjs/checklist";
import RawTool from "@editorjs/raw";
import InlineImage from "editorjs-inline-image";

import NavTabsButton from "../components/universal/BS46NavTabsButton";
import NavTabsPane from "../components/universal/BS46NavTabsPane";
// import NavTabsPane from "../components/universal/BS46NavTabsPane";
export default {
  name: "ServiceInfoView",
  components: { NavTabsPane, /*NavTabsPane,*/ NavTabsButton },
  /*components: {
    Form,
  },*/

  props: ["url", "theme", "user", "serviceInfo"],

  data() {
    return {
      activeTab: null,
      /*measure: {
        newDescription: {
          chapters: [],
        },
      },
      measureForms: [
        {
          actions: [],
          id: 0,
          modelId: 0,
          name: "Заявление",
          scheme: {},
        },
      ],
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
            "Drop files to attach, or browse":
              "Перетащите файл сюда, или выберите с диска",
            "No choises to choose from": "Нет вариантов для выбора",
            // "No choises to choose from": "Нет вариантов для выбора",
            "No choises": "Нет вариантов",
            "to choose from": "для выбора",
            No: "Нет",
          },
        },
      },
      isLoading: false,
      loadingComment: "Загрузка формы заявления",
      successComment: "Форма заявления успешно загружена!",
      isResponse: false,
      isAlertVisible: false,
      isValidFormData: false,
      isFirstLoad: true,*/
    };
  },

  /*computed: {
    appLink: function () {
      // return "/application_view/" + this.$route.params.subId;
      return "/application_view/model/" + this.$route.params.modelId + "/app/0";
    },
    availabilityByRole: function () {
      if (!this.measure.id) {
        return false;
      } else {
        for (let i = 0; i < this.measure.roles.length; i++) {
          if (this.user.shortInfo.roleId === this.measure.roles[i].id) {
            return true;
          }
        }
        return false;
      }
    },
  },*/

  methods: {
    changeTab(tabId) {
      this.person.tabs.forEach(function (item) {
        if (item.id === tabId) {
          item.active = true;
        } else {
          item.active = false;
        }
      });
    },
    /*
    // Информация о мере поддержки
    getMeasure() {
      axios
        .get(this.url + "serv/get-model?id=" + this.$route.params.modelId)
        .then((response) => {
          this.measure = response.data;
          this.measure.newDescription = JSON.parse(
            response.data.newDescription
          );
          console.groupCollapsed(
            "Детальная информация по мере поддержки ",
            response.data.name
          );
          console.log(this.measure);
          console.groupEnd();
        });
    },

    // Стартовая форма заявления
    getStartForm() {
      this.isResponse = false;
      this.isLoading = true;
      this.loadingComment = "Загрузка формы заявления";
      setTimeout(this.getForm, 1000);
    },
    getForm() {
      axios
        .get(this.url + "serv/get-appData?id=" + this.$route.params.modelId)
        .then((response) => {
          console.log("Стартовая форма");
          console.log(response);
          const newForm = response.data.applicationDTO;
          newForm.data = JSON.parse(newForm.data);
          newForm.form.scheme = JSON.parse(newForm.form.scheme);
          this.appForm = newForm;
        })
        .then(() => {
          this.isResponse = true;
          this.isLoading = false;
          this.isAlertVisible = true;
          setTimeout(this.hideAlert, 3000);
        });
    },

    hideAlert() {
      this.isAlertVisible = false;
    },

    validateForm() {
      return this.$refs.vueForm.formio.checkValidity(
        this.$refs.vueForm.formio.submission.data
      );
    },

    invokeAction(actionId, isBackAction = false) {
      console.log("Выполнение действия");
      this.isFirstLoad = false;
      this.isValidFormData = this.validateForm();
      console.log("Валидность формы:" + this.isValidFormData);
      if (this.isValidFormData) {
        this.loadingComment = "Отправка данных заявления";
        this.isResponse = false;
        this.isLoading = true;
        setTimeout(this.invoke, 1000, actionId, isBackAction);
      } else {
        this.$refs.vueForm.formio.submit();
      }
    },
    invoke(actionId, isBackAction = false) {
      const request = {
        actionId: actionId,
        userId: 13,
        appId: this.appForm.id,
        data: JSON.stringify(this.appForm.data),
      };
      axios
        .post(this.url + "app/action-invoke", request)
        .then((response) => {
          console.log("Ответ на экшн");
          console.log(response);
          if (response.data.responseObject) {
            let fileApp = JSON.parse(response.data.responseObject);
            console.log("Объект файла");
            console.log(fileApp);
            let link = document.createElement("a");
            link.setAttribute("download", fileApp.fileName);
            link.setAttribute(
              "href",
              "data:application/octet-stream;base64," + fileApp.fileData
            );
            link.click();
          } else {
            if (isBackAction) {
              this.cleanAppForm();
            } else {
              this.getNextForm(response);
            }
          }
        })
        .then(() => {
          this.isResponse = true;
          this.isLoading = false;
          this.isAlertVisible = true;
          this.isFirstLoad = true;
          setTimeout(this.hideAlert, 3000);
        });
    },

    // Переход к следующей форме (стандартное дейтвие)
    getNextForm(response) {
      console.log("Следующая форма");
      console.log(response);
      let nextForm = response.data.applicationDTO;
      nextForm.data = JSON.parse(nextForm.data);
      nextForm.form.scheme = JSON.parse(nextForm.form.scheme);
      this.appForm = nextForm;
      this.successComment = "Заявление отправлено!";
    },

    cleanAppForm() {
      this.$bvModal.hide("new-app");
      this.isLoading = false;
      this.loadingComment = "Загрузка формы заявления";
      this.successComment = "Форма заявления успешно загружена!";
      this.isResponse = true;
      this.isAlertVisible = true;
      this.isValidFormData = false;
      this.isFirstLoad = true;
    },

    measurePeriod() {
      let period = "";
      const options = {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      };
      if (this.measure.startDate) {
        period +=
          "c " +
          new Intl.DateTimeFormat("ru-RU", options).format(
            new Date(this.measure.startDate)
          ) +
          " ";
      }
      if (this.measure.endDate) {
        period +=
          "по " +
          new Intl.DateTimeFormat("ru-RU", options).format(
            new Date(this.measure.endDate)
          );
      }
      if (!this.measure.startDate && !this.measure.endDate) {
        period = "даты не указаны";
      }
      return period;
    },

    isValidPeriod() {
      let now = new Date();
      let measureStartDate, measureFinishDate;
      if (this.measure.startDate) {
        measureStartDate = new Date(this.measure.startDate);
      }
      if (this.measure.endDate) {
        measureFinishDate = new Date(this.measure.endDate);
        measureFinishDate.setDate(measureFinishDate.getDate() + 1);
      }
      if (measureStartDate && measureFinishDate) {
        return now >= measureStartDate && now <= measureFinishDate;
      } else if (measureStartDate && !measureFinishDate) {
        return now >= measureStartDate;
      } else if (!measureStartDate && measureFinishDate) {
        return now <= measureFinishDate;
      } else if (!measureStartDate && !measureFinishDate) {
        return true;
      }
    },*/

    createMeasureInfo() {
      // Общая информация
      let basicInfo = new EditorJS({
        readOnly: true,
        holder: "measure-basic-info",
        tools: {
          header: {
            class: Header,
            inlineToolbar: ["marker", "link"],
            tunes: ["alignmentSetting"],
          },
          paragraph: {
            class: Paragraph,
            inlineToolbar: true,
            tunes: ["alignmentSetting"],
          },
          image: {
            class: InlineImage,
            inlineToolbar: true,
            config: {
              embed: {
                display: true,
              },
            },
            tunes: ["alignmentSetting"],
          },
          raw: RawTool,
          checklist: {
            class: Checklist,
            inlineToolbar: true,
            tunes: ["alignmentSetting"],
          },
          alignmentSetting: {
            class: AlignmentBlockTune,
            config: {
              default: "left",
              blocks: {
                header: "left",
                list: "left",
                paragraph: "left",
              },
            },
          },
          list: {
            class: List,
            inlineToolbar: true,
            shortcut: "CMD+SHIFT+L",
          },
        },

        defaultBlock: "paragraph",

        data: {
          blocks: this.serviceInfo.newDescription.commonDescription.blocks,
        },
      });
      console.log(basicInfo);

      for (
        let i = 0;
        i < this.serviceInfo.newDescription.chapters.length;
        i++
      ) {
        let containerId =
          "measure-info-chapter-description-" + String(i).padStart(4, "0");
        console.log(containerId);
        let measureChapter = new EditorJS({
          readOnly: true,
          holder: containerId,
          tools: {
            header: {
              class: Header,
              inlineToolbar: ["marker", "link"],
              tunes: ["alignmentSetting"],
            },
            paragraph: {
              class: Paragraph,
              inlineToolbar: true,
              tunes: ["alignmentSetting"],
            },
            image: {
              class: InlineImage,
              inlineToolbar: true,
              config: {
                embed: {
                  display: true,
                },
              },
              tunes: ["alignmentSetting"],
            },
            raw: RawTool,
            checklist: {
              class: Checklist,
              inlineToolbar: true,
              tunes: ["alignmentSetting"],
            },
            alignmentSetting: {
              class: AlignmentBlockTune,
              config: {
                default: "left",
                blocks: {
                  header: "left",
                  list: "left",
                  paragraph: "left",
                },
              },
            },
            list: {
              class: List,
              inlineToolbar: true,
              shortcut: "CMD+SHIFT+L",
            },
          },

          defaultBlock: "paragraph",

          data: {
            blocks:
              this.serviceInfo.newDescription.chapters[i].description.blocks,
          },
        });
        console.log(measureChapter);
      }
    },
  },

  watch: {
    serviceInfo: function () {
      if (this.serviceInfo.newDescription) {
        this.createMeasureInfo();
      }
    },
  },

  /*updated: function () {
    // console.log("---updated---");
    // console.log(this.user.shortInfo.userId);
    // console.log(this.measure.available);
    // console.log(this.availabilityByRole);
    // console.log("---------------");
  },

  mounted: function () {
    // console.log("---mount---");
    // console.log(this.user.shortInfo.userId);
    // console.log(this.measure.available);
    // console.log(this.availabilityByRole);
    // console.log("---------------");
    this.getMeasure();
  },*/

  mounted: function () {
    if (this.serviceInfo.newDescription) {
      this.createMeasureInfo();
    }
  },
};
</script>

<style lang="scss">
.btn {
  word-wrap: break-word;
}
</style>
