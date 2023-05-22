<template>
  <div id="home-view">
    <div class="content-wrapper">
      <div class="container">
        <div class="site-index">
          <div class="text-center">
            <div class="logo-container">
              <img class="logo-container__image" src="images/logo.png" />
            </div>
            <div class="form-group form-check">
              <input
                type="checkbox"
                class="form-check-input"
                id="standartCheck"
              />
              <label class="form-check-label" for="standartCheck"
                >Check me out</label
              >
            </div>
            <div class="custom-control custom-checkbox">
              <input
                type="checkbox"
                class="custom-control-input"
                id="customCheck"
              />
              <label class="custom-control-label" for="customCheck"
                >Check me out</label
              >
            </div>

            <h4 class="color-gray font-weight-bold">
              Департамент гражданской защиты, охраны окружающей среды и
              природных ресурсов Курганской области
            </h4>

            <hr />

            <h4 class="color-gray">
              Автоматизированная система приема заявок на участие в
              распределении разрешений на добычу охотничьих ресурсов Курганской
              области
            </h4>

            <h5 class="color-gray py-33 m-0">Полезная информация:</h5>

            <ul class="list-unstyled py-33 pt-0 m-0">
              <li>
                <a
                  class="text-underline font-weight-light"
                  href="http://priroda.kurganobl.ru/"
                  target="_blank"
                >
                  Официальный сайт департамента
                </a>
              </li>

              <li>
                <a
                  class="font-weight-light"
                  href="http://priroda.kurganobl.ru/6121.html"
                  target="_blank"
                >
                  Распределение разрешений между физическими лицами на добычу
                  охотничьих ресурсов
                </a>
              </li>
            </ul>

            <div class="row justify-content-md-center">
              <div class="col-12 col-md-10 col-lg-8 col-xl-6">
                <!--                <a-->
                <!--                  class="w-100 btn btn-primary btn-lg scroll-to-request"-->
                <!--                  href="#"-->
                <!--                  role="button"-->
                <!--                  style=""-->
                <!--                >-->
                <!--                  Подать заявку на добычу охотничьих ресурсов-->
                <!--                </a>-->
                <CollapseButton
                  target-id="huntingAppCollapse"
                  class="btn-primary btn-block btn-lg"
                  @click="selectAccordionItem('huntingAppCollapse')"
                >
                  <div class="collapse-title">
                    Подать заявку на добычу охотничьих ресурсов
                  </div>
                </CollapseButton>
              </div>
            </div>
            <div class="my-2 row justify-content-md-center">
              <div class="col-12 col-md-10 col-lg-8 col-xl-6">
                <!--                <a-->
                <!--                  class="w-100 btn btn-primary btn-lg scroll-to-notification"-->
                <!--                  href="#"-->
                <!--                  role="button"-->
                <!--                  style=""-->
                <!--                >-->
                <!--                  Подать уведомление об участии в мероприятиях по сохранению-->
                <!--                  охотничьих ресурсов-->
                <!--                </a>-->
                <CollapseButton
                  target-id="preserveAppCollapse"
                  class="btn-primary btn-block btn-lg"
                  @click="selectAccordionItem('preserveAppCollapse')"
                >
                  <div class="collapse-title">
                    Подать уведомление об участии в мероприятиях по сохранению
                    охотничьих ресурсов
                  </div>
                </CollapseButton>
              </div>
            </div>

            <ul class="list-unstyled pt-3 m-0">
              <li class="color-gray">
                Консультация специалиста по т. +7 (912) 836-35-15
              </li>
              <li class="color-gray">
                Рабочее время: пн-пт, 9:00-18:00. Обед 13:00-14:00
              </li>
            </ul>

            <ul class="list-unstyled pt-3 m-0">
              <!-- <li>
                  <a class="text-underline font-weight-light" href="/files/Параметры охоты.pdf" target="_blank">
                      Параметры охоты
                  </a>
              </li> -->
              <li>
                <a
                  class="font-weight-light"
                  href="/files/srok23.pdf"
                  target="_blank"
                >
                  Сроки охоты и подачи заявок
                </a>
              </li>
            </ul>

            <div class="py-3">
              <h5 class="m-0 color-gray font-weight-bold">
                Прием заявок осуществляется с 1 марта 2023 г.
              </h5>
              <h5 class="m-0 color-gray font-weight-bold">
                Подача уведомлений с 15 января по 1 февраля 2023 г.
              </h5>
            </div>

            <div class="row">
              <div
                class="col-12 col-sm-10 offset-sm-1 col-md-6 offset-md-3 mt-2"
              >
                <!--                <a-->
                <!--                  class="w-100 btn btn-primary btn-lg scroll-to-status"-->
                <!--                  href="#"-->
                <!--                  role="button"-->
                <!--                  >Узнать статус заявки</a-->
                <!--                >-->
                <CollapseButton
                  target-id="checkAppCollapse"
                  class="btn-primary btn-block btn-lg"
                  @click="selectAccordionItem('checkAppCollapse')"
                >
                  <div class="collapse-title">Узнать статус заявки</div>
                </CollapseButton>
              </div>

              <div
                class="col-12 col-sm-10 offset-sm-1 col-md-6 offset-md-3 my-2"
              >
                <!--                <a-->
                <!--                  class="w-100 btn btn-primary btn-lg scroll-to-notif-status"-->
                <!--                  href="#"-->
                <!--                  role="button"-->
                <!--                  >Проверить статус уведомления</a-->
                <!--                >-->
                <CollapseButton
                  target-id="checkNotificationCollapse"
                  class="btn-primary btn-block btn-lg"
                  @click="selectAccordionItem('checkNotificationCollapse')"
                >
                  <div class="collapse-title">Проверить статус уведомления</div>
                </CollapseButton>
              </div>
            </div>
          </div>
          <div
            v-if="selectedAccordionItemId"
            class="accordion"
            id="huntingFormsAccordion"
          >
            <div class="card-list row">
              <div class="col-12">
                <Card class="shadow-sm my-4">
                  <temnpplate v-slot:card-body>
                    <Collapse
                      id="huntingAppCollapse"
                      parent-id="huntingFormsAccordion"
                    >
                      <div>
                        <div>{{ huntingAppForm.title }}</div>
                        <Form :form-data="huntingAppForm" />
                      </div>
                    </Collapse>
                    <Collapse
                      id="preserveAppCollapse"
                      parent-id="huntingFormsAccordion"
                    >
                      <div>
                        <div>{{ preserveAppForm.title }}</div>
                        <Form :form-data="preserveAppForm" />
                      </div>
                    </Collapse>
                    <Collapse
                      id="checkAppCollapse"
                      parent-id="huntingFormsAccordion"
                    >
                      <div>
                        <div>{{ checkAppForm.title }}</div>
                        <Form :form-data="checkAppForm" />
                      </div>
                    </Collapse>
                    <Collapse
                      id="checkNotificationCollapse"
                      parent-id="huntingFormsAccordion"
                    >
                      <div>
                        <div>{{ checkNotificationForm.title }}</div>
                        <Form :form-data="checkNotificationForm" />
                      </div>
                    </Collapse>
                  </temnpplate>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <TheFooter />
  </div>
</template>

<script>
import TheFooter from "../components/TheFooter";
import Collapse from "../components/universal/BS46Collapse";
import CollapseButton from "../components/universal/BS46CollapseButton";
import Card from "../components/universal/BS46Card";
import Form from "../components/universal/BS46Form";
export default {
  name: "HomeView",
  components: {
    Form,
    Card,
    CollapseButton,
    Collapse,
    TheFooter,
  },
  data() {
    return {
      selectedAccordionItemId: null,
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

      huntingAppForm: {
        title: "Заявка на добычу охотничьих ресурсов",
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
            id: "hunting-app-surname",
            label: "Фамилия",
            type: "input",
            subtype: "text",
            width: 12,
            responsive: "col-sm-6 col-lg-4",
            required: true,
            disabled: false,
            visibility: true,
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
            value: "",
          },
          {
            id: "hunting-app-name",
            label: "Имя",
            type: "input",
            subtype: "text",
            width: 12,
            responsive: "col-sm-6 col-lg-4",
            required: true,
            disabled: false,
            visibility: true,
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
            value: "",
          },
          {
            id: "hunting-app-patronymic",
            label: "Отчество (при наличии)",
            type: "input",
            subtype: "text",
            width: 12,
            responsive: "col-lg-4",
            required: true,
            disabled: false,
            visibility: true,
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
            value: "",
          },
          {
            id: "hunting-app-doc-series",
            label: "Серия охотничьего билета",
            type: "input",
            subtype: "text",
            width: 12,
            responsive: "col-sm-6",
            required: true,
            disabled: false,
            visibility: true,
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
            value: "",
          },
          {
            id: "hunting-app-doc-number",
            label: "Номер охотничьего билета",
            type: "input",
            subtype: "text",
            width: 12,
            responsive: "col-sm-6",
            required: true,
            disabled: false,
            visibility: true,
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
            value: "",
          },
          {
            id: "hunting-app-passport-series-number",
            label: "Серия и номер паспорта (необязательное поле)",
            type: "input",
            subtype: "text",
            width: 12,
            responsive: "col-sm-6 col-lg-4",
            required: true,
            disabled: false,
            visibility: true,
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
            value: "",
          },
          {
            id: "hunting-app-passport-issuer",
            label: "Кем выдан паспорт (необязательное поле)",
            type: "input",
            subtype: "text",
            width: 12,
            responsive: "col-sm-6 col-lg-4",
            required: true,
            disabled: false,
            visibility: true,
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
            value: "",
          },
          {
            id: "hunting-app-passport-issue-date",
            label: "Когда выдан паспорт (необязательное поле)",
            type: "input",
            subtype: "text",
            width: 12,
            responsive: "col-sm-6 col-lg-4",
            required: true,
            disabled: false,
            visibility: true,
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
            value: "",
          },
          {
            id: "hunting-app-birth-place",
            label: "Место рождения (необязательное поле)",
            type: "input",
            subtype: "text",
            width: 12,
            responsive: "col-sm-6",
            required: true,
            disabled: false,
            visibility: true,
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
            value: "",
          },
          {
            id: "hunting-app-address",
            label: "Почтовый адрес (необязательное поле)",
            type: "input",
            subtype: "text",
            width: 12,
            responsive: "col-sm-6",
            required: true,
            disabled: false,
            visibility: true,
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
            value: "",
          },
          {
            id: "hunting-app-birthday",
            label: "Дата рождения",
            type: "input",
            subtype: "text",
            width: 12,
            responsive: "col-sm-6",
            required: true,
            disabled: false,
            visibility: true,
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
            value: "",
          },
          {
            id: "hunting-app-phone",
            label: "Контактный телефон",
            type: "input",
            subtype: "text",
            width: 12,
            responsive: "col-sm-6",
            required: true,
            disabled: false,
            visibility: true,
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
            value: "",
          },
          {
            id: "hunting-app-issuer",
            label: "Кем выдан охотничий билет",
            type: "select",
            itemsList: [
              {
                id: 1,
                value: 1,
                label:
                  "Департаментом гражданской защиты, охраны окружающей среды и природных ресурсов",
              },
            ],
            width: 12,
            responsive: "",
            defaultValueLabel: "Выберите ведомство",
            required: true,
            disabled: false,
            visibility: true,
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
          {
            id: "hunting-app-issue-date",
            label: "Когда выдан охотничий билет",
            type: "input",
            subtype: "text",
            width: 12,
            responsive: "",
            required: true,
            disabled: false,
            visibility: true,
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
            value: "",
          },
          {
            id: "hunting-app-email",
            label: "Адрес электронной почты (необязательное поле)",
            type: "input",
            subtype: "text",
            width: 12,
            responsive: "",
            required: true,
            disabled: false,
            visibility: true,
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
            value: "",
          },
        ],
      },
      preserveAppForm: {
        title:
          "Уведомление об участии в мероприятиях по сохранению охотничьих ресурсов",
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
            id: "preserve-app-surname",
            label: "Фамилия",
            type: "input",
            subtype: "text",
            width: 12,
            responsive: "col-sm-6 col-lg-4",
            required: true,
            disabled: false,
            visibility: true,
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
            value: "",
          },
          {
            id: "preserve-app-name",
            label: "Имя",
            type: "input",
            subtype: "text",
            width: 12,
            responsive: "col-sm-6 col-lg-4",
            required: true,
            disabled: false,
            visibility: true,
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
            value: "",
          },
          {
            id: "preserve-app-patronymic",
            label: "Отчество (при наличии)",
            type: "input",
            subtype: "text",
            width: 12,
            responsive: "col-lg-4",
            disabled: false,
            visibility: true,
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
            value: "",
          },
          {
            id: "preserve-app-address",
            label: "Почтовый адрес",
            type: "input",
            subtype: "text",
            width: 12,
            responsive: "",
            required: true,
            disabled: false,
            visibility: true,
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
            value: "",
          },
          {
            id: "preserve-app-doc-series",
            label: "Серия охотничьего билета",
            type: "input",
            subtype: "text",
            width: 12,
            responsive: "col-sm-6",
            required: true,
            disabled: false,
            visibility: true,
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
            value: "",
          },
          {
            id: "preserve-app-doc-number",
            label: "Номер охотничьего билета",
            type: "input",
            subtype: "text",
            width: 12,
            responsive: "col-sm-6",
            required: true,
            disabled: false,
            visibility: true,
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
            value: "",
          },
          {
            id: "preserve-app-birthday",
            label: "Дата рождения",
            type: "input",
            subtype: "text",
            width: 12,
            responsive: "col-sm-6",
            required: true,
            disabled: false,
            visibility: true,
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
            value: "",
          },
          {
            id: "preserve-app-phone",
            label: "Контактный телефон",
            type: "input",
            subtype: "text",
            width: 12,
            responsive: "col-sm-6",
            required: true,
            disabled: false,
            visibility: true,
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
            value: "",
          },
          {
            id: "preserve-app-issuer",
            label: "Кем выдан охотничий билет",
            type: "input",
            subtype: "text",
            width: 12,
            responsive: "",
            required: true,
            disabled: false,
            visibility: true,
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
            value: "",
          },
          {
            id: "preserve-app-issue-date",
            label: "Когда выдан охотничий билет",
            type: "input",
            subtype: "text",
            width: 12,
            responsive: "",
            required: true,
            disabled: false,
            visibility: true,
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
            value: "",
          },
          {
            id: "preserve-app-email",
            label: "Адрес электронной почты (необязательное поле)",
            type: "input",
            subtype: "text",
            width: 12,
            responsive: "",
            required: true,
            disabled: false,
            visibility: true,
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
            value: "",
          },
        ],
      },
      checkAppForm: {
        title: "Статус заявки",
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
            id: "check-app-doc-series",
            label: "Серия охотничьего билета",
            type: "input",
            subtype: "text",
            width: 12,
            responsive: "col-sm-6",
            required: true,
            disabled: false,
            visibility: true,
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
            value: "",
          },
          {
            id: "check-app-doc-number",
            label: "Номер охотничьего билета",
            type: "input",
            subtype: "text",
            width: 12,
            responsive: "col-sm-6",
            required: true,
            disabled: false,
            visibility: true,
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
            value: "",
          },
        ],
      },
      checkNotificationForm: {
        title: "Статус уведомления",
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
            id: "check-notification-doc-series",
            label: "Серия охотничьего билета",
            type: "input",
            subtype: "text",
            width: 12,
            responsive: "col-sm-6",
            required: true,
            disabled: false,
            visibility: true,
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
            value: "",
          },
          {
            id: "check-notification-doc-number",
            label: "Номер охотничьего билета",
            type: "input",
            subtype: "text",
            width: 12,
            responsive: "col-sm-6",
            required: true,
            disabled: false,
            visibility: true,
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
            value: "",
          },
        ],
      },
    };
  },

  methods: {
    selectAccordionItem(accordionItemId) {
      if (accordionItemId === this.selectedAccordionItemId) {
        this.selectedAccordionItemId = null;
      } else {
        this.selectedAccordionItemId = accordionItemId;
        // document.getElementById(accordionItemId).scrollIntoView(true);
      }
    },
  },
};
</script>

<style lang="scss">
.custom-control {
  padding-left: 1.25rem !important;

  #customCheck {
    & ~ .custom-control-label {
      &::before {
        position: absolute;
        top: 0.3rem;
        left: -1.25rem;
        display: block;
        width: 0.8125rem;
        height: 0.8125rem;
        pointer-events: none;
        content: "";
        background-color: #fff;
        border: 1px solid #767676;
        border-radius: 0.1875rem;
        box-shadow: none;
        transition: background-color 0.15s ease-in-out,
          border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
      }

      &::after {
        position: absolute;
        top: 0.25rem;
        left: -1.25rem;
        display: block;
        width: 0.8125rem;
        height: 0.8125rem;
        content: "";
        background: 42% 68%/70% 70% no-repeat;
      }
    }

    &:checked {
      & ~ .custom-control-label {
        color: greenyellow;

        &::before {
          background-color: red;
          border-color: red;
        }

        &::after {
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='15' height='15' viewBox='0 0 8 8'%3e%3cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26l2.974 2.99L8 2.193z'/%3e%3c/svg%3e");
        }
      }
    }
  }
}
</style>
