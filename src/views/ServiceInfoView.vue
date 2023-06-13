<template>
  <div class="page-wrapper">
    <section v-if="service.info.id" class="support">
      <div class="container">
        <div class="support-card">
          <div class="support-card-header row align-items-center">
            <div class="support-owner col-3"></div>
            <h4 class="support-name col-6 py-2">
              {{ service.info.name }}
            </h4>

            <div class="support-buttons col-3">
              <button
                class="btn btn-primary"
                @click="
                  $emit('show-service-first-form', $route.params.serviceId)
                "
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
                    v-for="(tab, index) of service.info.newDescription.chapters"
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
                    v-for="(tab, index) of service.info.newDescription.chapters"
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

export default {
  name: "ServiceInfoView",
  components: { NavTabsButton, NavTabsPane },

  props: ["url", "theme", "user", "service"],

  data() {
    return {
      activeTab: null,
    };
  },

  /*computed: {
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
    createMeasureInfo() {
      console.groupCollapsed(
        'Парсинг и монтаж описания сервиса с помощью "Editor.js"'
      );
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
          blocks: this.service.info.newDescription.commonDescription.blocks,
        },
      });
      console.log(basicInfo);

      for (
        let i = 0;
        i < this.service.info.newDescription.chapters.length;
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
              this.service.info.newDescription.chapters[i].description.blocks,
          },
        });
        console.log(measureChapter);
      }
      console.groupEnd();
    },
  },

  watch: {
    service: function () {
      console.log("------------------------------");
      console.log("Хук WATCH");
      if (this.service.newDescription) {
        this.createMeasureInfo();
      }
      console.log("------------------------------");
    },
  },

  created() {
    if (!this.service.info.id) {
      if (this.$route.params.serviceId) {
        // У компонента нет детальной информации о сервисе, но в адресной строке есть id сервиса
        this.$emit("show-service-info", this.$route.params.serviceId);
      }
    }
  },

  mounted: function () {
    console.log("Смонтирован ServiceInfoView");
    if (this.service.info.id && this.service.info.newDescription) {
      // У компонента есть детальная информации о сервисе
      this.createMeasureInfo();
    }
  },
};
</script>
