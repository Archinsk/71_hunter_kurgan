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
                  <template v-slot:card-body>
                    <Collapse
                      id="huntingAppCollapse"
                      parent-id="huntingFormsAccordion"
                    >
                      <div>Первое</div>
                    </Collapse>
                    <Collapse
                      id="preserveAppCollapse"
                      parent-id="huntingFormsAccordion"
                    >
                      <div>Второе</div>
                    </Collapse>
                    <Collapse
                      id="checkAppCollapse"
                      parent-id="huntingFormsAccordion"
                    >
                      <div>Третье</div>
                    </Collapse>
                    <Collapse
                      id="checkNotificationCollapse"
                      parent-id="huntingFormsAccordion"
                    >
                      <div>
                        Четвертое <Form :form-data="checkNotificationForm" />
                      </div>
                    </Collapse>
                  </template>
                </Card>
              </div>
            </div>
          </div>

          <!--          <div class="forms-container pt-4">-->
          <!--            <div class="collapse" id="requestСontainer" style="">-->
          <!--              <div class="card card-body">-->
          <!--                <h1>Заявка на добычу охотничьих ресурсов</h1>-->
          <!--                <h3>Сезон: 2023-2024</h3>-->

          <!--                <div>-->
          <!--                  <form-->
          <!--                    id="hunter-request-form"-->
          <!--                    class="request-form"-->
          <!--                    action="/site/submit-form"-->
          <!--                    method="post"-->
          <!--                    data-hunting-periods-url="/site/hunting-periods"-->
          <!--                    data-quota-exist-url="/site/quota-exist"-->
          <!--                  >-->
          <!--                    <input-->
          <!--                      type="hidden"-->
          <!--                      name="_csrf-frontend"-->
          <!--                      value="9IP64YWxiIE-GGvh13XALJlP49UJOmRFHwZnDVOKoiuE1p7Z0_nu13hgXNKVA5ZOrxa2mnkLMnYyZQhIBd3KTg=="-->
          <!--                    />-->
          <!--                    <input-->
          <!--                      type="hidden"-->
          <!--                      id="hunterrequestform-season_id"-->
          <!--                      name="HunterRequestForm[season_id]"-->
          <!--                      value="11"-->
          <!--                    />-->
          <!--                    <div-->
          <!--                      class="collapse show first-step-container"-->
          <!--                      id="collapseHunterInfo"-->
          <!--                    >-->
          <!--                      <div class="hunter-info">-->
          <!--                        <div class="form-row">-->
          <!--                          <div-->
          <!--                            class="form-group col-12 col-sm-6 col-md-6 col-lg-4 field-hunterrequestform-lastname required"-->
          <!--                          >-->
          <!--                            <label-->
          <!--                              class="control-label"-->
          <!--                              for="hunterrequestform-lastname"-->
          <!--                              >Фамилия</label-->
          <!--                            >-->
          <!--                            <input-->
          <!--                              type="text"-->
          <!--                              id="hunterrequestform-lastname"-->
          <!--                              class="form-control fio-input"-->
          <!--                              name="HunterRequestForm[lastName]"-->
          <!--                              aria-required="true"-->
          <!--                              data-plugin-inputmask="inputmask_594b16e4"-->
          <!--                            />-->

          <!--                            <div class="help-block"></div>-->
          <!--                          </div>-->
          <!--                          <div-->
          <!--                            class="form-group col-12 col-sm-6 col-md-6 col-lg-4 field-hunterrequestform-firstname required"-->
          <!--                          >-->
          <!--                            <label-->
          <!--                              class="control-label"-->
          <!--                              for="hunterrequestform-firstname"-->
          <!--                              >Имя</label-->
          <!--                            >-->
          <!--                            <input-->
          <!--                              type="text"-->
          <!--                              id="hunterrequestform-firstname"-->
          <!--                              class="form-control fio-input"-->
          <!--                              name="HunterRequestForm[firstName]"-->
          <!--                              aria-required="true"-->
          <!--                              data-plugin-inputmask="inputmask_594b16e4"-->
          <!--                            />-->

          <!--                            <div class="help-block"></div>-->
          <!--                          </div>-->
          <!--                          <div-->
          <!--                            class="form-group col-12 col-sm-12 col-md-12 col-lg-4 field-hunterrequestform-middlename"-->
          <!--                          >-->
          <!--                            <label-->
          <!--                              class="control-label"-->
          <!--                              for="hunterrequestform-middlename"-->
          <!--                              >Отчество-->
          <!--                              <span style="color: #ccc"-->
          <!--                                >(обязательное поле при наличии)</span-->
          <!--                              ></label-->
          <!--                            >-->
          <!--                            <input-->
          <!--                              type="text"-->
          <!--                              id="hunterrequestform-middlename"-->
          <!--                              class="form-control fio-input"-->
          <!--                              name="HunterRequestForm[middleName]"-->
          <!--                              data-plugin-inputmask="inputmask_594b16e4"-->
          <!--                            />-->

          <!--                            <div class="help-block"></div>-->
          <!--                          </div>-->
          <!--                        </div>-->

          <!--                        <div class="form-row">-->
          <!--                          <div-->
          <!--                            class="form-group col-12 col-sm-6 col-md-6 field-hunterrequestform-series required"-->
          <!--                          >-->
          <!--                            <label-->
          <!--                              class="control-label"-->
          <!--                              for="hunterrequestform-series"-->
          <!--                              >Серия охотничьего билета</label-->
          <!--                            >-->
          <!--                            <input-->
          <!--                              type="text"-->
          <!--                              id="hunterrequestform-series"-->
          <!--                              class="form-control"-->
          <!--                              name="HunterRequestForm[series]"-->
          <!--                              aria-required="true"-->
          <!--                              data-plugin-inputmask="inputmask_42c6aff4"-->
          <!--                            />-->

          <!--                            <div class="help-block"></div>-->
          <!--                          </div>-->
          <!--                          <div-->
          <!--                            class="form-group col-12 col-sm-6 col-md-6 field-hunterrequestform-number required"-->
          <!--                          >-->
          <!--                            <label-->
          <!--                              class="control-label"-->
          <!--                              for="hunterrequestform-number"-->
          <!--                              >Номер охотничьего билета</label-->
          <!--                            >-->
          <!--                            <input-->
          <!--                              type="text"-->
          <!--                              id="hunterrequestform-number"-->
          <!--                              class="form-control"-->
          <!--                              name="HunterRequestForm[number]"-->
          <!--                              aria-required="true"-->
          <!--                            />-->

          <!--                            <div class="help-block"></div>-->
          <!--                          </div>-->
          <!--                        </div>-->

          <!--                        <div class="form-row">-->
          <!--                          <div-->
          <!--                            class="form-group col-12 col-sm-6 col-md-6 col-lg-4 field-hunterrequestform-passportnumber"-->
          <!--                          >-->
          <!--                            <label-->
          <!--                              class="control-label"-->
          <!--                              for="hunterrequestform-passportnumber"-->
          <!--                              >Серия и номер паспорта-->
          <!--                              <span style="color: #ccc"-->
          <!--                                >(необязательн. поле)</span-->
          <!--                              ></label-->
          <!--                            >-->
          <!--                            <input-->
          <!--                              type="text"-->
          <!--                              id="hunterrequestform-passportnumber"-->
          <!--                              class="form-control fio-input"-->
          <!--                              name="HunterRequestForm[passportNumber]"-->
          <!--                              data-plugin-inputmask="inputmask_f549eb9c"-->
          <!--                            />-->

          <!--                            <div class="help-block"></div>-->
          <!--                          </div>-->
          <!--                          <div-->
          <!--                            class="form-group col-12 col-sm-6 col-md-6 col-lg-4 field-hunterrequestform-passportissuedby"-->
          <!--                          >-->
          <!--                            <label-->
          <!--                              class="control-label"-->
          <!--                              for="hunterrequestform-passportissuedby"-->
          <!--                              >Кем выдан паспорт-->
          <!--                              <span style="color: #ccc"-->
          <!--                                >(необязательное поле)</span-->
          <!--                              ></label-->
          <!--                            >-->
          <!--                            <input-->
          <!--                              type="text"-->
          <!--                              id="hunterrequestform-passportissuedby"-->
          <!--                              class="form-control"-->
          <!--                              name="HunterRequestForm[passportIssuedBy]"-->
          <!--                            />-->

          <!--                            <div class="help-block"></div>-->
          <!--                          </div>-->
          <!--                          <div-->
          <!--                            class="form-group col-12 col-sm-6 col-md-6 col-lg-4 field-hunterrequestform-passportissueddate"-->
          <!--                          >-->
          <!--                            <label-->
          <!--                              class="control-label"-->
          <!--                              for="hunterrequestform-passportissueddate"-->
          <!--                              >Когда выдан паспорт-->
          <!--                              <span style="color: #ccc"-->
          <!--                                >(необязательное поле)</span-->
          <!--                              ></label-->
          <!--                            >-->
          <!--                            <input-->
          <!--                              type="text"-->
          <!--                              id="hunterrequestform-passportissueddate"-->
          <!--                              class="form-control fio-input"-->
          <!--                              name="HunterRequestForm[passportIssuedDate]"-->
          <!--                              data-plugin-inputmask="inputmask_d60cdaa9"-->
          <!--                            />-->

          <!--                            <div class="help-block"></div>-->
          <!--                          </div>-->
          <!--                        </div>-->
          <!--                        <div class="form-row">-->
          <!--                          <div-->
          <!--                            class="form-group col-12 col-sm-6 col-md-6 col-lg-6 field-hunterrequestform-birthplace"-->
          <!--                          >-->
          <!--                            <label-->
          <!--                              class="control-label"-->
          <!--                              for="hunterrequestform-birthplace"-->
          <!--                              >Место рождения-->
          <!--                              <span style="color: #ccc"-->
          <!--                                >(необязательное поле)</span-->
          <!--                              ></label-->
          <!--                            >-->
          <!--                            <input-->
          <!--                              type="text"-->
          <!--                              id="hunterrequestform-birthplace"-->
          <!--                              class="form-control"-->
          <!--                              name="HunterRequestForm[birthPlace]"-->
          <!--                            />-->

          <!--                            <div class="help-block"></div>-->
          <!--                          </div>-->
          <!--                          <div-->
          <!--                            class="form-group col-12 col-sm-6 col-md-6 col-lg-6 field-hunterrequestform-postaddress"-->
          <!--                          >-->
          <!--                            <label-->
          <!--                              class="control-label"-->
          <!--                              for="hunterrequestform-postaddress"-->
          <!--                              >Почтовый адрес-->
          <!--                              <span style="color: #ccc"-->
          <!--                                >(необязательное поле)</span-->
          <!--                              ></label-->
          <!--                            >-->
          <!--                            <input-->
          <!--                              type="text"-->
          <!--                              id="hunterrequestform-postaddress"-->
          <!--                              class="form-control"-->
          <!--                              name="HunterRequestForm[postAddress]"-->
          <!--                            />-->

          <!--                            <div class="help-block"></div>-->
          <!--                          </div>-->
          <!--                        </div>-->
          <!--                        <div class="form-row">-->
          <!--                          <div-->
          <!--                            class="form-group col-12 col-sm-6 field-hunterrequestform-birthday required"-->
          <!--                          >-->
          <!--                            <label-->
          <!--                              class="control-label"-->
          <!--                              for="hunterrequestform-birthday"-->
          <!--                              >Дата рождения</label-->
          <!--                            >-->
          <!--                            <input-->
          <!--                              type="text"-->
          <!--                              id="hunterrequestform-birthday"-->
          <!--                              class="form-control"-->
          <!--                              name="HunterRequestForm[birthday]"-->
          <!--                              aria-required="true"-->
          <!--                              data-plugin-inputmask="inputmask_817d3f39"-->
          <!--                            />-->

          <!--                            <div class="help-block"></div>-->
          <!--                          </div>-->
          <!--                          <div-->
          <!--                            class="form-group col-12 col-sm-6 field-hunterrequestform-phone required"-->
          <!--                          >-->
          <!--                            <label-->
          <!--                              class="control-label"-->
          <!--                              for="hunterrequestform-phone"-->
          <!--                              >Контактный телефон</label-->
          <!--                            >-->
          <!--                            <input-->
          <!--                              type="text"-->
          <!--                              id="hunterrequestform-phone"-->
          <!--                              class="form-control"-->
          <!--                              name="HunterRequestForm[phone]"-->
          <!--                              aria-required="true"-->
          <!--                              data-plugin-inputmask="inputmask_8b2a4bfb"-->
          <!--                            />-->

          <!--                            <div class="help-block"></div>-->
          <!--                          </div>-->
          <!--                        </div>-->

          <!--                        <div-->
          <!--                          class="form-group field-hunterrequestform-issuedby required"-->
          <!--                        >-->
          <!--                          <label-->
          <!--                            class="control-label"-->
          <!--                            for="hunterrequestform-issuedby"-->
          <!--                            >Кем выдан охотничий билет</label-->
          <!--                          >-->
          <!--                          <select-->
          <!--                            id="hunterrequestform-issuedby"-->
          <!--                            class="form-control select2-hidden-accessible"-->
          <!--                            name="HunterRequestForm[issuedBy]"-->
          <!--                            aria-required="true"-->
          <!--                            data-s2-options="s2options_7ebc6538"-->
          <!--                            data-krajee-select2="select2_a6ea867b"-->
          <!--                            data-select2-id="hunterrequestform-issuedby"-->
          <!--                            tabindex="-1"-->
          <!--                            aria-hidden="true"-->
          <!--                          >-->
          <!--                            <option value="" data-select2-id="2"></option>-->
          <!--                            <option-->
          <!--                              value="Департаментом гражданской защиты, охраны окружающей среды и природных ресурсов"-->
          <!--                            >-->
          <!--                              Департаментом гражданской защиты, охраны-->
          <!--                              окружающей среды и природных ресурсов-->
          <!--                            </option></select-->
          <!--                          ><span-->
          <!--                            class="select2 select2-container select2-container&#45;&#45;default"-->
          <!--                            dir="ltr"-->
          <!--                            data-select2-id="1"-->
          <!--                            style="width: 100%"-->
          <!--                            ><span class="selection"-->
          <!--                              ><span-->
          <!--                                class="select2-selection select2-selection&#45;&#45;single form-control"-->
          <!--                                role="combobox"-->
          <!--                                aria-haspopup="true"-->
          <!--                                aria-expanded="false"-->
          <!--                                tabindex="0"-->
          <!--                                aria-disabled="false"-->
          <!--                                aria-labelledby="select2-hunterrequestform-issuedby-container"-->
          <!--                                ><span-->
          <!--                                  class="select2-selection__rendered"-->
          <!--                                  id="select2-hunterrequestform-issuedby-container"-->
          <!--                                  role="textbox"-->
          <!--                                  aria-readonly="true"-->
          <!--                                  ><span-->
          <!--                                    class="select2-selection__placeholder"-->
          <!--                                  ></span></span-->
          <!--                                ><span-->
          <!--                                  class="select2-selection__arrow"-->
          <!--                                  role="presentation"-->
          <!--                                  ><b-->
          <!--                                    role="presentation"-->
          <!--                                  ></b></span></span></span-->
          <!--                            ><span-->
          <!--                              class="dropdown-wrapper"-->
          <!--                              aria-hidden="true"-->
          <!--                            ></span-->
          <!--                          ></span>-->

          <!--                          <div class="help-block"></div>-->
          <!--                        </div>-->
          <!--                        <div-->
          <!--                          class="form-group field-hunterrequestform-issueddate required"-->
          <!--                        >-->
          <!--                          <label-->
          <!--                            class="control-label"-->
          <!--                            for="hunterrequestform-issueddate"-->
          <!--                            >Когда выдан охотничий билет</label-->
          <!--                          >-->
          <!--                          <input-->
          <!--                            type="text"-->
          <!--                            id="hunterrequestform-issueddate"-->
          <!--                            class="form-control"-->
          <!--                            name="HunterRequestForm[issuedDate]"-->
          <!--                            aria-required="true"-->
          <!--                            data-plugin-inputmask="inputmask_817d3f39"-->
          <!--                          />-->

          <!--                          <div class="help-block"></div>-->
          <!--                        </div>-->
          <!--                        <div class="form-group field-hunterrequestform-email">-->
          <!--                          <label-->
          <!--                            class="control-label"-->
          <!--                            for="hunterrequestform-email"-->
          <!--                            >Адрес электронной почты-->
          <!--                            <span style="color: #ccc"-->
          <!--                              >(необязательное поле)</span-->
          <!--                            ></label-->
          <!--                          >-->
          <!--                          <input-->
          <!--                            type="tel"-->
          <!--                            id="hunterrequestform-email"-->
          <!--                            class="form-control"-->
          <!--                            name="HunterRequestForm[email]"-->
          <!--                            data-plugin-inputmask="inputmask_b02ee1d6"-->
          <!--                          />-->

          <!--                          <div class="help-block"></div>-->
          <!--                        </div>-->
          <!--                      </div>-->
          <!--                      <button-->
          <!--                        class="btn btn-primary first-step-button"-->
          <!--                        type="button"-->
          <!--                      >-->
          <!--                        Далее-->
          <!--                      </button>-->
          <!--                    </div>-->
          <!--                    <div-->
          <!--                      class="collapse second-step-container"-->
          <!--                      id="collapseResources"-->
          <!--                    >-->
          <!--                      <div class="hunter-resources">-->
          <!--                        <div class="form-row">-->
          <!--                          <div-->
          <!--                            class="form-group col-12 col-md-6 field-hunterrequestform-type_of_resource_id required"-->
          <!--                          >-->
          <!--                            <label-->
          <!--                              class="control-label"-->
          <!--                              for="hunterrequestform-type_of_resource_id"-->
          <!--                              >Вид охотничьего ресурса</label-->
          <!--                            >-->
          <!--                            <select-->
          <!--                              id="hunterrequestform-type_of_resource_id"-->
          <!--                              class="form-control select2-hidden-accessible"-->
          <!--                              name="HunterRequestForm[type_of_resource_id]"-->
          <!--                              aria-required="true"-->
          <!--                              data-s2-options="s2options_7ebc6538"-->
          <!--                              data-krajee-select2="select2_2a7175fe"-->
          <!--                              data-select2-id="hunterrequestform-type_of_resource_id"-->
          <!--                              tabindex="-1"-->
          <!--                              aria-hidden="true"-->
          <!--                            >-->
          <!--                              <option value="" data-select2-id="4"></option>-->
          <!--                              <option value="1">-->
          <!--                                Косуля сибирская (самцы взрослые)-->
          <!--                              </option>-->
          <!--                              <option value="2">-->
          <!--                                Косуля сибирская (старше года)-->
          <!--                              </option>-->
          <!--                              <option value="3">-->
          <!--                                Косуля сибирская (до года)-->
          <!--                              </option>-->
          <!--                              <option value="7">Кабан (до года)</option>-->
          <!--                              <option value="8">Кабан (старше года)</option>-->
          <!--                              <option value="9">-->
          <!--                                Тетерев (весенний период)-->
          <!--                              </option>-->
          <!--                              <option value="12">-->
          <!--                                Селезни утки (весенний период) (с подсадной-->
          <!--                                уткой; селезни утки, гуси, казарки без подсадной-->
          <!--                                утки)-->
          <!--                              </option>-->
          <!--                              <option value="13">-->
          <!--                                Боровая, полевая, степная дичь с собаками-->
          <!--                              </option>-->
          <!--                              <option value="15">Барсук</option>-->
          <!--                              <option value="16">-->
          <!--                                Пушные 1 (лисица, корсак, енотовидная собака,-->
          <!--                                заяц, колонок, ласка, горностай, хорь)-->
          <!--                              </option>-->
          <!--                              <option value="17">Куница</option>-->
          <!--                              <option value="18">Ондатра</option>-->
          <!--                              <option value="19">Норка</option>-->
          <!--                              <option value="20">Бобр</option>-->
          <!--                              <option value="21">-->
          <!--                                Колонок, ласка, горностай, хорь-->
          <!--                              </option>-->
          <!--                              <option value="24">-->
          <!--                                Глухарь (весенний период)-->
          <!--                              </option>-->
          <!--                              <option value="28">-->
          <!--                                Боровая, полевая, степная дичь без собак-->
          <!--                              </option>-->
          <!--                              <option value="29">-->
          <!--                                Болотно-луговая дичь без собак-->
          <!--                              </option>-->
          <!--                              <option value="30">-->
          <!--                                Болотно-луговая дичь с собаками-->
          <!--                              </option>-->
          <!--                              <option value="35">-->
          <!--                                Водоплавающая дичь без собак (осенне-зимний пер)-->
          <!--                              </option>-->
          <!--                              <option value="36">-->
          <!--                                Водоплавающая дичь с собаками (осенне-зимний-->
          <!--                                пер)-->
          <!--                              </option></select-->
          <!--                            ><span-->
          <!--                              class="select2 select2-container select2-container&#45;&#45;default"-->
          <!--                              dir="ltr"-->
          <!--                              data-select2-id="3"-->
          <!--                              style="width: 100%"-->
          <!--                              ><span class="selection"-->
          <!--                                ><span-->
          <!--                                  class="select2-selection select2-selection&#45;&#45;single form-control"-->
          <!--                                  role="combobox"-->
          <!--                                  aria-haspopup="true"-->
          <!--                                  aria-expanded="false"-->
          <!--                                  tabindex="0"-->
          <!--                                  aria-disabled="false"-->
          <!--                                  aria-labelledby="select2-hunterrequestform-type_of_resource_id-container"-->
          <!--                                  ><span-->
          <!--                                    class="select2-selection__rendered"-->
          <!--                                    id="select2-hunterrequestform-type_of_resource_id-container"-->
          <!--                                    role="textbox"-->
          <!--                                    aria-readonly="true"-->
          <!--                                    ><span-->
          <!--                                      class="select2-selection__placeholder"-->
          <!--                                    ></span></span-->
          <!--                                  ><span-->
          <!--                                    class="select2-selection__arrow"-->
          <!--                                    role="presentation"-->
          <!--                                    ><b-->
          <!--                                      role="presentation"-->
          <!--                                    ></b></span></span></span-->
          <!--                              ><span-->
          <!--                                class="dropdown-wrapper"-->
          <!--                                aria-hidden="true"-->
          <!--                              ></span-->
          <!--                            ></span>-->

          <!--                            <div class="help-block"></div>-->
          <!--                          </div>-->
          <!--                          <div-->
          <!--                            class="form-group col-12 col-md-6 field-hunterrequestform-area_id required"-->
          <!--                          >-->
          <!--                            <label-->
          <!--                              class="control-label"-->
          <!--                              for="hunterrequestform-area_id"-->
          <!--                              >Охотничье угодье</label-->
          <!--                            >-->
          <!--                            <select-->
          <!--                              id="hunterrequestform-area_id"-->
          <!--                              class="form-control select2-hidden-accessible"-->
          <!--                              name="HunterRequestForm[area_id]"-->
          <!--                              aria-required="true"-->
          <!--                              data-s2-options="s2options_7ebc6538"-->
          <!--                              data-krajee-select2="select2_2a7175fe"-->
          <!--                              data-select2-id="hunterrequestform-area_id"-->
          <!--                              tabindex="-1"-->
          <!--                              aria-hidden="true"-->
          <!--                            >-->
          <!--                              <option value="" data-select2-id="6"></option>-->
          <!--                              <option value="23">-->
          <!--                                Актабанское - Петуховский-->
          <!--                              </option>-->
          <!--                              <option value="1">-->
          <!--                                Алакульское - Альменевский-->
          <!--                              </option>-->
          <!--                              <option value="51">-->
          <!--                                Альменевский заказаник - Альменевский-->
          <!--                              </option>-->
          <!--                              <option value="25">-->
          <!--                                Байдарское - Половинский-->
          <!--                              </option>-->
          <!--                              <option value="34">-->
          <!--                                Бутыринское - Частоозерский-->
          <!--                              </option>-->
          <!--                              <option value="52">-->
          <!--                                Варгашинский заказник - Варгашинский-->
          <!--                              </option>-->
          <!--                              <option value="8">Введенское - Кетовский</option>-->
          <!--                              <option value="24">-->
          <!--                                Воробьевское - Петуховский-->
          <!--                              </option>-->
          <!--                              <option value="17">-->
          <!--                                Гренадерское - Макушинский-->
          <!--                              </option>-->
          <!--                              <option value="28">-->
          <!--                                Давыдовское - Притобольный-->
          <!--                              </option>-->
          <!--                              <option value="53">-->
          <!--                                Далматовский заказник - Далматовский район-->
          <!--                              </option>-->
          <!--                              <option value="35">-->
          <!--                                Долговское - Частоозерский-->
          <!--                              </option>-->
          <!--                              <option value="3">-->
          <!--                                Дубровинское - Варгашинский-->
          <!--                              </option>-->
          <!--                              <option value="42">-->
          <!--                                Жужговское - Шумихинский-->
          <!--                              </option>-->
          <!--                              <option value="39">-->
          <!--                                Зеленоборское - Шадринский-->
          <!--                              </option>-->
          <!--                              <option value="16">-->
          <!--                                Казаркинское - Макушинский-->
          <!--                              </option>-->
          <!--                              <option value="45">-->
          <!--                                Кипельское - Юргамышский-->
          <!--                              </option>-->
          <!--                              <option value="46">-->
          <!--                                Кислянское - Юргамышский-->
          <!--                              </option>-->
          <!--                              <option value="5">-->
          <!--                                Ключевское - Далматовский-->
          <!--                              </option>-->
          <!--                              <option value="19">-->
          <!--                                Коровинское - Мишкинский-->
          <!--                              </option>-->
          <!--                              <option value="32">-->
          <!--                                Костыгинское - Целинный-->
          <!--                              </option>-->
          <!--                              <option value="13">-->
          <!--                                Косулинское - Куртамышский-->
          <!--                              </option>-->
          <!--                              <option value="20">-->
          <!--                                Краснознаменское - Мишкинский-->
          <!--                              </option>-->
          <!--                              <option value="64">-->
          <!--                                Курганский заказник - Целинный-->
          <!--                              </option>-->
          <!--                              <option value="9">Курганское - Кетовский</option>-->
          <!--                              <option value="55">-->
          <!--                                Куртамышский заказник - Куртамышский-->
          <!--                              </option>-->
          <!--                              <option value="6">-->
          <!--                                Лебедевское - Звериноголовский-->
          <!--                              </option>-->
          <!--                              <option value="56">-->
          <!--                                Лебяжьевский заказник - Лебяжьевский-->
          <!--                              </option>-->
          <!--                              <option value="43">Майлыкское - Щучанский</option>-->
          <!--                              <option value="57">-->
          <!--                                Макушинский заказник - Макушинский-->
          <!--                              </option>-->
          <!--                              <option value="29">-->
          <!--                                Малдыкульское - Сафакулевский-->
          <!--                              </option>-->
          <!--                              <option value="33">Матвеевское - Целинный</option>-->
          <!--                              <option value="10">Митинское - Кетовский</option>-->
          <!--                              <option value="58">-->
          <!--                                Мишкинский заказник - Мишкинский-->
          <!--                              </option>-->
          <!--                              <option value="59">-->
          <!--                                Мокроусовский заказник - Мокроусовский-->
          <!--                              </option>-->
          <!--                              <option value="4">-->
          <!--                                Мостовское - Варгашинский-->
          <!--                              </option>-->
          <!--                              <option value="44">-->
          <!--                                Николаевское - Щучанский-->
          <!--                              </option>-->
          <!--                              <option value="36">-->
          <!--                                Новотроицкое - Частоозерский-->
          <!--                              </option>-->
          <!--                              <option value="40">-->
          <!--                                Ожогинское - Шатровский-->
          <!--                              </option>-->
          <!--                              <option value="49">-->
          <!--                                Озернинское - Звериноголовский-->
          <!--                              </option>-->
          <!--                              <option value="48">-->
          <!--                                озеро Б. Невидим - Половинский-->
          <!--                              </option>-->
          <!--                              <option value="47">-->
          <!--                                озеро Коклан - Катайский-->
          <!--                              </option>-->
          <!--                              <option value="21">-->
          <!--                                Островлянское - Мишкинский-->
          <!--                              </option>-->
          <!--                              <option value="14">-->
          <!--                                Песьяновское - Куртамышский-->
          <!--                              </option>-->
          <!--                              <option value="60">-->
          <!--                                Петуховский заказник - Петуховский-->
          <!--                              </option>-->
          <!--                              <option value="61">-->
          <!--                                Половинский заказник - Половинский-->
          <!--                              </option>-->
          <!--                              <option value="26">-->
          <!--                                Половинское - Половинский-->
          <!--                              </option>-->
          <!--                              <option value="62">-->
          <!--                                Притобольный заказник - Притобольный-->
          <!--                              </option>-->
          <!--                              <option value="54">-->
          <!--                                Прорывинский заказник - Звериноголовский-->
          <!--                              </option>-->
          <!--                              <option value="63">-->
          <!--                                Сафакулевский заказник - Сафакулевский-->
          <!--                              </option>-->
          <!--                              <option value="30">-->
          <!--                                Субботинское - Сафакулевский-->
          <!--                              </option>-->
          <!--                              <option value="27">-->
          <!--                                Сумкинское - Половинский-->
          <!--                              </option>-->
          <!--                              <option value="11">Тайшинское - Кетовский</option>-->
          <!--                              <option value="41">-->
          <!--                                Терсюкское - Шатровский-->
          <!--                              </option>-->
          <!--                              <option value="18">-->
          <!--                                Травыкульское - Макушинский-->
          <!--                              </option>-->
          <!--                              <option value="31">-->
          <!--                                Федеркульское - Сафакулевский-->
          <!--                              </option>-->
          <!--                              <option value="65">-->
          <!--                                Частоозерский заказник - Частоозерский-->
          <!--                              </option>-->
          <!--                              <option value="37">-->
          <!--                                Частоозерское - Частоозерский-->
          <!--                              </option>-->
          <!--                              <option value="15">-->
          <!--                                Черемушкинское - Лебяжьевский-->
          <!--                              </option>-->
          <!--                              <option value="12">-->
          <!--                                Чистопрудное - Кетовский-->
          <!--                              </option>-->
          <!--                              <option value="66">-->
          <!--                                Шадринский заказник - Шадринский-->
          <!--                              </option>-->
          <!--                              <option value="22">-->
          <!--                                Шелеповское - Мокроусовский-->
          <!--                              </option>-->
          <!--                              <option value="67">-->
          <!--                                Шумихинский заказник - Шумихинский-->
          <!--                              </option>-->
          <!--                              <option value="68">-->
          <!--                                Щучанский заказник - Щучанский район-->
          <!--                              </option>-->
          <!--                              <option value="38">-->
          <!--                                Щучанское - Частоозерский-->
          <!--                              </option>-->
          <!--                              <option value="2">-->
          <!--                                Юламановское - Альменевский-->
          <!--                              </option>-->
          <!--                              <option value="69">-->
          <!--                                Юргамышский заказник - Юргамышский-->
          <!--                              </option></select-->
          <!--                            ><span-->
          <!--                              class="select2 select2-container select2-container&#45;&#45;default"-->
          <!--                              dir="ltr"-->
          <!--                              data-select2-id="5"-->
          <!--                              style="width: 100%"-->
          <!--                              ><span class="selection"-->
          <!--                                ><span-->
          <!--                                  class="select2-selection select2-selection&#45;&#45;single form-control"-->
          <!--                                  role="combobox"-->
          <!--                                  aria-haspopup="true"-->
          <!--                                  aria-expanded="false"-->
          <!--                                  tabindex="0"-->
          <!--                                  aria-disabled="false"-->
          <!--                                  aria-labelledby="select2-hunterrequestform-area_id-container"-->
          <!--                                  ><span-->
          <!--                                    class="select2-selection__rendered"-->
          <!--                                    id="select2-hunterrequestform-area_id-container"-->
          <!--                                    role="textbox"-->
          <!--                                    aria-readonly="true"-->
          <!--                                    ><span-->
          <!--                                      class="select2-selection__placeholder"-->
          <!--                                    ></span></span-->
          <!--                                  ><span-->
          <!--                                    class="select2-selection__arrow"-->
          <!--                                    role="presentation"-->
          <!--                                    ><b-->
          <!--                                      role="presentation"-->
          <!--                                    ></b></span></span></span-->
          <!--                              ><span-->
          <!--                                class="dropdown-wrapper"-->
          <!--                                aria-hidden="true"-->
          <!--                              ></span-->
          <!--                            ></span>-->

          <!--                            <div class="help-block"></div>-->
          <!--                          </div>-->
          <!--                        </div>-->
          <!--                        <div-->
          <!--                          class="form-row"-->
          <!--                          style="display: none"-->
          <!--                          data-id="dog_docs"-->
          <!--                        >-->
          <!--                          <div class="col-md-12 border border-dark">-->
          <!--                            <div class="box">-->
          <!--                              <div class="box-header">-->
          <!--                                <h4>Документы на собаку</h4>-->
          <!--                              </div>-->
          <!--                              <div class="box-body">-->
          <!--                                <div class="row">-->
          <!--                                  <div class="col-md-6">-->
          <!--                                    <div-->
          <!--                                      class="form-group field-hunterrequestform-dog_breed"-->
          <!--                                    >-->
          <!--                                      <label-->
          <!--                                        class="control-label"-->
          <!--                                        for="hunterrequestform-dog_breed"-->
          <!--                                        >Порода</label-->
          <!--                                      >-->
          <!--                                      <select-->
          <!--                                        id="hunterrequestform-dog_breed"-->
          <!--                                        class="w-100 form-control select2-hidden-accessible"-->
          <!--                                        name="HunterRequestForm[dog_breed]"-->
          <!--                                        data-s2-options="s2options_7ebc6538"-->
          <!--                                        data-krajee-select2="select2_39f6fbdb"-->
          <!--                                        data-select2-id="hunterrequestform-dog_breed"-->
          <!--                                        tabindex="-1"-->
          <!--                                        aria-hidden="true"-->
          <!--                                      >-->
          <!--                                        <option value="" data-select2-id="8">-->
          <!--                                          Порода-->
          <!--                                        </option>-->
          <!--                                        <option value="1">-->
          <!--                                          Островные легавые-->
          <!--                                        </option>-->
          <!--                                        <option value="2">-->
          <!--                                          Континентальные легавые-->
          <!--                                        </option>-->
          <!--                                        <option value="3">Ретривер</option>-->
          <!--                                        <option value="4">-->
          <!--                                          Спаниель-->
          <!--                                        </option></select-->
          <!--                                      ><span-->
          <!--                                        class="select2 select2-container select2-container&#45;&#45;default"-->
          <!--                                        dir="ltr"-->
          <!--                                        data-select2-id="7"-->
          <!--                                        style="width: 100%"-->
          <!--                                        ><span class="selection"-->
          <!--                                          ><span-->
          <!--                                            class="select2-selection select2-selection&#45;&#45;single form-control"-->
          <!--                                            role="combobox"-->
          <!--                                            aria-haspopup="true"-->
          <!--                                            aria-expanded="false"-->
          <!--                                            tabindex="0"-->
          <!--                                            aria-disabled="false"-->
          <!--                                            aria-labelledby="select2-hunterrequestform-dog_breed-container"-->
          <!--                                            ><span-->
          <!--                                              class="select2-selection__rendered"-->
          <!--                                              id="select2-hunterrequestform-dog_breed-container"-->
          <!--                                              role="textbox"-->
          <!--                                              aria-readonly="true"-->
          <!--                                              ><span-->
          <!--                                                class="select2-selection__placeholder"-->
          <!--                                                >Порода</span-->
          <!--                                              ></span-->
          <!--                                            ><span-->
          <!--                                              class="select2-selection__arrow"-->
          <!--                                              role="presentation"-->
          <!--                                              ><b-->
          <!--                                                role="presentation"-->
          <!--                                              ></b></span></span></span-->
          <!--                                        ><span-->
          <!--                                          class="dropdown-wrapper"-->
          <!--                                          aria-hidden="true"-->
          <!--                                        ></span-->
          <!--                                      ></span>-->

          <!--                                      <div class="help-block"></div>-->
          <!--                                    </div>-->
          <!--                                  </div>-->
          <!--                                  <div class="col-md-6">-->
          <!--                                    <div-->
          <!--                                      class="form-group field-hunterrequestform-dog_doc_type"-->
          <!--                                    >-->
          <!--                                      <label-->
          <!--                                        class="control-label"-->
          <!--                                        for="hunterrequestform-dog_doc_type"-->
          <!--                                        >Наименование документа</label-->
          <!--                                      >-->
          <!--                                      <select-->
          <!--                                        id="hunterrequestform-dog_doc_type"-->
          <!--                                        class="w-100 form-control select2-hidden-accessible"-->
          <!--                                        name="HunterRequestForm[dog_doc_type]"-->
          <!--                                        data-s2-options="s2options_7ebc6538"-->
          <!--                                        data-krajee-select2="select2_de4de04f"-->
          <!--                                        data-select2-id="hunterrequestform-dog_doc_type"-->
          <!--                                        tabindex="-1"-->
          <!--                                        aria-hidden="true"-->
          <!--                                      >-->
          <!--                                        <option value="" data-select2-id="10">-->
          <!--                                          Наименование документа-->
          <!--                                        </option>-->
          <!--                                        <option value="0">Справка</option>-->
          <!--                                        <option value="1">-->
          <!--                                          Свидетельство-->
          <!--                                        </option></select-->
          <!--                                      ><span-->
          <!--                                        class="select2 select2-container select2-container&#45;&#45;default"-->
          <!--                                        dir="ltr"-->
          <!--                                        data-select2-id="9"-->
          <!--                                        style="width: 100%"-->
          <!--                                        ><span class="selection"-->
          <!--                                          ><span-->
          <!--                                            class="select2-selection select2-selection&#45;&#45;single form-control"-->
          <!--                                            role="combobox"-->
          <!--                                            aria-haspopup="true"-->
          <!--                                            aria-expanded="false"-->
          <!--                                            tabindex="0"-->
          <!--                                            aria-disabled="false"-->
          <!--                                            aria-labelledby="select2-hunterrequestform-dog_doc_type-container"-->
          <!--                                            ><span-->
          <!--                                              class="select2-selection__rendered"-->
          <!--                                              id="select2-hunterrequestform-dog_doc_type-container"-->
          <!--                                              role="textbox"-->
          <!--                                              aria-readonly="true"-->
          <!--                                              ><span-->
          <!--                                                class="select2-selection__placeholder"-->
          <!--                                                >Наименование документа</span-->
          <!--                                              ></span-->
          <!--                                            ><span-->
          <!--                                              class="select2-selection__arrow"-->
          <!--                                              role="presentation"-->
          <!--                                              ><b-->
          <!--                                                role="presentation"-->
          <!--                                              ></b></span></span></span-->
          <!--                                        ><span-->
          <!--                                          class="dropdown-wrapper"-->
          <!--                                          aria-hidden="true"-->
          <!--                                        ></span-->
          <!--                                      ></span>-->

          <!--                                      <div class="help-block"></div>-->
          <!--                                    </div>-->
          <!--                                  </div>-->
          <!--                                </div>-->
          <!--                                <div class="row">-->
          <!--                                  <div class="col-md-6">-->
          <!--                                    <div-->
          <!--                                      class="form-group field-hunterrequestform-dog_number"-->
          <!--                                    >-->
          <!--                                      <label-->
          <!--                                        class="control-label"-->
          <!--                                        for="hunterrequestform-dog_number"-->
          <!--                                        >Номер</label-->
          <!--                                      >-->
          <!--                                      <input-->
          <!--                                        type="text"-->
          <!--                                        id="hunterrequestform-dog_number"-->
          <!--                                        class="form-control"-->
          <!--                                        name="HunterRequestForm[dog_number]"-->
          <!--                                      />-->

          <!--                                      <div class="help-block"></div>-->
          <!--                                    </div>-->
          <!--                                  </div>-->

          <!--                                  <div class="col-md-6">-->
          <!--                                    <div-->
          <!--                                      class="form-group field-hunterrequestform-dog_serial"-->
          <!--                                    >-->
          <!--                                      <label-->
          <!--                                        class="control-label"-->
          <!--                                        for="hunterrequestform-dog_serial"-->
          <!--                                        >Серия</label-->
          <!--                                      >-->
          <!--                                      <input-->
          <!--                                        type="text"-->
          <!--                                        id="hunterrequestform-dog_serial"-->
          <!--                                        class="form-control"-->
          <!--                                        name="HunterRequestForm[dog_serial]"-->
          <!--                                      />-->

          <!--                                      <div class="help-block"></div>-->
          <!--                                    </div>-->
          <!--                                  </div>-->

          <!--                                  <div class="col-md-12">-->
          <!--                                    <div-->
          <!--                                      class="form-group field-hunterrequestform-dog_document_date"-->
          <!--                                    >-->
          <!--                                      <label-->
          <!--                                        class="control-label"-->
          <!--                                        for="hunterrequestform-dog_document_date"-->
          <!--                                        >Дата выдачи документа</label-->
          <!--                                      >-->
          <!--                                      <input-->
          <!--                                        type="text"-->
          <!--                                        id="hunterrequestform-dog_document_date"-->
          <!--                                        class="form-control"-->
          <!--                                        name="HunterRequestForm[dog_document_date]"-->
          <!--                                        data-plugin-inputmask="inputmask_817d3f39"-->
          <!--                                      />-->

          <!--                                      <div class="help-block"></div>-->
          <!--                                    </div>-->
          <!--                                  </div>-->

          <!--                                  <div class="col-md-12">-->
          <!--                                    <div-->
          <!--                                      class="form-group field-hunterrequestform-dog_organization"-->
          <!--                                    >-->
          <!--                                      <label-->
          <!--                                        class="control-label"-->
          <!--                                        for="hunterrequestform-dog_organization"-->
          <!--                                        >Организация, выдавшая документ</label-->
          <!--                                      >-->
          <!--                                      <textarea-->
          <!--                                        id="hunterrequestform-dog_organization"-->
          <!--                                        class="form-control"-->
          <!--                                        name="HunterRequestForm[dog_organization]"-->
          <!--                                      ></textarea>-->

          <!--                                      <div class="help-block"></div>-->
          <!--                                    </div>-->
          <!--                                  </div>-->
          <!--                                </div>-->
          <!--                              </div>-->
          <!--                            </div>-->
          <!--                          </div>-->
          <!--                        </div>-->
          <!--                        <div class="form-row">-->
          <!--                          <div-->
          <!--                            class="col-12 quota-warning text-center"-->
          <!--                            style="display: none"-->
          <!--                          >-->
          <!--                            <div class="alert alert-danger" role="alert">-->
          <!--                              Квота на данный ресурс не установлена-->
          <!--                            </div>-->
          <!--                          </div>-->
          <!--                        </div>-->
          <!--                        <div class="form-row">-->
          <!--                          <input-->
          <!--                            type="hidden"-->
          <!--                            id="hunterrequestform-resource_number"-->
          <!--                            name="HunterRequestForm[resource_number]"-->
          <!--                            value="1"-->
          <!--                          />-->
          <!--                          <div-->
          <!--                            class="form-group col-12 col-md-6 field-hunterrequestform-hunting_period_id required"-->
          <!--                          >-->
          <!--                            <label-->
          <!--                              class="control-label"-->
          <!--                              for="hunterrequestform-hunting_period_id"-->
          <!--                              >Период охоты</label-->
          <!--                            >-->
          <!--                            <select-->
          <!--                              id="hunterrequestform-hunting_period_id"-->
          <!--                              class="form-control select2-hidden-accessible"-->
          <!--                              name="HunterRequestForm[hunting_period_id]"-->
          <!--                              aria-required="true"-->
          <!--                              data-s2-options="s2options_7ebc6538"-->
          <!--                              data-krajee-select2="select2_13e16192"-->
          <!--                              data-select2-id="hunterrequestform-hunting_period_id"-->
          <!--                              tabindex="-1"-->
          <!--                              aria-hidden="true"-->
          <!--                              disabled=""-->
          <!--                            >-->
          <!--                              <option-->
          <!--                                value=""-->
          <!--                                data-select2-id="12"-->
          <!--                              ></option></select-->
          <!--                            ><span-->
          <!--                              class="select2 select2-container select2-container&#45;&#45;default select2-container&#45;&#45;disabled"-->
          <!--                              dir="ltr"-->
          <!--                              data-select2-id="11"-->
          <!--                              style="width: 100%"-->
          <!--                              ><span class="selection"-->
          <!--                                ><span-->
          <!--                                  class="select2-selection select2-selection&#45;&#45;single form-control"-->
          <!--                                  role="combobox"-->
          <!--                                  aria-haspopup="true"-->
          <!--                                  aria-expanded="false"-->
          <!--                                  tabindex="-1"-->
          <!--                                  aria-disabled="true"-->
          <!--                                  aria-labelledby="select2-hunterrequestform-hunting_period_id-container"-->
          <!--                                  ><span-->
          <!--                                    class="select2-selection__rendered"-->
          <!--                                    id="select2-hunterrequestform-hunting_period_id-container"-->
          <!--                                    role="textbox"-->
          <!--                                    aria-readonly="true"-->
          <!--                                  ></span-->
          <!--                                  ><span-->
          <!--                                    class="select2-selection__arrow"-->
          <!--                                    role="presentation"-->
          <!--                                    ><b-->
          <!--                                      role="presentation"-->
          <!--                                    ></b></span></span></span-->
          <!--                              ><span-->
          <!--                                class="dropdown-wrapper"-->
          <!--                                aria-hidden="true"-->
          <!--                              ></span-->
          <!--                            ></span>-->

          <!--                            <div class="help-block"></div>-->
          <!--                          </div>-->
          <!--                          <div-->
          <!--                            class="form-group col-12 col-md-6 field-hunterrequestform-type"-->
          <!--                          >-->
          <!--                            <label-->
          <!--                              class="control-label"-->
          <!--                              for="hunterrequestform-type"-->
          <!--                              >Тип охоты</label-->
          <!--                            >-->
          <!--                            <select-->
          <!--                              id="hunterrequestform-type"-->
          <!--                              class="form-control select2-hidden-accessible"-->
          <!--                              name="HunterRequestForm[type]"-->
          <!--                              data-s2-options="s2options_7ebc6538"-->
          <!--                              data-krajee-select2="select2_2a7175fe"-->
          <!--                              data-select2-id="hunterrequestform-type"-->
          <!--                              tabindex="-1"-->
          <!--                              aria-hidden="true"-->
          <!--                            >-->
          <!--                              <option value=""></option>-->
          <!--                              <option-->
          <!--                                value="0"-->
          <!--                                selected=""-->
          <!--                                data-select2-id="14"-->
          <!--                              >-->
          <!--                                Любительская и спортивная охота-->
          <!--                              </option></select-->
          <!--                            ><span-->
          <!--                              class="select2 select2-container select2-container&#45;&#45;default"-->
          <!--                              dir="ltr"-->
          <!--                              data-select2-id="13"-->
          <!--                              style="width: 100%"-->
          <!--                              ><span class="selection"-->
          <!--                                ><span-->
          <!--                                  class="select2-selection select2-selection&#45;&#45;single form-control"-->
          <!--                                  role="combobox"-->
          <!--                                  aria-haspopup="true"-->
          <!--                                  aria-expanded="false"-->
          <!--                                  tabindex="0"-->
          <!--                                  aria-disabled="false"-->
          <!--                                  aria-labelledby="select2-hunterrequestform-type-container"-->
          <!--                                  ><span-->
          <!--                                    class="select2-selection__rendered"-->
          <!--                                    id="select2-hunterrequestform-type-container"-->
          <!--                                    role="textbox"-->
          <!--                                    aria-readonly="true"-->
          <!--                                    title="Любительская и спортивная охота"-->
          <!--                                    >Любительская и спортивная охота</span-->
          <!--                                  ><span-->
          <!--                                    class="select2-selection__arrow"-->
          <!--                                    role="presentation"-->
          <!--                                    ><b-->
          <!--                                      role="presentation"-->
          <!--                                    ></b></span></span></span-->
          <!--                              ><span-->
          <!--                                class="dropdown-wrapper"-->
          <!--                                aria-hidden="true"-->
          <!--                              ></span-->
          <!--                            ></span>-->

          <!--                            <div class="help-block"></div>-->
          <!--                          </div>-->
          <!--                        </div>-->
          <!--                        <div class="form-row">-->
          <!--                          <div-->
          <!--                            class="form-group col-12 field-hunterrequestform-participation_information required"-->
          <!--                          >-->
          <!--                            <input-->
          <!--                              type="hidden"-->
          <!--                              name="HunterRequestForm[participation_information]"-->
          <!--                              value="0"-->
          <!--                            /><label-->
          <!--                              ><input-->
          <!--                                type="checkbox"-->
          <!--                                id="hunterrequestform-participation_information"-->
          <!--                                name="HunterRequestForm[participation_information]"-->
          <!--                                value="1"-->
          <!--                                aria-required="true"-->
          <!--                              />-->
          <!--                              <a-->
          <!--                                href="http://priroda.kurganobl.ru/assets/files/Ohota/raspred_razresh/2019/8/1/305.pdf"-->
          <!--                                target="_blank"-->
          <!--                                >Принимал участие в мероприятиях по сохранению-->
          <!--                                охотничьих ресурсов и учету их численности</a-->
          <!--                              ></label-->
          <!--                            >-->

          <!--                            <div class="help-block"></div>-->
          <!--                          </div>-->
          <!--                          <div-->
          <!--                            class="form-group col-12 field-hunterrequestform-consent_data required"-->
          <!--                          >-->
          <!--                            <input-->
          <!--                              type="hidden"-->
          <!--                              name="HunterRequestForm[consent_data]"-->
          <!--                              value="0"-->
          <!--                            /><label-->
          <!--                              ><input-->
          <!--                                type="checkbox"-->
          <!--                                id="hunterrequestform-consent_data"-->
          <!--                                name="HunterRequestForm[consent_data]"-->
          <!--                                value="1"-->
          <!--                                aria-required="true"-->
          <!--                              />-->
          <!--                              Даю согласие на обработку моих персональных данных-->
          <!--                              в соответствии с п.1 ст.6 Федерального закона от-->
          <!--                              27.07.2006 №152 - ФЗ «О персональных-->
          <!--                              данных»</label-->
          <!--                            >-->

          <!--                            <div class="help-block"></div>-->
          <!--                          </div>-->
          <!--                          <div-->
          <!--                            class="form-group field-hunterrequestform-verifycode required"-->
          <!--                          >-->
          <!--                            <label-->
          <!--                              class="control-label"-->
          <!--                              for="hunterrequestform-verifycode"-->
          <!--                              >Проверка</label-->
          <!--                            >-->
          <!--                            <img-->
          <!--                              id="hunterrequestform-verifycode-image"-->
          <!--                              src="/site/captcha?v=645db44fd67481.04894703"-->
          <!--                              alt=""-->
          <!--                            />-->
          <!--                            <input-->
          <!--                              type="text"-->
          <!--                              id="hunterrequestform-verifycode"-->
          <!--                              class="form-control"-->
          <!--                              name="HunterRequestForm[verifyCode]"-->
          <!--                              aria-required="true"-->
          <!--                            />-->

          <!--                            <div class="help-block"></div>-->
          <!--                          </div>-->
          <!--                        </div>-->
          <!--                      </div>-->
          <!--                      <div class="errors"></div>-->
          <!--                      <div class="btn-group-vertical">-->
          <!--                        <button-->
          <!--                          class="btn btn-light back-to-first-step-button"-->
          <!--                          type="button"-->
          <!--                        >-->
          <!--                          Изменить данные охотника-->
          <!--                        </button>-->
          <!--                        <button-->
          <!--                          class="btn btn-primary second-step-button"-->
          <!--                          type="button"-->
          <!--                        >-->
          <!--                          Подать заявку-->
          <!--                        </button>-->
          <!--                      </div>-->
          <!--                    </div>-->
          <!--                  </form>-->
          <!--                </div>-->

          <!--                <div>-->
          <!--                  <div-->
          <!--                    class="modal fade"-->
          <!--                    id="success-modal"-->
          <!--                    tabindex="-1"-->
          <!--                    role="dialog"-->
          <!--                    aria-labelledby="exampleModalLabel"-->
          <!--                    aria-hidden="true"-->
          <!--                  >-->
          <!--                    <div class="modal-dialog" role="document">-->
          <!--                      <div class="modal-content">-->
          <!--                        <div class="modal-header">-->
          <!--                          <h5 class="modal-title">-->
          <!--                            Заявка успешно зарегистрирована-->
          <!--                          </h5>-->
          <!--                          <button-->
          <!--                            type="button"-->
          <!--                            class="close"-->
          <!--                            data-dismiss="modal"-->
          <!--                            aria-label="Close"-->
          <!--                          >-->
          <!--                            <span aria-hidden="true">×</span>-->
          <!--                          </button>-->
          <!--                        </div>-->
          <!--                        <div class="modal-body">...</div>-->
          <!--                        <div class="modal-footer">-->
          <!--                          <a-->
          <!--                            id="download-request-btn"-->
          <!--                            class="w-100 btn btn-success"-->
          <!--                            >Сохранить заявку</a-->
          <!--                          >-->
          <!--                          <button-->
          <!--                            type="button"-->
          <!--                            data-dismiss="modal"-->
          <!--                            class="w-100 request-retry btn btn-primary"-->
          <!--                          >-->
          <!--                            Подать еще заявку-->
          <!--                          </button>-->
          <!--                        </div>-->
          <!--                      </div>-->
          <!--                    </div>-->
          <!--                  </div>-->
          <!--                </div>-->
          <!--              </div>-->
          <!--            </div>-->

          <!--            <div class="collapse" id="statusСontainer">-->
          <!--              <div class="card card-body">-->
          <!--                <h1>Статус заявки</h1>-->

          <!--                <div>-->
          <!--                  <form-->
          <!--                    id="request-status-form"-->
          <!--                    action="/site/request-status"-->
          <!--                    method="post"-->
          <!--                  >-->
          <!--                    <input-->
          <!--                      type="hidden"-->
          <!--                      name="_csrf-frontend"-->
          <!--                      value="9IP64YWxiIE-GGvh13XALJlP49UJOmRFHwZnDVOKoiuE1p7Z0_nu13hgXNKVA5ZOrxa2mnkLMnYyZQhIBd3KTg=="-->
          <!--                    />-->
          <!--                    <input-->
          <!--                      type="hidden"-->
          <!--                      id="requeststatusform-season_id"-->
          <!--                      name="RequestStatusForm[season_id]"-->
          <!--                      value="11"-->
          <!--                    />-->
          <!--                    <div class="form-row">-->
          <!--                      <div-->
          <!--                        class="form-group col-12 col-sm-6 col-md-6 field-requeststatusform-series required"-->
          <!--                      >-->
          <!--                        <label-->
          <!--                          class="control-label"-->
          <!--                          for="requeststatusform-series"-->
          <!--                          >Серия охотничьего билета</label-->
          <!--                        >-->
          <!--                        <input-->
          <!--                          type="text"-->
          <!--                          id="requeststatusform-series"-->
          <!--                          class="form-control"-->
          <!--                          name="RequestStatusForm[series]"-->
          <!--                          aria-required="true"-->
          <!--                          data-plugin-inputmask="inputmask_42c6aff4"-->
          <!--                        />-->

          <!--                        <div class="help-block"></div>-->
          <!--                      </div>-->
          <!--                      <div-->
          <!--                        class="form-group col-12 col-sm-6 col-md-6 field-requeststatusform-number required"-->
          <!--                      >-->
          <!--                        <label-->
          <!--                          class="control-label"-->
          <!--                          for="requeststatusform-number"-->
          <!--                          >Номер охотничьего билета</label-->
          <!--                        >-->
          <!--                        <input-->
          <!--                          type="text"-->
          <!--                          id="requeststatusform-number"-->
          <!--                          class="form-control"-->
          <!--                          name="RequestStatusForm[number]"-->
          <!--                          aria-required="true"-->
          <!--                        />-->

          <!--                        <div class="help-block"></div>-->
          <!--                      </div>-->
          <!--                    </div>-->
          <!--                    <button-->
          <!--                      class="btn btn-primary w-100 check-request-status"-->
          <!--                      type="button"-->
          <!--                    >-->
          <!--                      Проверить статус-->
          <!--                    </button>-->
          <!--                  </form>-->
          <!--                  <div id="requests-list"></div>-->
          <!--                </div>-->
          <!--              </div>-->
          <!--            </div>-->
          <!--          </div>-->

          <!--          <div class="collapse show" id="notificationContainer" style="">-->
          <!--            <h1 id="form-title">-->
          <!--              Уведомление об участии в мероприятиях по сохранению охотничьих-->
          <!--              ресурсов-->
          <!--            </h1>-->
          <!--            <h3>Сезон: 2023-2024</h3>-->

          <!--            <div>-->
          <!--              <form-->
          <!--                id="hunter-notification-form"-->
          <!--                class="notification-form"-->
          <!--                action="/site/submit-notification-form"-->
          <!--                method="post"-->
          <!--              >-->
          <!--                <input-->
          <!--                  type="hidden"-->
          <!--                  name="_csrf-frontend"-->
          <!--                  value="9IP64YWxiIE-GGvh13XALJlP49UJOmRFHwZnDVOKoiuE1p7Z0_nu13hgXNKVA5ZOrxa2mnkLMnYyZQhIBd3KTg=="-->
          <!--                />-->
          <!--                <input-->
          <!--                  type="hidden"-->
          <!--                  id="notificationform-season_id"-->
          <!--                  name="NotificationForm[season_id]"-->
          <!--                  value="11"-->
          <!--                />-->
          <!--                <div-->
          <!--                  class="collapse show first-step-notif-container"-->
          <!--                  id="collapseHunterInfo"-->
          <!--                >-->
          <!--                  <div class="card card-body">-->
          <!--                    <div class="hunter-info">-->
          <!--                      <div class="form-row">-->
          <!--                        <div-->
          <!--                          class="form-group col-12 col-sm-6 col-md-6 col-lg-4 field-notificationform-lastname required"-->
          <!--                        >-->
          <!--                          <label-->
          <!--                            class="control-label"-->
          <!--                            for="notificationform-lastname"-->
          <!--                            >Фамилия</label-->
          <!--                          >-->
          <!--                          <input-->
          <!--                            type="text"-->
          <!--                            id="notificationform-lastname"-->
          <!--                            class="form-control fio-input"-->
          <!--                            name="NotificationForm[lastName]"-->
          <!--                            aria-required="true"-->
          <!--                            data-plugin-inputmask="inputmask_594b16e4"-->
          <!--                          />-->

          <!--                          <div class="help-block"></div>-->
          <!--                        </div>-->
          <!--                        <div-->
          <!--                          class="form-group col-12 col-sm-6 col-md-6 col-lg-4 field-notificationform-firstname required"-->
          <!--                        >-->
          <!--                          <label-->
          <!--                            class="control-label"-->
          <!--                            for="notificationform-firstname"-->
          <!--                            >Имя</label-->
          <!--                          >-->
          <!--                          <input-->
          <!--                            type="text"-->
          <!--                            id="notificationform-firstname"-->
          <!--                            class="form-control fio-input"-->
          <!--                            name="NotificationForm[firstName]"-->
          <!--                            aria-required="true"-->
          <!--                            data-plugin-inputmask="inputmask_594b16e4"-->
          <!--                          />-->

          <!--                          <div class="help-block"></div>-->
          <!--                        </div>-->
          <!--                        <div-->
          <!--                          class="form-group col-12 col-sm-12 col-md-12 col-lg-4 field-notificationform-middlename"-->
          <!--                        >-->
          <!--                          <label-->
          <!--                            class="control-label"-->
          <!--                            for="notificationform-middlename"-->
          <!--                            >Отчество-->
          <!--                            <span style="color: #ccc"-->
          <!--                              >(при наличии)</span-->
          <!--                            ></label-->
          <!--                          >-->
          <!--                          <input-->
          <!--                            type="text"-->
          <!--                            id="notificationform-middlename"-->
          <!--                            class="form-control fio-input"-->
          <!--                            name="NotificationForm[middleName]"-->
          <!--                            data-plugin-inputmask="inputmask_594b16e4"-->
          <!--                          />-->

          <!--                          <div class="help-block"></div>-->
          <!--                        </div>-->
          <!--                        <div-->
          <!--                          class="form-group col-12 col-sm-12 col-md-12 col-lg-12 field-notificationform-postaddress required"-->
          <!--                        >-->
          <!--                          <label-->
          <!--                            class="control-label"-->
          <!--                            for="notificationform-postaddress"-->
          <!--                            >Почтовый адрес</label-->
          <!--                          >-->
          <!--                          <input-->
          <!--                            type="text"-->
          <!--                            id="notificationform-postaddress"-->
          <!--                            class="form-control"-->
          <!--                            name="NotificationForm[postAddress]"-->
          <!--                            aria-required="true"-->
          <!--                          />-->

          <!--                          <div class="help-block"></div>-->
          <!--                        </div>-->
          <!--                      </div>-->

          <!--                      <div class="form-row">-->
          <!--                        <div-->
          <!--                          class="form-group col-12 col-sm-6 col-md-6 field-notificationform-series required"-->
          <!--                        >-->
          <!--                          <label-->
          <!--                            class="control-label"-->
          <!--                            for="notificationform-series"-->
          <!--                            >Серия охотничьего билета</label-->
          <!--                          >-->
          <!--                          <input-->
          <!--                            type="text"-->
          <!--                            id="notificationform-series"-->
          <!--                            class="form-control"-->
          <!--                            name="NotificationForm[series]"-->
          <!--                            aria-required="true"-->
          <!--                            data-plugin-inputmask="inputmask_42c6aff4"-->
          <!--                          />-->

          <!--                          <div class="help-block"></div>-->
          <!--                        </div>-->
          <!--                        <div-->
          <!--                          class="form-group col-12 col-sm-6 col-md-6 field-notificationform-number required"-->
          <!--                        >-->
          <!--                          <label-->
          <!--                            class="control-label"-->
          <!--                            for="notificationform-number"-->
          <!--                            >Номер охотничьего билета</label-->
          <!--                          >-->
          <!--                          <input-->
          <!--                            type="text"-->
          <!--                            id="notificationform-number"-->
          <!--                            class="form-control"-->
          <!--                            name="NotificationForm[number]"-->
          <!--                            aria-required="true"-->
          <!--                          />-->

          <!--                          <div class="help-block"></div>-->
          <!--                        </div>-->
          <!--                      </div>-->

          <!--                      <div class="form-row">-->
          <!--                        <div-->
          <!--                          class="form-group col-12 col-sm-6 field-notificationform-birthday required"-->
          <!--                        >-->
          <!--                          <label-->
          <!--                            class="control-label"-->
          <!--                            for="notificationform-birthday"-->
          <!--                            >Дата рождения</label-->
          <!--                          >-->
          <!--                          <input-->
          <!--                            type="text"-->
          <!--                            id="notificationform-birthday"-->
          <!--                            class="form-control"-->
          <!--                            name="NotificationForm[birthday]"-->
          <!--                            aria-required="true"-->
          <!--                            data-plugin-inputmask="inputmask_817d3f39"-->
          <!--                          />-->

          <!--                          <div class="help-block"></div>-->
          <!--                        </div>-->
          <!--                        <div-->
          <!--                          class="form-group col-12 col-sm-6 field-notificationform-phone required"-->
          <!--                        >-->
          <!--                          <label-->
          <!--                            class="control-label"-->
          <!--                            for="notificationform-phone"-->
          <!--                            >Контактный телефон</label-->
          <!--                          >-->
          <!--                          <input-->
          <!--                            type="text"-->
          <!--                            id="notificationform-phone"-->
          <!--                            class="form-control"-->
          <!--                            name="NotificationForm[phone]"-->
          <!--                            aria-required="true"-->
          <!--                            data-plugin-inputmask="inputmask_8b2a4bfb"-->
          <!--                          />-->

          <!--                          <div class="help-block"></div>-->
          <!--                        </div>-->
          <!--                      </div>-->

          <!--                      <div-->
          <!--                        class="form-group field-notificationform-issuedby required"-->
          <!--                      >-->
          <!--                        <label-->
          <!--                          class="control-label"-->
          <!--                          for="notificationform-issuedby"-->
          <!--                          >Кем выдан охотничьий билет</label-->
          <!--                        >-->
          <!--                        <select-->
          <!--                          id="notificationform-issuedby"-->
          <!--                          class="form-control select2-hidden-accessible"-->
          <!--                          name="NotificationForm[issuedBy]"-->
          <!--                          aria-required="true"-->
          <!--                          data-s2-options="s2options_7ebc6538"-->
          <!--                          data-krajee-select2="select2_a6ea867b"-->
          <!--                          data-select2-id="notificationform-issuedby"-->
          <!--                          tabindex="-1"-->
          <!--                          aria-hidden="true"-->
          <!--                        >-->
          <!--                          <option value="" data-select2-id="16"></option>-->
          <!--                          <option-->
          <!--                            value="Департаментом гражданской защиты, охраны окружающей среды и природных ресурсов Курганской области"-->
          <!--                          >-->
          <!--                            Департаментом гражданской защиты, охраны окружающей-->
          <!--                            среды и природных ресурсов Курганской области-->
          <!--                          </option></select-->
          <!--                        ><span-->
          <!--                          class="select2 select2-container select2-container&#45;&#45;default"-->
          <!--                          dir="ltr"-->
          <!--                          data-select2-id="15"-->
          <!--                          style="width: 100%"-->
          <!--                          ><span class="selection"-->
          <!--                            ><span-->
          <!--                              class="select2-selection select2-selection&#45;&#45;single form-control"-->
          <!--                              role="combobox"-->
          <!--                              aria-haspopup="true"-->
          <!--                              aria-expanded="false"-->
          <!--                              tabindex="0"-->
          <!--                              aria-disabled="false"-->
          <!--                              aria-labelledby="select2-notificationform-issuedby-container"-->
          <!--                              ><span-->
          <!--                                class="select2-selection__rendered"-->
          <!--                                id="select2-notificationform-issuedby-container"-->
          <!--                                role="textbox"-->
          <!--                                aria-readonly="true"-->
          <!--                                ><span-->
          <!--                                  class="select2-selection__placeholder"-->
          <!--                                ></span></span-->
          <!--                              ><span-->
          <!--                                class="select2-selection__arrow"-->
          <!--                                role="presentation"-->
          <!--                                ><b role="presentation"></b></span></span></span-->
          <!--                          ><span-->
          <!--                            class="dropdown-wrapper"-->
          <!--                            aria-hidden="true"-->
          <!--                          ></span-->
          <!--                        ></span>-->

          <!--                        <div class="help-block"></div>-->
          <!--                      </div>-->
          <!--                      <div-->
          <!--                        class="form-group field-notificationform-issueddate required"-->
          <!--                      >-->
          <!--                        <label-->
          <!--                          class="control-label"-->
          <!--                          for="notificationform-issueddate"-->
          <!--                          >Когда выдан охотничий билет</label-->
          <!--                        >-->
          <!--                        <input-->
          <!--                          type="text"-->
          <!--                          id="notificationform-issueddate"-->
          <!--                          class="form-control"-->
          <!--                          name="NotificationForm[issuedDate]"-->
          <!--                          aria-required="true"-->
          <!--                          data-plugin-inputmask="inputmask_817d3f39"-->
          <!--                        />-->

          <!--                        <div class="help-block"></div>-->
          <!--                      </div>-->
          <!--                      <div class="form-group field-notificationform-email">-->
          <!--                        <label-->
          <!--                          class="control-label"-->
          <!--                          for="notificationform-email"-->
          <!--                          >Адрес электронной почты-->
          <!--                          <span style="color: #ccc"-->
          <!--                            >(необязательное поле)</span-->
          <!--                          ></label-->
          <!--                        >-->
          <!--                        <input-->
          <!--                          type="tel"-->
          <!--                          id="notificationform-email"-->
          <!--                          class="form-control"-->
          <!--                          name="NotificationForm[email]"-->
          <!--                          data-plugin-inputmask="inputmask_b02ee1d6"-->
          <!--                        />-->

          <!--                        <div class="help-block"></div>-->
          <!--                      </div>-->
          <!--                    </div>-->
          <!--                    <button-->
          <!--                      class="btn btn-primary first-step-notif-button"-->
          <!--                      type="button"-->
          <!--                    >-->
          <!--                      Далее-->
          <!--                    </button>-->
          <!--                  </div>-->
          <!--                </div>-->
          <!--                <div-->
          <!--                  class="collapse second-step-notif-container"-->
          <!--                  id="collapseResources"-->
          <!--                >-->
          <!--                  <div class="card card-body">-->
          <!--                    <div class="hunter-resources">-->
          <!--                      <div class="form-row">-->
          <!--                        <div-->
          <!--                          id="notification-area"-->
          <!--                          class="form-group col-12 col-md-6 field-notificationform-area_id required"-->
          <!--                        >-->
          <!--                          <label-->
          <!--                            class="control-label"-->
          <!--                            for="notificationform-area_id"-->
          <!--                            >Охотничье угодье</label-->
          <!--                          >-->
          <!--                          <select-->
          <!--                            id="notificationform-area_id"-->
          <!--                            class="form-control select2-hidden-accessible"-->
          <!--                            name="NotificationForm[area_id]"-->
          <!--                            aria-required="true"-->
          <!--                            data-s2-options="s2options_7ebc6538"-->
          <!--                            data-krajee-select2="select2_2a7175fe"-->
          <!--                            data-select2-id="notificationform-area_id"-->
          <!--                            tabindex="-1"-->
          <!--                            aria-hidden="true"-->
          <!--                          >-->
          <!--                            <option-->
          <!--                              value=""-->
          <!--                              data-select2-id="18"-->
          <!--                            ></option></select-->
          <!--                          ><span-->
          <!--                            class="select2 select2-container select2-container&#45;&#45;default"-->
          <!--                            dir="ltr"-->
          <!--                            data-select2-id="17"-->
          <!--                            style="width: 100%"-->
          <!--                            ><span class="selection"-->
          <!--                              ><span-->
          <!--                                class="select2-selection select2-selection&#45;&#45;single form-control"-->
          <!--                                role="combobox"-->
          <!--                                aria-haspopup="true"-->
          <!--                                aria-expanded="false"-->
          <!--                                tabindex="0"-->
          <!--                                aria-disabled="false"-->
          <!--                                aria-labelledby="select2-notificationform-area_id-container"-->
          <!--                                ><span-->
          <!--                                  class="select2-selection__rendered"-->
          <!--                                  id="select2-notificationform-area_id-container"-->
          <!--                                  role="textbox"-->
          <!--                                  aria-readonly="true"-->
          <!--                                  ><span-->
          <!--                                    class="select2-selection__placeholder"-->
          <!--                                  ></span></span-->
          <!--                                ><span-->
          <!--                                  class="select2-selection__arrow"-->
          <!--                                  role="presentation"-->
          <!--                                  ><b-->
          <!--                                    role="presentation"-->
          <!--                                  ></b></span></span></span-->
          <!--                            ><span-->
          <!--                              class="dropdown-wrapper"-->
          <!--                              aria-hidden="true"-->
          <!--                            ></span-->
          <!--                          ></span>-->

          <!--                          <div class="help-block"></div>-->
          <!--                        </div>-->
          <!--                        <div-->
          <!--                          id="notificationtypeevent"-->
          <!--                          class="form-group col-12 col-md-6 field-notificationform-type_of_event_id required"-->
          <!--                        >-->
          <!--                          <label-->
          <!--                            class="control-label"-->
          <!--                            for="notificationform-type_of_event_id"-->
          <!--                            >Тип мероприятия</label-->
          <!--                          >-->
          <!--                          <select-->
          <!--                            id="notificationform-type_of_event_id"-->
          <!--                            class="form-control select2-hidden-accessible"-->
          <!--                            name="NotificationForm[type_of_event_id]"-->
          <!--                            aria-required="true"-->
          <!--                            data-s2-options="s2options_7ebc6538"-->
          <!--                            data-krajee-select2="select2_2a7175fe"-->
          <!--                            data-select2-id="notificationform-type_of_event_id"-->
          <!--                            tabindex="-1"-->
          <!--                            aria-hidden="true"-->
          <!--                          >-->
          <!--                            <option-->
          <!--                              value=""-->
          <!--                              data-select2-id="20"-->
          <!--                            ></option></select-->
          <!--                          ><span-->
          <!--                            class="select2 select2-container select2-container&#45;&#45;default"-->
          <!--                            dir="ltr"-->
          <!--                            data-select2-id="19"-->
          <!--                            style="width: 100%"-->
          <!--                            ><span class="selection"-->
          <!--                              ><span-->
          <!--                                class="select2-selection select2-selection&#45;&#45;single form-control"-->
          <!--                                role="combobox"-->
          <!--                                aria-haspopup="true"-->
          <!--                                aria-expanded="false"-->
          <!--                                tabindex="0"-->
          <!--                                aria-disabled="false"-->
          <!--                                aria-labelledby="select2-notificationform-type_of_event_id-container"-->
          <!--                                ><span-->
          <!--                                  class="select2-selection__rendered"-->
          <!--                                  id="select2-notificationform-type_of_event_id-container"-->
          <!--                                  role="textbox"-->
          <!--                                  aria-readonly="true"-->
          <!--                                  ><span-->
          <!--                                    class="select2-selection__placeholder"-->
          <!--                                  ></span></span-->
          <!--                                ><span-->
          <!--                                  class="select2-selection__arrow"-->
          <!--                                  role="presentation"-->
          <!--                                  ><b-->
          <!--                                    role="presentation"-->
          <!--                                  ></b></span></span></span-->
          <!--                            ><span-->
          <!--                              class="dropdown-wrapper"-->
          <!--                              aria-hidden="true"-->
          <!--                            ></span-->
          <!--                          ></span>-->

          <!--                          <div class="help-block"></div>-->
          <!--                        </div>-->
          <!--                      </div>-->

          <!--                      <div class="form-row">-->
          <!--                        <div-->
          <!--                          class="form-group col-12 field-notificationform-consent_data required"-->
          <!--                        >-->
          <!--                          <input-->
          <!--                            type="hidden"-->
          <!--                            name="NotificationForm[consent_data]"-->
          <!--                            value="0"-->
          <!--                          /><label-->
          <!--                            ><input-->
          <!--                              type="checkbox"-->
          <!--                              id="notificationform-consent_data"-->
          <!--                              name="NotificationForm[consent_data]"-->
          <!--                              value="1"-->
          <!--                              aria-required="true"-->
          <!--                            />-->
          <!--                            Даю согласие на обработку моих персональных данных в-->
          <!--                            соответствии с п.1 ст.6 Федерального закона от-->
          <!--                            27.07.2006 №152 - ФЗ «О персональных данных»</label-->
          <!--                          >-->

          <!--                          <div class="help-block"></div>-->
          <!--                        </div>-->
          <!--                        <div-->
          <!--                          class="form-group field-notificationform-verifycode required"-->
          <!--                        >-->
          <!--                          <label-->
          <!--                            class="control-label"-->
          <!--                            for="notificationform-verifycode"-->
          <!--                            >Проверка</label-->
          <!--                          >-->
          <!--                          <img-->
          <!--                            id="notificationform-verifycode-image"-->
          <!--                            src="/site/captcha?v=645db44fd8abf3.11761238"-->
          <!--                            alt=""-->
          <!--                          />-->
          <!--                          <input-->
          <!--                            type="text"-->
          <!--                            id="notificationform-verifycode"-->
          <!--                            class="form-control"-->
          <!--                            name="NotificationForm[verifyCode]"-->
          <!--                            aria-required="true"-->
          <!--                          />-->

          <!--                          <div class="help-block"></div>-->
          <!--                        </div>-->
          <!--                      </div>-->
          <!--                    </div>-->
          <!--                    <div class="errors"></div>-->
          <!--                    <div class="btn-group-vertical">-->
          <!--                      <button-->
          <!--                        class="btn btn-light back-to-first-step-notif-button"-->
          <!--                        type="button"-->
          <!--                      >-->
          <!--                        Изменить данные охотника-->
          <!--                      </button>-->
          <!--                      <button-->
          <!--                        class="btn btn-primary second-step-notif-button"-->
          <!--                        type="button"-->
          <!--                      >-->
          <!--                        Подать уведомление-->
          <!--                      </button>-->
          <!--                    </div>-->
          <!--                  </div>-->
          <!--                </div>-->
          <!--              </form>-->
          <!--            </div>-->

          <!--            <div>-->
          <!--              <div-->
          <!--                class="modal fade"-->
          <!--                id="success-notificate-modal"-->
          <!--                tabindex="-1"-->
          <!--                role="dialog"-->
          <!--                aria-labelledby="exampleModalLabel"-->
          <!--                aria-hidden="true"-->
          <!--              >-->
          <!--                <div class="modal-dialog" role="document">-->
          <!--                  <div class="modal-content">-->
          <!--                    <div class="modal-header">-->
          <!--                      <h5 class="modal-title">-->
          <!--                        Уведомление успешно зарегистрировано-->
          <!--                      </h5>-->
          <!--                      <button-->
          <!--                        type="button"-->
          <!--                        class="close"-->
          <!--                        data-dismiss="modal"-->
          <!--                        aria-label="Close"-->
          <!--                      >-->
          <!--                        <span aria-hidden="true">×</span>-->
          <!--                      </button>-->
          <!--                    </div>-->
          <!--                    <div class="modal-body">...</div>-->
          <!--                    <div class="modal-footer">-->
          <!--                      <a-->
          <!--                        id="download-notification-btn"-->
          <!--                        class="w-100 btn btn-success"-->
          <!--                        >Сохранить уведомление</a-->
          <!--                      >-->
          <!--                      <button-->
          <!--                        type="button"-->
          <!--                        data-dismiss="modal"-->
          <!--                        class="w-100 request-retry btn btn-primary"-->
          <!--                      >-->
          <!--                        Подать еще уведомление-->
          <!--                      </button>-->
          <!--                    </div>-->
          <!--                  </div>-->
          <!--                </div>-->
          <!--              </div>-->
          <!--            </div>-->
          <!--          </div>-->

          <!--          <div class="collapse" id="notificationStatusСontainer">-->
          <!--            <h1>Статус уведомления</h1>-->

          <!--            <div>-->
          <!--              <div class="card card-body">-->
          <!--                <form-->
          <!--                  id="notification-status-form"-->
          <!--                  action="/site/notification-status"-->
          <!--                  method="post"-->
          <!--                >-->
          <!--                  <input-->
          <!--                    type="hidden"-->
          <!--                    name="_csrf-frontend"-->
          <!--                    value="9IP64YWxiIE-GGvh13XALJlP49UJOmRFHwZnDVOKoiuE1p7Z0_nu13hgXNKVA5ZOrxa2mnkLMnYyZQhIBd3KTg=="-->
          <!--                  />-->
          <!--                  <input-->
          <!--                    type="hidden"-->
          <!--                    id="notificationstatusform-season_id"-->
          <!--                    name="NotificationStatusForm[season_id]"-->
          <!--                    value="11"-->
          <!--                  />-->
          <!--                  <div class="form-row">-->
          <!--                    <div-->
          <!--                      class="form-group col-12 col-sm-6 col-md-6 field-notificationstatusform-series required"-->
          <!--                    >-->
          <!--                      <label-->
          <!--                        class="control-label"-->
          <!--                        for="notificationstatusform-series"-->
          <!--                        >Серия охотничьего билета</label-->
          <!--                      >-->
          <!--                      <input-->
          <!--                        type="text"-->
          <!--                        id="notificationstatusform-series"-->
          <!--                        class="form-control"-->
          <!--                        name="NotificationStatusForm[series]"-->
          <!--                        aria-required="true"-->
          <!--                        data-plugin-inputmask="inputmask_42c6aff4"-->
          <!--                      />-->

          <!--                      <div class="help-block"></div>-->
          <!--                    </div>-->
          <!--                    <div-->
          <!--                      class="form-group col-12 col-sm-6 col-md-6 field-notificationstatusform-number required"-->
          <!--                    >-->
          <!--                      <label-->
          <!--                        class="control-label"-->
          <!--                        for="notificationstatusform-number"-->
          <!--                        >Номер охотничьего билета</label-->
          <!--                      >-->
          <!--                      <input-->
          <!--                        type="text"-->
          <!--                        id="notificationstatusform-number"-->
          <!--                        class="form-control"-->
          <!--                        name="NotificationStatusForm[number]"-->
          <!--                        aria-required="true"-->
          <!--                      />-->

          <!--                      <div class="help-block"></div>-->
          <!--                    </div>-->
          <!--                  </div>-->
          <!--                  <button-->
          <!--                    class="btn btn-primary w-100 check-notification-status"-->
          <!--                    type="button"-->
          <!--                  >-->
          <!--                    Проверить статус-->
          <!--                  </button>-->
          <!--                </form>-->
          <!--                <div id="notification-list"></div>-->
          <!--              </div>-->
          <!--            </div>-->
          <!--          </div>-->
          <!---->
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

      huntingAppForm: {},
      preserveAppForm: {},
      checkAppForm: {},
      checkNotificationForm: {
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
            id: "server-external-address",
            label: "Серия охотничьего билета",
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
            id: "server-external-address",
            label: "Номер охотничьего билета",
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
