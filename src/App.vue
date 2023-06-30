<template>
  <div id="app">
    <!--    :app-form="startForm"-->
    <!--<router-view
      :config="config"
      :services="services.list"
      :service="service"
      :settings-form="settingsForm"
      :measure="measure"
      :app-form="service.form"
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
      @show-service-info="showServiceInfo($event)"
      @show-service-first-form="showServiceFirstForm($event)"
      @get-start-form="getServiceForm($event)"
      @form-action="invokeAction($event)"
    />-->
    <router-view
      :url="dynamicUrl"
      :config="config"
      :config-loaded="configLoaded"
      :user="config.user"
      :unread-messages="unreadMessages"
      :theme="config.theme"
      :apps="apps"
      :settings-form="settingsForm"
      :services="services"
      :service="service"
      :loaded-service-form="loadedServiceForm"
      @open-auth-modal="openAuthModal"
      @sign-out="signOut"
      @assign-user="assignUser($event)"
      @select-role="user.selectedRole = $event"
      @change-apps-page-size="changePageSize(apps, $event)"
      @change-apps-page="changePage(apps, $event)"
      @change-apps-filter="changeForm(apps.filters.form, $event)"
      @apply-apps-filter="applyFilter(apps)"
      @clear-apps-filter="clearFilter(apps)"
      @change-user-role="changeUserRole($event[0])"
      @change-user-org="changeUserOrg($event[0])"
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
      @reload-apps="getApps"
      @show-service-first-form="showServiceFirstForm($event)"
      @show-app-form="showAppForm($event)"
      @change-app-form="changeAppForm($event)"
    />
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "App",
  data() {
    return {
      /*config: {
        // staticUrl: "/",
        // staticUrl: "https://open-grata-nso.isands.ru",
        staticUrl: "https://open-newtemplate.isands.ru",
        // staticUrl: "https://hunter-kurganobl.isands.ru",
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
              file: "iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAABGdBTUEAALGOfPtRkwAAACBjSFJNAACHDwAAjA8AAP1SAACBQAAAfXkAAOmLAAA85QAAGcxzPIV3AAAKL2lDQ1BJQ0MgUHJvZmlsZQAASMedlndUVNcWh8+9d3qhzTDSGXqTLjCA9C4gHQRRGGYGGMoAwwxNbIioQEQREQFFkKCAAaOhSKyIYiEoqGAPSBBQYjCKqKhkRtZKfHl57+Xl98e939pn73P32XuftS4AJE8fLi8FlgIgmSfgB3o401eFR9Cx/QAGeIABpgAwWempvkHuwUAkLzcXerrICfyL3gwBSPy+ZejpT6eD/0/SrFS+AADIX8TmbE46S8T5Ik7KFKSK7TMipsYkihlGiZkvSlDEcmKOW+Sln30W2VHM7GQeW8TinFPZyWwx94h4e4aQI2LER8QFGVxOpohvi1gzSZjMFfFbcWwyh5kOAIoktgs4rHgRm4iYxA8OdBHxcgBwpLgvOOYLFnCyBOJDuaSkZvO5cfECui5Lj25qbc2ge3IykzgCgaE/k5XI5LPpLinJqUxeNgCLZ/4sGXFt6aIiW5paW1oamhmZflGo/7r4NyXu7SK9CvjcM4jW94ftr/xS6gBgzIpqs+sPW8x+ADq2AiB3/w+b5iEAJEV9a7/xxXlo4nmJFwhSbYyNMzMzjbgclpG4oL/rfzr8DX3xPSPxdr+Xh+7KiWUKkwR0cd1YKUkpQj49PZXJ4tAN/zzE/zjwr/NYGsiJ5fA5PFFEqGjKuLw4Ubt5bK6Am8Kjc3n/qYn/MOxPWpxrkSj1nwA1yghI3aAC5Oc+gKIQARJ5UNz13/vmgw8F4psXpjqxOPefBf37rnCJ+JHOjfsc5xIYTGcJ+RmLa+JrCdCAACQBFcgDFaABdIEhMANWwBY4AjewAviBYBAO1gIWiAfJgA8yQS7YDApAEdgF9oJKUAPqQSNoASdABzgNLoDL4Dq4Ce6AB2AEjIPnYAa8AfMQBGEhMkSB5CFVSAsygMwgBmQPuUE+UCAUDkVDcRAPEkK50BaoCCqFKqFaqBH6FjoFXYCuQgPQPWgUmoJ+hd7DCEyCqbAyrA0bwwzYCfaGg+E1cBycBufA+fBOuAKug4/B7fAF+Dp8Bx6Bn8OzCECICA1RQwwRBuKC+CERSCzCRzYghUg5Uoe0IF1IL3ILGUGmkXcoDIqCoqMMUbYoT1QIioVKQ21AFaMqUUdR7age1C3UKGoG9QlNRiuhDdA2aC/0KnQcOhNdgC5HN6Db0JfQd9Dj6DcYDIaG0cFYYTwx4ZgEzDpMMeYAphVzHjOAGcPMYrFYeawB1g7rh2ViBdgC7H7sMew57CB2HPsWR8Sp4sxw7rgIHA+XhyvHNeHO4gZxE7h5vBReC2+D98Oz8dn4Enw9vgt/Az+OnydIE3QIdoRgQgJhM6GC0EK4RHhIeEUkEtWJ1sQAIpe4iVhBPE68QhwlviPJkPRJLqRIkpC0k3SEdJ50j/SKTCZrkx3JEWQBeSe5kXyR/Jj8VoIiYSThJcGW2ChRJdEuMSjxQhIvqSXpJLlWMkeyXPKk5A3JaSm8lLaUixRTaoNUldQpqWGpWWmKtKm0n3SydLF0k/RV6UkZrIy2jJsMWyZf5rDMRZkxCkLRoLhQWJQtlHrKJco4FUPVoXpRE6hF1G+o/dQZWRnZZbKhslmyVbJnZEdoCE2b5kVLopXQTtCGaO+XKC9xWsJZsmNJy5LBJXNyinKOchy5QrlWuTty7+Xp8m7yifK75TvkHymgFPQVAhQyFQ4qXFKYVqQq2iqyFAsVTyjeV4KV9JUCldYpHVbqU5pVVlH2UE5V3q98UXlahabiqJKgUqZyVmVKlaJqr8pVLVM9p/qMLkt3oifRK+g99Bk1JTVPNaFarVq/2ry6jnqIep56q/ojDYIGQyNWo0yjW2NGU1XTVzNXs1nzvhZei6EVr7VPq1drTltHO0x7m3aH9qSOnI6XTo5Os85DXbKug26abp3ubT2MHkMvUe+A3k19WN9CP16/Sv+GAWxgacA1OGAwsBS91Hopb2nd0mFDkqGTYYZhs+GoEc3IxyjPqMPohbGmcYTxbuNe408mFiZJJvUmD0xlTFeY5pl2mf5qpm/GMqsyu21ONnc332jeaf5ymcEyzrKDy+5aUCx8LbZZdFt8tLSy5Fu2WE5ZaVpFW1VbDTOoDH9GMeOKNdra2Xqj9WnrdzaWNgKbEza/2BraJto22U4u11nOWV6/fMxO3Y5pV2s3Yk+3j7Y/ZD/ioObAdKhzeOKo4ch2bHCccNJzSnA65vTC2cSZ79zmPOdi47Le5bwr4urhWuja7ybjFuJW6fbYXd09zr3ZfcbDwmOdx3lPtKe3527PYS9lL5ZXo9fMCqsV61f0eJO8g7wrvZ/46Pvwfbp8Yd8Vvnt8H67UWslb2eEH/Lz89vg98tfxT/P/PgAT4B9QFfA00DQwN7A3iBIUFdQU9CbYObgk+EGIbogwpDtUMjQytDF0Lsw1rDRsZJXxqvWrrocrhHPDOyOwEaERDRGzq91W7109HmkRWRA5tEZnTdaaq2sV1iatPRMlGcWMOhmNjg6Lbor+wPRj1jFnY7xiqmNmWC6sfaznbEd2GXuKY8cp5UzE2sWWxk7G2cXtiZuKd4gvj5/munAruS8TPBNqEuYS/RKPJC4khSW1JuOSo5NP8WR4ibyeFJWUrJSBVIPUgtSRNJu0vWkzfG9+QzqUvia9U0AV/Uz1CXWFW4WjGfYZVRlvM0MzT2ZJZ/Gy+rL1s3dkT+S453y9DrWOta47Vy13c+7oeqf1tRugDTEbujdqbMzfOL7JY9PRzYTNiZt/yDPJK817vSVsS1e+cv6m/LGtHlubCyQK+AXD22y31WxHbedu799hvmP/jk+F7MJrRSZF5UUfilnF174y/ariq4WdsTv7SyxLDu7C7OLtGtrtsPtoqXRpTunYHt897WX0ssKy13uj9l4tX1Zes4+wT7hvpMKnonO/5v5d+z9UxlfeqXKuaq1Wqt5RPXeAfWDwoOPBlhrlmqKa94e4h+7WetS212nXlR/GHM44/LQ+tL73a8bXjQ0KDUUNH4/wjowcDTza02jV2Nik1FTSDDcLm6eORR67+Y3rN50thi21rbTWouPguPD4s2+jvx064X2i+yTjZMt3Wt9Vt1HaCtuh9uz2mY74jpHO8M6BUytOdXfZdrV9b/T9kdNqp6vOyJ4pOUs4m3924VzOudnzqeenL8RdGOuO6n5wcdXF2z0BPf2XvC9duex++WKvU++5K3ZXTl+1uXrqGuNax3XL6+19Fn1tP1j80NZv2d9+w+pG503rm10DywfODjoMXrjleuvyba/b1++svDMwFDJ0dzhyeOQu++7kvaR7L+9n3J9/sOkh+mHhI6lH5Y+VHtf9qPdj64jlyJlR19G+J0FPHoyxxp7/lP7Th/H8p+Sn5ROqE42TZpOnp9ynbj5b/Wz8eerz+emCn6V/rn6h++K7Xxx/6ZtZNTP+kv9y4dfiV/Kvjrxe9rp71n/28ZvkN/NzhW/l3x59x3jX+z7s/cR85gfsh4qPeh+7Pnl/eriQvLDwG/eE8/s3BCkeAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAIXRFWHRDcmVhdGlvbiBUaW1lADIwMTc6MDg6MTAgMjI6NTM6MzKaPYH8AAACSElEQVR4Xu3cMW4DMQwAwVP+/2cGB6gy7M01bpSZhqoJLNhpzczFY6csa+35TUfs6mdP4A2BQBAIBIFAEAgEgUAQCASBQBAIBIFAEAgEgUAQCASBQBAIBIFAEAgEgUAQCASBQBAIBIFAEAgEgUAQCASBQBAIBIFAEAgEgUAQCASBQBAIBIFAEAgEgUAQCASBQBAIBIFAEAgEgUAQCASBQBAIBIFAEAgEgUAQCIQ1M/sJvHJBIAgEgkAgCASCQCAIBIJAIAgEgkAgCASCQCAIBIJAIAgEgkAgCASCQCAIBIJAIAgEgkAgCASCQCAIBML9cdwpP8etPb/Jrp47YlcuCASBQBAIBIFAEAgEgUAQCASBQBAIBIFAEAgEgUAQCASBQBAIBIFAEAgEgUAQCASBQBAIBIFAEAgEgUAQCASBQBAIBIFAEAgEgUAQCASBQBAIBIFAEAgEgUAQCASBQBAIBIFAEAgEgUAQCASBQBAIBIFAEAgEgUAQCIQ1M/vJA6csa+3JH1wQCAKBIBAIAoEgEAgCgSAQCAKBIBAIAoEgEAgCgSAQCAKBIBAIAoEgEAgCgSAQCAKBIBAIAoEgEAgCgXB/HOcztOfs6p9xQSAIBIJAIAgEgkAgCASCQCAIBIJAIAgEgkAgCASCQCAIBIJAIAgEgkAgCASCQCAIBIJAIAgEgkAgCASCQCAIBIJAIAgEgkAgCASCQCAIBIJAIAgEgkAgCASCQCAIBIJAIAgEgkAgCASCQCAIBIJAIAgEgkAgCASCQOCj6/oFbGAYe3qft4oAAAAASUVORK5CYII=",
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
      services: {
        list: [],
        pagination: {
          itemsTotal: 0,
          page: 1,
          pageSize: 10,
          itemsPerPage: [10, 25, 50],
        },
      },
      service: {
        info: {},
        forms: [],
        form: {
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
          loader: {
            isLoading: false,
            isResponse: false,
            comment: "",
          },
        },
        loader: {
          loader: {
            isLoading: false,
            isResponse: false,
            comment: "",
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
      measure: {},
      /!*appForm: {
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
        loader: {
          isLoading: false,
          isResponse: false,
          comment: "",
        },
      },*!/

      form01: {
        id: 213,
        modelId: 311,
        orderId: "0",
        status: "",
        data: {
          params_handler_application: "",
          params_handler_application_start: "",
          params_handler_state_string: "",
          lastName: "",
          firstName: "",
          middleName: "",
          dateOfBirth: "",
          textField2: "",
          textField3: "",
          regAdress: "",
          faktAdress: "",
          checkbox1: false,
          documentType: "Паспорт",
          passportSeries: "",
          passportNumber: "",
          passportDate: "",
          passportCode: "",
          passportOrganization: "",
          textField1: "",
          snils: "",
          organizationNameSelect: {},
          innOrg: "",
          textField4: "",
          textField6: "",
          educationSelect: {},
          educationYear: "",
          scientificDegreeSelect: {},
          degreeYear: "",
          scientificTitleSelect: {},
          titleYear: "",
          publications: [],
          konkursi: [],
          nauchKol: [],
          scienceWorkName: "",
          direction: "",
          annotation: "",
          relevance: "",
          newness1: "",
          newness2: "",
          newness3: "",
          newness: "",
          rashifrovka1: "",
          rashifrovka2: "",
          rashifrovka3: "",
          rashifrovka4: "",
          rashifrovka5: "",
          rashifrovka6: "",
          rashifrovka7: "",
          submit1: false,
          file: [],
          file1: [],
          file3: [],
          file2: [],
          file6: [],
          file4: [],
          file8: [],
          checkbox8: false,
          checkbox4: false,
          checkbox5: false,
          checkbox6: false,
          checkbox: false,
          checkbox3: false,
          checkbox2: false,
          checkbox7: false,
          impactFaktorSum: 0,
        },
        form: {
          id: 529,
          name: "Заявление (черновик)",
          scheme: {
            components: [
              {
                extTypeCheckbox: false,
                components: [
                  {
                    extTypeCheckbox: false,
                    input: false,
                    columns: [
                      {
                        pull: 0,
                        components: [
                          {
                            extTypeCheckbox: false,
                            input: true,
                            dataGridLabel: false,
                            hideOnChildrenHidden: false,
                            tableView: true,
                            smev_req: {},
                            disabled: true,
                            label: "Номер",
                            type: "textfield",
                            key: "params_handler_application",
                            esiaKey: {},
                          },
                        ],
                        offset: 0,
                        size: "md",
                        width: 4,
                        push: 0,
                      },
                      {
                        pull: 0,
                        components: [
                          {
                            extTypeCheckbox: false,
                            enableMaxDateInput: false,
                            widget: {
                              minDate: null,
                              enableTime: false,
                              format: "dd.MM.yyyy",
                              displayInTimezone: "viewer",
                              noCalendar: false,
                              type: "calendar",
                              locale: "ru",
                              time_24hr: true,
                              allowInput: true,
                              minuteIncrement: 1,
                              mode: "single",
                              useLocaleSettings: false,
                              maxDate: null,
                              disableWeekdays: false,
                              disableWeekends: false,
                              hourIncrement: 1,
                            },
                            dataGridLabel: false,
                            hideOnChildrenHidden: false,
                            format: "dd.MM.yyyy",
                            enableTime: false,
                            tableView: false,
                            datePicker: {
                              disableWeekdays: false,
                              disableWeekends: false,
                            },
                            label: "Дата создания",
                            type: "datetime",
                            enableMinDateInput: false,
                            input: true,
                            timePicker: {
                              showMeridian: false,
                            },
                            smev_req: {},
                            disabled: true,
                            placeholder: "ДД.ММ.ГГГГ",
                            key: "params_handler_application_start",
                            esiaKey: {},
                          },
                        ],
                        size: "md",
                        offset: 0,
                        width: 4,
                        push: 0,
                      },
                      {
                        pull: 0,
                        components: [
                          {
                            extTypeCheckbox: false,
                            input: true,
                            dataGridLabel: false,
                            hideOnChildrenHidden: false,
                            tableView: true,
                            smev_req: {},
                            disabled: true,
                            label: "Статус",
                            type: "textfield",
                            key: "params_handler_state_string",
                            esiaKey: {},
                          },
                        ],
                        offset: 0,
                        size: "md",
                        width: 4,
                        push: 0,
                      },
                    ],
                    dataGridLabel: false,
                    smev_req: {},
                    tableView: false,
                    label: "Столбцы",
                    type: "columns",
                    key: "columns1",
                    esiaKey: {},
                  },
                ],
                collapsed: false,
                dataGridLabel: false,
                allowPrevious: false,
                tableView: false,
                label: "Бизнес-процесс №1",
                title: "Бизнес-процесс №1",
                type: "panel",
                breadcrumbClickable: true,
                collapsible: false,
                buttonSettings: {
                  cancel: true,
                  next: true,
                  previous: true,
                },
                input: false,
                smev_req: {},
                key: "panel",
                esiaKey: {},
              },
            ],
          },
          modelId: 311,
          actions: [
            {
              id: 732,
              name: "Вернуться в реестр",
              modelId: 311,
              formId: 529,
              hidden: false,
              alwaysActive: false,
              notRequiredAction: true,
              backAction: true,
              printAction: false,
              signAction: false,
            },
            {
              id: 731,
              name: "Сохранить",
              modelId: 311,
              formId: 529,
              hidden: false,
              alwaysActive: false,
              notRequiredAction: true,
              backAction: false,
              printAction: false,
              signAction: false,
            },
          ],
        },
        type: 1,
        startDate: "2023-06-05T07:59:31.618+00:00",
        endDate: null,
        active: true,
        archive: false,
        metadata: {},
      },
      form02: {
        id: 213,
        modelId: 311,
        orderId: "0",
        status: "",
        data: {
          params_handler_application: "",
          params_handler_application_start: "",
          params_handler_state_string: "",
          lastName: "",
          firstName: "",
          middleName: "",
          dateOfBirth: "",
          textField2: "",
          textField3: "",
          regAdress: "",
          faktAdress: "",
          checkbox1: false,
          documentType: "Паспорт",
          passportSeries: "",
          passportNumber: "",
          passportDate: "",
          passportCode: "",
          passportOrganization: "",
          textField1: "",
          snils: "",
          organizationNameSelect: {},
          innOrg: "",
          textField4: "",
          textField6: "",
          educationSelect: {},
          educationYear: "",
          scientificDegreeSelect: {},
          degreeYear: "",
          scientificTitleSelect: {},
          titleYear: "",
          publications: [],
          konkursi: [],
          nauchKol: [],
          scienceWorkName: "",
          direction: "",
          annotation: "",
          relevance: "",
          newness1: "",
          newness2: "",
          newness3: "",
          newness: "",
          rashifrovka1: "",
          rashifrovka2: "",
          rashifrovka3: "",
          rashifrovka4: "",
          rashifrovka5: "",
          rashifrovka6: "",
          rashifrovka7: "",
          submit1: false,
          file: [],
          file1: [],
          file3: [],
          file2: [],
          file6: [],
          file4: [],
          file8: [],
          checkbox8: false,
          checkbox4: false,
          checkbox5: false,
          checkbox6: false,
          checkbox: false,
          checkbox3: false,
          checkbox2: false,
          checkbox7: false,
          impactFaktorSum: 0,
        },
        form: {
          id: 529,
          name: "Заявление (черновик)",
          scheme: {
            components: [
              {
                extTypeCheckbox: false,
                components: [
                  {
                    extTypeCheckbox: false,
                    input: false,
                    columns: [
                      {
                        pull: 0,
                        components: [
                          {
                            extTypeCheckbox: false,
                            input: true,
                            dataGridLabel: false,
                            hideOnChildrenHidden: false,
                            tableView: true,
                            smev_req: {},
                            disabled: true,
                            label: "Номер",
                            type: "textfield",
                            key: "params_handler_application",
                            esiaKey: {},
                          },
                        ],
                        offset: 0,
                        size: "md",
                        width: 4,
                        push: 0,
                      },
                      {
                        pull: 0,
                        components: [
                          {
                            extTypeCheckbox: false,
                            enableMaxDateInput: false,
                            widget: {
                              minDate: null,
                              enableTime: false,
                              format: "dd.MM.yyyy",
                              displayInTimezone: "viewer",
                              noCalendar: false,
                              type: "calendar",
                              locale: "ru",
                              time_24hr: true,
                              allowInput: true,
                              minuteIncrement: 1,
                              mode: "single",
                              useLocaleSettings: false,
                              maxDate: null,
                              disableWeekdays: false,
                              disableWeekends: false,
                              hourIncrement: 1,
                            },
                            dataGridLabel: false,
                            hideOnChildrenHidden: false,
                            format: "dd.MM.yyyy",
                            enableTime: false,
                            tableView: false,
                            datePicker: {
                              disableWeekdays: false,
                              disableWeekends: false,
                            },
                            label: "Дата создания",
                            type: "datetime",
                            enableMinDateInput: false,
                            input: true,
                            timePicker: {
                              showMeridian: false,
                            },
                            smev_req: {},
                            disabled: true,
                            placeholder: "ДД.ММ.ГГГГ",
                            key: "params_handler_application_start",
                            esiaKey: {},
                          },
                        ],
                        size: "md",
                        offset: 0,
                        width: 4,
                        push: 0,
                      },
                      {
                        pull: 0,
                        components: [
                          {
                            extTypeCheckbox: false,
                            input: true,
                            dataGridLabel: false,
                            hideOnChildrenHidden: false,
                            tableView: true,
                            smev_req: {},
                            disabled: true,
                            label: "Статус",
                            type: "textfield",
                            key: "params_handler_state_string",
                            esiaKey: {},
                          },
                        ],
                        offset: 0,
                        size: "md",
                        width: 4,
                        push: 0,
                      },
                    ],
                    dataGridLabel: false,
                    smev_req: {},
                    tableView: false,
                    label: "Столбцы",
                    type: "columns",
                    key: "columns1",
                    esiaKey: {},
                  },
                ],
                collapsed: false,
                dataGridLabel: false,
                allowPrevious: false,
                tableView: false,
                label: "Бизнес-процесс №2",
                title: "Бизнес-процесс №2",
                type: "panel",
                breadcrumbClickable: true,
                collapsible: false,
                buttonSettings: {
                  cancel: true,
                  next: true,
                  previous: true,
                },
                input: false,
                smev_req: {},
                key: "panel",
                esiaKey: {},
              },
            ],
          },
          modelId: 311,
          actions: [
            {
              id: 732,
              name: "Вернуться в реестр",
              modelId: 311,
              formId: 529,
              hidden: false,
              alwaysActive: false,
              notRequiredAction: true,
              backAction: true,
              printAction: false,
              signAction: false,
            },
            {
              id: 731,
              name: "Сохранить",
              modelId: 311,
              formId: 529,
              hidden: false,
              alwaysActive: false,
              notRequiredAction: true,
              backAction: false,
              printAction: false,
              signAction: false,
            },
          ],
        },
        type: 1,
        startDate: "2023-06-05T07:59:31.618+00:00",
        endDate: null,
        active: true,
        archive: false,
        metadata: {},
      },
      form03: {
        id: 213,
        modelId: 311,
        orderId: "0",
        status: "",
        data: {
          params_handler_application: "",
          params_handler_application_start: "",
          params_handler_state_string: "",
          lastName: "",
          firstName: "",
          middleName: "",
          dateOfBirth: "",
          textField2: "",
          textField3: "",
          regAdress: "",
          faktAdress: "",
          checkbox1: false,
          documentType: "Паспорт",
          passportSeries: "",
          passportNumber: "",
          passportDate: "",
          passportCode: "",
          passportOrganization: "",
          textField1: "",
          snils: "",
          organizationNameSelect: {},
          innOrg: "",
          textField4: "",
          textField6: "",
          educationSelect: {},
          educationYear: "",
          scientificDegreeSelect: {},
          degreeYear: "",
          scientificTitleSelect: {},
          titleYear: "",
          publications: [],
          konkursi: [],
          nauchKol: [],
          scienceWorkName: "",
          direction: "",
          annotation: "",
          relevance: "",
          newness1: "",
          newness2: "",
          newness3: "",
          newness: "",
          rashifrovka1: "",
          rashifrovka2: "",
          rashifrovka3: "",
          rashifrovka4: "",
          rashifrovka5: "",
          rashifrovka6: "",
          rashifrovka7: "",
          submit1: false,
          file: [],
          file1: [],
          file3: [],
          file2: [],
          file6: [],
          file4: [],
          file8: [],
          checkbox8: false,
          checkbox4: false,
          checkbox5: false,
          checkbox6: false,
          checkbox: false,
          checkbox3: false,
          checkbox2: false,
          checkbox7: false,
          impactFaktorSum: 0,
        },
        form: {
          id: 529,
          name: "Заявление (черновик)",
          scheme: {
            components: [
              {
                extTypeCheckbox: false,
                components: [
                  {
                    extTypeCheckbox: false,
                    input: false,
                    columns: [
                      {
                        pull: 0,
                        components: [
                          {
                            extTypeCheckbox: false,
                            input: true,
                            dataGridLabel: false,
                            hideOnChildrenHidden: false,
                            tableView: true,
                            smev_req: {},
                            disabled: true,
                            label: "Номер",
                            type: "textfield",
                            key: "params_handler_application",
                            esiaKey: {},
                          },
                        ],
                        offset: 0,
                        size: "md",
                        width: 4,
                        push: 0,
                      },
                      {
                        pull: 0,
                        components: [
                          {
                            extTypeCheckbox: false,
                            enableMaxDateInput: false,
                            widget: {
                              minDate: null,
                              enableTime: false,
                              format: "dd.MM.yyyy",
                              displayInTimezone: "viewer",
                              noCalendar: false,
                              type: "calendar",
                              locale: "ru",
                              time_24hr: true,
                              allowInput: true,
                              minuteIncrement: 1,
                              mode: "single",
                              useLocaleSettings: false,
                              maxDate: null,
                              disableWeekdays: false,
                              disableWeekends: false,
                              hourIncrement: 1,
                            },
                            dataGridLabel: false,
                            hideOnChildrenHidden: false,
                            format: "dd.MM.yyyy",
                            enableTime: false,
                            tableView: false,
                            datePicker: {
                              disableWeekdays: false,
                              disableWeekends: false,
                            },
                            label: "Дата создания",
                            type: "datetime",
                            enableMinDateInput: false,
                            input: true,
                            timePicker: {
                              showMeridian: false,
                            },
                            smev_req: {},
                            disabled: true,
                            placeholder: "ДД.ММ.ГГГГ",
                            key: "params_handler_application_start",
                            esiaKey: {},
                          },
                        ],
                        size: "md",
                        offset: 0,
                        width: 4,
                        push: 0,
                      },
                      {
                        pull: 0,
                        components: [
                          {
                            extTypeCheckbox: false,
                            input: true,
                            dataGridLabel: false,
                            hideOnChildrenHidden: false,
                            tableView: true,
                            smev_req: {},
                            disabled: true,
                            label: "Статус",
                            type: "textfield",
                            key: "params_handler_state_string",
                            esiaKey: {},
                          },
                        ],
                        offset: 0,
                        size: "md",
                        width: 4,
                        push: 0,
                      },
                    ],
                    dataGridLabel: false,
                    smev_req: {},
                    tableView: false,
                    label: "Столбцы",
                    type: "columns",
                    key: "columns1",
                    esiaKey: {},
                  },
                ],
                collapsed: false,
                dataGridLabel: false,
                allowPrevious: false,
                tableView: false,
                label: "Бизнес-процесс №3",
                title: "Бизнес-процесс №3",
                type: "panel",
                breadcrumbClickable: true,
                collapsible: false,
                buttonSettings: {
                  cancel: true,
                  next: true,
                  previous: true,
                },
                input: false,
                smev_req: {},
                key: "panel",
                esiaKey: {},
              },
            ],
          },
          modelId: 311,
          actions: [
            {
              id: 732,
              name: "Вернуться в реестр",
              modelId: 311,
              formId: 529,
              hidden: false,
              alwaysActive: false,
              notRequiredAction: true,
              backAction: true,
              printAction: false,
              signAction: false,
            },
            {
              id: 731,
              name: "Сохранить",
              modelId: 311,
              formId: 529,
              hidden: false,
              alwaysActive: false,
              notRequiredAction: true,
              backAction: false,
              printAction: false,
              signAction: false,
            },
          ],
        },
        type: 1,
        startDate: "2023-06-05T07:59:31.618+00:00",
        endDate: null,
        active: true,
        archive: false,
        metadata: {},
      },
      form04: {
        id: 213,
        modelId: 311,
        orderId: "0",
        status: "",
        data: {
          params_handler_application: "",
          params_handler_application_start: "",
          params_handler_state_string: "",
          lastName: "",
          firstName: "",
          middleName: "",
          dateOfBirth: "",
          textField2: "",
          textField3: "",
          regAdress: "",
          faktAdress: "",
          checkbox1: false,
          documentType: "Паспорт",
          passportSeries: "",
          passportNumber: "",
          passportDate: "",
          passportCode: "",
          passportOrganization: "",
          textField1: "",
          snils: "",
          organizationNameSelect: {},
          innOrg: "",
          textField4: "",
          textField6: "",
          educationSelect: {},
          educationYear: "",
          scientificDegreeSelect: {},
          degreeYear: "",
          scientificTitleSelect: {},
          titleYear: "",
          publications: [],
          konkursi: [],
          nauchKol: [],
          scienceWorkName: "",
          direction: "",
          annotation: "",
          relevance: "",
          newness1: "",
          newness2: "",
          newness3: "",
          newness: "",
          rashifrovka1: "",
          rashifrovka2: "",
          rashifrovka3: "",
          rashifrovka4: "",
          rashifrovka5: "",
          rashifrovka6: "",
          rashifrovka7: "",
          submit1: false,
          file: [],
          file1: [],
          file3: [],
          file2: [],
          file6: [],
          file4: [],
          file8: [],
          checkbox8: false,
          checkbox4: false,
          checkbox5: false,
          checkbox6: false,
          checkbox: false,
          checkbox3: false,
          checkbox2: false,
          checkbox7: false,
          impactFaktorSum: 0,
        },
        form: {
          id: 529,
          name: "Заявление (черновик)",
          scheme: {
            components: [
              {
                extTypeCheckbox: false,
                components: [
                  {
                    extTypeCheckbox: false,
                    input: false,
                    columns: [
                      {
                        pull: 0,
                        components: [
                          {
                            extTypeCheckbox: false,
                            input: true,
                            dataGridLabel: false,
                            hideOnChildrenHidden: false,
                            tableView: true,
                            smev_req: {},
                            disabled: true,
                            label: "Номер",
                            type: "textfield",
                            key: "params_handler_application",
                            esiaKey: {},
                          },
                        ],
                        offset: 0,
                        size: "md",
                        width: 4,
                        push: 0,
                      },
                      {
                        pull: 0,
                        components: [
                          {
                            extTypeCheckbox: false,
                            enableMaxDateInput: false,
                            widget: {
                              minDate: null,
                              enableTime: false,
                              format: "dd.MM.yyyy",
                              displayInTimezone: "viewer",
                              noCalendar: false,
                              type: "calendar",
                              locale: "ru",
                              time_24hr: true,
                              allowInput: true,
                              minuteIncrement: 1,
                              mode: "single",
                              useLocaleSettings: false,
                              maxDate: null,
                              disableWeekdays: false,
                              disableWeekends: false,
                              hourIncrement: 1,
                            },
                            dataGridLabel: false,
                            hideOnChildrenHidden: false,
                            format: "dd.MM.yyyy",
                            enableTime: false,
                            tableView: false,
                            datePicker: {
                              disableWeekdays: false,
                              disableWeekends: false,
                            },
                            label: "Дата создания",
                            type: "datetime",
                            enableMinDateInput: false,
                            input: true,
                            timePicker: {
                              showMeridian: false,
                            },
                            smev_req: {},
                            disabled: true,
                            placeholder: "ДД.ММ.ГГГГ",
                            key: "params_handler_application_start",
                            esiaKey: {},
                          },
                        ],
                        size: "md",
                        offset: 0,
                        width: 4,
                        push: 0,
                      },
                      {
                        pull: 0,
                        components: [
                          {
                            extTypeCheckbox: false,
                            input: true,
                            dataGridLabel: false,
                            hideOnChildrenHidden: false,
                            tableView: true,
                            smev_req: {},
                            disabled: true,
                            label: "Статус",
                            type: "textfield",
                            key: "params_handler_state_string",
                            esiaKey: {},
                          },
                        ],
                        offset: 0,
                        size: "md",
                        width: 4,
                        push: 0,
                      },
                    ],
                    dataGridLabel: false,
                    smev_req: {},
                    tableView: false,
                    label: "Столбцы",
                    type: "columns",
                    key: "columns1",
                    esiaKey: {},
                  },
                ],
                collapsed: false,
                dataGridLabel: false,
                allowPrevious: false,
                tableView: false,
                label: "Бизнес-процесс №4",
                title: "Бизнес-процесс №4",
                type: "panel",
                breadcrumbClickable: true,
                collapsible: false,
                buttonSettings: {
                  cancel: true,
                  next: true,
                  previous: true,
                },
                input: false,
                smev_req: {},
                key: "panel",
                esiaKey: {},
              },
            ],
          },
          modelId: 311,
          actions: [
            {
              id: 11,
              name: "notRequiredAction",
              modelId: 311,
              formId: 529,
              hidden: false,
              alwaysActive: false,
              notRequiredAction: true,
              backAction: false,
              printAction: false,
              signAction: false,
            },
            {
              id: 12,
              name: "backAction",
              modelId: 311,
              formId: 529,
              hidden: false,
              alwaysActive: false,
              notRequiredAction: false,
              backAction: true,
              printAction: false,
              signAction: false,
            },
            {
              id: 13,
              name: "printAction",
              modelId: 311,
              formId: 529,
              hidden: false,
              alwaysActive: false,
              notRequiredAction: false,
              backAction: false,
              printAction: true,
              signAction: false,
            },
            {
              id: 14,
              name: "signAction",
              modelId: 311,
              formId: 529,
              hidden: false,
              alwaysActive: false,
              notRequiredAction: false,
              backAction: false,
              printAction: false,
              signAction: true,
            },
          ],
        },
        type: 1,
        startDate: "2023-06-05T07:59:31.618+00:00",
        endDate: null,
        active: true,
        archive: false,
        metadata: {},
      },

      startForm: {
        id: 229,
        modelId: 311,
        orderId: "0",
        status: "",
        data: {},
        form: {
          id: 529,
          name: "Заявление (черновик)",
          scheme: {
            components: [
              {
                extTypeCheckbox: false,
                components: [
                  {
                    extTypeCheckbox: false,
                    input: false,
                    columns: [
                      {
                        pull: 0,
                        components: [
                          {
                            extTypeCheckbox: false,
                            input: true,
                            dataGridLabel: false,
                            hideOnChildrenHidden: false,
                            tableView: true,
                            smev_req: {},
                            disabled: true,
                            label: "Номер",
                            type: "textfield",
                            key: "params_handler_application",
                            esiaKey: {},
                          },
                        ],
                        offset: 0,
                        size: "md",
                        width: 4,
                        push: 0,
                      },
                      {
                        pull: 0,
                        components: [
                          {
                            extTypeCheckbox: false,
                            enableMaxDateInput: false,
                            widget: {
                              minDate: null,
                              enableTime: false,
                              format: "dd.MM.yyyy",
                              displayInTimezone: "viewer",
                              noCalendar: false,
                              type: "calendar",
                              locale: "ru",
                              time_24hr: true,
                              allowInput: true,
                              minuteIncrement: 1,
                              mode: "single",
                              useLocaleSettings: false,
                              maxDate: null,
                              disableWeekdays: false,
                              disableWeekends: false,
                              hourIncrement: 1,
                            },
                            dataGridLabel: false,
                            hideOnChildrenHidden: false,
                            format: "dd.MM.yyyy",
                            enableTime: false,
                            tableView: false,
                            datePicker: {
                              disableWeekdays: false,
                              disableWeekends: false,
                            },
                            label: "Дата создания",
                            type: "datetime",
                            enableMinDateInput: false,
                            input: true,
                            timePicker: {
                              showMeridian: false,
                            },
                            smev_req: {},
                            disabled: true,
                            placeholder: "ДД.ММ.ГГГГ",
                            key: "params_handler_application_start",
                            esiaKey: {},
                          },
                        ],
                        size: "md",
                        offset: 0,
                        width: 4,
                        push: 0,
                      },
                      {
                        pull: 0,
                        components: [
                          {
                            extTypeCheckbox: false,
                            input: true,
                            dataGridLabel: false,
                            hideOnChildrenHidden: false,
                            tableView: true,
                            smev_req: {},
                            disabled: true,
                            label: "Статус",
                            type: "textfield",
                            key: "params_handler_state_string",
                            esiaKey: {},
                          },
                        ],
                        offset: 0,
                        size: "md",
                        width: 4,
                        push: 0,
                      },
                    ],
                    dataGridLabel: false,
                    smev_req: {},
                    tableView: false,
                    label: "Столбцы",
                    type: "columns",
                    key: "columns1",
                    esiaKey: {},
                  },
                ],
                collapsed: false,
                dataGridLabel: false,
                allowPrevious: false,
                tableView: false,
                label: "Информация о заявлении",
                title: "Информация о заявлении",
                type: "panel",
                breadcrumbClickable: true,
                collapsible: false,
                buttonSettings: {
                  cancel: true,
                  next: true,
                  previous: true,
                },
                input: false,
                smev_req: {},
                key: "panel",
                esiaKey: {},
              },
              {
                extTypeCheckbox: false,
                input: false,
                components: [
                  {
                    components: [
                      {
                        extTypeCheckbox: false,
                        input: false,
                        components: [
                          {
                            components: [
                              {
                                extTypeCheckbox: false,
                                input: false,
                                columns: [
                                  {
                                    pull: 0,
                                    components: [
                                      {
                                        extTypeCheckbox: true,
                                        input: true,
                                        dataGridLabel: false,
                                        hideOnChildrenHidden: false,
                                        tableView: true,
                                        smev_req: {},
                                        label: "Фамилия",
                                        type: "textfield",
                                        key: "lastName",
                                        extType: "esia",
                                        esiaKey: {
                                          label: "(физ. лицо) Фамилия",
                                          value: "esiaLastname",
                                        },
                                        validate: {
                                          required: true,
                                        },
                                      },
                                    ],
                                    offset: 0,
                                    size: "md",
                                    width: 4,
                                    push: 0,
                                  },
                                  {
                                    pull: 0,
                                    components: [
                                      {
                                        extTypeCheckbox: true,
                                        input: true,
                                        dataGridLabel: false,
                                        hideOnChildrenHidden: false,
                                        tableView: true,
                                        smev_req: {},
                                        label: "Имя",
                                        type: "textfield",
                                        key: "firstName",
                                        extType: "esia",
                                        esiaKey: {
                                          label: "(физ. лицо) Имя",
                                          value: "esiaFirstname",
                                        },
                                        validate: {
                                          required: true,
                                        },
                                      },
                                    ],
                                    offset: 0,
                                    size: "md",
                                    width: 4,
                                    push: 0,
                                  },
                                  {
                                    pull: 0,
                                    components: [
                                      {
                                        extTypeCheckbox: true,
                                        input: true,
                                        dataGridLabel: false,
                                        hideOnChildrenHidden: false,
                                        description: "При наличии",
                                        tableView: true,
                                        smev_req: {},
                                        label: "Отчество",
                                        type: "textfield",
                                        key: "middleName",
                                        extType: "esia",
                                        esiaKey: {
                                          label: "(физ. лицо) Отчество",
                                          value: "esiaMiddlename",
                                        },
                                      },
                                    ],
                                    size: "md",
                                    offset: 0,
                                    width: 4,
                                    push: 0,
                                  },
                                  {
                                    pull: 0,
                                    components: [
                                      {
                                        extTypeCheckbox: true,
                                        enableMaxDateInput: false,
                                        widget: {
                                          minDate: null,
                                          enableTime: false,
                                          format: "dd.MM.yyyy",
                                          displayInTimezone: "viewer",
                                          noCalendar: false,
                                          type: "calendar",
                                          locale: "ru",
                                          time_24hr: true,
                                          allowInput: true,
                                          minuteIncrement: 1,
                                          mode: "single",
                                          useLocaleSettings: false,
                                          maxDate: null,
                                          disableWeekdays: false,
                                          disableWeekends: false,
                                          hourIncrement: 1,
                                        },
                                        dataGridLabel: false,
                                        hideOnChildrenHidden: false,
                                        format: "dd.MM.yyyy",
                                        enableTime: false,
                                        tableView: false,
                                        datePicker: {
                                          disableWeekdays: false,
                                          disableWeekends: false,
                                        },
                                        label: "Дата рождения",
                                        type: "datetime",
                                        enableMinDateInput: false,
                                        input: true,
                                        timePicker: {
                                          showMeridian: false,
                                        },
                                        smev_req: {},
                                        placeholder: "ДД.ММ.ГГГГ",
                                        key: "dateOfBirth",
                                        extType: "esia",
                                        esiaKey: {
                                          label: "(физ. лицо) Дата рождения",
                                          value: "esiaBirthdate",
                                        },
                                        validate: {
                                          required: true,
                                        },
                                      },
                                    ],
                                    size: "md",
                                    offset: 0,
                                    width: 4,
                                    push: 0,
                                  },
                                  {
                                    pull: 0,
                                    components: [
                                      {
                                        extTypeCheckbox: true,
                                        dataGridLabel: false,
                                        hideOnChildrenHidden: false,
                                        tableView: true,
                                        label: "Номер телефона",
                                        inputMask: "+7(999)-99-99-999",
                                        type: "textfield",
                                        input: true,
                                        smev_req: {},
                                        key: "textField2",
                                        extType: "esia",
                                        esiaKey: {
                                          label:
                                            "(физ. лицо) Мобильный телефон",
                                          value: "esiaMobile",
                                        },
                                        validate: {
                                          required: true,
                                        },
                                      },
                                    ],
                                    size: "md",
                                    offset: 0,
                                    width: 4,
                                    push: 0,
                                  },
                                  {
                                    pull: 0,
                                    components: [
                                      {
                                        extTypeCheckbox: true,
                                        input: true,
                                        dataGridLabel: false,
                                        hideOnChildrenHidden: false,
                                        tableView: true,
                                        smev_req: {},
                                        label: "Электронная почта",
                                        type: "textfield",
                                        key: "textField3",
                                        extType: "esia",
                                        esiaKey: {
                                          label:
                                            "(физ. лицо) Электронная почта",
                                          value: "esiaEmail",
                                        },
                                        validate: {
                                          required: true,
                                        },
                                      },
                                    ],
                                    size: "md",
                                    offset: 0,
                                    width: 4,
                                    push: 0,
                                  },
                                  {
                                    pull: 0,
                                    components: [
                                      {
                                        extTypeCheckbox: true,
                                        input: true,
                                        dataGridLabel: false,
                                        hideOnChildrenHidden: false,
                                        tableView: true,
                                        smev_req: {},
                                        label: "Адрес регистрации",
                                        type: "textfield",
                                        key: "regAdress",
                                        extType: "esia",
                                        esiaKey: {
                                          label:
                                            "(физ. лицо) Адрес регистрации",
                                          value:
                                            "esiaContactRegistrationAddress",
                                        },
                                        validate: {
                                          required: true,
                                        },
                                      },
                                    ],
                                    size: "md",
                                    offset: 0,
                                    width: 12,
                                    push: 0,
                                  },
                                  {
                                    pull: 0,
                                    components: [
                                      {
                                        extTypeCheckbox: true,
                                        dataGridLabel: false,
                                        hideOnChildrenHidden: false,
                                        tableView: true,
                                        label: "Адрес фактического проживания",
                                        type: "textfield",
                                        calculateValue:
                                          "if (data.checkbox1 === true) {\n  value = data.regAdress\n}",
                                        input: true,
                                        smev_req: {},
                                        key: "faktAdress",
                                        extType: "esia",
                                        esiaKey: {
                                          label: "(физ. лицо) Адрес проживания",
                                          value: "esiaContactLivingAddress",
                                        },
                                        validate: {
                                          required: true,
                                        },
                                      },
                                      {
                                        extTypeCheckbox: false,
                                        input: true,
                                        defaultValue: false,
                                        hideOnChildrenHidden: false,
                                        tableView: false,
                                        smev_req: {},
                                        label:
                                          "Совпадает с адресом регистрации",
                                        type: "checkbox",
                                        key: "checkbox1",
                                        esiaKey: {},
                                      },
                                    ],
                                    size: "md",
                                    offset: 0,
                                    width: 12,
                                    push: 0,
                                  },
                                ],
                                dataGridLabel: false,
                                smev_req: {},
                                tableView: false,
                                label: "Столбцы",
                                type: "columns",
                                key: "columns",
                                esiaKey: {},
                              },
                            ],
                            label: "Общая информация",
                            key: "Общая информация",
                          },
                          {
                            components: [
                              {
                                allowUserAssign: false,
                                extTypeCheckbox: false,
                                widget: "choicesjs",
                                data: {
                                  values: [
                                    {
                                      label: "Паспорт",
                                      value: "Паспорт",
                                    },
                                  ],
                                },
                                defaultValue: "Паспорт",
                                dataGridLabel: false,
                                hideOnChildrenHidden: false,
                                tableView: true,
                                indexeddb: {
                                  filter: {},
                                  database: "",
                                  table: "",
                                },
                                label:
                                  "Тип документа, удостоверяющего личность",
                                type: "select",
                                reference: false,
                                selectedDictColumn: {},
                                input: true,
                                selectThreshold: 0.3,
                                addResource: false,
                                disableLimit: false,
                                smev_req: {},
                                key: "documentType",
                                esiaKey: {},
                                validate: {
                                  select: false,
                                  required: true,
                                },
                              },
                              {
                                extTypeCheckbox: false,
                                input: false,
                                hidden: true,
                                conditional: {
                                  show: true,
                                  eq: "Паспорт",
                                  when: "documentType",
                                },
                                columns: [
                                  {
                                    pull: 0,
                                    components: [
                                      {
                                        extTypeCheckbox: true,
                                        hidden: true,
                                        conditional: {
                                          show: true,
                                          eq: "Паспорт",
                                          when: "documentType",
                                        },
                                        dataGridLabel: false,
                                        hideOnChildrenHidden: false,
                                        tableView: true,
                                        label: "Серия",
                                        inputMask: "9999",
                                        type: "textfield",
                                        input: true,
                                        smev_req: {},
                                        key: "passportSeries",
                                        extType: "esia",
                                        esiaKey: {
                                          label: "(физ. лицо) Серия",
                                          value: "esiaDocSeries",
                                        },
                                        validate: {
                                          required: true,
                                        },
                                      },
                                    ],
                                    offset: 0,
                                    size: "md",
                                    width: 3,
                                    push: 0,
                                  },
                                  {
                                    pull: 0,
                                    components: [
                                      {
                                        extTypeCheckbox: true,
                                        hidden: true,
                                        conditional: {
                                          show: true,
                                          eq: "Паспорт",
                                          when: "documentType",
                                        },
                                        dataGridLabel: false,
                                        hideOnChildrenHidden: false,
                                        tableView: true,
                                        label: "Номер",
                                        inputMask: "999999",
                                        type: "textfield",
                                        input: true,
                                        smev_req: {},
                                        key: "passportNumber",
                                        extType: "esia",
                                        esiaKey: {
                                          label: "(физ. лицо) Номер",
                                          value: "esiaDocNumber",
                                        },
                                        validate: {
                                          required: true,
                                        },
                                      },
                                    ],
                                    offset: 0,
                                    size: "md",
                                    width: 3,
                                    push: 0,
                                  },
                                  {
                                    pull: 0,
                                    components: [
                                      {
                                        extTypeCheckbox: true,
                                        enableMaxDateInput: false,
                                        widget: {
                                          minDate: null,
                                          enableTime: false,
                                          format: "dd.MM.yyyy",
                                          displayInTimezone: "viewer",
                                          noCalendar: false,
                                          type: "calendar",
                                          locale: "ru",
                                          time_24hr: true,
                                          allowInput: true,
                                          minuteIncrement: 1,
                                          mode: "single",
                                          useLocaleSettings: false,
                                          maxDate: null,
                                          disableWeekdays: false,
                                          disableWeekends: false,
                                          hourIncrement: 1,
                                        },
                                        hidden: true,
                                        conditional: {
                                          show: true,
                                          eq: "Паспорт",
                                          when: "documentType",
                                        },
                                        dataGridLabel: false,
                                        hideOnChildrenHidden: false,
                                        format: "dd.MM.yyyy",
                                        enableTime: false,
                                        tableView: false,
                                        datePicker: {
                                          disableWeekdays: false,
                                          disableWeekends: false,
                                        },
                                        label: "Дата выдачи",
                                        type: "datetime",
                                        enableMinDateInput: false,
                                        input: true,
                                        timePicker: {
                                          showMeridian: false,
                                        },
                                        smev_req: {},
                                        placeholder: "ДД.ММ.ГГГГ",
                                        key: "passportDate",
                                        extType: "esia",
                                        esiaKey: {
                                          label: "(физ. лицо) Дата выдачи",
                                          value: "esiaIssueDate",
                                        },
                                        validate: {
                                          required: true,
                                        },
                                      },
                                    ],
                                    size: "md",
                                    offset: 0,
                                    width: 3,
                                    push: 0,
                                  },
                                  {
                                    pull: 0,
                                    components: [
                                      {
                                        extTypeCheckbox: false,
                                        hidden: true,
                                        conditional: {
                                          show: true,
                                          eq: "Паспорт",
                                          when: "documentType",
                                        },
                                        dataGridLabel: false,
                                        hideOnChildrenHidden: false,
                                        tableView: true,
                                        label: "Код подразделения",
                                        inputMask: "999-999",
                                        type: "textfield",
                                        input: true,
                                        smev_req: {},
                                        key: "passportCode",
                                        esiaKey: {},
                                      },
                                    ],
                                    size: "md",
                                    offset: 0,
                                    width: 3,
                                    push: 0,
                                  },
                                  {
                                    pull: 0,
                                    components: [
                                      {
                                        extTypeCheckbox: true,
                                        hidden: true,
                                        conditional: {
                                          show: true,
                                          eq: "Паспорт",
                                          when: "documentType",
                                        },
                                        dataGridLabel: false,
                                        hideOnChildrenHidden: false,
                                        tableView: true,
                                        label: "Орган, выдавший документ",
                                        type: "textfield",
                                        input: true,
                                        smev_req: {},
                                        key: "passportOrganization",
                                        extType: "esia",
                                        esiaKey: {
                                          label: "(физ. лицо) Кем выдан",
                                          value: "esiaIssuedBy",
                                        },
                                        validate: {
                                          required: true,
                                        },
                                      },
                                    ],
                                    size: "md",
                                    offset: 0,
                                    width: 12,
                                    push: 0,
                                  },
                                ],
                                dataGridLabel: false,
                                tableView: false,
                                smev_req: {},
                                label: "Столбцы",
                                type: "columns",
                                key: "columns2",
                                esiaKey: {},
                              },
                              {
                                extTypeCheckbox: false,
                                input: false,
                                columns: [
                                  {
                                    pull: 0,
                                    components: [
                                      {
                                        extTypeCheckbox: true,
                                        dataGridLabel: false,
                                        hideOnChildrenHidden: false,
                                        tableView: true,
                                        label: "ИНН",
                                        inputMask: "999999999999",
                                        type: "textfield",
                                        input: true,
                                        smev_req: {},
                                        key: "textField1",
                                        extType: "esia",
                                        esiaKey: {
                                          label: "(физ. лицо) ИНН",
                                          value: "esiaInn",
                                        },
                                        validate: {
                                          required: true,
                                        },
                                      },
                                    ],
                                    offset: 0,
                                    size: "md",
                                    width: 6,
                                    push: 0,
                                  },
                                  {
                                    pull: 0,
                                    components: [
                                      {
                                        extTypeCheckbox: true,
                                        dataGridLabel: false,
                                        hideOnChildrenHidden: false,
                                        tableView: true,
                                        label: "СНИЛС",
                                        inputMask: "999999999999",
                                        type: "textfield",
                                        input: true,
                                        smev_req: {},
                                        key: "snils",
                                        extType: "esia",
                                        esiaKey: {
                                          label: "(физ. лицо) СНИЛС",
                                          value: "esiaSnils",
                                        },
                                        validate: {
                                          required: true,
                                        },
                                      },
                                    ],
                                    offset: 0,
                                    size: "md",
                                    width: 6,
                                    push: 0,
                                  },
                                ],
                                dataGridLabel: false,
                                smev_req: {},
                                tableView: false,
                                label: "Столбцы",
                                type: "columns",
                                key: "columns4",
                                esiaKey: {},
                              },
                            ],
                            label: "Данные документов",
                            key: "Данные документов",
                          },
                          {
                            components: [
                              {
                                allowUserAssign: false,
                                extTypeCheckbox: false,
                                widget: "choicesjs",
                                data: {
                                  values: [
                                    {
                                      label: "",
                                      value: "",
                                    },
                                  ],
                                  url: "https://open-grata-nso.isands.ru/api/prometheus/getDict?data=aHR0cHM6Ly9ncmF0YS1uc28uaXNhbmRzLnJ1L28vdGVtcGxhdGUvZW50aXR5L0RpY3Rpb25hcnlQb3J0bGV0RW5kcG9pbnQvP2VudGl0eU5hbWU9dnV6X3NvcmFuJmNvbHVtbj12dXpfc29yYW4mZm9yU2VsZWN0PXRydWU=",
                                },
                                dataGridLabel: false,
                                tableView: true,
                                indexeddb: {
                                  filter: {},
                                  database: "",
                                  table: "",
                                },
                                label: "Полное наименование организации",
                                type: "select",
                                selectedDictCode: {
                                  endpoint: "DictionaryPortletEndpoint",
                                  columns: [
                                    {
                                      name: "vuz_soran",
                                      label: "Список ВУЗов и СО РАН НСО",
                                      type: "STRING",
                                      value: "vuz_soran",
                                    },
                                  ],
                                  name: "vuz_soran",
                                  label: "Список ВУЗов и СО РАН НСО",
                                  value: "vuz_soran",
                                },
                                reference: false,
                                selectedDictColumn: {
                                  name: "vuz_soran",
                                  label: "Список ВУЗов и СО РАН НСО",
                                  type: "STRING",
                                  value: "vuz_soran",
                                },
                                input: true,
                                isSelectDict: true,
                                selectThreshold: 0.3,
                                addResource: false,
                                disableLimit: false,
                                smev_req: {},
                                key: "organizationNameSelect",
                                esiaKey: {},
                                dataSrc: "url",
                                validate: {
                                  select: false,
                                  required: true,
                                },
                              },
                              {
                                extTypeCheckbox: false,
                                input: true,
                                hidden: true,
                                dataGridLabel: false,
                                tableView: true,
                                smev_req: {},
                                label: "Наименование организации (скрытое)",
                                type: "textfield",
                                key: "organizationNameHidden",
                                esiaKey: {},
                                calculateValue:
                                  "value = data.organizationNameSelect.label;",
                              },
                              {
                                extTypeCheckbox: false,
                                input: false,
                                columns: [
                                  {
                                    pull: 0,
                                    components: [
                                      {
                                        extTypeCheckbox: false,
                                        input: true,
                                        dataGridLabel: false,
                                        hideOnChildrenHidden: false,
                                        tableView: true,
                                        smev_req: {},
                                        label: "ИНН",
                                        inputMask: "9999999999",
                                        type: "textfield",
                                        key: "innOrg",
                                        esiaKey: {},
                                        validate: {
                                          required: true,
                                        },
                                      },
                                      {
                                        extTypeCheckbox: false,
                                        input: true,
                                        dataGridLabel: false,
                                        hideOnChildrenHidden: false,
                                        tableView: true,
                                        smev_req: {},
                                        label: "Должность в организации",
                                        type: "textfield",
                                        key: "textField4",
                                        esiaKey: {},
                                        validate: {
                                          required: true,
                                        },
                                      },
                                    ],
                                    offset: 0,
                                    size: "md",
                                    width: 6,
                                    push: 0,
                                  },
                                  {
                                    pull: 0,
                                    components: [
                                      {
                                        extTypeCheckbox: false,
                                        input: true,
                                        dataGridLabel: false,
                                        hideOnChildrenHidden: false,
                                        tableView: true,
                                        smev_req: {},
                                        label: "ОГРН",
                                        inputMask: "9999999999999",
                                        type: "textfield",
                                        key: "textField6",
                                        esiaKey: {},
                                        validate: {
                                          required: true,
                                        },
                                      },
                                    ],
                                    offset: 0,
                                    size: "md",
                                    width: 6,
                                    push: 0,
                                  },
                                ],
                                dataGridLabel: false,
                                smev_req: {},
                                tableView: false,
                                label: "Столбцы",
                                type: "columns",
                                key: "columns6",
                                esiaKey: {},
                              },
                            ],
                            label: "Сведения об организации",
                            key: "Сведения об организации",
                          },
                          {
                            components: [
                              {
                                extTypeCheckbox: false,
                                input: false,
                                columns: [
                                  {
                                    pull: 0,
                                    components: [
                                      {
                                        allowUserAssign: false,
                                        extTypeCheckbox: false,
                                        widget: "choicesjs",
                                        data: {
                                          values: [
                                            {
                                              label: "",
                                              value: "",
                                            },
                                          ],
                                          url: "https://open-grata-nso.isands.ru/api/prometheus/getDict?data=aHR0cHM6Ly9ncmF0YS1uc28uaXNhbmRzLnJ1L28vdGVtcGxhdGUvZW50aXR5L0RpY3Rpb25hcnlQb3J0bGV0RW5kcG9pbnQvP2VudGl0eU5hbWU9ZWR1Y2F0aW9uYWxfZGVncmVlcyZjb2x1bW49ZWR1Y2F0aW9uYWxfZGVncmVlcyZmb3JTZWxlY3Q9dHJ1ZQ==",
                                        },
                                        dataGridLabel: false,
                                        hideOnChildrenHidden: false,
                                        tableView: true,
                                        indexeddb: {
                                          filter: {},
                                          database: "",
                                          table: "",
                                        },
                                        require: [
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                        ],
                                        label: "Образование",
                                        type: "select",
                                        selectedDictCode: {
                                          endpoint: "DictionaryPortletEndpoint",
                                          columns: [
                                            {
                                              name: "educational_degrees",
                                              label: "Образование",
                                              type: "STRING",
                                              value: "educational_degrees",
                                            },
                                          ],
                                          name: "educational_degrees",
                                          label: "Образование",
                                          value: "educational_degrees",
                                        },
                                        reference: false,
                                        selectedDictColumn: {
                                          name: "educational_degrees",
                                          label: "Образование",
                                          type: "STRING",
                                          value: "educational_degrees",
                                        },
                                        input: true,
                                        isSelectDict: true,
                                        selectThreshold: 0.3,
                                        addResource: false,
                                        disableLimit: false,
                                        smev_req: {},
                                        key: "educationSelect",
                                        esiaKey: {},
                                        dataSrc: "url",
                                        validate: {
                                          select: false,
                                        },
                                      },
                                      {
                                        extTypeCheckbox: false,
                                        hidden: true,
                                        dataGridLabel: false,
                                        hideOnChildrenHidden: false,
                                        tableView: true,
                                        require: [
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                        ],
                                        label: "Образование (Скрытое)",
                                        type: "textfield",
                                        calculateValue:
                                          "value = data.educationSelect.label;",
                                        input: true,
                                        smev_req: {},
                                        disabled: true,
                                        key: "educationSelectCopy",
                                        esiaKey: {},
                                      },
                                    ],
                                    offset: 0,
                                    size: "md",
                                    width: 6,
                                    push: 0,
                                  },
                                  {
                                    pull: 0,
                                    components: [
                                      {
                                        extTypeCheckbox: false,
                                        input: true,
                                        dataGridLabel: false,
                                        hideOnChildrenHidden: false,
                                        tableView: true,
                                        smev_req: {},
                                        label: "Год присуждения",
                                        inputMask: "9999",
                                        type: "textfield",
                                        key: "educationYear",
                                        esiaKey: {},
                                      },
                                    ],
                                    offset: 0,
                                    size: "md",
                                    width: 6,
                                    push: 0,
                                  },
                                  {
                                    pull: 0,
                                    components: [
                                      {
                                        allowUserAssign: false,
                                        extTypeCheckbox: false,
                                        widget: "choicesjs",
                                        data: {
                                          values: [
                                            {
                                              label: "",
                                              value: "",
                                            },
                                          ],
                                          url: "https://open-grata-nso.isands.ru/api/prometheus/getDict?data=aHR0cHM6Ly9ncmF0YS1uc28uaXNhbmRzLnJ1L28vdGVtcGxhdGUvZW50aXR5L0RpY3Rpb25hcnlQb3J0bGV0RW5kcG9pbnQvP2VudGl0eU5hbWU9ZGVncmVlcyZjb2x1bW49ZGVncmVlcyZmb3JTZWxlY3Q9dHJ1ZQ==",
                                        },
                                        dataGridLabel: false,
                                        hideOnChildrenHidden: false,
                                        tableView: true,
                                        indexeddb: {
                                          filter: {},
                                          database: "",
                                          table: "",
                                        },
                                        require: [
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                        ],
                                        label: "Ученая степень",
                                        type: "select",
                                        selectedDictCode: {
                                          endpoint: "DictionaryPortletEndpoint",
                                          columns: [
                                            {
                                              name: "degrees",
                                              label: "Ученые степени",
                                              type: "STRING",
                                              value: "degrees",
                                            },
                                          ],
                                          name: "degrees",
                                          label: "Ученые степени",
                                          value: "degrees",
                                        },
                                        reference: false,
                                        selectedDictColumn: {
                                          name: "degrees",
                                          label: "Ученые степени",
                                          type: "STRING",
                                          value: "degrees",
                                        },
                                        input: true,
                                        isSelectDict: true,
                                        selectThreshold: 0.3,
                                        addResource: false,
                                        disableLimit: false,
                                        smev_req: {},
                                        key: "scientificDegreeSelect",
                                        esiaKey: {},
                                        dataSrc: "url",
                                        validate: {
                                          select: false,
                                        },
                                      },
                                      {
                                        extTypeCheckbox: false,
                                        hidden: true,
                                        dataGridLabel: false,
                                        hideOnChildrenHidden: false,
                                        tableView: true,
                                        require: [
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                        ],
                                        label: "Ученая степень (Скрытое)",
                                        type: "textfield",
                                        calculateValue:
                                          "value = data.scientificDegreeSelect.label;",
                                        input: true,
                                        smev_req: {},
                                        disabled: true,
                                        key: "scientificDegreeSelectCopy",
                                        esiaKey: {},
                                      },
                                    ],
                                    size: "md",
                                    offset: 0,
                                    width: 6,
                                    push: 0,
                                  },
                                  {
                                    pull: 0,
                                    components: [
                                      {
                                        extTypeCheckbox: false,
                                        input: true,
                                        dataGridLabel: false,
                                        hideOnChildrenHidden: false,
                                        tableView: true,
                                        smev_req: {},
                                        require: [
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                        ],
                                        label: "Год присуждения",
                                        inputMask: "9999",
                                        type: "textfield",
                                        key: "degreeYear",
                                        esiaKey: {},
                                      },
                                    ],
                                    size: "md",
                                    offset: 0,
                                    width: 6,
                                    push: 0,
                                  },
                                  {
                                    pull: 0,
                                    components: [
                                      {
                                        allowUserAssign: false,
                                        extTypeCheckbox: false,
                                        widget: "choicesjs",
                                        data: {
                                          values: [
                                            {
                                              label: "",
                                              value: "",
                                            },
                                          ],
                                          url: "https://open-grata-nso.isands.ru/api/prometheus/getDict?data=aHR0cHM6Ly9ncmF0YS1uc28uaXNhbmRzLnJ1L28vdGVtcGxhdGUvZW50aXR5L0RpY3Rpb25hcnlQb3J0bGV0RW5kcG9pbnQvP2VudGl0eU5hbWU9dGl0bGVzJmNvbHVtbj10aXRsZXMmZm9yU2VsZWN0PXRydWU=",
                                        },
                                        dataGridLabel: false,
                                        hideOnChildrenHidden: false,
                                        tableView: true,
                                        indexeddb: {
                                          filter: {},
                                          database: "",
                                          table: "",
                                        },
                                        require: [
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                        ],
                                        label: "Ученое звание",
                                        type: "select",
                                        selectedDictCode: {
                                          endpoint: "DictionaryPortletEndpoint",
                                          columns: [
                                            {
                                              name: "titles",
                                              label: "Ученые звания",
                                              type: "STRING",
                                              value: "titles",
                                            },
                                          ],
                                          name: "titles",
                                          label: "Ученые звания",
                                          value: "titles",
                                        },
                                        reference: false,
                                        selectedDictColumn: {
                                          name: "titles",
                                          label: "Ученые звания",
                                          type: "STRING",
                                          value: "titles",
                                        },
                                        input: true,
                                        isSelectDict: true,
                                        selectThreshold: 0.3,
                                        addResource: false,
                                        disableLimit: false,
                                        smev_req: {},
                                        key: "scientificTitleSelect",
                                        esiaKey: {},
                                        dataSrc: "url",
                                        validate: {
                                          select: false,
                                        },
                                      },
                                      {
                                        extTypeCheckbox: false,
                                        hidden: true,
                                        dataGridLabel: false,
                                        hideOnChildrenHidden: false,
                                        tableView: true,
                                        require: [
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                        ],
                                        label: "Ученое звание (Скрытое)",
                                        type: "textfield",
                                        calculateValue:
                                          "value = data.scientificTitleSelect.label;",
                                        input: true,
                                        smev_req: {},
                                        disabled: true,
                                        key: "scientificTitleSelectCopy",
                                        esiaKey: {},
                                      },
                                    ],
                                    size: "md",
                                    offset: 0,
                                    width: 6,
                                    push: 0,
                                  },
                                  {
                                    pull: 0,
                                    components: [
                                      {
                                        extTypeCheckbox: false,
                                        input: true,
                                        dataGridLabel: false,
                                        hideOnChildrenHidden: false,
                                        tableView: true,
                                        smev_req: {},
                                        require: [
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                          {},
                                        ],
                                        label: "Год присуждения",
                                        inputMask: "9999",
                                        type: "textfield",
                                        key: "titleYear",
                                        esiaKey: {},
                                      },
                                    ],
                                    size: "md",
                                    offset: 0,
                                    width: 6,
                                    push: 0,
                                  },
                                ],
                                dataGridLabel: false,
                                smev_req: {},
                                tableView: false,
                                require: [
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                ],
                                label: "Столбцы",
                                type: "columns",
                                key: "columns8",
                                esiaKey: {},
                              },
                            ],
                            label: "Сведения об образовании",
                            key: "Сведения об образовании",
                          },
                          {
                            components: [
                              {
                                extTypeCheckbox: false,
                                components: [
                                  {
                                    extTypeCheckbox: false,
                                    input: false,
                                    columns: [
                                      {
                                        pull: 0,
                                        components: [
                                          {
                                            extTypeCheckbox: false,
                                            dataGridLabel: false,
                                            hideOnChildrenHidden: false,
                                            tableView: true,
                                            label: "Наименование публикации",
                                            type: "textarea",
                                            autoExpand: false,
                                            isUploadEnabled: false,
                                            input: true,
                                            smev_req: {},
                                            key: "publicationName",
                                            esiaKey: {},
                                            validate: {
                                              required: true,
                                            },
                                          },
                                        ],
                                        offset: 0,
                                        size: "md",
                                        width: 12,
                                        push: 0,
                                      },
                                      {
                                        pull: 0,
                                        components: [
                                          {
                                            extTypeCheckbox: false,
                                            input: true,
                                            dataGridLabel: false,
                                            hideOnChildrenHidden: false,
                                            tableView: true,
                                            smev_req: {},
                                            label:
                                              "Наименование системы цитирования",
                                            type: "textfield",
                                            key: "citSystemName",
                                            esiaKey: {},
                                            validate: {
                                              required: true,
                                            },
                                          },
                                        ],
                                        offset: 0,
                                        size: "md",
                                        width: 6,
                                        push: 0,
                                      },
                                      {
                                        pull: 0,
                                        components: [
                                          {
                                            extTypeCheckbox: false,
                                            dataGridLabel: false,
                                            hideOnChildrenHidden: false,
                                            tableView: false,
                                            label:
                                              "Импакт-фактор научного издания",
                                            inputFormat: "plain",
                                            type: "number",
                                            input: true,
                                            spellcheck: true,
                                            delimiter: false,
                                            requireDecimal: false,
                                            smev_req: {},
                                            key: "impaktFaktNauch",
                                            esiaKey: {},
                                            mask: false,
                                            validate: {
                                              required: true,
                                            },
                                          },
                                        ],
                                        size: "md",
                                        offset: 0,
                                        width: 6,
                                        push: 0,
                                      },
                                      {
                                        pull: 0,
                                        components: [
                                          {
                                            extTypeCheckbox: false,
                                            input: true,
                                            dataGridLabel: false,
                                            hideOnChildrenHidden: false,
                                            tableView: true,
                                            smev_req: {},
                                            label:
                                              "Ссылка в сети «Интернет» на публикацию в журнале и (или) научном издании",
                                            type: "textfield",
                                            key: "link",
                                            esiaKey: {},
                                            validate: {
                                              required: true,
                                            },
                                          },
                                        ],
                                        size: "md",
                                        offset: 0,
                                        width: 12,
                                        push: 0,
                                      },
                                    ],
                                    dataGridLabel: false,
                                    smev_req: {},
                                    tableView: false,
                                    label: "Столбцы",
                                    type: "columns",
                                    key: "columns",
                                    esiaKey: {},
                                    hideLabel: true,
                                  },
                                ],
                                enableRowGroups: false,
                                defaultValue: [
                                  {
                                    citSystemName: "",
                                    link: "",
                                    publicationName: "",
                                  },
                                ],
                                dataGridLabel: false,
                                description:
                                  "Приводится не более 10 публикаций за последние 3 года",
                                tableView: false,
                                reorder: false,
                                label:
                                  "Перечень публикаций руководителя проекта по теме проекта в журналах и (или) научных изданиях, в том числе включенных в одну из систем цитирования (библиографических баз): Российский индекс научного цитирования (РИНЦ), Web of Science, Scopus ",
                                layoutFixed: false,
                                type: "datagrid",
                                initEmpty: true,
                                input: true,
                                groupToggle: false,
                                defaultOpen: false,
                                smev_req: {},
                                addAnotherPosition: "bottom",
                                key: "publications",
                                esiaKey: {},
                              },
                              {
                                extTypeCheckbox: false,
                                dataGridLabel: false,
                                tableView: false,
                                label: "Суммарный импакт-фактор",
                                inputFormat: "plain",
                                type: "number",
                                calculateValue:
                                  "let sum = 0;\nfor (let i = 0; i < data.publications.length; i++) {\n  sum += data.publications[i].impaktFaktNauch;\n}\nvalue = sum;",
                                input: true,
                                spellcheck: true,
                                delimiter: false,
                                requireDecimal: false,
                                smev_req: {},
                                disabled: true,
                                key: "impactFaktorSum",
                                esiaKey: {},
                                mask: false,
                              },
                            ],
                            label: "Публикации",
                            key: "Публикации",
                          },
                          {
                            components: [
                              {
                                extTypeCheckbox: false,
                                components: [
                                  {
                                    extTypeCheckbox: false,
                                    input: false,
                                    columns: [
                                      {
                                        pull: 0,
                                        components: [
                                          {
                                            extTypeCheckbox: false,
                                            dataGridLabel: false,
                                            hideOnChildrenHidden: false,
                                            tableView: true,
                                            label:
                                              "Наименование конкурса научных проектов",
                                            type: "textarea",
                                            autoExpand: false,
                                            isUploadEnabled: false,
                                            input: true,
                                            smev_req: {},
                                            key: "konkursName",
                                            esiaKey: {},
                                            validate: {
                                              required: true,
                                            },
                                          },
                                        ],
                                        offset: 0,
                                        size: "md",
                                        width: 12,
                                        push: 0,
                                      },
                                      {
                                        pull: 0,
                                        components: [
                                          {
                                            allowUserAssign: false,
                                            extTypeCheckbox: false,
                                            widget: "choicesjs",
                                            data: {
                                              values: [
                                                {
                                                  label: "Руководитель",
                                                  value: "Руководитель",
                                                },
                                                {
                                                  label: "Исполнитель",
                                                  value: "Исполнитель",
                                                },
                                              ],
                                            },
                                            dataGridLabel: false,
                                            hideOnChildrenHidden: false,
                                            tableView: true,
                                            indexeddb: {
                                              filter: {},
                                              database: "",
                                              table: "",
                                            },
                                            label: "Руководитель/Исполнитель",
                                            type: "select",
                                            reference: false,
                                            selectedDictColumn: {},
                                            input: true,
                                            selectThreshold: 0.3,
                                            addResource: false,
                                            disableLimit: false,
                                            smev_req: {},
                                            key: "rukIsp",
                                            esiaKey: {},
                                            validate: {
                                              select: false,
                                              required: true,
                                            },
                                          },
                                          {
                                            allowUserAssign: false,
                                            extTypeCheckbox: false,
                                            widget: "choicesjs",
                                            data: {
                                              values: [
                                                {
                                                  label: "Муниципальный",
                                                  value: "Муниципальный",
                                                },
                                                {
                                                  label: "Региональный",
                                                  value: "Региональный",
                                                },
                                                {
                                                  label: "Федеральный",
                                                  value: "Федеральный",
                                                },
                                              ],
                                            },
                                            dataGridLabel: false,
                                            hideOnChildrenHidden: false,
                                            tableView: true,
                                            indexeddb: {
                                              filter: {},
                                              database: "",
                                              table: "",
                                            },
                                            label: "Уровень конкурса",
                                            type: "select",
                                            reference: false,
                                            selectedDictColumn: {},
                                            input: true,
                                            selectThreshold: 0.3,
                                            addResource: false,
                                            disableLimit: false,
                                            smev_req: {},
                                            key: "konkursLevel",
                                            esiaKey: {},
                                            validate: {
                                              select: false,
                                              required: true,
                                            },
                                          },
                                        ],
                                        offset: 0,
                                        size: "md",
                                        width: 12,
                                        push: 0,
                                      },
                                      {
                                        pull: 0,
                                        components: [
                                          {
                                            extTypeCheckbox: false,
                                            dataGridLabel: false,
                                            hideOnChildrenHidden: false,
                                            tableView: true,
                                            label: "Тема научного проекта",
                                            type: "textarea",
                                            autoExpand: false,
                                            isUploadEnabled: false,
                                            input: true,
                                            smev_req: {},
                                            key: "textArea3",
                                            esiaKey: {},
                                            validate: {
                                              required: true,
                                            },
                                          },
                                        ],
                                        size: "md",
                                        offset: 0,
                                        width: 12,
                                        push: 0,
                                      },
                                      {
                                        pull: 0,
                                        components: [
                                          {
                                            extTypeCheckbox: false,
                                            dataGridLabel: false,
                                            usePreview: false,
                                            hideOnChildrenHidden: false,
                                            tableView: false,
                                            label:
                                              "Форма признания, подтверждающий документ",
                                            type: "file",
                                            url: "/api/prometheus/uploadFile",
                                            storage: "url",
                                            fileTypes: [
                                              {
                                                label: "",
                                                value: "",
                                              },
                                            ],
                                            input: true,
                                            webcam: false,
                                            useFileTemplate: false,
                                            smev_req: {},
                                            key: "konkursFile",
                                            esiaKey: {},
                                          },
                                        ],
                                        size: "md",
                                        offset: 0,
                                        width: 12,
                                        push: 0,
                                      },
                                    ],
                                    dataGridLabel: false,
                                    smev_req: {},
                                    tableView: false,
                                    label: "Столбцы",
                                    type: "columns",
                                    key: "columns",
                                    esiaKey: {},
                                    hideLabel: true,
                                  },
                                ],
                                enableRowGroups: false,
                                defaultValue: [
                                  {
                                    konkursLevel: "",
                                    konkursTheme: "",
                                    rukIsp: "",
                                    textArea3: "",
                                    konkursFile: [],
                                    file1: [],
                                    konkursName: "",
                                  },
                                ],
                                dataGridLabel: false,
                                description:
                                  "Приводится не более 5 конкурсов за последние 5 лет. При наличии – приложить копии дипломов, договоров, других форм документов, подтверждающих участие в конкурсах",
                                tableView: false,
                                reorder: false,
                                label:
                                  "Участие руководителя проекта в конкурсах научно-исследовательских проектов, в качестве руководителя («Российский научный фонд», Федеральное государственное бюджетное учреждение «Российский фонд фундаментальных исследований» и других организаций, оказывающих поддержку научной деятельности)",
                                layoutFixed: false,
                                type: "datagrid",
                                initEmpty: true,
                                input: true,
                                groupToggle: false,
                                defaultOpen: false,
                                smev_req: {},
                                addAnotherPosition: "bottom",
                                key: "konkursi",
                                esiaKey: {},
                              },
                            ],
                            label: "Участие в конкурсах и конференциях",
                            key: "Участие в конкурсах и конференциях",
                          },
                        ],
                        dataGridLabel: false,
                        smev_req: {},
                        tableView: false,
                        label: "Вкладки",
                        type: "tabs",
                        key: "tabs2",
                        esiaKey: {},
                      },
                    ],
                    label: "Информация о руководителе проекта",
                    key: "информацияОРуководителеПроекта",
                  },
                  {
                    components: [
                      {
                        conditionalAddButton:
                          "show = data.nauchKol.length <= 2;",
                        extTypeCheckbox: false,
                        components: [
                          {
                            extTypeCheckbox: false,
                            input: false,
                            columns: [
                              {
                                pull: 0,
                                components: [
                                  {
                                    extTypeCheckbox: true,
                                    input: true,
                                    dataGridLabel: false,
                                    hideOnChildrenHidden: false,
                                    tableView: true,
                                    smev_req: {},
                                    label: "Фамилия",
                                    type: "textfield",
                                    key: "lastName1",
                                    extType: "esia",
                                    esiaKey: {
                                      label: "(физ. лицо) Фамилия",
                                      value: "esiaLastname",
                                    },
                                    validate: {
                                      required: true,
                                    },
                                  },
                                ],
                                offset: 0,
                                size: "md",
                                width: 4,
                                push: 0,
                              },
                              {
                                pull: 0,
                                components: [
                                  {
                                    extTypeCheckbox: true,
                                    input: true,
                                    dataGridLabel: false,
                                    hideOnChildrenHidden: false,
                                    tableView: true,
                                    smev_req: {},
                                    label: "Имя",
                                    type: "textfield",
                                    key: "firstName1",
                                    extType: "esia",
                                    esiaKey: {
                                      label: "(физ. лицо) Имя",
                                      value: "esiaFirstname",
                                    },
                                    validate: {
                                      required: true,
                                    },
                                  },
                                ],
                                offset: 0,
                                size: "md",
                                width: 4,
                                push: 0,
                              },
                              {
                                pull: 0,
                                components: [
                                  {
                                    extTypeCheckbox: true,
                                    dataGridLabel: false,
                                    hideOnChildrenHidden: false,
                                    description: "При наличии",
                                    tableView: true,
                                    label: "Отчество",
                                    type: "textfield",
                                    input: true,
                                    smev_req: {},
                                    key: "middleName1",
                                    extType: "esia",
                                    esiaKey: {
                                      label: "(физ. лицо) Отчество",
                                      value: "esiaMiddlename",
                                    },
                                    validate: {
                                      required: true,
                                    },
                                  },
                                ],
                                size: "md",
                                offset: 0,
                                width: 4,
                                push: 0,
                              },
                              {
                                pull: 0,
                                components: [
                                  {
                                    extTypeCheckbox: false,
                                    dataGridLabel: false,
                                    hideOnChildrenHidden: false,
                                    tableView: true,
                                    label: "Место обучения/работы",
                                    type: "textarea",
                                    autoExpand: false,
                                    isUploadEnabled: false,
                                    input: true,
                                    smev_req: {},
                                    key: "textArea6",
                                    esiaKey: {},
                                    validate: {
                                      required: true,
                                    },
                                  },
                                ],
                                size: "md",
                                offset: 0,
                                width: 8,
                                push: 0,
                              },
                              {
                                pull: 0,
                                components: [
                                  {
                                    extTypeCheckbox: true,
                                    enableMaxDateInput: false,
                                    widget: {
                                      minDate: null,
                                      enableTime: false,
                                      format: "dd.MM.yyyy",
                                      displayInTimezone: "viewer",
                                      noCalendar: false,
                                      type: "calendar",
                                      locale: "ru",
                                      time_24hr: true,
                                      allowInput: true,
                                      minuteIncrement: 1,
                                      mode: "single",
                                      useLocaleSettings: false,
                                      maxDate: null,
                                      disableWeekdays: false,
                                      disableWeekends: false,
                                      hourIncrement: 1,
                                    },
                                    dataGridLabel: false,
                                    hideOnChildrenHidden: false,
                                    format: "dd.MM.yyyy",
                                    enableTime: false,
                                    tableView: false,
                                    datePicker: {
                                      disableWeekdays: false,
                                      disableWeekends: false,
                                    },
                                    label: "Дата рождения",
                                    type: "datetime",
                                    enableMinDateInput: false,
                                    input: true,
                                    timePicker: {
                                      showMeridian: false,
                                    },
                                    smev_req: {},
                                    placeholder: "ДД.ММ.ГГГГ",
                                    key: "dateOfBirth1",
                                    extType: "esia",
                                    esiaKey: {
                                      label: "(физ. лицо) Дата рождения",
                                      value: "esiaBirthdate",
                                    },
                                    validate: {
                                      required: true,
                                    },
                                  },
                                ],
                                size: "md",
                                offset: 0,
                                width: 4,
                                push: 0,
                              },
                              {
                                pull: 0,
                                components: [
                                  {
                                    allowUserAssign: false,
                                    extTypeCheckbox: false,
                                    widget: "choicesjs",
                                    data: {
                                      values: [
                                        {
                                          label: "",
                                          value: "",
                                        },
                                      ],
                                      url: "https://open-grata-nso.isands.ru/api/prometheus/getDict?data=aHR0cHM6Ly9ncmF0YS1uc28uaXNhbmRzLnJ1L28vdGVtcGxhdGUvZW50aXR5L0RpY3Rpb25hcnlQb3J0bGV0RW5kcG9pbnQvP2VudGl0eU5hbWU9ZGVncmVlcyZjb2x1bW49ZGVncmVlcyZmb3JTZWxlY3Q9dHJ1ZQ==",
                                    },
                                    indexeddb: {
                                      filter: {},
                                      database: "",
                                      table: "",
                                    },
                                    type: "select",
                                    valueProperty: "label",
                                    reference: false,
                                    addResource: false,
                                    disableLimit: false,
                                    smev_req: {},
                                    key: "select5",
                                    dataSrc: "url",
                                    validate: {
                                      select: false,
                                    },
                                    dataGridLabel: false,
                                    hideOnChildrenHidden: false,
                                    tableView: true,
                                    require: [
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                    ],
                                    label: "Ученая степень",
                                    selectedDictCode: {
                                      endpoint: "DictionaryPortletEndpoint",
                                      columns: [
                                        {
                                          name: "degrees",
                                          label: "Ученые степени",
                                          type: "STRING",
                                          value: "degrees",
                                        },
                                      ],
                                      name: "degrees",
                                      label: "Ученые степени",
                                      value: "degrees",
                                    },
                                    selectedDictColumn: {
                                      name: "degrees",
                                      label: "Ученые степени",
                                      type: "STRING",
                                      value: "degrees",
                                    },
                                    input: true,
                                    idPath: "label",
                                    isSelectDict: true,
                                    selectThreshold: 0.3,
                                    esiaKey: {},
                                  },
                                  {
                                    extTypeCheckbox: false,
                                    input: true,
                                    dataGridLabel: false,
                                    hideOnChildrenHidden: false,
                                    tableView: true,
                                    smev_req: {},
                                    label: "Год присуждения",
                                    inputMask: "9999",
                                    type: "textfield",
                                    key: "textField5",
                                    esiaKey: {},
                                  },
                                ],
                                size: "md",
                                offset: 0,
                                width: 6,
                                push: 0,
                              },
                              {
                                pull: 0,
                                components: [
                                  {
                                    allowUserAssign: false,
                                    extTypeCheckbox: false,
                                    widget: "choicesjs",
                                    data: {
                                      values: [
                                        {
                                          label: "",
                                          value: "",
                                        },
                                      ],
                                      url: "https://open-grata-nso.isands.ru/api/prometheus/getDict?data=aHR0cHM6Ly9ncmF0YS1uc28uaXNhbmRzLnJ1L28vdGVtcGxhdGUvZW50aXR5L0RpY3Rpb25hcnlQb3J0bGV0RW5kcG9pbnQvP2VudGl0eU5hbWU9dGl0bGVzJmNvbHVtbj10aXRsZXMmZm9yU2VsZWN0PXRydWU=",
                                    },
                                    indexeddb: {
                                      filter: {},
                                      database: "",
                                      table: "",
                                    },
                                    type: "select",
                                    valueProperty: "label",
                                    reference: false,
                                    addResource: false,
                                    disableLimit: false,
                                    smev_req: {},
                                    key: "select6",
                                    dataSrc: "url",
                                    validate: {
                                      select: false,
                                    },
                                    dataGridLabel: false,
                                    hideOnChildrenHidden: false,
                                    tableView: true,
                                    require: [
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                      {},
                                    ],
                                    label: "Ученое звание",
                                    selectedDictCode: {
                                      endpoint: "DictionaryPortletEndpoint",
                                      columns: [
                                        {
                                          name: "titles",
                                          label: "Ученые звания",
                                          type: "STRING",
                                          value: "titles",
                                        },
                                      ],
                                      name: "titles",
                                      label: "Ученые звания",
                                      value: "titles",
                                    },
                                    selectedDictColumn: {
                                      name: "titles",
                                      label: "Ученые звания",
                                      type: "STRING",
                                      value: "titles",
                                    },
                                    input: true,
                                    idPath: "label",
                                    isSelectDict: true,
                                    selectThreshold: 0.3,
                                    esiaKey: {},
                                  },
                                  {
                                    extTypeCheckbox: false,
                                    input: true,
                                    dataGridLabel: false,
                                    hideOnChildrenHidden: false,
                                    tableView: true,
                                    smev_req: {},
                                    label: "Год присуждения",
                                    inputMask: "9999",
                                    type: "textfield",
                                    key: "textField6",
                                    esiaKey: {},
                                  },
                                ],
                                size: "md",
                                offset: 0,
                                width: 6,
                                push: 0,
                              },
                              {
                                pull: 0,
                                components: [
                                  {
                                    extTypeCheckbox: false,
                                    input: true,
                                    dataGridLabel: false,
                                    hideOnChildrenHidden: false,
                                    tableView: true,
                                    smev_req: {},
                                    label: "Должность в организации",
                                    type: "textfield",
                                    key: "textField7",
                                    esiaKey: {},
                                    validate: {
                                      required: true,
                                    },
                                  },
                                ],
                                size: "md",
                                offset: 0,
                                width: 12,
                                push: 0,
                              },
                              {
                                pull: 0,
                                components: [
                                  {
                                    extTypeCheckbox: false,
                                    components: [
                                      {
                                        extTypeCheckbox: false,
                                        input: false,
                                        columns: [
                                          {
                                            pull: 0,
                                            components: [
                                              {
                                                extTypeCheckbox: false,
                                                dataGridLabel: false,
                                                hideOnChildrenHidden: false,
                                                tableView: true,
                                                label:
                                                  "Наименование публикации",
                                                type: "textarea",
                                                autoExpand: false,
                                                isUploadEnabled: false,
                                                input: true,
                                                smev_req: {},
                                                key: "textArea7",
                                                esiaKey: {},
                                                validate: {
                                                  required: true,
                                                },
                                              },
                                            ],
                                            offset: 0,
                                            size: "md",
                                            width: 12,
                                            push: 0,
                                          },
                                          {
                                            pull: 0,
                                            components: [
                                              {
                                                extTypeCheckbox: false,
                                                input: true,
                                                dataGridLabel: false,
                                                hideOnChildrenHidden: false,
                                                tableView: true,
                                                smev_req: {},
                                                label:
                                                  "Наименование системы цитирования",
                                                type: "textfield",
                                                key: "citSystemName1",
                                                esiaKey: {},
                                                validate: {
                                                  required: true,
                                                },
                                              },
                                            ],
                                            offset: 0,
                                            size: "md",
                                            width: 6,
                                            push: 0,
                                          },
                                          {
                                            pull: 0,
                                            components: [
                                              {
                                                extTypeCheckbox: false,
                                                dataGridLabel: false,
                                                hideOnChildrenHidden: false,
                                                tableView: false,
                                                label:
                                                  "Импакт-фактор научного издания",
                                                inputFormat: "plain",
                                                type: "number",
                                                input: true,
                                                spellcheck: true,
                                                delimiter: false,
                                                requireDecimal: false,
                                                smev_req: {},
                                                key: "impaktFaktNauch1",
                                                esiaKey: {},
                                                mask: false,
                                                validate: {
                                                  required: true,
                                                },
                                              },
                                            ],
                                            size: "md",
                                            offset: 0,
                                            width: 6,
                                            push: 0,
                                          },
                                          {
                                            pull: 0,
                                            components: [
                                              {
                                                extTypeCheckbox: false,
                                                input: true,
                                                dataGridLabel: false,
                                                hideOnChildrenHidden: false,
                                                tableView: true,
                                                smev_req: {},
                                                label:
                                                  "Ссылка в сети «Интернет» на публикацию в журнале и (или) научном издании",
                                                type: "textfield",
                                                key: "link1",
                                                esiaKey: {},
                                                validate: {
                                                  required: true,
                                                },
                                              },
                                            ],
                                            size: "md",
                                            offset: 0,
                                            width: 12,
                                            push: 0,
                                          },
                                        ],
                                        dataGridLabel: false,
                                        smev_req: {},
                                        tableView: false,
                                        label: "Столбцы",
                                        type: "columns",
                                        key: "columns7",
                                        esiaKey: {},
                                        hideLabel: true,
                                      },
                                    ],
                                    enableRowGroups: false,
                                    defaultValue: [
                                      {
                                        link1: "",
                                        citSystemName1: "",
                                        textArea7: "",
                                      },
                                    ],
                                    dataGridLabel: false,
                                    hideOnChildrenHidden: false,
                                    description:
                                      "Приводится не более 10 публикаций за последние 3 года",
                                    tableView: false,
                                    reorder: false,
                                    label:
                                      "Перечень публикаций члена научного коллектива по теме проекта в журналах и (или) научных изданиях, включенных в одну из систем цитирования (библиографических баз): Российский индекс научного цитирования (РИНЦ), Web of Science, Scopus ",
                                    layoutFixed: false,
                                    type: "datagrid",
                                    initEmpty: true,
                                    input: true,
                                    groupToggle: false,
                                    defaultOpen: false,
                                    smev_req: {},
                                    addAnotherPosition: "bottom",
                                    key: "dataGrid4",
                                    esiaKey: {},
                                  },
                                ],
                                size: "md",
                                offset: 0,
                                width: 12,
                                push: 0,
                              },
                            ],
                            dataGridLabel: false,
                            smev_req: {},
                            tableView: false,
                            label: "Столбцы",
                            type: "columns",
                            key: "columns",
                            esiaKey: {},
                            hideLabel: true,
                          },
                        ],
                        enableRowGroups: false,
                        defaultValue: [
                          {
                            dataGrid4: [
                              {
                                link1: "",
                                citSystemName1: "",
                                textArea7: "",
                              },
                            ],
                            middleName1: "",
                            firstName1: "",
                            lastName1: "",
                            textField6: "",
                            textField5: "",
                            textArea6: "",
                            select6: "",
                            select5: "",
                            dateOfBirth1: "",
                          },
                        ],
                        dataGridLabel: false,
                        tableView: false,
                        reorder: false,
                        label: "Сведения о научном коллективе",
                        layoutFixed: false,
                        type: "datagrid",
                        initEmpty: true,
                        input: true,
                        groupToggle: false,
                        defaultOpen: false,
                        smev_req: {},
                        addAnotherPosition: "bottom",
                        key: "nauchKol",
                        esiaKey: {},
                        hideLabel: true,
                      },
                    ],
                    label: "Сведения о научном коллективе",
                    key: "сведенияОНаучномКоллективе",
                  },
                  {
                    components: [
                      {
                        extTypeCheckbox: false,
                        input: false,
                        components: [
                          {
                            components: [
                              {
                                extTypeCheckbox: false,
                                input: true,
                                dataGridLabel: false,
                                tableView: true,
                                smev_req: {},
                                label: "Наименование проекта",
                                type: "textarea",
                                autoExpand: false,
                                isUploadEnabled: false,
                                key: "scienceWorkName",
                                esiaKey: {},
                                validate: {
                                  required: true,
                                },
                              },
                              {
                                allowUserAssign: false,
                                extTypeCheckbox: false,
                                widget: "choicesjs",
                                data: {
                                  values: [
                                    {
                                      label: "",
                                      value: "",
                                    },
                                  ],
                                  url: "https://open-grata-nso.isands.ru/api/prometheus/getDict?data=aHR0cHM6Ly9ncmF0YS1uc28uaXNhbmRzLnJ1L28vdGVtcGxhdGUvZW50aXR5L0RpY3Rpb25hcnlQb3J0bGV0RW5kcG9pbnQvP2VudGl0eU5hbWU9c2NpZW50aWZpY19kaXJlY3Rpb25zOSZjb2x1bW49c2NpZW50aWZpY19kaXJlY3Rpb25zOSZmb3JTZWxlY3Q9dHJ1ZQ==",
                                },
                                dataGridLabel: false,
                                tableView: true,
                                indexeddb: {
                                  filter: {},
                                  database: "",
                                  table: "",
                                },
                                label: "Направление научного исследования",
                                type: "select",
                                selectedDictCode: {
                                  endpoint: "DictionaryPortletEndpoint",
                                  columns: [
                                    {
                                      name: "scientific_directions9",
                                      label:
                                        "Приоритетные направления в рамках конкурса на предоставление грантов",
                                      type: "STRING",
                                      value: "scientific_directions9",
                                    },
                                  ],
                                  name: "scientific_directions9",
                                  label:
                                    "Приоритетные направления в рамках конкурса на предоставление грантов",
                                  value: "scientific_directions9",
                                },
                                valueProperty: "label",
                                reference: false,
                                selectedDictColumn: {
                                  name: "scientific_directions9",
                                  label:
                                    "Приоритетные направления в рамках конкурса на предоставление грантов",
                                  type: "STRING",
                                  value: "scientific_directions9",
                                },
                                input: true,
                                idPath: "label",
                                isSelectDict: true,
                                selectThreshold: 0.3,
                                addResource: false,
                                disableLimit: false,
                                smev_req: {},
                                key: "direction",
                                esiaKey: {},
                                dataSrc: "url",
                                validate: {
                                  select: false,
                                  required: true,
                                },
                              },
                              {
                                extTypeCheckbox: false,
                                dataGridLabel: false,
                                tableView: false,
                                label: "Запрашиваемый объем финансирования",
                                suffix: "руб.",
                                inputFormat: "plain",
                                type: "number",
                                input: true,
                                spellcheck: true,
                                delimiter: false,
                                requireDecimal: false,
                                smev_req: {},
                                key: "number6",
                                esiaKey: {},
                                mask: false,
                                validate: {
                                  min: 0,
                                  max: 500000,
                                  required: true,
                                },
                              },
                              {
                                extTypeCheckbox: false,
                                dataGridLabel: false,
                                description: "Не более 2000 знаков",
                                tableView: true,
                                label: "Аннотация проекта",
                                type: "textarea",
                                autoExpand: false,
                                isUploadEnabled: false,
                                input: true,
                                smev_req: {},
                                key: "annotation",
                                esiaKey: {},
                                validate: {
                                  required: true,
                                  maxLength: 2000,
                                },
                              },
                              {
                                extTypeCheckbox: false,
                                dataGridLabel: false,
                                description: "Не более 2000 знаков",
                                tableView: true,
                                label:
                                  "Актуальность проекта для Новосибирской области",
                                type: "textarea",
                                autoExpand: false,
                                isUploadEnabled: false,
                                input: true,
                                smev_req: {},
                                key: "relevance",
                                esiaKey: {},
                                validate: {
                                  required: true,
                                  maxLength: 2000,
                                },
                              },
                              {
                                extTypeCheckbox: false,
                                dataGridLabel: false,
                                description: "Не более 2000 знаков",
                                tableView: true,
                                label: "Цель и задачи проекта",
                                type: "textarea",
                                autoExpand: false,
                                isUploadEnabled: false,
                                input: true,
                                smev_req: {},
                                key: "newness1",
                                esiaKey: {},
                                validate: {
                                  required: true,
                                  maxLength: 2000,
                                },
                              },
                              {
                                extTypeCheckbox: false,
                                dataGridLabel: false,
                                description: "Не более 2000 знаков",
                                tableView: true,
                                label:
                                  "Обоснование достижимости решения поставленной задачи и возможности получения запланированных результатов ",
                                type: "textarea",
                                autoExpand: false,
                                isUploadEnabled: false,
                                input: true,
                                smev_req: {},
                                key: "newness2",
                                esiaKey: {},
                                validate: {
                                  required: true,
                                  maxLength: 2000,
                                },
                              },
                              {
                                extTypeCheckbox: false,
                                dataGridLabel: false,
                                description:
                                  "Указываются полученные ранее результаты, разработанные программы, методы и т.д. Не более 2000 знаков",
                                tableView: true,
                                label:
                                  "Имеющийся научный задел по теме проекта",
                                type: "textarea",
                                autoExpand: false,
                                isUploadEnabled: false,
                                input: true,
                                smev_req: {},
                                key: "newness3",
                                esiaKey: {},
                                validate: {
                                  required: true,
                                  maxLength: 2000,
                                },
                              },
                              {
                                extTypeCheckbox: false,
                                dataGridLabel: false,
                                description: "Не более 2000 знаков",
                                tableView: true,
                                label:
                                  "Ожидаемые результаты выполнения проекта, включая оценку экономического и (или) социального эффектов для Новосибирской области",
                                type: "textarea",
                                autoExpand: false,
                                isUploadEnabled: false,
                                input: true,
                                smev_req: {},
                                key: "newness",
                                esiaKey: {},
                                validate: {
                                  required: true,
                                  maxLength: 2000,
                                },
                              },
                            ],
                            label: "Общая информация",
                            key: "Общая информация",
                          },
                          {
                            components: [
                              {
                                extTypeCheckbox: false,
                                input: false,
                                columns: [
                                  {
                                    pull: 0,
                                    components: [],
                                    offset: 0,
                                    size: "md",
                                    width: 4,
                                    push: 0,
                                  },
                                  {
                                    pull: 0,
                                    components: [],
                                    offset: 0,
                                    size: "md",
                                    width: 4,
                                    push: 0,
                                  },
                                  {
                                    pull: 0,
                                    components: [],
                                    size: "md",
                                    offset: 0,
                                    width: 4,
                                    push: 0,
                                  },
                                ],
                                dataGridLabel: false,
                                smev_req: {},
                                tableView: false,
                                label: "Столбцы",
                                type: "columns",
                                key: "columns9",
                                esiaKey: {},
                              },
                              {
                                extTypeCheckbox: false,
                                input: false,
                                dataGridLabel: false,
                                hideOnChildrenHidden: false,
                                tableView: false,
                                smev_req: {},
                                html: '<p style="text-align:right;"><span class="text-small" style="background-color:rgb(255,255,255);color:rgb(0,0,0);"><i>Затраты на реализацию проекта осуществляются в целях реализации проекта в течение периода с даты подачи заявки до 31 декабря года предоставления гранта</i></span></p>',
                                label: "Контент",
                                refreshOnChange: false,
                                type: "content",
                                key: "content55",
                                esiaKey: {},
                              },
                              {
                                extTypeCheckbox: false,
                                input: false,
                                columns: [
                                  {
                                    pull: 0,
                                    components: [
                                      {
                                        extTypeCheckbox: false,
                                        input: false,
                                        dataGridLabel: false,
                                        hideOnChildrenHidden: false,
                                        tableView: false,
                                        smev_req: {},
                                        html: '<p style="text-align:center;"><strong>№</strong></p>',
                                        label: "Контент",
                                        refreshOnChange: false,
                                        type: "content",
                                        key: "content27",
                                        esiaKey: {},
                                      },
                                    ],
                                    offset: 0,
                                    size: "md",
                                    width: 1,
                                    push: 0,
                                  },
                                  {
                                    pull: 0,
                                    components: [
                                      {
                                        extTypeCheckbox: false,
                                        input: false,
                                        dataGridLabel: false,
                                        hideOnChildrenHidden: false,
                                        tableView: false,
                                        smev_req: {},
                                        html: '<p style="text-align:center;"><span style="background-color:rgb(255,255,255);color:rgb(0,0,0);"><strong>Вид расходов</strong></span></p>',
                                        label: "Контент",
                                        refreshOnChange: false,
                                        type: "content",
                                        key: "content34",
                                        esiaKey: {},
                                      },
                                    ],
                                    offset: 0,
                                    size: "md",
                                    width: 3,
                                    push: 0,
                                  },
                                  {
                                    pull: 0,
                                    components: [
                                      {
                                        extTypeCheckbox: false,
                                        input: false,
                                        dataGridLabel: false,
                                        hideOnChildrenHidden: false,
                                        tableView: false,
                                        smev_req: {},
                                        html: '<p style="text-align:center;"><span style="background-color:rgb(255,255,255);color:rgb(0,0,0);"><strong>Сумма (руб.)</strong></span></p>',
                                        label: "Контент",
                                        refreshOnChange: false,
                                        type: "content",
                                        key: "content35",
                                        esiaKey: {},
                                      },
                                    ],
                                    size: "md",
                                    offset: 0,
                                    width: 3,
                                    push: 0,
                                  },
                                  {
                                    pull: 0,
                                    components: [
                                      {
                                        extTypeCheckbox: false,
                                        input: false,
                                        dataGridLabel: false,
                                        hideOnChildrenHidden: false,
                                        tableView: false,
                                        smev_req: {},
                                        html: '<p style="text-align:center;"><span style="background-color:rgb(255,255,255);color:rgb(0,0,0);"><strong>Расшифровка планируемых расходов</strong></span></p>',
                                        label: "Контент",
                                        refreshOnChange: false,
                                        type: "content",
                                        key: "content36",
                                        esiaKey: {},
                                      },
                                    ],
                                    size: "md",
                                    offset: 0,
                                    width: 5,
                                    push: 0,
                                  },
                                  {
                                    pull: 0,
                                    components: [
                                      {
                                        extTypeCheckbox: false,
                                        input: false,
                                        dataGridLabel: false,
                                        hideOnChildrenHidden: false,
                                        tableView: false,
                                        smev_req: {},
                                        html: '<p style="text-align:center;"><strong>1</strong></p>',
                                        label: "Контент",
                                        refreshOnChange: false,
                                        type: "content",
                                        key: "content29",
                                        esiaKey: {},
                                      },
                                    ],
                                    size: "md",
                                    offset: 0,
                                    width: 1,
                                    push: 0,
                                  },
                                  {
                                    pull: 0,
                                    components: [
                                      {
                                        extTypeCheckbox: false,
                                        input: false,
                                        dataGridLabel: false,
                                        hideOnChildrenHidden: false,
                                        tableView: false,
                                        smev_req: {},
                                        html: '<p><span style="background-color:rgb(255,255,255);color:rgb(0,0,0);"><strong>Расходы на вознаграждение руководителю проекта</strong></span></p>',
                                        label: "Контент",
                                        refreshOnChange: false,
                                        type: "content",
                                        key: "content37",
                                        esiaKey: {},
                                      },
                                    ],
                                    size: "md",
                                    offset: 0,
                                    width: 3,
                                    push: 0,
                                  },
                                  {
                                    pull: 0,
                                    components: [
                                      {
                                        extTypeCheckbox: false,
                                        dataGridLabel: false,
                                        hideOnChildrenHidden: false,
                                        tooltip:
                                          "Общий размер вознаграждения руководителя проекта не должен превышать 50% от суммы оплаты труда всех исполнителей проекта, вознаграждение за выполнение работ по реализации проекта должен получить каждый член научного коллектива ",
                                        tableView: false,
                                        label: "-",
                                        inputFormat: "plain",
                                        type: "number",
                                        input: true,
                                        spellcheck: true,
                                        delimiter: false,
                                        requireDecimal: false,
                                        smev_req: {},
                                        key: "sum1",
                                        esiaKey: {},
                                        mask: false,
                                        validate: {
                                          min: 0,
                                          required: true,
                                        },
                                      },
                                    ],
                                    size: "md",
                                    offset: 0,
                                    width: 3,
                                    push: 0,
                                  },
                                  {
                                    pull: 0,
                                    components: [
                                      {
                                        extTypeCheckbox: false,
                                        dataGridLabel: false,
                                        hideOnChildrenHidden: false,
                                        tableView: true,
                                        label: "Расшифровка",
                                        type: "textarea",
                                        autoExpand: false,
                                        isUploadEnabled: false,
                                        input: true,
                                        smev_req: {},
                                        key: "rashifrovka1",
                                        esiaKey: {},
                                        hideLabel: true,
                                        validate: {
                                          required: true,
                                          maxLength: 2000,
                                        },
                                      },
                                    ],
                                    size: "md",
                                    offset: 0,
                                    width: 5,
                                    push: 0,
                                  },
                                  {
                                    pull: 0,
                                    components: [
                                      {
                                        extTypeCheckbox: false,
                                        input: false,
                                        dataGridLabel: false,
                                        hideOnChildrenHidden: false,
                                        tableView: false,
                                        smev_req: {},
                                        html: '<p style="text-align:center;"><strong>2</strong></p>',
                                        label: "Контент",
                                        refreshOnChange: false,
                                        type: "content",
                                        key: "content30",
                                        esiaKey: {},
                                      },
                                    ],
                                    size: "md",
                                    offset: 0,
                                    width: 1,
                                    push: 0,
                                  },
                                  {
                                    pull: 0,
                                    components: [
                                      {
                                        extTypeCheckbox: false,
                                        input: false,
                                        dataGridLabel: false,
                                        hideOnChildrenHidden: false,
                                        tableView: false,
                                        smev_req: {},
                                        html: '<p><span style="background-color:rgb(255,255,255);color:rgb(0,0,0);"><strong>Расходы на оплату труда научного коллектива</strong></span></p>',
                                        label: "Контент",
                                        refreshOnChange: false,
                                        type: "content",
                                        key: "content38",
                                        esiaKey: {},
                                      },
                                    ],
                                    size: "md",
                                    offset: 0,
                                    width: 3,
                                    push: 0,
                                  },
                                  {
                                    pull: 0,
                                    components: [
                                      {
                                        extTypeCheckbox: false,
                                        dataGridLabel: false,
                                        hideOnChildrenHidden: false,
                                        tableView: false,
                                        label: "Сумма",
                                        inputFormat: "plain",
                                        type: "number",
                                        input: true,
                                        spellcheck: true,
                                        delimiter: false,
                                        requireDecimal: false,
                                        smev_req: {},
                                        key: "sum2",
                                        esiaKey: {},
                                        hideLabel: true,
                                        mask: false,
                                        validate: {
                                          min: 0,
                                          required: true,
                                        },
                                      },
                                    ],
                                    size: "md",
                                    offset: 0,
                                    width: 3,
                                    push: 0,
                                  },
                                  {
                                    pull: 0,
                                    components: [
                                      {
                                        extTypeCheckbox: false,
                                        dataGridLabel: false,
                                        hideOnChildrenHidden: false,
                                        tableView: true,
                                        label: "Расшифровка",
                                        type: "textarea",
                                        autoExpand: false,
                                        isUploadEnabled: false,
                                        input: true,
                                        smev_req: {},
                                        key: "rashifrovka2",
                                        esiaKey: {},
                                        hideLabel: true,
                                        validate: {
                                          required: true,
                                          maxLength: 2000,
                                        },
                                      },
                                    ],
                                    size: "md",
                                    offset: 0,
                                    width: 5,
                                    push: 0,
                                  },
                                  {
                                    pull: 0,
                                    components: [
                                      {
                                        extTypeCheckbox: false,
                                        input: false,
                                        dataGridLabel: false,
                                        hideOnChildrenHidden: false,
                                        tableView: false,
                                        smev_req: {},
                                        html: '<p style="text-align:center;"><strong>3</strong></p>',
                                        label: "Контент",
                                        refreshOnChange: false,
                                        type: "content",
                                        key: "content31",
                                        esiaKey: {},
                                      },
                                    ],
                                    size: "md",
                                    offset: 0,
                                    width: 1,
                                    push: 0,
                                  },
                                  {
                                    pull: 0,
                                    components: [
                                      {
                                        extTypeCheckbox: false,
                                        input: false,
                                        dataGridLabel: false,
                                        hideOnChildrenHidden: false,
                                        tableView: false,
                                        smev_req: {},
                                        html: '<p><span style="background-color:rgb(255,255,255);color:rgb(0,0,0);"><strong>Расходы на приобретение специального оборудования, расходных материалов, комплектующих, необходимых для выполнения проекта</strong></span></p>',
                                        label: "Контент",
                                        refreshOnChange: false,
                                        type: "content",
                                        key: "content39",
                                        esiaKey: {},
                                      },
                                    ],
                                    size: "md",
                                    offset: 0,
                                    width: 3,
                                    push: 0,
                                  },
                                  {
                                    pull: 0,
                                    components: [
                                      {
                                        extTypeCheckbox: false,
                                        dataGridLabel: false,
                                        hideOnChildrenHidden: false,
                                        tooltip:
                                          "Расходы на приобретение расходных материалов не должны превышать 50% от планируемого объема финансирования проекта",
                                        tableView: false,
                                        label: "-",
                                        inputFormat: "plain",
                                        type: "number",
                                        input: true,
                                        spellcheck: true,
                                        delimiter: false,
                                        requireDecimal: false,
                                        smev_req: {},
                                        key: "sum3",
                                        esiaKey: {},
                                        mask: false,
                                        validate: {
                                          min: 0,
                                          required: true,
                                        },
                                      },
                                    ],
                                    size: "md",
                                    offset: 0,
                                    width: 3,
                                    push: 0,
                                  },
                                  {
                                    pull: 0,
                                    components: [
                                      {
                                        extTypeCheckbox: false,
                                        dataGridLabel: false,
                                        hideOnChildrenHidden: false,
                                        tableView: true,
                                        label: "Расшифровка",
                                        type: "textarea",
                                        autoExpand: false,
                                        isUploadEnabled: false,
                                        input: true,
                                        smev_req: {},
                                        key: "rashifrovka3",
                                        esiaKey: {},
                                        hideLabel: true,
                                        validate: {
                                          required: true,
                                          maxLength: 2000,
                                        },
                                      },
                                    ],
                                    size: "md",
                                    offset: 0,
                                    width: 5,
                                    push: 0,
                                  },
                                  {
                                    pull: 0,
                                    components: [
                                      {
                                        extTypeCheckbox: false,
                                        input: false,
                                        dataGridLabel: false,
                                        hideOnChildrenHidden: false,
                                        tableView: false,
                                        smev_req: {},
                                        html: '<p style="text-align:center;"><strong>4</strong></p>',
                                        label: "Контент",
                                        refreshOnChange: false,
                                        type: "content",
                                        key: "content32",
                                        esiaKey: {},
                                      },
                                    ],
                                    size: "md",
                                    offset: 0,
                                    width: 1,
                                    push: 0,
                                  },
                                  {
                                    pull: 0,
                                    components: [
                                      {
                                        extTypeCheckbox: false,
                                        input: false,
                                        dataGridLabel: false,
                                        hideOnChildrenHidden: false,
                                        tableView: false,
                                        smev_req: {},
                                        html: '<p><span style="background-color:rgb(255,255,255);color:rgb(0,0,0);"><strong>Транспортные расходы на поездки, совершаемые в целях реализации проекта</strong></span></p>',
                                        label: "Контент",
                                        refreshOnChange: false,
                                        type: "content",
                                        key: "content40",
                                        esiaKey: {},
                                      },
                                    ],
                                    size: "md",
                                    offset: 0,
                                    width: 3,
                                    push: 0,
                                  },
                                  {
                                    pull: 0,
                                    components: [
                                      {
                                        extTypeCheckbox: false,
                                        dataGridLabel: false,
                                        hideOnChildrenHidden: false,
                                        tooltip:
                                          "Допускаются поездки научного коллектива (включая руководителя) с целью работы по теме проекта в архивах, библиотеках и проведения полевых исследований, а также для выступления с докладами по теме проводимых исследований (в соответствии со сроками проведения мероприятия). Максимальное суммарное время пребывания в поездках для одного исполнителя научного проекта составляет не более 30 дней в текущем году",
                                        tableView: false,
                                        label: "-",
                                        inputFormat: "plain",
                                        type: "number",
                                        input: true,
                                        spellcheck: true,
                                        delimiter: false,
                                        requireDecimal: false,
                                        smev_req: {},
                                        key: "sum4",
                                        esiaKey: {},
                                        mask: false,
                                        validate: {
                                          min: 0,
                                          required: true,
                                        },
                                      },
                                    ],
                                    size: "md",
                                    offset: 0,
                                    width: 3,
                                    push: 0,
                                  },
                                  {
                                    pull: 0,
                                    components: [
                                      {
                                        extTypeCheckbox: false,
                                        dataGridLabel: false,
                                        hideOnChildrenHidden: false,
                                        tableView: true,
                                        label: "Расшифровка",
                                        type: "textarea",
                                        autoExpand: false,
                                        isUploadEnabled: false,
                                        input: true,
                                        smev_req: {},
                                        key: "rashifrovka4",
                                        esiaKey: {},
                                        hideLabel: true,
                                        validate: {
                                          required: true,
                                        },
                                      },
                                    ],
                                    size: "md",
                                    offset: 0,
                                    width: 5,
                                    push: 0,
                                  },
                                  {
                                    pull: 0,
                                    components: [
                                      {
                                        extTypeCheckbox: false,
                                        input: false,
                                        dataGridLabel: false,
                                        hideOnChildrenHidden: false,
                                        tableView: false,
                                        smev_req: {},
                                        html: '<p style="text-align:center;"><strong>5</strong></p>',
                                        label: "Контент",
                                        refreshOnChange: false,
                                        type: "content",
                                        key: "content33",
                                        esiaKey: {},
                                      },
                                    ],
                                    size: "md",
                                    offset: 0,
                                    width: 1,
                                    push: 0,
                                  },
                                  {
                                    pull: 0,
                                    components: [
                                      {
                                        extTypeCheckbox: false,
                                        input: false,
                                        dataGridLabel: false,
                                        hideOnChildrenHidden: false,
                                        tableView: false,
                                        smev_req: {},
                                        html: '<p><span style="background-color:rgb(255,255,255);color:rgb(0,0,0);"><strong>Расходы на оплату выполнения работ, оказания услуг сторонними организациями, направленных на реализацию проекта</strong></span></p>',
                                        label: "Контент",
                                        refreshOnChange: false,
                                        type: "content",
                                        key: "content41",
                                        esiaKey: {},
                                      },
                                    ],
                                    size: "md",
                                    offset: 0,
                                    width: 3,
                                    push: 0,
                                  },
                                  {
                                    pull: 0,
                                    components: [
                                      {
                                        extTypeCheckbox: false,
                                        dataGridLabel: false,
                                        hideOnChildrenHidden: false,
                                        tooltip:
                                          "Расходы на оплату услуг сторонних организаций не должны превышать 50% от планируемого объема финансирования проекта",
                                        tableView: false,
                                        label: "-",
                                        inputFormat: "plain",
                                        type: "number",
                                        input: true,
                                        spellcheck: true,
                                        delimiter: false,
                                        requireDecimal: false,
                                        smev_req: {},
                                        key: "sum5",
                                        esiaKey: {},
                                        mask: false,
                                        validate: {
                                          min: 0,
                                          required: true,
                                        },
                                      },
                                    ],
                                    size: "md",
                                    offset: 0,
                                    width: 3,
                                    push: 0,
                                  },
                                  {
                                    pull: 0,
                                    components: [
                                      {
                                        extTypeCheckbox: false,
                                        dataGridLabel: false,
                                        hideOnChildrenHidden: false,
                                        tableView: true,
                                        label: "Расшифровка",
                                        type: "textarea",
                                        autoExpand: false,
                                        isUploadEnabled: false,
                                        input: true,
                                        smev_req: {},
                                        key: "rashifrovka5",
                                        esiaKey: {},
                                        hideLabel: true,
                                        validate: {
                                          required: true,
                                          maxLength: 2000,
                                        },
                                      },
                                    ],
                                    size: "md",
                                    offset: 0,
                                    width: 5,
                                    push: 0,
                                  },
                                  {
                                    pull: 0,
                                    components: [
                                      {
                                        extTypeCheckbox: false,
                                        input: false,
                                        dataGridLabel: false,
                                        hideOnChildrenHidden: false,
                                        tableView: false,
                                        smev_req: {},
                                        html: '<p style="text-align:center;"><strong>6</strong></p>',
                                        label: "Контент",
                                        refreshOnChange: false,
                                        type: "content",
                                        key: "content42",
                                        esiaKey: {},
                                      },
                                    ],
                                    size: "md",
                                    offset: 0,
                                    width: 1,
                                    push: 0,
                                  },
                                  {
                                    pull: 0,
                                    components: [
                                      {
                                        extTypeCheckbox: false,
                                        input: false,
                                        dataGridLabel: false,
                                        hideOnChildrenHidden: false,
                                        tableView: false,
                                        smev_req: {},
                                        html: '<p><span style="background-color:rgb(255,255,255);color:rgb(0,0,0);"><strong>Расходы на публикации по теме проекта</strong></span></p>',
                                        label: "Контент",
                                        refreshOnChange: false,
                                        type: "content",
                                        key: "content45",
                                        esiaKey: {},
                                      },
                                    ],
                                    size: "md",
                                    offset: 0,
                                    width: 3,
                                    push: 0,
                                  },
                                  {
                                    pull: 0,
                                    components: [
                                      {
                                        extTypeCheckbox: false,
                                        dataGridLabel: false,
                                        hideOnChildrenHidden: false,
                                        tableView: false,
                                        label: "Сумма",
                                        inputFormat: "plain",
                                        type: "number",
                                        input: true,
                                        spellcheck: true,
                                        delimiter: false,
                                        requireDecimal: false,
                                        smev_req: {},
                                        key: "sum6",
                                        esiaKey: {},
                                        hideLabel: true,
                                        mask: false,
                                        validate: {
                                          min: 0,
                                          required: true,
                                        },
                                      },
                                    ],
                                    size: "md",
                                    offset: 0,
                                    width: 3,
                                    push: 0,
                                  },
                                  {
                                    pull: 0,
                                    components: [
                                      {
                                        extTypeCheckbox: false,
                                        dataGridLabel: false,
                                        hideOnChildrenHidden: false,
                                        tableView: true,
                                        label: "Расшифровка",
                                        type: "textarea",
                                        autoExpand: false,
                                        isUploadEnabled: false,
                                        input: true,
                                        smev_req: {},
                                        key: "rashifrovka6",
                                        esiaKey: {},
                                        hideLabel: true,
                                        validate: {
                                          required: true,
                                          maxLength: 2000,
                                        },
                                      },
                                    ],
                                    size: "md",
                                    offset: 0,
                                    width: 5,
                                    push: 0,
                                  },
                                  {
                                    pull: 0,
                                    components: [
                                      {
                                        extTypeCheckbox: false,
                                        input: false,
                                        dataGridLabel: false,
                                        hideOnChildrenHidden: false,
                                        tableView: false,
                                        smev_req: {},
                                        html: '<p style="text-align:center;"><strong>7</strong></p>',
                                        label: "Контент",
                                        refreshOnChange: false,
                                        type: "content",
                                        key: "content43",
                                        esiaKey: {},
                                      },
                                    ],
                                    size: "md",
                                    offset: 0,
                                    width: 1,
                                    push: 0,
                                  },
                                  {
                                    pull: 0,
                                    components: [
                                      {
                                        extTypeCheckbox: false,
                                        input: false,
                                        dataGridLabel: false,
                                        hideOnChildrenHidden: false,
                                        tableView: false,
                                        smev_req: {},
                                        html: '<p><span style="background-color:rgb(255,255,255);color:rgb(0,0,0);"><strong>Расходы на оплату государственной пошлины на регистрацию интеллектуальной собственности по теме проекта</strong></span></p>',
                                        label: "Контент",
                                        refreshOnChange: false,
                                        type: "content",
                                        key: "content46",
                                        esiaKey: {},
                                      },
                                    ],
                                    size: "md",
                                    offset: 0,
                                    width: 3,
                                    push: 0,
                                  },
                                  {
                                    pull: 0,
                                    components: [
                                      {
                                        extTypeCheckbox: false,
                                        dataGridLabel: false,
                                        hideOnChildrenHidden: false,
                                        tableView: false,
                                        label: "Сумма",
                                        inputFormat: "plain",
                                        type: "number",
                                        input: true,
                                        spellcheck: true,
                                        delimiter: false,
                                        requireDecimal: false,
                                        smev_req: {},
                                        key: "sum7",
                                        esiaKey: {},
                                        hideLabel: true,
                                        mask: false,
                                        validate: {
                                          min: 0,
                                          required: true,
                                        },
                                      },
                                    ],
                                    size: "md",
                                    offset: 0,
                                    width: 3,
                                    push: 0,
                                  },
                                  {
                                    pull: 0,
                                    components: [
                                      {
                                        extTypeCheckbox: false,
                                        dataGridLabel: false,
                                        hideOnChildrenHidden: false,
                                        tableView: true,
                                        label: "Расшифровка",
                                        type: "textarea",
                                        autoExpand: false,
                                        isUploadEnabled: false,
                                        input: true,
                                        smev_req: {},
                                        key: "rashifrovka7",
                                        esiaKey: {},
                                        hideLabel: true,
                                        validate: {
                                          required: true,
                                          maxLength: 2000,
                                        },
                                      },
                                    ],
                                    size: "md",
                                    offset: 0,
                                    width: 5,
                                    push: 0,
                                  },
                                  {
                                    pull: 0,
                                    components: [],
                                    size: "md",
                                    offset: 0,
                                    width: 1,
                                    push: 0,
                                  },
                                  {
                                    pull: 0,
                                    components: [],
                                    size: "md",
                                    offset: 0,
                                    width: 3,
                                    push: 0,
                                  },
                                  {
                                    pull: 0,
                                    components: [],
                                    size: "md",
                                    offset: 0,
                                    width: 3,
                                    push: 0,
                                  },
                                  {
                                    pull: 0,
                                    components: [],
                                    size: "md",
                                    offset: 0,
                                    width: 5,
                                    push: 0,
                                  },
                                  {
                                    pull: 0,
                                    components: [],
                                    size: "md",
                                    offset: 0,
                                    width: 1,
                                    push: 0,
                                  },
                                  {
                                    pull: 0,
                                    components: [],
                                    size: "md",
                                    offset: 0,
                                    width: 3,
                                    push: 0,
                                  },
                                  {
                                    pull: 0,
                                    components: [],
                                    size: "md",
                                    offset: 0,
                                    width: 3,
                                    push: 0,
                                  },
                                  {
                                    pull: 0,
                                    components: [],
                                    size: "md",
                                    offset: 0,
                                    width: 5,
                                    push: 0,
                                  },
                                  {
                                    pull: 0,
                                    components: [],
                                    size: "md",
                                    offset: 0,
                                    width: 1,
                                    push: 0,
                                  },
                                  {
                                    pull: 0,
                                    components: [],
                                    size: "md",
                                    offset: 0,
                                    width: 3,
                                    push: 0,
                                  },
                                  {
                                    pull: 0,
                                    components: [],
                                    size: "md",
                                    offset: 0,
                                    width: 3,
                                    push: 0,
                                  },
                                  {
                                    pull: 0,
                                    components: [],
                                    size: "md",
                                    offset: 0,
                                    width: 5,
                                    push: 0,
                                  },
                                ],
                                dataGridLabel: false,
                                smev_req: {},
                                tableView: false,
                                label: "Столбцы",
                                type: "columns",
                                key: "columns8",
                                esiaKey: {},
                                hideLabel: true,
                              },
                            ],
                            label:
                              "Перечень планируемых затрат на реализацию проекта",
                            key: "переченьПланируемыхЗатратНаРеализациюПроекта",
                          },
                        ],
                        dataGridLabel: false,
                        smev_req: {},
                        tableView: false,
                        label: "Вкладки",
                        type: "tabs",
                        key: "tabs3",
                        esiaKey: {},
                      },
                    ],
                    label: "Информация о проекте",
                    key: "информацияОПроекте",
                  },
                  {
                    components: [
                      {
                        extTypeCheckbox: false,
                        input: false,
                        columns: [
                          {
                            pull: 0,
                            components: [],
                            offset: 0,
                            size: "md",
                            width: 6,
                            push: 0,
                          },
                          {
                            pull: 0,
                            components: [
                              {
                                extTypeCheckbox: false,
                                showValidations: false,
                                custom:
                                  "function getFileUrls (fileAPI) {\r\nlet fileObjectArray = [];\r\nfor (let i = 0; i < data.file.length; i++)\r\n{\r\n  fileObjectArray[i] = {\r\n  url: data[fileAPI][i].url,\r\n  originalName: data[fileAPI][i].originalName\r\n  }\r\n}\r\n  return fileObjectArray;\r\n}\r\n\r\nfunction downloadFiles (fileObjectArray) {\r\nfileObjectArray.forEach(f => {\r\n  fetch(f.url)\r\n  .then( res => res.blob() )\r\n  .then( blob => {\r\n  var file = new Blob([blob]);\r\n  var fileURL = URL.createObjectURL(file);\r\n  var fileLink = document.createElement('a');\r\n  fileLink.href = fileURL;\r\n  fileLink.download = f.originalName;\r\n\r\n// triggers the click event\r\nfileLink.click();\r\n  })})\r\n}\r\n\r\nfileObjectArray = getFileUrls('file');\r\ndownloadFiles(fileObjectArray);\r\n\r\nfileObjectArray = getFileUrls('file1');\r\ndownloadFiles(fileObjectArray);\r\n\r\nfileObjectArray = getFileUrls('file3');\r\ndownloadFiles(fileObjectArray);\r\n\r\nfileObjectArray = getFileUrls('file2');\r\ndownloadFiles(fileObjectArray);\r\n\r\nfileObjectArray = getFileUrls('file6');\r\ndownloadFiles(fileObjectArray);\r\n\r\nfileObjectArray = getFileUrls('file4');\r\ndownloadFiles(fileObjectArray);\r\n\r\nfileObjectArray = getFileUrls('file8');\r\ndownloadFiles(fileObjectArray);",
                                hideOnChildrenHidden: false,
                                tableView: false,
                                require: [
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                  {},
                                ],
                                label: "Скачать все документы",
                                type: "button",
                                input: true,
                                action: {
                                  label: "Custom",
                                  value: "custom",
                                },
                                smev_req: {},
                                block: true,
                                key: "submit1",
                                esiaKey: {},
                              },
                            ],
                            offset: 0,
                            size: "md",
                            width: 6,
                            push: 0,
                          },
                        ],
                        dataGridLabel: false,
                        smev_req: {},
                        tableView: false,
                        label: "Столбцы",
                        type: "columns",
                        key: "columns3",
                        esiaKey: {},
                      },
                      {
                        extTypeCheckbox: false,
                        dataGridLabel: false,
                        usePreview: false,
                        description:
                          "Выписка оформляется по форме, утвержденной приказом министерства, заверяется подписью секретаря и председателя совета",
                        tableView: false,
                        label:
                          "Скан выписки из протокола заседания совета о выдвижении научного коллектива для участия в отборе, с представлением, характеризующим научные достижения членов научного коллектива, заверенная подписью секретаря и председателя совета, по форме, установленной приказом министерства",
                        type: "file",
                        url: "/api/prometheus/uploadFile",
                        storage: "url",
                        fileTypes: [
                          {
                            label: "",
                            value: "",
                          },
                        ],
                        input: true,
                        webcam: false,
                        useFileTemplate: false,
                        smev_req: {},
                        key: "file",
                        esiaKey: {},
                        validate: {
                          required: true,
                        },
                      },
                      {
                        extTypeCheckbox: false,
                        dataGridLabel: false,
                        usePreview: false,
                        multiple: true,
                        description:
                          "2 и 3 страницы, а также страницы, на которых проставлены отметки о регистрации и снятии с регистрационного учета по месту жительства",
                        tableView: false,
                        label:
                          "Сканы паспортов всех членов научного коллектива, включая руководителя проекта",
                        type: "file",
                        url: "/api/prometheus/uploadFile",
                        storage: "url",
                        fileTypes: [
                          {
                            label: "",
                            value: "",
                          },
                        ],
                        input: true,
                        webcam: false,
                        useFileTemplate: false,
                        smev_req: {},
                        key: "file1",
                        esiaKey: {},
                        validate: {
                          required: true,
                        },
                      },
                      {
                        extTypeCheckbox: false,
                        dataGridLabel: false,
                        usePreview: false,
                        multiple: true,
                        tableView: false,
                        label:
                          "Скан документа, подтверждающего наличие у руководителя проекта ученой степени",
                        type: "file",
                        url: "/api/prometheus/uploadFile",
                        storage: "url",
                        fileTypes: [
                          {
                            label: "",
                            value: "",
                          },
                        ],
                        input: true,
                        webcam: false,
                        useFileTemplate: false,
                        smev_req: {},
                        key: "file3",
                        esiaKey: {},
                        validate: {
                          required: true,
                        },
                      },
                      {
                        extTypeCheckbox: false,
                        dataGridLabel: false,
                        usePreview: false,
                        tableView: false,
                        label:
                          "Скан документа кредитной организации с указанием реквизитов счета руководителя проекта для перечисления гранта",
                        type: "file",
                        url: "/api/prometheus/uploadFile",
                        storage: "url",
                        fileTypes: [
                          {
                            label: "",
                            value: "",
                          },
                        ],
                        input: true,
                        webcam: false,
                        useFileTemplate: false,
                        smev_req: {},
                        key: "file2",
                        esiaKey: {},
                        validate: {
                          required: true,
                        },
                      },
                      {
                        extTypeCheckbox: false,
                        dataGridLabel: false,
                        usePreview: false,
                        multiple: true,
                        description: "При наличии",
                        tableView: false,
                        label:
                          "Сканы сертификатов, дипломов, договоров, соглашений, рецензий, отзывов, подтверждающих признание научных достижений научного коллектива экспертным сообществом",
                        type: "file",
                        url: "/api/prometheus/uploadFile",
                        storage: "url",
                        fileTypes: [
                          {
                            label: "",
                            value: "",
                          },
                        ],
                        input: true,
                        webcam: false,
                        useFileTemplate: false,
                        smev_req: {},
                        key: "file6",
                        esiaKey: {},
                      },
                      {
                        extTypeCheckbox: false,
                        dataGridLabel: false,
                        usePreview: false,
                        tableView: false,
                        label:
                          "Скан согласия на обработку и передачу персональных данных по форме, установленной приказом министерства ",
                        type: "file",
                        url: "/api/prometheus/uploadFile",
                        storage: "url",
                        fileTypes: [
                          {
                            label: "",
                            value: "",
                          },
                        ],
                        input: true,
                        webcam: false,
                        useFileTemplate: false,
                        smev_req: {},
                        key: "file4",
                        esiaKey: {},
                        validate: {
                          required: true,
                        },
                      },
                      {
                        extTypeCheckbox: false,
                        dataGridLabel: false,
                        usePreview: false,
                        multiple: true,
                        tableView: false,
                        label: "Дополнительные документы",
                        type: "file",
                        url: "/api/prometheus/uploadFile",
                        storage: "url",
                        fileTypes: [
                          {
                            label: "",
                            value: "",
                          },
                        ],
                        input: true,
                        webcam: false,
                        useFileTemplate: false,
                        smev_req: {},
                        key: "file8",
                        esiaKey: {},
                      },
                    ],
                    label: "Документы",
                    key: "Документы",
                  },
                  {
                    components: [
                      {
                        extTypeCheckbox: false,
                        input: false,
                        dataGridLabel: false,
                        smev_req: {},
                        tableView: false,
                        html: "<p><strong>Заявитель подтверждает, что:</strong></p>",
                        label: "Контент",
                        refreshOnChange: false,
                        type: "content",
                        key: "content",
                        esiaKey: {},
                      },
                      {
                        extTypeCheckbox: false,
                        input: true,
                        defaultValue: false,
                        labelMargin: 10,
                        tableView: false,
                        smev_req: {},
                        label:
                          "представленные на конкурс сведения являются достоверными",
                        type: "checkbox",
                        key: "checkbox8",
                        esiaKey: {},
                        validate: {
                          required: true,
                        },
                      },
                      {
                        extTypeCheckbox: false,
                        input: true,
                        defaultValue: false,
                        labelMargin: 10,
                        tableView: false,
                        smev_req: {},
                        label:
                          "представит в министерство науки и инновационной политики Новосибирской области финансовый отчет и отчет о проведенной работе по гранту в срок до 20 января года, следующим за годом предоставления гранта",
                        type: "checkbox",
                        key: "checkbox4",
                        esiaKey: {},
                        validate: {
                          required: true,
                        },
                      },
                      {
                        extTypeCheckbox: false,
                        input: true,
                        defaultValue: false,
                        labelMargin: 10,
                        tableView: false,
                        smev_req: {},
                        label:
                          "при обнародовании результатов проекта, выполненного в рамках предоставленного гранта, он и его научный коллектив будут указывать на получение финансовой поддержки от Правительства Новосибирской области",
                        type: "checkbox",
                        key: "checkbox5",
                        esiaKey: {},
                        validate: {
                          required: true,
                        },
                      },
                      {
                        extTypeCheckbox: false,
                        input: true,
                        defaultValue: false,
                        labelMargin: 10,
                        tableView: false,
                        smev_req: {},
                        label:
                          "он и его научный коллектив согласны с опубликованием Правительством Новосибирской области наименования проекта, аннотации проекта и другой информации, представляемой на конкурс, в том числе соответствующих отчетов о выполнении проекта, в информационно-телекоммуникационной сети «Интернет»",
                        type: "checkbox",
                        key: "checkbox6",
                        esiaKey: {},
                        validate: {
                          required: true,
                        },
                      },
                      {
                        extTypeCheckbox: false,
                        input: true,
                        defaultValue: false,
                        labelMargin: 10,
                        tableView: false,
                        smev_req: {},
                        labelWidth: 100,
                        label:
                          "проект не содержит сведений, составляющих государственную тайну или относимых к охраняемой в соответствии с законодательством Российской Федерации иной информации ограниченного доступа",
                        type: "checkbox",
                        key: "checkbox",
                        esiaKey: {},
                        validate: {
                          required: true,
                        },
                      },
                      {
                        extTypeCheckbox: false,
                        input: true,
                        defaultValue: false,
                        labelMargin: 10,
                        tableView: false,
                        smev_req: {},
                        label:
                          "он не получает в текущем финансовом году средства областного бюджета Новосибирской области в соответствии с Порядком предоставления грантов Правительства Новосибирской области молодым ученым, утвержденным постановлением Правительства Новосибирской области от 15.11.2010 № 212-п (далее – Порядок), и иными правовыми актами на цели, указанные в пункте 2 порядка",
                        type: "checkbox",
                        key: "checkbox3",
                        esiaKey: {},
                        validate: {
                          required: true,
                        },
                      },
                      {
                        extTypeCheckbox: false,
                        input: true,
                        defaultValue: false,
                        labelMargin: 10,
                        tableView: false,
                        smev_req: {},
                        label:
                          "на дату подачи документов для участия в конкурсе он не имеет просроченной задолженности по возврату в областной бюджет Новосибирской области субсидий, предоставленных в соответствии с порядком и иными правовыми актами",
                        type: "checkbox",
                        key: "checkbox2",
                        esiaKey: {},
                        validate: {
                          required: true,
                        },
                      },
                      {
                        extTypeCheckbox: false,
                        input: true,
                        defaultValue: false,
                        labelMargin: 10,
                        tableView: false,
                        smev_req: {},
                        label:
                          "на дату подачи документов для участия в конкурсе он не имеет неисполненных обязанностей по уплате налогов, пеней, штрафов и процентов, подлежащих уплате в соответствии с законодательством Российской Федерации о налогах и сборах",
                        type: "checkbox",
                        key: "checkbox7",
                        esiaKey: {},
                        validate: {
                          required: true,
                        },
                      },
                    ],
                    label: "Подтверждения",
                    key: "Подтверждения",
                  },
                ],
                dataGridLabel: false,
                smev_req: {},
                tableView: false,
                label: "Вкладки",
                type: "tabs",
                key: "tabs",
                esiaKey: {},
              },
            ],
          },
          modelId: 311,
          actions: [
            {
              id: 732,
              name: "Вернуться в реестр",
              modelId: 311,
              formId: 529,
              hidden: false,
              alwaysActive: false,
              backAction: true,
              notRequiredAction: true,
              printAction: false,
              signAction: false,
            },
            {
              id: 731,
              name: "Сохранить",
              modelId: 311,
              formId: 529,
              hidden: false,
              alwaysActive: false,
              backAction: false,
              notRequiredAction: true,
              printAction: false,
              signAction: false,
            },
          ],
        },
        type: 1,
        startDate: "2023-06-19T04:38:39.949+00:00",
        endDate: null,
        active: true,
        archive: false,
      },*/

      // Новые данные с использованием formio.js
      services: {
        list: [],
        pagination: {
          itemsTotal: 0,
          page: 1,
          pageSize: 10,
          itemsPerPage: [10, 25, 50],
        },
      },

      config: {
        // url: "/",
        // url: "https://open-newtemplate.isands.ru/",
        url: "https://hunter-kurganobl.isands.ru/",
        esiaSignInUrl: "",
        user: {
          auth: false,
          shortInfo: {
            userId: null,
            orgId: null,
            roleId: null,
            userName: "",
            typeAuth: "",
            redirectUrl: "",
          },
          fullInfo: {
            userId: null,
            shortUserName: "",
            roles: [],
            userOrganizations: [],
            userData: {},
            contacts: [],
            addresses: null,
            esiaDocuments: null,
            other: {},
          },
          selectedRole: {
            id: null,
            key: "",
            label: "",
          },
          selectedOrg: {
            id: null,
            key: "",
            label: "",
          },
          roleSelector: {
            id: "userRoleSelector",
            label: "",
            type: "select",
            itemsList: [],
            width: 4,
            responsive: "col-sm-3 col-md-2 mb-0 p-0",
            defaultValueLabel: "Выберите роль",
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
            values: [],
          },
          orgSelector: {
            id: "orgRoleSelector",
            label: "",
            type: "select",
            itemsList: [
              { id: 1, value: 1, label: "Свидетельство о браке" },
              { id: 2, value: 2, label: "Водительское удостоверение" },
            ],
            width: 12,
            responsive: "col-sm-9 col-md-6 mb-0 p-0",
            defaultValueLabel: "Выберите организацию",
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
            values: [],
          },
        },
        authModalMode: "",
        theme: "primary",
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
              file: "iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAABGdBTUEAALGOfPtRkwAAACBjSFJNAACHDwAAjA8AAP1SAACBQAAAfXkAAOmLAAA85QAAGcxzPIV3AAAKL2lDQ1BJQ0MgUHJvZmlsZQAASMedlndUVNcWh8+9d3qhzTDSGXqTLjCA9C4gHQRRGGYGGMoAwwxNbIioQEQREQFFkKCAAaOhSKyIYiEoqGAPSBBQYjCKqKhkRtZKfHl57+Xl98e939pn73P32XuftS4AJE8fLi8FlgIgmSfgB3o401eFR9Cx/QAGeIABpgAwWempvkHuwUAkLzcXerrICfyL3gwBSPy+ZejpT6eD/0/SrFS+AADIX8TmbE46S8T5Ik7KFKSK7TMipsYkihlGiZkvSlDEcmKOW+Sln30W2VHM7GQeW8TinFPZyWwx94h4e4aQI2LER8QFGVxOpohvi1gzSZjMFfFbcWwyh5kOAIoktgs4rHgRm4iYxA8OdBHxcgBwpLgvOOYLFnCyBOJDuaSkZvO5cfECui5Lj25qbc2ge3IykzgCgaE/k5XI5LPpLinJqUxeNgCLZ/4sGXFt6aIiW5paW1oamhmZflGo/7r4NyXu7SK9CvjcM4jW94ftr/xS6gBgzIpqs+sPW8x+ADq2AiB3/w+b5iEAJEV9a7/xxXlo4nmJFwhSbYyNMzMzjbgclpG4oL/rfzr8DX3xPSPxdr+Xh+7KiWUKkwR0cd1YKUkpQj49PZXJ4tAN/zzE/zjwr/NYGsiJ5fA5PFFEqGjKuLw4Ubt5bK6Am8Kjc3n/qYn/MOxPWpxrkSj1nwA1yghI3aAC5Oc+gKIQARJ5UNz13/vmgw8F4psXpjqxOPefBf37rnCJ+JHOjfsc5xIYTGcJ+RmLa+JrCdCAACQBFcgDFaABdIEhMANWwBY4AjewAviBYBAO1gIWiAfJgA8yQS7YDApAEdgF9oJKUAPqQSNoASdABzgNLoDL4Dq4Ce6AB2AEjIPnYAa8AfMQBGEhMkSB5CFVSAsygMwgBmQPuUE+UCAUDkVDcRAPEkK50BaoCCqFKqFaqBH6FjoFXYCuQgPQPWgUmoJ+hd7DCEyCqbAyrA0bwwzYCfaGg+E1cBycBufA+fBOuAKug4/B7fAF+Dp8Bx6Bn8OzCECICA1RQwwRBuKC+CERSCzCRzYghUg5Uoe0IF1IL3ILGUGmkXcoDIqCoqMMUbYoT1QIioVKQ21AFaMqUUdR7age1C3UKGoG9QlNRiuhDdA2aC/0KnQcOhNdgC5HN6Db0JfQd9Dj6DcYDIaG0cFYYTwx4ZgEzDpMMeYAphVzHjOAGcPMYrFYeawB1g7rh2ViBdgC7H7sMew57CB2HPsWR8Sp4sxw7rgIHA+XhyvHNeHO4gZxE7h5vBReC2+D98Oz8dn4Enw9vgt/Az+OnydIE3QIdoRgQgJhM6GC0EK4RHhIeEUkEtWJ1sQAIpe4iVhBPE68QhwlviPJkPRJLqRIkpC0k3SEdJ50j/SKTCZrkx3JEWQBeSe5kXyR/Jj8VoIiYSThJcGW2ChRJdEuMSjxQhIvqSXpJLlWMkeyXPKk5A3JaSm8lLaUixRTaoNUldQpqWGpWWmKtKm0n3SydLF0k/RV6UkZrIy2jJsMWyZf5rDMRZkxCkLRoLhQWJQtlHrKJco4FUPVoXpRE6hF1G+o/dQZWRnZZbKhslmyVbJnZEdoCE2b5kVLopXQTtCGaO+XKC9xWsJZsmNJy5LBJXNyinKOchy5QrlWuTty7+Xp8m7yifK75TvkHymgFPQVAhQyFQ4qXFKYVqQq2iqyFAsVTyjeV4KV9JUCldYpHVbqU5pVVlH2UE5V3q98UXlahabiqJKgUqZyVmVKlaJqr8pVLVM9p/qMLkt3oifRK+g99Bk1JTVPNaFarVq/2ry6jnqIep56q/ojDYIGQyNWo0yjW2NGU1XTVzNXs1nzvhZei6EVr7VPq1drTltHO0x7m3aH9qSOnI6XTo5Os85DXbKug26abp3ubT2MHkMvUe+A3k19WN9CP16/Sv+GAWxgacA1OGAwsBS91Hopb2nd0mFDkqGTYYZhs+GoEc3IxyjPqMPohbGmcYTxbuNe408mFiZJJvUmD0xlTFeY5pl2mf5qpm/GMqsyu21ONnc332jeaf5ymcEyzrKDy+5aUCx8LbZZdFt8tLSy5Fu2WE5ZaVpFW1VbDTOoDH9GMeOKNdra2Xqj9WnrdzaWNgKbEza/2BraJto22U4u11nOWV6/fMxO3Y5pV2s3Yk+3j7Y/ZD/ioObAdKhzeOKo4ch2bHCccNJzSnA65vTC2cSZ79zmPOdi47Le5bwr4urhWuja7ybjFuJW6fbYXd09zr3ZfcbDwmOdx3lPtKe3527PYS9lL5ZXo9fMCqsV61f0eJO8g7wrvZ/46Pvwfbp8Yd8Vvnt8H67UWslb2eEH/Lz89vg98tfxT/P/PgAT4B9QFfA00DQwN7A3iBIUFdQU9CbYObgk+EGIbogwpDtUMjQytDF0Lsw1rDRsZJXxqvWrrocrhHPDOyOwEaERDRGzq91W7109HmkRWRA5tEZnTdaaq2sV1iatPRMlGcWMOhmNjg6Lbor+wPRj1jFnY7xiqmNmWC6sfaznbEd2GXuKY8cp5UzE2sWWxk7G2cXtiZuKd4gvj5/munAruS8TPBNqEuYS/RKPJC4khSW1JuOSo5NP8WR4ibyeFJWUrJSBVIPUgtSRNJu0vWkzfG9+QzqUvia9U0AV/Uz1CXWFW4WjGfYZVRlvM0MzT2ZJZ/Gy+rL1s3dkT+S453y9DrWOta47Vy13c+7oeqf1tRugDTEbujdqbMzfOL7JY9PRzYTNiZt/yDPJK817vSVsS1e+cv6m/LGtHlubCyQK+AXD22y31WxHbedu799hvmP/jk+F7MJrRSZF5UUfilnF174y/ariq4WdsTv7SyxLDu7C7OLtGtrtsPtoqXRpTunYHt897WX0ssKy13uj9l4tX1Zes4+wT7hvpMKnonO/5v5d+z9UxlfeqXKuaq1Wqt5RPXeAfWDwoOPBlhrlmqKa94e4h+7WetS212nXlR/GHM44/LQ+tL73a8bXjQ0KDUUNH4/wjowcDTza02jV2Nik1FTSDDcLm6eORR67+Y3rN50thi21rbTWouPguPD4s2+jvx064X2i+yTjZMt3Wt9Vt1HaCtuh9uz2mY74jpHO8M6BUytOdXfZdrV9b/T9kdNqp6vOyJ4pOUs4m3924VzOudnzqeenL8RdGOuO6n5wcdXF2z0BPf2XvC9duex++WKvU++5K3ZXTl+1uXrqGuNax3XL6+19Fn1tP1j80NZv2d9+w+pG503rm10DywfODjoMXrjleuvyba/b1++svDMwFDJ0dzhyeOQu++7kvaR7L+9n3J9/sOkh+mHhI6lH5Y+VHtf9qPdj64jlyJlR19G+J0FPHoyxxp7/lP7Th/H8p+Sn5ROqE42TZpOnp9ynbj5b/Wz8eerz+emCn6V/rn6h++K7Xxx/6ZtZNTP+kv9y4dfiV/Kvjrxe9rp71n/28ZvkN/NzhW/l3x59x3jX+z7s/cR85gfsh4qPeh+7Pnl/eriQvLDwG/eE8/s3BCkeAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAIXRFWHRDcmVhdGlvbiBUaW1lADIwMTc6MDg6MTAgMjI6NTM6MzKaPYH8AAACSElEQVR4Xu3cMW4DMQwAwVP+/2cGB6gy7M01bpSZhqoJLNhpzczFY6csa+35TUfs6mdP4A2BQBAIBIFAEAgEgUAQCASBQBAIBIFAEAgEgUAQCASBQBAIBIFAEAgEgUAQCASBQBAIBIFAEAgEgUAQCASBQBAIBIFAEAgEgUAQCASBQBAIBIFAEAgEgUAQCASBQBAIBIFAEAgEgUAQCASBQBAIBIFAEAgEgUAQCIQ1M/sJvHJBIAgEgkAgCASCQCAIBIJAIAgEgkAgCASCQCAIBIJAIAgEgkAgCASCQCAIBIJAIAgEgkAgCASCQCAIBML9cdwpP8etPb/Jrp47YlcuCASBQBAIBIFAEAgEgUAQCASBQBAIBIFAEAgEgUAQCASBQBAIBIFAEAgEgUAQCASBQBAIBIFAEAgEgUAQCASBQBAIBIFAEAgEgUAQCASBQBAIBIFAEAgEgUAQCASBQBAIBIFAEAgEgUAQCASBQBAIBIFAEAgEgUAQCIQ1M/vJA6csa+3JH1wQCAKBIBAIAoEgEAgCgSAQCAKBIBAIAoEgEAgCgSAQCAKBIBAIAoEgEAgCgSAQCAKBIBAIAoEgEAgCgXB/HOcztOfs6p9xQSAIBIJAIAgEgkAgCASCQCAIBIJAIAgEgkAgCASCQCAIBIJAIAgEgkAgCASCQCAIBIJAIAgEgkAgCASCQCAIBIJAIAgEgkAgCASCQCAIBIJAIAgEgkAgCASCQCAIBIJAIAgEgkAgCASCQCAIBIJAIAgEgkAgCASCQOCj6/oFbGAYe3qft4oAAAAASUVORK5CYII=",
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
      configLoaded: false,
      user: {
        shortInfo: {
          userId: null,
          userName: "",
          typeAuth: "",
        },
        fullInfo: {
          roles: [],
        },
        selectedRole: {
          id: null,
          key: "",
          label: "",
        },
        selectedOrg: {
          id: null,
          key: "",
          label: "",
        },
      },
      authForm: {
        login: "",
        password: "",
        passwordVisibility: false,
        authError: {
          type: "",
          text: "",
        },
      },
      messagesList: [
        {
          messageid: 1,
          title: "<div>Информация по заявлению 62</div>",
          body: '<div>Вы были допущены до участия в конкурсе "Предоставление субсидий некоммерческим организациям (за исключением государственных (муниципальных) учреждений)) из областного бюджета Новосибирской области на реализацию мероприятий по поддержке деятельности музеев боевой и трудовой славы в образовательных и общественных организациях"</div><div><a style="color: #0B5FFF;" href="https://grata-nso.isands.ru/web/guest/Реестр-заявлений?p_p_id=ru_isands_camunda_application&_ru_isands_camunda_application_app_id=62&_ru_isands_camunda_application_mvcPath=/jsp/application/action.jsp">Перейти к заявлению</a></div>',
          timestamp: 1669104022014,
          archived: false,
          deleted: false,
        },
        {
          messageid: 2,
          title: "Заголовок уведомления #",
          body: "Статус заявления обновлен. Подробная информация направлена на вашу электронную почту.",
          timestamp: 1669092754881,
          archived: false,
          deleted: false,
        },
        {
          messageid: 3,
          title: "Заголовок уведомления #",
          body: "Статус заявления обновлен. Подробная информация направлена на вашу электронную почту.",
          timestamp: 1668695479553,
          archived: false,
          deleted: false,
        },
        {
          messageid: 4,
          title: "Заголовок уведомления #",
          body: "Статус заявления обновлен. Подробная информация направлена на вашу электронную почту.",
          timestamp: 1668695472753,
          archived: false,
          deleted: false,
        },
        {
          messageid: 5,
          title: "Заголовок уведомления #",
          body: "Статус заявления обновлен. Подробная информация направлена на вашу электронную почту.",
          timestamp: 1668505898435,
          archived: false,
          deleted: false,
        },
        {
          messageid: 6,
          title: "Заголовок уведомления #",
          body: "Статус заявления обновлен. Подробная информация направлена на вашу электронную почту.",
          timestamp: 1668504566894,
          archived: false,
          deleted: false,
        },
        {
          messageid: 7,
          title: "Заголовок уведомления #",
          body: "Статус заявления обновлен. Подробная информация направлена на вашу электронную почту.",
          timestamp: 1668504018311,
          archived: false,
          deleted: false,
        },
        {
          messageid: 8,
          title: "Заголовок уведомления #",
          body: "Статус заявления обновлен. Подробная информация направлена на вашу электронную почту.",
          timestamp: 1668502052338,
          archived: false,
          deleted: false,
        },
        {
          messageid: 9,
          title: "Заголовок уведомления #",
          body: "Статус заявления обновлен. Подробная информация направлена на вашу электронную почту.",
          timestamp: 1668502031287,
          archived: false,
          deleted: false,
        },
        {
          messageid: 10,
          title: "Заголовок уведомления #",
          body: "Статус заявления обновлен. Подробная информация направлена на вашу электронную почту.",
          timestamp: 1668499927927,
          archived: false,
          deleted: false,
        },
        {
          messageid: 11,
          title: "Заголовок уведомления #",
          body: "Статус заявления обновлен. Подробная информация направлена на вашу электронную почту.",
          timestamp: 1668499918337,
          archived: false,
          deleted: false,
        },
        {
          messageid: 12,
          title: "Заголовок уведомления #",
          body: "Статус заявления обновлен. Подробная информация направлена на вашу электронную почту.",
          timestamp: 1668499907386,
          archived: false,
          deleted: false,
        },
        {
          messageid: 13,
          title: "Заголовок уведомления #",
          body: "Статус заявления обновлен. Подробная информация направлена на вашу электронную почту.",
          timestamp: 1668425598313,
          archived: false,
          deleted: false,
        },
        {
          messageid: 14,
          title: "Заголовок уведомления #",
          body: "Статус заявления обновлен. Подробная информация направлена на вашу электронную почту.",
          timestamp: 1668425551460,
          archived: false,
          deleted: false,
        },
        {
          messageid: 15,
          title: "Заголовок уведомления #",
          body: "Статус заявления обновлен. Подробная информация направлена на вашу электронную почту.",
          timestamp: 1668423564411,
          archived: false,
          deleted: false,
        },
        {
          messageid: 16,
          title: "Заголовок уведомления #",
          body: "Статус заявления обновлен. Подробная информация направлена на вашу электронную почту.",
          timestamp: 1668423511774,
          archived: false,
          deleted: false,
        },
        {
          messageid: 17,
          title: "Заголовок уведомления #",
          body: "Статус заявления обновлен. Подробная информация направлена на вашу электронную почту.",
          timestamp: 1668423363590,
          archived: false,
          deleted: false,
        },
        {
          messageid: 18,
          title: "Заголовок уведомления #",
          body: "Статус заявления обновлен. Подробная информация направлена на вашу электронную почту.",
          timestamp: 1668421189429,
          archived: false,
          deleted: false,
        },
        {
          messageid: 19,
          title: "Заголовок уведомления #",
          body: "Статус заявления обновлен. Подробная информация направлена на вашу электронную почту.",
          timestamp: 1668421185015,
          archived: false,
          deleted: false,
        },
        {
          messageid: 20,
          title: "Заголовок уведомления #",
          body: "Статус заявления обновлен. Подробная информация направлена на вашу электронную почту.",
          timestamp: 1668421185010,
          archived: false,
          deleted: false,
        },
      ],
      apps: {
        id: "appsTable",
        service: 2,
        columnsList: [
          { title: "№ заявления", name: "id", sorted: true },
          { title: "Наименование услуги", name: "service" },
          { title: "Дата создания", name: "createDate", sorted: true },
          { title: "Номер ЕПГУ", name: "epguNum", sorted: true },
          { title: "Статус", name: "status", sorted: true },
          {
            title: "Дата изменения статуса",
            name: "changeDate",
            sorted: true,
          },
        ],
        primaryColumn: "№ заявления",
        rowsList: [
          [
            "0001",
            "Аттестация педагогических работников",
            "01.08.2022",
            "540118",
            "В работе",
            "05.08.2022",
          ],
          [
            "0002",
            "Аттестация педагогических работников",
            "05.08.2022",
            "540115",
            "В работе",
            "05.08.2022",
          ],
          [
            "0003",
            "Аттестация педагогических работников",
            "09.08.2022",
            "540120",
            "Черновик",
            "10.08.2022",
          ],
        ],
        sortColumn: "id",
        ascendingSortOrder: false,
        applications: [],
        filters: {
          form: {
            title: "Фильтр заявлений",
            id: "apps-filter",
            width: 12,
            responsive: "",
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
            disabled: false,
            fields: [
              {
                id: "1",
                label: "№ обращения",
                type: "input",
                subtype: "text",
                width: 12,
                responsive: "col-sm-4 col-md-3 col-lg-2",
                value: null,
              },
              {
                id: "2",
                label: "Наименование бизнес-процесса",
                type: "input",
                subtype: "text",
                width: 12,
                responsive: "col-sm-8 col-md-6 col-lg-5",
                value: null,
              },
              // {
              //   id: "3",
              //   label: "Дата создания",
              //   type: "range",
              //   subtype: "date",
              //   itemsList: [
              //     { label: " c", value: null },
              //     { label: " по", value: null },
              //   ],
              //   width: 12,
              //   responsive: "col-sm-8 col-md-6 col-lg-4",
              // },
              // {
              //   id: "4",
              //   label: "Статус",
              //   type: "select",
              //   itemsList: [
              //     { id: 1, value: 1, label: "Черновик" },
              //     { id: 2, value: 2, label: "В работе" },
              //     { id: 3, value: 3, label: "Обработано" },
              //     { id: 4, value: 4, label: "Архивная" },
              //   ],
              //   width: 12,
              //   responsive: "col-sm-4 col-md-3 col-lg-2",
              //   defaultValueLabel: "Выберите статус",
              //   values: [],
              // },
              // {
              //   id: "5",
              //   label: "Показать архивные",
              //   type: "checkbox",
              //   width: 12,
              //   responsive: "",
              //   horizontal: false,
              //   horizontalWidth: {
              //     label: {
              //       width: 4,
              //       responsive: "col-sm-5",
              //     },
              //     field: {
              //       width: 8,
              //       responsive: "col-sm-7",
              //     },
              //   },
              //   value: false,
              // },
            ],
          },
        },
        pagination: {
          itemsTotal: 0,
          page: 1,
          pageSize: 10,
          itemsPerPage: [10, 25, 50],
        },
        refreshMethod: "getApps",
      },
      settingsForm: {
        notification: {
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
                // disabled: false,
                disabled: true,
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
                // disabled: false,
                disabled: true,
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
      service: {
        info: {},
        forms: [],
        applicationDTO: {
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
          loader: {
            isLoading: false,
            isResponse: false,
            comment: "",
          },
        },
        loader: {
          loader: {
            isLoading: false,
            isResponse: false,
            comment: "",
          },
        },
      },
      loadedServiceForm: false,
    };
  },

  computed: {
    /*dynamicUrl: function () {
      let dynamicUrl;
      if (this.config.adminSettings.server.ownServer) {
        dynamicUrl = this.config.staticUrl + "/api/";
      } else {
        dynamicUrl =
          this.config.adminSettings.server.externalServerUrl + "/api/";
      }
      return dynamicUrl;
    },
    /!*queryParams: function () {
      let query =
        "?pageNum=" +
        (this.page - 1) +
        "&pageSize=" +
        this.pageSize +
        "&sortCol=id&sortDesc=false&active=true";
      if (this.selectedFilters.length) {
        this.selectedFilters.forEach((tag) => {
          query += "&tags=" + tag;
        });
      }
      if (this.searchText) {
        query += "&name=" + this.searchText;
      }
      return query;
    },*!/

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
    },*/

    // Новые данные с использованием formio.js
    layout() {
      return this.$route.meta.layout;
    },
    authCompleted: function () {
      let isAuthUser = this.config.user.auth;
      let needSelectRole = !this.config.user.shortInfo.roleId;
      let needSelectOrg =
        !this.config.user.shortInfo.orgId &&
        this.config.user.fullInfo.userOrganizations.length > 0;
      return isAuthUser && !needSelectRole && !needSelectOrg;
    },
    authModalTitle: function () {
      let authModalTitle = "";
      if (!this.config.user.auth) {
        authModalTitle = "Авторизация";
      } else {
        if (this.config.authModalMode === "select-role") {
          authModalTitle = "Выбор роли";
        }
        if (this.config.authModalMode === "select-organization") {
          authModalTitle = "Выбор организации";
        }
      }
      return authModalTitle;
    },
    userFullName: function () {
      let fullName = "";
      if (
        this.config.user.fullInfo.userData &&
        this.config.user.fullInfo.userData.lastName
      ) {
        fullName += this.config.user.fullInfo.userData.lastName;
      }
      if (
        this.config.user.fullInfo.userData &&
        this.config.user.fullInfo.userData.firstName
      ) {
        fullName += " " + this.config.user.fullInfo.userData.firstName;
      }
      if (
        this.config.user.fullInfo.userData &&
        this.config.user.fullInfo.userData.middleName
      ) {
        fullName += " " + this.config.user.fullInfo.userData.middleName;
      }
      return fullName;
    },
    unreadMessages: function () {
      return this.messagesList.filter((item) => !item.archived).length;
    },
    sortedMessagesList: function () {
      let sortedMessages = [];
      this.messagesList.forEach(function (item) {
        sortedMessages.push(item);
      });
      sortedMessages.sort(function (a, b) {
        if (a.timestamp > b.timestamp) return 1; // если первое значение больше второго
        if (a.timestamp == b.timestamp) return 0; // если равны
        if (a.timestamp < b.timestamp) return -1; // если первое значение меньше второго
      });
      return sortedMessages.reverse();
    },
    appsRequestQuery: function () {
      let appsRequestQuery = "api/app/get-apps?";
      if (this.apps.pagination.page) {
        appsRequestQuery += "pageNum=" + (this.apps.pagination.page - 1);
      }
      if (this.apps.pagination.pageSize) {
        appsRequestQuery += "&pageSize=" + this.apps.pagination.pageSize;
      }
      if (this.apps.sortColumn) {
        appsRequestQuery += "&sortCol=" + this.apps.sortColumn;
      }
      appsRequestQuery += "&sortDesc=" + !this.apps.ascendingSortOrder;
      appsRequestQuery += "&userList=true";
      appsRequestQuery += "&active=false";
      if (this.apps.filters.form.fields[0].value) {
        appsRequestQuery += "&appId=" + this.apps.filters.form.fields[0].value;
      }
      if (this.apps.filters.form.fields[1].value) {
        appsRequestQuery +=
          "&servName=" + this.apps.filters.form.fields[1].value;
      }
      return appsRequestQuery;
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
    dynamicUrl: function () {
      let dynamicUrl;
      if (this.config.adminSettings.server.ownServer) {
        dynamicUrl = this.config.url;
      } else {
        dynamicUrl = this.config.adminSettings.server.externalServerUrl + "/";
      }
      return dynamicUrl;
    },
  },

  methods: {
    /*// Некоторые REST-запросы закрыты для неавторизованных пользователей
    async fakeSignInLocal() {
      const request = {
        login: "applicant",
        password: "applicant",
      };
      await axios
        .post(this.dynamicUrl + "auth/local-login", request, {
          withCredentials: true,
        })
        .then(() => {
          console.log("Пользователь успешно авторизован");
        })
        .catch((error) => {
          if (error.response.status === 406) {
            console.log("Пользователь уже авторизован");
          } else {
            console.log("Ошибка авторизации");
          }
        });
    },

    // Получение списка сервисов
    getServises() {
      let queryParams =
        "?pageNum=0&pageSize=10&sortCol=id&sortDesc=false&active=true";
      axios
        .get(this.dynamicUrl + "serv/get-services" + queryParams)
        .then((response) => {
          this.services.list = response.data.content;
          this.services.pagination.itemsTotal = response.data.totalElements;
          console.groupCollapsed("Список сервисов");
          console.log(response.data);
          console.groupEnd();
        });
    },

    // Детальная информация по сервису
    async showServiceInfo(serviceId) {
      await this.getServiceInfo(serviceId);
      if (this.$route.params.serviceId !== serviceId) {
        this.goToView("/service-info/" + serviceId);
      }
    },
    async getServiceInfo(serviceId) {
      await axios
        .get(this.dynamicUrl + "serv/get-model?id=" + serviceId)
        .then((response) => {
          this.service.info = response.data;
          this.service.info.newDescription = JSON.parse(
            response.data.newDescription
          );
          console.groupCollapsed(
            `Детальная информация по сервису "${response.data.name}"`
          );
          console.log(response.data);
          console.groupEnd();
        });
    },
    // показать первую форму сервиса

    async showServiceFirstForm(serviceId) {
      Promise.all([
        this.getServiceForms(serviceId),
        this.getServiceForm(serviceId),
      ]).then(() => {
        console.log("Первая форма и формы сервиса загружены");
      });
      // Необходимо обработать ошибки и переход/обновление страницы в зависимости от текущего местоположения
      // if (this.$route.params.serviceId !== serviceId) {
      this.goToView("/service-form/" + serviceId + "/0");
      // }
    },

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

    // Формы formio.js
    async getServiceForms(serviceId) {
      await axios
        .get(this.dynamicUrl + "serv/get-forms?id=" + serviceId)
        .then((response) => {
          console.groupCollapsed("Формы по мере поддержки");
          console.log(response.data);
          console.groupEnd();
          this.service.forms = response.data;
        });
    },
    async getServiceForm(serviceId, appId) {
      // Навести порядок в логах
      // console.log(serviceId);
      // console.log(appId);
      // this.appForm.loader.isLoading = true;
      // this.appForm.loader.isResponse = false;
      let requestUrl;
      if (appId) {
        requestUrl = this.dynamicUrl + "app/get-appData?id=" + appId;
        console.log(
          `Запрос существующей (не первой) формы сервиса с id = ${serviceId}`
        );
      } else {
        requestUrl = this.dynamicUrl + "serv/get-appData?id=" + serviceId;
        console.log(`Запрос первой формы сервиса с id = ${serviceId}`);
      }
      await axios
        .get(requestUrl, {
          withCredentials: true,
        })
        .then((response) => {
          if (appId) {
            console.groupCollapsed("Не стартовая форма сервиса");
          } else {
            console.groupCollapsed("Стартовая форма сервиса");
          }
          console.log(response.data.applicationDTO);
          console.groupEnd();
          const serviceForm = response.data.applicationDTO;
          serviceForm.data = JSON.parse(serviceForm.data);
          serviceForm.form.scheme = JSON.parse(serviceForm.form.scheme);
          this.service.form = serviceForm;
        });
      // .then(() => {
      //   this.loaderFinish(this.appForm.loader);
      // });

      /!*setTimeout(() => {
        this.appForm = JSON.parse(JSON.stringify(this["form" + serviceId]));
        this.appForm.loader = {};
        this.appForm.loader.isLoading = false;
        this.appForm.loader.isResponse = true;
      }, 3000);*!/
    },
    async invokeAction(action) {
      console.log("Выполнение действия " + action.id);
      const formElem = document.getElementById("application-form-04");
      console.log("formElem");
      console.log(formElem);
      console.log(
        formElem.formio.checkValidity(formElem.formio.submission.data)
      );
      const isValidFormData = this.$refs.vueForm.formio.checkValidity(
        this.$refs.vueForm.formio.submission.data
      );
      // Действие "Без проверки" или форма заполнена верно
      if (isValidFormData || action.notRequiredAction) {
        if (action.notRequiredAction) {
          console.log("Выполняется действие без проверки");
        } else {
          console.log("Действие с проверкой. Форма валидна");
        }
        this.loaderStart(this.loader, "Отправка данных заявления");
        // this.loader.comment = "Отправка данных заявления";
        // this.loader.isResponse = false;
        // this.loader.isLoading = true;
        // setTimeout(this.invoke, 1000, action, action.backAction);
        await this.invoke(action, action.backAction);
        this.loaderFinish(this.loader);
      } else {
        console.log("Форма не валидна");
        this.$refs.vueForm.formio.submit();
      }
    },
    async invoke(action, isBackAction = false) {
      console.log(`isBackAction = ${isBackAction}`);
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
        appId: this.appForm.id,
        data: JSON.stringify(this.appForm.data),
      };
      console.log("Тело запроса Action-invoke");
      console.log(request);
      axios
        .post(this.dynamicUrl + "app/action-invoke", request, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        })
        .then((response) => {
          console.log("Ответ на экшн");
          console.log(response);
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
          this.isResponse = true;
          this.isLoading = false;
          this.isFirstLoad = true;
        });
    },
    // Скачивание файла из объекта
    downloadFileFromObject(fileObject) {
      console.log("Объект файла");
      console.log(fileObject);
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
    // Переход к следующей форме (стандартное действие)
    getNextForm(response) {
      console.log("Следующая форма");
      console.log(response);
      let nextForm = response.data.applicationDTO;
      nextForm.data = JSON.parse(nextForm.data);
      nextForm.form.scheme = JSON.parse(nextForm.form.scheme);
      this.appForm = nextForm;
    },

    cspWaiting() {
      console.log("Проверка загрузки Крипто-ПРО");
      if (window.cspEnabled) {
        this.isResponse = true;
        this.isLoading = false;
        this.isFirstLoad = true;
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
        .post(this.url + "app/action-pdfstamp", request, {
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
        .post(this.url + "app/action-insert-signdata", request, {
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

    // Базовые методы
    // Изменения формы с валидацией и возможной кастомной обработкой
    // Лоадер
    goToView(targetView) {
      this.$router.push(targetView);
    },
    isEmptyObject(obj) {
      for (let key in obj) {
        return false;
      }
      return true;
    },
    loaderStart(loader, loaderComment) {
      loader.isResponse = false;
      loader.isLoading = true;
      if (loaderComment) {
        loader.comment = loaderComment;
      }
    },
    loaderFinish(loader) {
      loader.isResponse = true;
      loader.isLoading = false;
    },
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
    },*/

    // Новые методы с использованием formio.js
    // Админка
    async fakeSignInLocal() {
      // const request = {
      //   login: "applicant",
      //   password: "applicant",
      // };
      const request = {
        login: "mihail",
        password: "12345",
      };
      await axios
        .post(this.dynamicUrl + "api/auth/local-login", request, {
          withCredentials: true,
        })
        .then(() => {
          console.log("Пользователь успешно авторизован");
        })
        .catch((error) => {
          if (error.response.status === 406) {
            console.log("Пользователь уже авторизован");
          } else {
            console.log("Ошибка авторизации");
          }
        });
    },
    async getServises() {
      let queryParams =
        "?pageNum=0&pageSize=10&sortCol=id&sortDesc=false&active=true";
      await axios
        .get(this.dynamicUrl + "api/serv/get-services" + queryParams, {
          withCredentials: true,
        })
        .then((response) => {
          this.services.list = response.data.content;
          this.services.pagination.itemsTotal = response.data.totalElements;
          console.groupCollapsed("Список сервисов");
          console.log(response.data);
          console.groupEnd();
        });
    },

    async getAppConfig() {
      await axios.get(this.config.url + "api/config/").then((response) => {
        this.parseConfig(response.data);
        console.groupCollapsed("Конфигурация системы");
        console.log(response.data);
        console.groupEnd();
        this.configLoaded = true;
      });
    },
    parseConfig(configData) {
      // Уведомление
      const now = new Date();
      // const notificationStartDate = new Date(
      //   configData.notification.publicationStartDate
      // );
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
      // const notificationActive =
      //   notificationStartDate < now && notificationFinishDate > now;
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
    setConfig() {
      console.log("Запись конфигурации");
      console.log(this.setConfigRequest);
      axios
        .post(this.config.url + "api/config/", this.setConfigRequest, {
          withCredentials: true,
        })
        .then(() => {
          this.getAppConfig();
          console.log("Настройки системы изменены");
        });
    },

    // Авторизация
    async checkAuth() {
      await axios(this.dynamicUrl + "api/auth/get-login", {
        withCredentials: true,
      })
        .then((response) => {
          console.groupCollapsed(
            "Пользователь не авторизован. Получена ссылка на авторизацию ЕСИА"
          );
          console.log(response.data);
          console.groupEnd();
          this.config.user.auth = false;
          this.config.esiaSignInUrl = response.data.url;
        })
        .catch((error) => {
          if (error.response && error.response.status === 406) {
            console.log("Пользователь уже авторизован");
            this.config.user.auth = true;
          } else {
            console.log("Непредвиденная ошибка при проверке авторизации");
            this.config.user.auth = false;
          }
        });
    },
    async signInLocal() {
      const request = {
        login: this.authForm.login,
        password: this.authForm.password,
      };
      await axios
        .post(this.dynamicUrl + "api/auth/local-login", request, {
          withCredentials: true,
        })
        .then(() => {
          location.href = this.config.url;
        })
        .catch((error) => {
          if (error.response.status === 401) {
            this.authForm.authError.type = "password";
            this.authForm.authError.text = "Неверно указан пароль!";
          }
          if (error.response.status === 404) {
            this.authForm.authError.type = "login";
            this.authForm.authError.text =
              "Пользователь с указанным логином не зарегистрирован!";
          }
        });
    },
    async signInEsia() {
      await this.checkAuth();
      if (this.config.esiaSignInUrl) {
        location.href = this.config.esiaSignInUrl;
      }
    },
    signOut() {
      if (this.config.user.shortInfo.typeAuth === "local") {
        this.signOutLocal();
      }
      if (this.config.user.shortInfo.typeAuth === "esia") {
        this.signOutEsia();
      }
    },
    signOutLocal() {
      axios(this.dynamicUrl + "api/auth/local-logout", {
        withCredentials: true,
      })
        .then((response) => {
          if (response.status === 200) {
            console.log("Локальный выход пользователя из системы");
          }
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            console.log(
              "Ошибка запроса локального выхода при поиске авторизованного пользователя"
            );
          } else {
            console.log("Непредвиденная ошибка запроса локального выхода");
          }
        })
        .then(() => {
          location.href = this.config.url;
        });
    },
    signOutEsia() {
      axios(this.dynamicUrl + "api/auth/get-logout", {
        withCredentials: true,
      })
        .then((response) => {
          console.groupCollapsed("Получена ссылка на выход ЕСИА");
          console.log(response.data);
          console.groupEnd();
          location.href = response.data.url;
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            console.log(
              "Ошибка запроса на получение ссылки выхода ЕСИА при поиске авторизованного пользователя"
            );
          } else if (error.response && error.response.status === 404) {
            console.log(
              "Ошибка запроса на получение ссылки выхода ЕСИА при составлении ссылки со стороны закрытой части"
            );
          } else if (error.response && error.response.status === 500) {
            console.log(
              "Ошибка запроса на получение ссылки выхода ЕСИА со стороны открытой части при отправке запроса на закрытую часть"
            );
          } else {
            console.log("Ошибка запроса на получение ссылки выхода ЕСИА");
          }
          location.href = this.config.url;
        });
    },

    resetAuthForm() {
      this.authForm.login = "";
      this.authForm.password = "";
      this.authForm.passwordVisibility = false;
      this.authForm.authError.type = "";
      this.authForm.authError.text = "";
    },

    // Получение информации о пользователе
    async getUserShortInfo() {
      await axios(this.dynamicUrl + "api/auth/get-user", {
        withCredentials: true,
      })
        .then((response) => {
          console.groupCollapsed("Сокращённые данные пользователя");
          console.log(response.data);
          console.groupEnd();
          this.config.user.shortInfo = response.data;
          if (response.data.roleId) {
            this.config.user.roleSelector.values = [response.data.roleId];
            this.config.user.orgSelector.values = [response.data.orgId];
          }
        })
        .catch((error) => {
          if (error.response && error.response.status === 404) {
            console.log("Сокращенные данные пользователя не найдены");
          } else {
            console.log(
              "Непредвиденная ошибка при запросе сокращенных данных пользователя"
            );
          }
        });
    },
    async getUserFullInfo() {
      await axios(this.dynamicUrl + "api/core/get-user", {
        withCredentials: true,
      })
        .then((response) => {
          console.groupCollapsed("Полные данные пользователя");
          console.log(response.data);
          console.groupEnd();
          this.config.user.fullInfo = response.data;
          if (response.data.roles.length) {
            console.log("У пользователя есть роли");
            this.setUserRolesToSelects(response.data.roles);
            this.setUserOrgsToSelects(response.data.userOrganizations);
          }
        })
        .catch((error) => {
          if (error.response && error.response.status === 404) {
            console.log(
              "Ошибка при получении полных данных пользователя с закрытой части"
            );
          } else if (error.response && error.response.status === 401) {
            console.log(
              "Ошибка запроса полной данных пользователя неавторизованным пользователем"
            );
          } else {
            console.log(
              "Непредвиденная ошибка при запросе полных данных пользователя"
            );
          }
        });
    },
    setUserRolesToSelects(rolesArray) {
      let itemsList = [];
      rolesArray.forEach(function (role) {
        let item = {};
        item.id = role.id;
        item.value = role.id;
        item.label = role.label;
        itemsList.push(item);
      });
      this.config.user.roleSelector.itemsList = itemsList;
    },
    setUserOrgsToSelects(orgsArray) {
      let itemsList = [];
      orgsArray.forEach(function (org) {
        let item = {};
        item.id = org.id;
        item.value = org.id;
        item.label = org.label;
        itemsList.push(item);
      });
      this.config.user.orgSelector.itemsList = itemsList;
    },
    async checkUserRole() {
      if (this.config.user.fullInfo.roles.length === 1) {
        console.log(
          `У пользователя обнаружена единственная роль - "${this.config.user.fullInfo.roles[0].label}"`
        );
        await this.setUserRole(this.config.user.fullInfo.roles[0]);
      } else if (this.config.user.fullInfo.roles.length > 1) {
        console.groupCollapsed("Роли пользователя");
        console.log(this.config.user.fullInfo.roles);
        console.groupEnd();
        this.config.authModalMode = "select-role";
        this.$refs["modal-app-auth"].show();
      }
    },
    async setUserRole(role) {
      await axios
        .put(
          this.dynamicUrl +
            "api/core/put-metadata?orgId=" +
            this.config.user.shortInfo.orgId +
            "&roleId=" +
            role.id,
          "",
          {
            withCredentials: true,
          }
        )
        .then((response) => {
          this.config.user.shortInfo = response.data;
          this.config.user.selectedRole = role;
          this.config.user.roleSelector.values = [role.id];
          console.log(`Пользователю присвоена роль "${role.label}"`);
          if (this.authCompleted) {
            this.$refs["modal-app-auth"].hide();
          } else {
            this.config.authModalMode = "select-organization";
          }
        });
    },
    changeUserRole(roleId) {
      const role = this.config.user.fullInfo.roles.find(function (item) {
        if (item.id === roleId) return true;
      });
      this.setUserRole(role);
      this.config.user.roleSelector.values = [roleId];
    },
    async checkUserOrg() {
      if (this.config.user.fullInfo.userOrganizations.length > 0) {
        console.groupCollapsed("Организации пользователя");
        console.log(this.config.user.fullInfo.userOrganizations);
        console.groupEnd();
        this.config.authModalMode = "select-organization";
        this.$refs["modal-app-auth"].show();
      }
    },
    async setUserOrg(org) {
      await axios
        .put(
          this.dynamicUrl +
            "api/core/put-metadata?orgId=" +
            org.id +
            "&roleId=" +
            this.config.user.shortInfo.roleId,
          "",
          {
            withCredentials: true,
          }
        )
        .then((response) => {
          this.config.user.shortInfo = response.data;
          this.config.user.selectedOrg = org;
          this.config.user.orgSelector.values = [org.id];
          console.log(`Пользователю присвоена организация "${org.label}"`);
          this.$refs["modal-app-auth"].hide();
          // if (response.data.redirectUrl) {
          //   location.href = response.data.redirectUrl;
          // }
        });
    },
    changeUserOrg(orgId) {
      const org = this.config.user.fullInfo.userOrganizations.find(function (
        item
      ) {
        if (item.id === orgId) return true;
      });
      this.setUserOrg(org);
      this.config.user.orgSelector.values = [orgId];
    },
    setUserOrgPerson() {
      console.log("Имитирован вход в качестве частного лица");
      this.$refs["modal-app-auth"].hide();
    },

    // Сообщения
    getMessages() {
      axios(this.dynamicUrl + "api/core/get-messages?userId=0", {
        withCredentials: true,
      }).then((response) => {
        console.groupCollapsed("Список сообщений");
        console.log(response.data);
        console.groupEnd();
        this.parseMessages(response.data.messages);
      });
    },
    parseMessages(messagesArray) {
      console.log("Парсинг сообщений");
      console.log(messagesArray);
      messagesArray.forEach(function (message) {
        message.deleted = false;
      });
      this.messagesList = messagesArray;
    },

    openAuthModal() {
      // console.log("Открываю окно авторизации");
      this.$refs["modal-app-auth"].show();
    },
    closeAuthModal() {
      this.$refs["modal-app-auth"].hide();
    },

    assignUser(user) {
      this.user = user;
      this.config.user = user;
      this.getMessages();
    },

    // Заявления
    async getApps() {
      await axios
        .get(this.dynamicUrl + this.appsRequestQuery, {
          withCredentials: true,
        })
        .then((response) => {
          this.apps.applications = response.data.content;
          this.apps.pagination.itemsTotal = response.data.totalElements;
          console.log("Список заявлений в App");
          console.log(this.apps);
        });
    },

    readMessage(messageId) {
      console.log(messageId);
      let message = this.messagesList.find(
        (item) => item.messageid === messageId
      );
      if (!message.archived) {
        axios
          .put(
            this.dynamicUrl +
              "api/core/put-message-archive?messageId=" +
              messageId,
            "",
            {
              withCredentials: true,
            }
          )
          .then(() => {
            console.log("Уведомление " + messageId + " отмечено прочитанным");
            message.archived = true;
          })
          .catch((error) => {
            console.log(
              "Уведомление " + messageId + " не отмечено прочитанным"
            );
            console.log(error);
          });
      }
    },

    deleteMessage(messageId) {
      console.log(messageId);
      axios(
        this.dynamicUrl + "api/core/delete-message?messageId=" + messageId,
        {
          withCredentials: true,
        }
      )
        .then(() => {
          console.log("Уведомление " + messageId + " успешно удалено");
        })
        .catch((error) => {
          console.log("Уведомление " + messageId + " не удалено");
          console.log(error);
        })
        .then(() => {
          let messageIndex = this.messagesList.findIndex(
            (item) => item.messageid === messageId
          );
          this.messagesList.splice(messageIndex, 1);
        });
    },

    // Фильтр обращений
    formatDateForRequest(dateInputFormat) {
      let arrayDateInput = dateInputFormat.split("-");
      let requestFormatDate =
        arrayDateInput[2] + "." + arrayDateInput[1] + "." + arrayDateInput[0];
      return requestFormatDate;
    },
    applyFilter(list) {
      list.pagination.page = 1;
      if (list.refreshMethod) {
        this[list.refreshMethod]();
      }
    },
    // Очистка фильтра
    clearFilter(list) {
      this.resetForm(list.filters.form);
      list.pagination.page = 1;
      if (list.refreshMethod) {
        this[list.refreshMethod]();
      }
    },
    // Сброс формы к нулевым значениям
    resetForm(formData) {
      formData.fields.forEach(function (field) {
        if (field.type === "select") {
          field.values = [];
        } else if (field.type === "checkbox") {
          field.value = false;
        } else if (field.type === "input") {
          if (field.subtype === "file") {
            field.file.name = "";
            field.file.type = "";
            field.file.base64 = "";
          }
          field.value = "";
        } else if (field.type === "range") {
          field.itemsList[0].value = null;
          field.itemsList[1].value = null;
        }
      });
    },

    changePageSize(list, newPageInfo) {
      console.log("Данные для смены размера страницы");
      console.log(list);
      console.log(newPageInfo);
      console.log(typeof newPageInfo[0]);
      list.pagination.page = newPageInfo[0];
      list.pagination.pageSize = newPageInfo[1];
      this[list.refreshMethod]();
      window.scrollTo(0, 0);
    },
    changePage(list, page) {
      console.log("Данные для смены страницы");
      console.log(list);
      console.log(page);
      console.log(typeof page);
      list.pagination.page = page;
      this[list.refreshMethod]();
      window.scrollTo(0, 0);
    },

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

    // Преобразование даты к формату инпута datetime
    convertDateToInputDateTime(date) {
      console.log("convertDateToInputDateTime");
      console.log(date);
      // Thu Apr 27 2023 10:54:16 GMT+0700 (Новосибирск, стандартное время)
      // 2000-01-02T00:00
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const inputDateTime =
        year + "-" + month + "-" + day + "T" + hours + ":" + minutes;
      return inputDateTime;
    },

    // ----------Методы для формио из formio.full.min.js----------
    // Первая форма обращения
    // Детальная информация по сервису
    async showServiceInfo(serviceId) {
      await this.getServiceInfo(serviceId);
      if (this.$route.params.serviceId !== serviceId) {
        this.goToView("/service-info/" + serviceId);
      }
    },
    async getServiceInfo(serviceId) {
      await axios
        .get(this.dynamicUrl + "api/serv/get-model?id=" + serviceId)
        .then((response) => {
          this.service.info = response.data;
          this.service.info.newDescription = JSON.parse(
            response.data.newDescription
          );
          console.groupCollapsed(
            `Детальная информация по сервису "${response.data.name}"`
          );
          console.log(response.data);
          console.groupEnd();
        });
    },
    async showServiceFirstForm(serviceId) {
      Promise.all([
        this.getServiceInfo(serviceId),
        this.getServiceForms(serviceId),
        this.getServiceForm(serviceId),
      ]).then(() => {
        this.loadedServiceForm = !this.loadedServiceForm;
        console.log(
          "Первая форма, детальная информация по сервису и формы сервиса загружены"
        );
      });
      if (
        this.$route.name !== "ApplicationView" ||
        this.$route.params.modelId !== serviceId
      ) {
        this.goToView("/application_view/model/" + serviceId + "/app/0");
      }
    },
    // Форма существующего заявления
    async showAppForm({ serviceId, appId }) {
      // console.log(
      //   `Необходимо получить обращение ${appId} по сервису ${serviceId}`
      // );
      Promise.all([
        this.getServiceInfo(serviceId),
        this.getServiceForms(serviceId),
        this.getServiceForm(serviceId, appId),
      ]).then(() => {
        this.loadedServiceForm = !this.loadedServiceForm;
        console.log(
          "Форма существующего обращения (не первая), детальная информация по сервису и формы сервиса загружены"
        );
      });
      if (
        this.$route.name !== "ApplicationView" ||
        this.$route.params.modelId !== serviceId ||
        this.$route.params.appId !== appId
      ) {
        this.goToView("/application_view/model/" + serviceId + "/app/" + appId);
      }
    },
    async getServiceForms(serviceId) {
      // console.log(`Запрос форм по БП - ${serviceId}`);
      await axios
        .get(this.dynamicUrl + "api/serv/get-forms?id=" + serviceId, {
          withCredentials: true,
        })
        .then((response) => {
          console.groupCollapsed("Формы по мере поддержки");
          console.log(response.data);
          console.groupEnd();
          this.service.forms = response.data;
        });
    },
    async getServiceForm(serviceId, appId) {
      // console.log(`Запрос первой формы по БП - ${serviceId}`);
      let requestUrl;
      if (appId) {
        requestUrl = this.dynamicUrl + "api/app/get-appData?id=" + appId;
        // console.log(
        //   `Запрос существующей (не первой) формы сервиса с id = ${serviceId}`
        // );
      } else {
        requestUrl = this.dynamicUrl + "api/serv/get-appData?id=" + serviceId;
        // console.log(`Запрос первой формы сервиса с id = ${serviceId}`);
      }
      await axios
        .get(requestUrl, {
          withCredentials: true,
        })
        .then((response) => {
          if (appId) {
            console.groupCollapsed("Не стартовая форма сервиса");
          } else {
            console.groupCollapsed("Стартовая форма сервиса");
          }
          console.log(response.data.applicationDTO);
          console.groupEnd();
          const serviceForm = response.data.applicationDTO;
          serviceForm.data = JSON.parse(serviceForm.data);
          serviceForm.form.scheme = JSON.parse(serviceForm.form.scheme);
          this.service.applicationDTO = serviceForm;
        });
    },
    changeAppForm(applicationDTO) {
      // console.log(applicationDTO);
      this.service.applicationDTO = applicationDTO;
    },
    // Базовые методы
    // Переход на страницу
    goToView(targetView) {
      this.$router.push(targetView);
    },
  },

  mounted: async function () {
    console.log("Смонтирован компонент App");
    await this.fakeSignInLocal();
    await this.getServises();

    // Новый сценарий с использованием formio.js
    /*console.log("Смонтирован компонент App");
    await this.fakeSignInLocal();
    await this.getAppConfig();
    await this.checkAuth();

    if (this.config.user.auth) {
      await this.getUserShortInfo();
      await this.getUserFullInfo();

      if (
        !this.config.user.shortInfo.roleId &&
        this.config.user.fullInfo.roles.length > 0
      ) {
        await this.checkUserRole();
      }
      if (
        this.config.user.shortInfo.roleId &&
        !this.config.user.shortInfo.orgId &&
        this.config.user.fullInfo.userOrganizations.length > 0
      ) {
        await this.checkUserOrg();
      }

      this.getApps();
      this.getMessages();
    }*/
  },
};
</script>
