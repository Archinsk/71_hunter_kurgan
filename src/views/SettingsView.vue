<template>
  <div id="settings-view">
    <section class="mb-3">
      <div class="container">
        <h4 class="title-primary text-center">Настройки</h4>

        <div class="accordion" id="settingsAccordion">
          <div class="card-list row">
            <div v-if="settingsForm.notification.display" class="col-12">
              <Card class="shadow-sm">
                <template v-slot:card-body>
                  <div class="collapse-btn-container">
                    <CollapseButton
                      target-id="notificationCollapse"
                      @click="selectAccordionItem(0)"
                    >
                      <div class="collapse-title">Уведомление</div>
                      <div
                        :class="[
                          'marker-container',
                          { active: selectedItem === 0 },
                        ]"
                      >
                        <img src="/icons/arrowdown.svg" class="down-icon" />
                      </div>
                    </CollapseButton>
                  </div>
                  <Collapse
                    id="notificationCollapse"
                    parent-id="settingsAccordion"
                  >
                    <div>
                      <Form
                        :form-data="settingsForm.notification.form"
                        @change-form="
                          $emit('change-settings-form-part1', $event)
                        "
                      />
                    </div>
                  </Collapse>
                </template>
              </Card>
            </div>
            <div v-if="settingsForm.server.display" class="col-12">
              <Card class="shadow-sm">
                <template v-slot:card-body>
                  <div class="collapse-btn-container">
                    <CollapseButton
                      target-id="serverCollapse"
                      @click="selectAccordionItem(1)"
                    >
                      <div class="collapse-title">Сервер</div>
                      <div
                        :class="[
                          'marker-container',
                          { active: selectedItem === 1 },
                        ]"
                      >
                        <img src="/icons/arrowdown.svg" class="down-icon" />
                      </div>
                    </CollapseButton>
                  </div>
                  <Collapse id="serverCollapse" parent-id="settingsAccordion">
                    <div>
                      <Form
                        :form-data="settingsForm.server.form"
                        @change-form="
                          $emit('change-settings-form-part2', $event)
                        "
                      />
                    </div>
                  </Collapse>
                </template>
              </Card>
            </div>
            <div v-if="settingsForm.logo.display" class="col-12">
              <Card class="shadow-sm">
                <template v-slot:card-body>
                  <div class="collapse-btn-container">
                    <CollapseButton
                      target-id="logoCollapse"
                      @click="selectAccordionItem(2)"
                    >
                      <div class="collapse-title">Логотип</div>
                      <div
                        :class="[
                          'marker-container',
                          { active: selectedItem === 2 },
                        ]"
                      >
                        <img src="/icons/arrowdown.svg" class="down-icon" />
                      </div>
                    </CollapseButton>
                  </div>
                  <Collapse id="logoCollapse" parent-id="settingsAccordion">
                    <div>
                      <Form
                        :form-data="settingsForm.logo.form"
                        @change-form="
                          $emit('change-settings-form-part3', $event)
                        "
                      />
                    </div>
                  </Collapse>
                </template>
              </Card>
            </div>
            <div v-if="settingsForm.footer.display" class="col-12">
              <Card class="shadow-sm">
                <template v-slot:card-body>
                  <div class="collapse-btn-container">
                    <CollapseButton
                      target-id="footerCollapse"
                      @click="selectAccordionItem(3)"
                    >
                      <div class="collapse-title">Футер</div>
                      <div
                        :class="[
                          'marker-container',
                          { active: selectedItem === 3 },
                        ]"
                      >
                        <img src="/icons/arrowdown.svg" class="down-icon" />
                      </div>
                    </CollapseButton>
                  </div>
                  <Collapse id="footerCollapse" parent-id="settingsAccordion">
                    <div>
                      <Form
                        :form-data="settingsForm.footer.form"
                        @change-form="
                          $emit('change-settings-form-part4', $event)
                        "
                      />
                    </div>
                  </Collapse>
                </template>
              </Card>
            </div>
            <div class="col-12">
              <div class="d-flex justify-content-end">
                <button
                  class="btn btn-primary"
                  @click="$emit('set-config')"
                  :disabled="!settingsFormValidity"
                >
                  Сохранить изменения
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Card from "../components/universal/BS46Card";
import CollapseButton from "../components/universal/BS46CollapseButton";
import Collapse from "../components/universal/BS46Collapse";
import Form from "../components/universal/BS46Form";
export default {
  name: "SettingsView",
  components: { Form, Collapse, CollapseButton, Card },
  props: ["settingsForm"],
  data() {
    return {
      selectedItem: null,
    };
  },
  computed: {
    settingsFormValidity: function () {
      return (
        (this.settingsForm.notification.form.validity ||
          !this.settingsForm.notification.display) &&
        (this.settingsForm.server.form.validity ||
          !this.settingsForm.server.display) &&
        (this.settingsForm.logo.form.validity ||
          !this.settingsForm.logo.display) &&
        (this.settingsForm.footer.form.validity ||
          !this.settingsForm.footer.display)
      );
    },
  },
  methods: {
    selectAccordionItem(index) {
      if (index === this.selectedItem) {
        this.selectedItem = null;
      } else {
        this.selectedItem = index;
      }
    },
    // changeForm(item) {
    //   console.log(item);
    // },
  },
};
</script>

<style lang="scss">
#settings-view {
  .card-list > div:not(:last-child) {
    margin-bottom: 1rem;
  }

  .card-list {
    .card {
      .card-body {
        padding: 0;
      }
    }
  }

  .btn-collapse {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: start;
    padding: 1.375rem;

    &:focus {
      box-shadow: none;
    }

    .collapse-title {
      font-weight: bold;
    }

    .marker-container {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #f5f6f8;
      width: 1.375rem;
      height: 1.375rem;
      border-radius: 50%;

      img {
        width: 0.625rem;
        transition: all 0.3s ease-in;
      }

      &.active {
        img {
          transform: rotateX(180deg);
        }
      }
    }
  }

  .collapse-content {
    padding: 0 1.375rem 1.375rem;
  }
}
</style>
