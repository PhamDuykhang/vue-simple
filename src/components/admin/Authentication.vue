<template>
  <div class="md-2">
    <h4 class="bg-primary text-white text-center p-2">
      SportsStore Administration
    </h4>
    <h4
      v-if="showFailureMessage"
      class="bg-danger text-white text-center p-2 my-2"
    >
      Authenticated failure! Please try again
    </h4>
    <div class="form-group">
      <label for="username">Username</label>
      <input
        id="username"
        type="text"
        class="from-controll"
        :class="{ 'is-invalid': $v.userName.$error }"
        v-model="$v.userName.$model"
      />
      <div v-if="!$v.userName.$required" class="invalid-feedback">
        User nameis require
      </div>
    </div>
    <div class="form-group">
      <label for="password">Password</label>
      <input
        id="password"
        type="password"
        v-model="$v.password.$model"
        class="from-controll"
        :class="{ 'is-invalid': $v.password.$error }"
      />
      <div v-if="!$v.password.$required" class="invalid-feedback">
        Password is requires
      </div>
    </div>
    <div class="text-center">
      <button class="btn btn-primary" v-on:click="handleAuth">Log In</button>
    </div>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import { mapActions, mapState } from "vuex";
export default {
  data: function() {
    return {
      userName: null,
      password: null,
      showFailureMessage: false,
    };
  },
  validations: {
    userName: {
      required,
    },
    password: {
      required,
    },
  },
  computed: {
    ...mapState({ authenticated: (state) => state.auth.authenticated }),
  },
  methods: {
    ...mapActions(["authenticate"]),
    async handleAuth() {
      
      this.$v.$touch();
      if (!this.$v.$invalid) {
        await this.authenticate({
          name: this.userName,
          password: this.password,
        });
        if (this.authenticated) {
          this.$router.push("/admin");
        } else {
          this.showFailureMessage = true;
        }
      }
    },
  },
};
</script>
