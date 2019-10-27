<script lang="ts">
import createComponent from "@/core/component";

import AuthForm from "@/modules/auth/shared/AuthForm.vue";
import { submittedForm, updatedLoginModel, $loginModel } from "@/modules/auth";
import { BrInput, BrButton } from "@/shared";

const store = {
  $loginModel,
};

export default createComponent({
  name: "LoginPage",

  components: {
    AuthForm,
    BrInput,
    BrButton,
  },

  methods: {
    updatedLoginModel,
    submittedForm,
  },
}, store);
</script>

<template>
  <div class="page">
    <div class="container">
      <div class="row">
        <div class="col">
          <auth-form
            title="Увійти"
            :current-page="$route.name"
            @change-route="$router.push({ name: $event })"
          >
            <validation-observer v-slot="{ valid }">
              <validation-provider
                v-slot="{ errors }"
                rules="required|email"
                class="auth-form__textfield"
              >
                <br-input
                  :value="$loginModel.email"
                  name="email"
                  type="email"
                  @input="updatedLoginModel({
                    key: 'email',
                    value: $event
                  })"
                >
                  E-mail
                  <template
                    v-if="errors.length"
                    slot="error"
                  >
                    Введіть валідний e-mail
                  </template>
                </br-input>
              </validation-provider>

              <validation-provider
                v-slot="{ errors }"
                rules="required"
                class="auth-form__textfield"
              >
                <br-input
                  type="password"
                  :value="$loginModel.password"
                  name="password"
                  @input="updatedLoginModel({
                    key: 'password',
                    value: $event
                  })"
                >
                  Пароль
                </br-input>
              </validation-provider>

              <br-button
                type="primary"
                :disabled="!valid"
                fullwidth
                @click="submittedForm"
              >
                Увійти
              </br-button>
            </validation-observer>
          </auth-form>
        </div>
      </div>
    </div>
  </div>
</template>
