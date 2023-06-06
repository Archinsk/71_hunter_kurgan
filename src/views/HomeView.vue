<template>
  <div id="home-view">
    <div class="content-wrapper">
      <div class="container">
        <div class="site-index">
          <div class="text-center">
            <div class="logo-container">
              <img class="logo-container__image" src="images/logo.png" />
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
                <CollapseButton
                  :target-id="
                    selectedAccordionItemId === 'huntingAppCollapse' ||
                    !selectedAccordionItemId
                      ? 'formCollapse'
                      : ''
                  "
                  class="btn-primary btn-block btn-lg"
                  @click="
                    selectAccordionItem('huntingAppCollapse'),
                      $emit('get-start-form', '01')
                  "
                >
                  <div class="collapse-title">
                    Подать заявку на добычу охотничьих ресурсов
                  </div>
                </CollapseButton>
              </div>
            </div>
            <div class="my-2 row justify-content-md-center">
              <div class="col-12 col-md-10 col-lg-8 col-xl-6">
                <CollapseButton
                  :target-id="
                    selectedAccordionItemId === 'preserveAppCollapse' ||
                    !selectedAccordionItemId
                      ? 'formCollapse'
                      : ''
                  "
                  class="btn-primary btn-block btn-lg"
                  @click="
                    selectAccordionItem('preserveAppCollapse'),
                      $emit('get-start-form', '02')
                  "
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
                <CollapseButton
                  :target-id="
                    selectedAccordionItemId === 'checkAppCollapse' ||
                    !selectedAccordionItemId
                      ? 'formCollapse'
                      : ''
                  "
                  class="btn-primary btn-block btn-lg"
                  @click="
                    selectAccordionItem('checkAppCollapse'),
                      $emit('get-start-form', '03')
                  "
                >
                  <div class="collapse-title">Узнать статус заявки</div>
                </CollapseButton>
              </div>
              <div
                class="col-12 col-sm-10 offset-sm-1 col-md-6 offset-md-3 my-2"
              >
                <CollapseButton
                  :target-id="
                    selectedAccordionItemId === 'checkNotificationCollapse' ||
                    !selectedAccordionItemId
                      ? 'formCollapse'
                      : ''
                  "
                  class="btn-primary btn-block btn-lg"
                  @click="
                    selectAccordionItem('checkNotificationCollapse'),
                      $emit('get-start-form', '04')
                  "
                >
                  <div class="collapse-title">Проверить статус уведомления</div>
                </CollapseButton>
              </div>
            </div>
          </div>
          <!-- Содержимое аккордионов -->
          <Card v-show="selectedAccordionItemId" class="shadow-sm my-4">
            <template v-slot:card-body>
              <Collapse id="formCollapse">
                <Loader
                  v-if="appForm.loader.isLoading && !appForm.loader.isResponse"
                  comment="Загрузка формы"
                />
                <div
                  v-show="appForm.loader.isResponse"
                  id="application-form-04"
                  class="row pt-2"
                >
                  <div class="col-12">
                    <h4 class="text-center py-2">
                      {{ measure.name + ": " + appForm.form.name }}
                    </h4>
                  </div>
                  <div class="col-10">
                    <Form
                      :form="appForm.form.scheme"
                      :submission="appForm"
                      language="ru"
                      :options="{
                        readOnly: !appForm.active,
                      }"
                      ref="vueForm"
                    />
                  </div>
                  <div
                    v-if="
                      appForm.form.actions && appForm.form.actions.length > 0
                    "
                    id="action-buttons-04"
                    class="col-2"
                  >
                    <template v-for="action of appForm.form.actions">
                      <template
                        v-if="
                          !action.hidden &&
                          (appForm.active ||
                            (action.alwaysActive && !isLastForm))
                        "
                      >
                        <button
                          :key="action.id"
                          type="button"
                          class="btn btn-block btn-primary"
                          @click="$emit('form-action', action)"
                        >
                          {{ action.name }}
                        </button>
                      </template>
                    </template>
                    <!--          <button class="btn btn-warning" @click="hideLoaders">убрать лоадеры</button>-->
                  </div>
                </div>
              </Collapse>
            </template>
          </Card>
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
// import Form from "../components/universal/BS46Form";
import Loader from "../components/universal/BS46Loader";
import { Form } from "vue-formio";
export default {
  name: "HomeView",
  components: {
    Loader,
    Form,
    Card,
    CollapseButton,
    Collapse,
    TheFooter,
  },
  props: ["measure", "appForm"],
  data() {
    return {
      selectedAccordionItemId: null,
    };
  },

  methods: {
    selectAccordionItem(accordionItemId) {
      if (accordionItemId === this.selectedAccordionItemId) {
        this.selectedAccordionItemId = null;
      } else {
        this.selectedAccordionItemId = accordionItemId;
      }
    },
  },

  mounted() {
    console.log("Смонтирован HomeView");
    console.log(this);
    console.log(this.$refs);
    console.log(this.$refs.vueForm);
  },
};
</script>
