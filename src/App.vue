<template>
  <div id="app">
    <router-view
      :config="config"
      :settings-form="settingsForm"
      @change-settings-form-part1="
        changeFormWithValidate(
          settingsForm.notification.form,
          $event,
          'changeSettingsNotification'
        )
      "
      @change-settings-form-part2="
        changeFormWithValidate(
          settingsForm.server.form,
          $event,
          'changeSettingsServer'
        )
      "
      @change-settings-form-part3="changeForm(settingsForm.logo.form, $event)"
      @change-settings-form-part4="
        changeFormWithValidate(
          settingsForm.footer.form,
          $event,
          'changeSettingsFooter'
        )
      "
      @set-config="setConfig"
    />
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      config: {
        staticUrl: "/",
        adminSettings: {
          notification: {
            publishNeed: false,
            publicationImmediately: true,
            publicationStartDate: "",
            publicationFinishManual: true,
            publicationFinishDate: "",
            notificationText: "",
            notificationFontSize: 1,
            notificationColor: 4,
          },
          server: {
            ownServer: true,
            externalServerUrl: "",
          },
          logo: {
            image: {
              file: "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",
              fileName: "iss_logo_white.png",
            },
            logoBrand: "Информационные системы и сервисы",
          },
          footer: {
            contacts: {
              phone: "8-383-354-1011",
              email: "info@isands.ru",
            },
            links: [
              {
                name: "Новости",
                url: "/news",
              },
              {
                name: "Поддержка юридических лиц",
                url: "/measures",
              },
              {
                name: "Поддержка физических лиц",
                url: "/measures",
              },
            ],
            copyright: {
              publication: true,
              text: "© Информационные системы и сервисы, 2022",
            },
          },
        },
      },
      settingsForm: {
        notification: {
          display: true,
          form: {
            title: "Настройки уведомления",
            validity: false,
            horizontal: true,
            horizontalWidth: {
              label: {
                width: 4,
                responsive: "col-sm-5",
              },
              field: {
                width: 8,
                responsive: "col-sm-7",
              },
            },
            fields: [
              {
                id: "notification-need",
                label: "Разместить уведомление",
                type: "checkbox",
                width: 12,
                responsive: "",
                required: false,
                visibility: true,
                defaultValueLabel: "Выберите",
                horizontal: false,
                horizontalWidth: {
                  label: {
                    width: 4,
                    responsive: "col-sm-5",
                  },
                  field: {
                    width: 8,
                    responsive: "col-sm-7",
                  },
                },
                value: false,
              },
              {
                id: "notification-start-immediately",
                label: "Начало публикации сразу после сохранения",
                type: "checkbox",
                width: 12,
                responsive: "",
                required: false,
                disabled: false,
                visibility: false,
                defaultValueLabel: "Выберите",
                horizontal: false,
                horizontalWidth: {
                  label: {
                    width: 4,
                    responsive: "col-sm-5",
                  },
                  field: {
                    width: 8,
                    responsive: "col-sm-7",
                  },
                },
                value: false,
              },
              {
                id: "notification-start-date",
                label: "Дата публикации уведомления",
                type: "input",
                subtype: "datetime-local",
                width: 12,
                responsive: "",
                required: true,
                disabled: false,
                visibility: false,
                horizontal: true,
                horizontalWidth: {
                  label: {
                    width: 4,
                    responsive: "col-sm-5",
                  },
                  field: {
                    width: 8,
                    responsive: "col-sm-7",
                  },
                },
                value: "",
              },
              {
                id: "notification-finish-manual",
                label: "Снятие с публикации вручную",
                type: "checkbox",
                width: 12,
                responsive: "",
                required: false,
                disabled: false,
                defaultValueLabel: "Выберите",
                horizontal: false,
                horizontalWidth: {
                  label: {
                    width: 4,
                    responsive: "col-sm-5",
                  },
                  field: {
                    width: 8,
                    responsive: "col-sm-7",
                  },
                },
                value: false,
              },
              {
                id: "notification-finish-date",
                label: "Дата снятия уведомления с публикации",
                type: "input",
                subtype: "datetime-local",
                width: 12,
                responsive: "",
                required: true,
                disabled: false,
                visibility: false,
                horizontal: true,
                horizontalWidth: {
                  label: {
                    width: 4,
                    responsive: "col-sm-5",
                  },
                  field: {
                    width: 8,
                    responsive: "col-sm-7",
                  },
                },
                value: "",
              },
              {
                id: "notification-text",
                label: "Текст уведомления",
                type: "textarea",
                width: 12,
                responsive: "",
                required: true,
                disabled: false,
                visibility: false,
                horizontal: true,
                horizontalWidth: {
                  label: {
                    width: 4,
                    responsive: "col-sm-5",
                  },
                  field: {
                    width: 8,
                    responsive: "col-sm-7",
                  },
                },
                value: "",
              },
              {
                id: "notification-font-size",
                label: "Размер",
                type: "select",
                itemsList: [
                  { id: 1, value: 1, label: "Нормальный" },
                  { id: 2, value: 2, label: "Укрупненный" },
                  { id: 3, value: 3, label: "Огромный" },
                ],
                width: 12,
                responsive: "",
                required: true,
                disabled: false,
                visibility: false,
                defaultValueLabel: "Выберите размер",
                horizontal: true,
                horizontalWidth: {
                  label: {
                    width: 4,
                    responsive: "col-sm-5",
                  },
                  field: {
                    width: 8,
                    responsive: "col-sm-7",
                  },
                },
                values: [],
              },
              {
                id: "notification-color",
                label: "Цвет уведомления",
                type: "select",
                itemsList: [
                  { id: 1, value: 1, label: "Синий" },
                  { id: 2, value: 2, label: "Серый" },
                  { id: 3, value: 3, label: "Зелёный" },
                  { id: 4, value: 4, label: "Красный" },
                  { id: 5, value: 5, label: "Жёлтый" },
                  { id: 6, value: 6, label: "Голубой" },
                  { id: 7, value: 7, label: "Светлый" },
                  { id: 8, value: 8, label: "Тёмный" },
                ],
                width: 12,
                responsive: "",
                required: true,
                disabled: false,
                visibility: false,
                defaultValueLabel: "Выберите цвет",
                horizontal: true,
                horizontalWidth: {
                  label: {
                    width: 4,
                    responsive: "col-sm-5",
                  },
                  field: {
                    width: 8,
                    responsive: "col-sm-7",
                  },
                },
                values: [],
              },
            ],
          },
        },
        server: {
          display: true,
          form: {
            title: "Настройки уведомления",
            validity: false,
            horizontal: true,
            horizontalWidth: {
              label: {
                width: 4,
                responsive: "col-sm-5",
              },
              field: {
                width: 8,
                responsive: "col-sm-7",
              },
            },
            fields: [
              {
                id: "server-internal",
                label: "Интерфейс и серверная часть находятся на одном домене",
                type: "checkbox",
                width: 12,
                responsive: "",
                required: false,
                visibility: true,
                defaultValueLabel: "Выберите",
                horizontal: false,
                horizontalWidth: {
                  label: {
                    width: 4,
                    responsive: "col-sm-5",
                  },
                  field: {
                    width: 8,
                    responsive: "col-sm-7",
                  },
                },
                value: true,
              },
              {
                id: "server-external-address",
                label: "Адрес сервера открытого контура",
                type: "input",
                subtype: "text",
                width: 12,
                responsive: "",
                required: true,
                disabled: false,
                visibility: false,
                horizontal: true,
                horizontalWidth: {
                  label: {
                    width: 4,
                    responsive: "col-sm-5",
                  },
                  field: {
                    width: 8,
                    responsive: "col-sm-7",
                  },
                },
                value: "",
              },
            ],
          },
        },
        logo: {
          display: true,
          form: {
            title: "Настройки уведомления",
            validity: true,
            horizontal: true,
            horizontalWidth: {
              label: {
                width: 4,
                responsive: "col-sm-5",
              },
              field: {
                width: 8,
                responsive: "col-sm-7",
              },
            },
            fields: [
              {
                id: "logo-image-file",
                label: "Прикрепленные документы",
                type: "input",
                subtype: "file",
                comment: "Файл логотипа",
                button: {
                  text: "Добавить документ",
                  icon: {
                    url: "/icons/paperclip.svg",
                  },
                },
                file: {
                  name: "",
                  base64: "",
                },
                width: 12,
                responsive: "",
                required: false,
                visibility: true,
                horizontal: true,
                horizontalWidth: {
                  label: {
                    width: 4,
                    responsive: "col-sm-5",
                  },
                  field: {
                    width: 8,
                    responsive: "col-sm-7",
                  },
                },
                value: "",
              },
              {
                id: "logo-brand",
                label: "Наименование организации",
                type: "input",
                subtype: "text",
                width: 12,
                responsive: "",
                required: false,
                visibility: true,
                horizontal: true,
                horizontalWidth: {
                  label: {
                    width: 4,
                    responsive: "col-sm-5",
                  },
                  field: {
                    width: 8,
                    responsive: "col-sm-7",
                  },
                },
                value: "",
              },
            ],
          },
        },
        footer: {
          display: false,
          form: {
            title: "Настройки футера",
            validity: false,
            horizontal: true,
            horizontalWidth: {
              label: {
                width: 4,
                responsive: "col-sm-5",
              },
              field: {
                width: 8,
                responsive: "col-sm-7",
              },
            },
            fields: [
              {
                id: "footer-phone",
                label: "Номер телефона",
                type: "input",
                subtype: "text",
                width: 12,
                responsive: "",
                required: false,
                visibility: true,
                horizontal: true,
                horizontalWidth: {
                  label: {
                    width: 4,
                    responsive: "col-sm-5",
                  },
                  field: {
                    width: 8,
                    responsive: "col-sm-7",
                  },
                },
                value: "",
              },
              {
                id: "footer-email",
                label: "Адрес электронной почты",
                type: "input",
                subtype: "text",
                width: 12,
                responsive: "",
                required: false,
                visibility: true,
                horizontal: true,
                horizontalWidth: {
                  label: {
                    width: 4,
                    responsive: "col-sm-5",
                  },
                  field: {
                    width: 8,
                    responsive: "col-sm-7",
                  },
                },
                value: "",
              },
              {
                id: "footer-link-01-name",
                label: "Наименование ссылки №1",
                type: "input",
                subtype: "text",
                width: 12,
                responsive: "",
                required: false,
                visibility: true,
                horizontal: true,
                horizontalWidth: {
                  label: {
                    width: 4,
                    responsive: "col-sm-5",
                  },
                  field: {
                    width: 8,
                    responsive: "col-sm-7",
                  },
                },
                value: "",
              },
              {
                id: "footer-link-01-url",
                label: "Адрес ссылки №1",
                type: "input",
                subtype: "text",
                width: 12,
                responsive: "",
                required: true,
                disabled: false,
                visibility: false,
                horizontal: true,
                horizontalWidth: {
                  label: {
                    width: 4,
                    responsive: "col-sm-5",
                  },
                  field: {
                    width: 8,
                    responsive: "col-sm-7",
                  },
                },
                value: "",
              },
              {
                id: "footer-link-02-name",
                label: "Наименование ссылки №2",
                type: "input",
                subtype: "text",
                width: 12,
                responsive: "",
                required: false,
                visibility: true,
                horizontal: true,
                horizontalWidth: {
                  label: {
                    width: 4,
                    responsive: "col-sm-5",
                  },
                  field: {
                    width: 8,
                    responsive: "col-sm-7",
                  },
                },
                value: "",
              },
              {
                id: "footer-link-02-url",
                label: "Наименование структуры/организации",
                type: "input",
                subtype: "text",
                width: 12,
                responsive: "",
                required: true,
                disabled: false,
                visibility: false,
                horizontal: true,
                horizontalWidth: {
                  label: {
                    width: 4,
                    responsive: "col-sm-5",
                  },
                  field: {
                    width: 8,
                    responsive: "col-sm-7",
                  },
                },
                value: "",
              },
              {
                id: "footer-link-03-name",
                label: "Наименование ссылки №3",
                type: "input",
                subtype: "text",
                width: 12,
                responsive: "",
                required: false,
                visibility: true,
                horizontal: true,
                horizontalWidth: {
                  label: {
                    width: 4,
                    responsive: "col-sm-5",
                  },
                  field: {
                    width: 8,
                    responsive: "col-sm-7",
                  },
                },
                value: "",
              },
              {
                id: "footer-link-03-url",
                label: "Адрес ссылки №3",
                type: "input",
                subtype: "text",
                width: 12,
                responsive: "",
                required: true,
                disabled: false,
                visibility: false,
                horizontal: true,
                horizontalWidth: {
                  label: {
                    width: 4,
                    responsive: "col-sm-5",
                  },
                  field: {
                    width: 8,
                    responsive: "col-sm-7",
                  },
                },
                value: "",
              },
              {
                id: "footer-copyright-need",
                label: "Отображать копирайт",
                type: "checkbox",
                width: 12,
                responsive: "",
                required: false,
                visibility: true,
                defaultValueLabel: "Выберите",
                horizontal: false,
                horizontalWidth: {
                  label: {
                    width: 4,
                    responsive: "col-sm-5",
                  },
                  field: {
                    width: 8,
                    responsive: "col-sm-7",
                  },
                },
                value: false,
              },
              {
                id: "footer-copyright-text",
                label: "Текст копирайта",
                type: "input",
                subtype: "text",
                width: 12,
                responsive: "",
                required: true,
                disabled: false,
                visibility: true,
                horizontal: true,
                horizontalWidth: {
                  label: {
                    width: 4,
                    responsive: "col-sm-5",
                  },
                  field: {
                    width: 8,
                    responsive: "col-sm-7",
                  },
                },
                value: "",
              },
            ],
          },
        },
      },
    };
  },

  computed: {
    dynamicUrl: function () {
      let dynamicUrl;
      if (this.config.adminSettings.server.ownServer) {
        dynamicUrl = this.config.staticUrl;
      } else {
        dynamicUrl =
          this.config.adminSettings.server.externalServerUrl + "/api/";
      }
      return dynamicUrl;
    },

    setConfigRequest: function () {
      let setConfigRequest = {
        notification: {
          publishNeed: false,
          publicationImmediately: true,
          publicationStartDate: "",
          publicationFinishManual: true,
          publicationFinishDate: "",
          notificationText: "",
          notificationFontSize: 1,
          notificationColor: 4,
        },
        server: {
          ownServer: true,
          externalServerUrl: "",
        },
        logo: {
          image: {
            file: "/9j/4QR...eFz/2Q==",
            type: "image/jpeg",
            fileName: "Line_Screen.jpg",
          },
          logoBrand: "Информационные системы и сервисы",
        },
        footer: {
          contacts: {
            phone: "8-383-354-1011",
            email: "info@isands.ru",
          },
          links: [
            {
              name: "Новости",
              url: "/news",
            },
            {
              name: "Поддержка юридических лиц",
              url: "/measures",
            },
            {
              name: "Поддержка физических лиц",
              url: "/measures",
            },
          ],
          copyright: {
            publication: true,
            text: "© Информационные системы и сервисы, 2022",
          },
        },
      };
      if (this.settingsForm.notification.form.fields[0].value) {
        setConfigRequest.notification.publishNeed = true;
        if (this.settingsForm.notification.form.fields[1].value) {
          // Заменить на получение текущей даты
          setConfigRequest.notification.publicationStartDate =
            this.convertDateToInputDateTime(new Date());
        } else {
          setConfigRequest.notification.publicationImmediately = false;
          setConfigRequest.notification.publicationStartDate =
            this.settingsForm.notification.form.fields[2].value;
        }
        if (!this.settingsForm.notification.form.fields[3].value) {
          setConfigRequest.notification.publicationFinishManual = false;
          setConfigRequest.notification.publicationFinishDate =
            this.settingsForm.notification.form.fields[4].value;
        }
        setConfigRequest.notification.notificationText =
          this.settingsForm.notification.form.fields[5].value;
        setConfigRequest.notification.notificationFontSize =
          this.settingsForm.notification.form.fields[6].values[0];
        setConfigRequest.notification.notificationColor =
          this.settingsForm.notification.form.fields[7].values[0];
      }

      setConfigRequest.server = {
        ownServer: this.settingsForm.server.form.fields[0].value,
        externalServerUrl: this.settingsForm.server.form.fields[1].value,
      };
      setConfigRequest.logo = {
        image: {
          file: this.settingsForm.logo.form.fields[0].file.base64,
          type: this.settingsForm.logo.form.fields[0].file.type,
          fileName: this.settingsForm.logo.form.fields[0].file.name,
        },
        logoBrand: this.settingsForm.logo.form.fields[1].value,
      };

      setConfigRequest.footer = {
        contacts: {
          phone: this.settingsForm.footer.form.fields[0].value,
          email: this.settingsForm.footer.form.fields[1].value,
        },
        links: [
          {
            name: this.settingsForm.footer.form.fields[2].value,
            url: this.settingsForm.footer.form.fields[3].value,
          },
          {
            name: this.settingsForm.footer.form.fields[4].value,
            url: this.settingsForm.footer.form.fields[5].value,
          },
          {
            name: this.settingsForm.footer.form.fields[6].value,
            url: this.settingsForm.footer.form.fields[7].value,
          },
        ],
        copyright: {
          publication: this.settingsForm.footer.form.fields[8].value,
          text: this.settingsForm.footer.form.fields[9].value,
        },
      };
      return setConfigRequest;
    },
  },

  methods: {
    // Админка
    // Чтение админки
    async getAppConfig() {
      await axios.get(this.config.staticUrl + "config/").then((response) => {
        this.parseConfig(response.data);
        console.groupCollapsed("Конфигурация системы");
        console.log(response.data);
        console.groupEnd();
      });
    },
    parseConfig(configData) {
      // Уведомление
      const now = new Date();
      let notificationFinishDate;
      if (configData.notification.publicationFinishDate) {
        notificationFinishDate = new Date(
          configData.notification.publicationFinishDate
        );
      }
      const validDate =
        notificationFinishDate > now ||
        (!configData.notification.publicationFinishDate &&
          configData.notification.publicationFinishManual);
      const notificationPublishing =
        configData.notification.publishNeed && validDate;
      if (notificationPublishing) {
        this.config.adminSettings.notification.publishNeed = true;
        this.settingsForm.notification.form.fields[0].value = true;
        this.settingsForm.notification.form.fields[1].visibility = false;
        this.settingsForm.notification.form.fields[2].visibility = true;
        this.settingsForm.notification.form.fields[3].visibility = true;
        this.settingsForm.notification.form.fields[5].visibility = true;
        this.settingsForm.notification.form.fields[6].visibility = true;
        this.settingsForm.notification.form.fields[7].visibility = true;
      } else {
        this.config.adminSettings.notification.publishNeed = false;
        this.settingsForm.notification.form.fields[0].value = false;
        this.settingsForm.notification.form.fields[1].visibility = false;
        this.settingsForm.notification.form.fields[2].visibility = false;
        this.settingsForm.notification.form.fields[3].visibility = false;
        this.settingsForm.notification.form.fields[5].visibility = false;
        this.settingsForm.notification.form.fields[6].visibility = false;
        this.settingsForm.notification.form.fields[7].visibility = false;
      }
      this.config.adminSettings.notification.publicationImmediately =
        configData.notification.publicationImmediately;
      this.settingsForm.notification.form.fields[1].value =
        configData.notification.publicationImmediately;
      if (notificationPublishing) {
        this.config.adminSettings.notification.publicationStartDate =
          configData.notification.publicationStartDate;
        this.settingsForm.notification.form.fields[2].value =
          configData.notification.publicationStartDate;
      } else {
        this.config.adminSettings.notification.publicationStartDate = "";
        this.settingsForm.notification.form.fields[2].value = "";
      }
      this.config.adminSettings.notification.publicationFinishManual =
        configData.notification.publicationFinishManual;
      this.settingsForm.notification.form.fields[3].value =
        configData.notification.publicationFinishManual;
      if (
        notificationPublishing &&
        !configData.notification.publicationFinishManual
      ) {
        this.config.adminSettings.notification.publicationFinishDate =
          configData.notification.publicationFinishDate;
        this.settingsForm.notification.form.fields[4].value =
          configData.notification.publicationFinishDate;
        this.settingsForm.notification.form.fields[4].visibility = true;
      } else {
        this.config.adminSettings.notification.publicationFinishDate = "";
        this.settingsForm.notification.form.fields[4].value = "";
        this.settingsForm.notification.form.fields[4].visibility = false;
      }
      if (notificationPublishing) {
        this.config.adminSettings.notification.notificationText =
          configData.notification.notificationText;
        this.settingsForm.notification.form.fields[5].value =
          configData.notification.notificationText;
      } else {
        this.config.adminSettings.notification.notificationText = "";
        this.settingsForm.notification.form.fields[5].value = "";
      }
      this.config.adminSettings.notification.notificationFontSize =
        configData.notification.notificationFontSize;
      this.settingsForm.notification.form.fields[6].values[0] =
        configData.notification.notificationFontSize;
      this.config.adminSettings.notification.notificationColor =
        configData.notification.notificationColor;
      this.settingsForm.notification.form.fields[7].values[0] =
        configData.notification.notificationColor;
      this.validateForm(this.settingsForm.notification.form);

      // Сервер
      this.config.adminSettings.server.ownServer = configData.server.ownServer;
      this.settingsForm.server.form.fields[0].value =
        configData.server.ownServer;
      if (!configData.server.ownServer) {
        this.settingsForm.server.form.fields[1].visibility = true;
      } else {
        this.settingsForm.server.form.fields[1].visibility = false;
      }
      this.config.adminSettings.server.externalServerUrl =
        configData.server.externalServerUrl;
      this.settingsForm.server.form.fields[1].value =
        configData.server.externalServerUrl;
      this.validateForm(this.settingsForm.server.form);

      // Лого
      this.config.adminSettings.logo.image.file = configData.logo.image.file;
      this.settingsForm.logo.form.fields[0].file.base64 =
        configData.logo.image.file;
      this.config.adminSettings.logo.image.fileName =
        configData.logo.image.fileName;
      this.settingsForm.logo.form.fields[0].file.name =
        configData.logo.image.fileName;
      this.config.adminSettings.logo.logoBrand = configData.logo.logoBrand;
      this.settingsForm.logo.form.fields[1].value = configData.logo.logoBrand;
      this.validateForm(this.settingsForm.logo.form);

      // Футер
      this.config.adminSettings.footer.contacts.phone =
        configData.footer.contacts.phone;
      this.settingsForm.footer.form.fields[0].value =
        configData.footer.contacts.phone;
      this.config.adminSettings.footer.contacts.email =
        configData.footer.contacts.email;
      this.settingsForm.footer.form.fields[1].value =
        configData.footer.contacts.email;
      if (configData.footer.links.length > 0) {
        if (
          configData.footer.links[0] &&
          configData.footer.links[0].name &&
          configData.footer.links[0].url
        ) {
          this.config.adminSettings.footer.links[0].name =
            configData.footer.links[0].name;
          this.settingsForm.footer.form.fields[2].value =
            configData.footer.links[0].name;
          this.config.adminSettings.footer.links[0].url =
            configData.footer.links[0].url;
          this.settingsForm.footer.form.fields[3].value =
            configData.footer.links[0].url;
          this.settingsForm.footer.form.fields[3].visibility = true;
        } else {
          this.config.adminSettings.footer.links[0].name = "";
          this.settingsForm.footer.form.fields[2].value = "";
          this.config.adminSettings.footer.links[0].url = "";
          this.settingsForm.footer.form.fields[3].value = "";
          this.settingsForm.footer.form.fields[3].visibility = false;
        }
        if (
          configData.footer.links[1] &&
          configData.footer.links[1].name &&
          configData.footer.links[1].url
        ) {
          this.config.adminSettings.footer.links[1].name =
            configData.footer.links[1].name;
          this.settingsForm.footer.form.fields[4].value =
            configData.footer.links[1].name;
          this.config.adminSettings.footer.links[1].url =
            configData.footer.links[1].url;
          this.settingsForm.footer.form.fields[5].value =
            configData.footer.links[1].url;
          this.settingsForm.footer.form.fields[5].visibility = true;
        } else {
          this.config.adminSettings.footer.links[1].name = "";
          this.settingsForm.footer.form.fields[4].value = "";
          this.config.adminSettings.footer.links[1].url = "";
          this.settingsForm.footer.form.fields[5].value = "";
          this.settingsForm.footer.form.fields[5].visibility = false;
        }
        if (
          configData.footer.links[2] &&
          configData.footer.links[2].name &&
          configData.footer.links[2].url
        ) {
          this.config.adminSettings.footer.links[2].name =
            configData.footer.links[2].name;
          this.settingsForm.footer.form.fields[6].value =
            configData.footer.links[2].name;
          this.config.adminSettings.footer.links[2].url =
            configData.footer.links[2].url;
          this.settingsForm.footer.form.fields[7].value =
            configData.footer.links[2].url;
          this.settingsForm.footer.form.fields[7].visibility = true;
        } else {
          this.config.adminSettings.footer.links[2].name = "";
          this.settingsForm.footer.form.fields[6].value = "";
          this.config.adminSettings.footer.links[2].url = "";
          this.settingsForm.footer.form.fields[7].value = "";
          this.settingsForm.footer.form.fields[7].visibility = false;
        }
      }
      this.config.adminSettings.footer.copyright.publication =
        configData.footer.copyright.publication;
      this.settingsForm.footer.form.fields[8].value =
        configData.footer.copyright.publication;
      if (configData.footer.copyright.publication) {
        this.config.adminSettings.footer.copyright.text =
          configData.footer.copyright.text;
        this.settingsForm.footer.form.fields[9].value =
          configData.footer.copyright.text;
        this.settingsForm.footer.form.fields[9].visibility = true;
      } else {
        this.config.adminSettings.footer.copyright.text = "";
        this.settingsForm.footer.form.fields[9].value = "";
        this.settingsForm.footer.form.fields[9].visibility = false;
      }
      this.validateForm(this.settingsForm.footer.form);
    },
    // Запись конфигурации админки
    setConfig() {
      console.log("Запись конфигурации");
      console.log(this.setConfigRequest);
      axios
        .post(this.config.staticUrl + "config/", this.setConfigRequest, {
          withCredentials: true,
        })
        .then(() => {
          this.getAppConfig();
          console.log("Настройки системы изменены");
        });
    },
    // Нестандартная обработка форм
    changeSettingsNotification(formData, newFormData) {
      // Поиск редактируемого поля формы
      let formField = this.findFieldInForm(formData, newFormData.id);
      // Дополнительные условия (переключение видимости/значений связанных полей)
      if (formField.id === "notification-need") {
        if (newFormData.value) {
          this.changeFieldsVisibility(formData, [
            { id: "notification-start-immediately", visibility: true },
            { id: "notification-finish-manual", visibility: true },
            { id: "notification-text", visibility: true },
            { id: "notification-font-size", visibility: true },
            { id: "notification-color", visibility: true },
          ]);
          this.settingsForm.notification.form.fields[1].value = true;
          this.settingsForm.notification.form.fields[3].value = true;
        } else {
          this.changeFieldsVisibility(formData, [
            { id: "notification-start-immediately", visibility: false },
            { id: "notification-start-date", visibility: false },
            { id: "notification-finish-manual", visibility: false },
            { id: "notification-finish-date", visibility: false },
            { id: "notification-text", visibility: false },
            { id: "notification-font-size", visibility: false },
            { id: "notification-color", visibility: false },
          ]);
        }
      } else if (formField.id === "notification-start-immediately") {
        if (newFormData.value) {
          this.changeFieldsVisibility(formData, [
            { id: "notification-start-date", visibility: false },
          ]);
        } else {
          this.changeFieldsVisibility(formData, [
            { id: "notification-start-date", visibility: true },
          ]);
        }
      } else if (formField.id === "notification-finish-manual") {
        if (newFormData.value) {
          this.changeFieldsVisibility(formData, [
            { id: "notification-finish-date", visibility: false },
          ]);
        } else {
          this.changeFieldsVisibility(formData, [
            { id: "notification-finish-date", visibility: true },
          ]);
        }
      }
      // Стандартное изменение значения поля
      this.changeForm(formData, newFormData);
    },
    changeSettingsServer(formData, newFormData) {
      // Поиск редактируемого поля формы
      let formField = this.findFieldInForm(formData, newFormData.id);
      if (formField.id === "server-internal") {
        if (newFormData.value) {
          this.changeFieldsVisibility(formData, [
            { id: "server-external-address", visibility: false },
          ]);
        } else {
          this.changeFieldsVisibility(formData, [
            { id: "server-external-address", visibility: true },
          ]);
        }
      }
      this.changeForm(formData, newFormData);
    },
    changeSettingsFooter(formData, newFormData) {
      // Поиск редактируемого поля формы
      let formField = this.findFieldInForm(formData, newFormData.id);
      if (formField.id === "footer-link-01-name") {
        if (newFormData.value) {
          this.changeFieldsVisibility(formData, [
            { id: "footer-link-01-url", visibility: true },
          ]);
        } else {
          this.changeFieldsVisibility(formData, [
            { id: "footer-link-01-url", visibility: false },
          ]);
        }
      } else if (formField.id === "footer-link-02-name") {
        if (newFormData.value) {
          this.changeFieldsVisibility(formData, [
            { id: "footer-link-02-url", visibility: true },
          ]);
        } else {
          this.changeFieldsVisibility(formData, [
            { id: "footer-link-02-url", visibility: false },
          ]);
        }
      } else if (formField.id === "footer-link-03-name") {
        if (newFormData.value) {
          this.changeFieldsVisibility(formData, [
            { id: "footer-link-03-url", visibility: true },
          ]);
        } else {
          this.changeFieldsVisibility(formData, [
            { id: "footer-link-03-url", visibility: false },
          ]);
        }
      } else if (formField.id === "footer-copyright-need") {
        if (newFormData.value) {
          this.changeFieldsVisibility(formData, [
            { id: "footer-copyright-text", visibility: true },
          ]);
        } else {
          this.changeFieldsVisibility(formData, [
            { id: "footer-copyright-text", visibility: false },
          ]);
        }
      }
      this.changeForm(formData, newFormData);
    },

    getServiceInfo(serviceId) {
      axios
        .get(this.url + "serv/get-model?id=" + serviceId)
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

    // Базовые методы

    // Изменения формы с валидацией и возможной кастомной обработкой
    changeFormWithValidate(formData, newFormData, customChangeFormMethodName) {
      console.groupCollapsed(
        `Изменение формы «${formData.title}» с валидацией`
      );
      console.groupCollapsed("Входные данные для изменения формы");
      console.log("Данные формы до внесения изменений");
      console.log(formData);
      console.log("Поле с новым значением");
      console.log(newFormData);
      console.groupEnd();
      // Редактирование поля формы кастомным или базовым методом
      if (customChangeFormMethodName) {
        console.groupCollapsed(
          `Кастомная обработка изменения формы методом ${customChangeFormMethodName}`
        );
        this[customChangeFormMethodName](formData, newFormData);
        console.groupEnd();
      } else {
        this.changeForm(formData, newFormData);
      }
      // Поиск редактируемого поля формы
      let formField = this.findFieldInForm(formData, newFormData.id);
      if (formField.required) {
        this.validateForm(formData);
      }
      console.groupCollapsed("Форма после внесения изменений");
      console.log(formData);
      console.groupEnd();
      console.groupEnd();
    },
    // Изменения формы типовое
    changeForm(formData, newFormData) {
      console.log("Обработка изменения формы типовым методом changeForm");
      // Поиск редактируемого поля формы
      let formField = this.findFieldInForm(formData, newFormData.id);
      if (formField.type === "select") {
        formField.values = newFormData.values;
      } else if (formField.type === "range") {
        formField.itemsList[newFormData.index].value = newFormData.value;
      } else if (formField.type === "input" && formField.subtype === "file") {
        formField.file = newFormData.value;
      } else {
        formField.value = newFormData.value;
      }
    },
    // Проверка формы на заполненность обязательных видимых полей
    validateForm(formData) {
      console.groupCollapsed(
        "Проверка формы на заполненность обязательных видимых полей"
      );
      let requiredFields = [];
      formData.fields.forEach((field) => {
        if (field.type === "select") {
          if (field.values.length === 0 && field.required && field.visibility) {
            requiredFields.push({ id: field.id, validity: false });
          } else {
            requiredFields.push({ id: field.id, validity: true });
          }
        } else if (
          field.type === "input" &&
          field.subtype === "file" &&
          field.visibility
        ) {
          if (!field.file.base64 && field.required) {
            requiredFields.push({ id: field.id, validity: false });
          } else {
            requiredFields.push({ id: field.id, validity: true });
          }
        } else {
          if (!field.value && field.required && field.visibility) {
            requiredFields.push({ id: field.id, validity: false });
          } else {
            requiredFields.push({ id: field.id, validity: true });
          }
        }
      });
      let invalidField = requiredFields.find(
        (fieldShortData) => !fieldShortData.validity
      );
      if (invalidField) {
        console.log(
          `Форма «${formData.title}» не валидна, так как не валидно поле ${invalidField.id}`
        );
        formData.validity = false;
      } else {
        console.log(`Форма «${formData.title}» валидна`);
        formData.validity = true;
      }
      console.groupEnd();
    },
    // Поиск поля в форме по его идентификатору
    findFieldInForm(formData, formFieldId) {
      return formData.fields.find((formField) => formField.id === formFieldId);
    },
    // Установка полям формы видимости по идентификатору поля и значению видимости
    changeFieldsVisibility(formData, changedFieldsArray) {
      console.groupCollapsed("Поля с измененной видимостью");
      changedFieldsArray.forEach((fieldShortData) => {
        let changedField = this.findFieldInForm(formData, fieldShortData.id);
        changedField.visibility = fieldShortData.visibility;
        if (changedField.visibility) {
          console.log(`Показано поле ${changedField.id}`);
        } else {
          console.log(`Скрыто поле ${changedField.id}`);
        }
      });
      console.groupEnd();
    },
  },

  mounted: async function () {
    console.log("Смонтирован компонент App");
    // await this.getAppConfig();
  },
};
</script>

<style lang="scss"></style>
