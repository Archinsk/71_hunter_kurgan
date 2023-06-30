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

            <!--  Кнопки  -->
            <div class="row justify-content-md-center">
              <div
                v-for="service of services.list"
                :key="service.id"
                class="col-12 col-md-10 col-lg-8 mb-2"
              >
                <button
                  type="button"
                  data-toggle="collapse"
                  data-target="#formCollapse"
                  aria-expanded="false"
                  aria-controls="formCollapse"
                  class="btn btn-collapse btn-primary btn-block btn-lg"
                  @click="$emit('show-service-first-form', service.id)"
                >
                  <!--                  @click="$emit('show-service-info', service.id)"-->
                  <div class="collapse-title">
                    {{ service.name }}
                  </div>
                </button>
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
          </div>
        </div>
      </div>
    </div>
    <TheFooter />
  </div>
</template>

<script>
import TheFooter from "../components/TheFooter";
export default {
  name: "HomeView",
  components: {
    TheFooter,
  },
  props: ["services", "measure", "appForm"],
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
  },
};
</script>
