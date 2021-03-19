<template>
  <div>
    <div class="container-fluid">
      <div class="row">
        <div class="col bg bg-black text-white">
          <a class="navbar-brand">SPORTS STORE</a>
        </div>
      </div>
    </div>
    <div class="md-2">
      <div class="from-group m-2">
        <label for="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          class="form-control"
          :class="{ 'is-invalid': $v.name.$error }"
          v-model="$v.name.$model"
        />

        <div v-if="!$v.name.$required" class="invalid-feedback">
          Name is require
        </div>
      </div>
    </div>
    <div class="md-2">
      <div class="from-group m-2">
        <label for="name">Email</label>
        <input
          type="text"
          name="email"
          id="email"
          class="form-control"
          :class="{ 'is-invalid': $v.email.$error }"
          v-model="$v.email.$model"
        />

        <div v-if="!$v.email.$required" class="invalid-feedback">
          Email is require
        </div>
        <div v-if="!$v.email.$email" class="invalid-feedback">
          Email input invalid
        </div>
      </div>
      <!-- Address -->
    </div>
    <div class="md-2">
      <div class="from-group m-2">
        <label for="name">Address</label>
        <input
          type="text"
          name="address"
          id="adress"
          class="form-control"
          :class="{ 'is-invalid': $v.address.$error }"
          v-model="$v.address.$model"
        />

        <div v-if="!$v.address.$required" class="invalid-feedback">
          Adress is require
        </div>
      </div>
    </div>

    <div class="md-2">
      <div class="from-group m-2">
        <label for="name">City</label>
        <input
          type="text"
          name="city"
          id="city"
          class="form-control"
          :class="{ 'is-invalid': $v.city.$error }"
          v-model="$v.city.$model"
        />

        <div v-if="!$v.city.$required" class="invalid-feedback">
          City is require
        </div>
      </div>
    </div>

    <div class="md-2">
      <div class="from-group m-2">
        <label for="name">Zip</label>
        <input
          type="text"
          name="zip"
          id="zip"
          class="form-control"
          :class="{ 'is-invalid': $v.zip.$error }"
          v-model="$v.zip.$model"
        />

        <div v-if="!$v.zip.$required" class="invalid-feedback">
          Zip code is require
        </div>
      </div>
    </div>

    <div class="text-center">
      <router-link to="/cart" class="btn btn-secondary m-1">Back</router-link>
      <button class="btn btn-primary m-1" v-on:click="submitOrder">
        Place order
      </button>
    </div>
  </div>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";
import { mapActions } from "vuex";

export default {
  components: {},
  data: function() {
    return {
      name: null,
      email: "",
      zip: null,
      address: "",
      city: "",
    };
  },
  validations: {
    name: {
      required,
    },
    email: {
      required,
      email,
    },
    zip: {
      required,
    },
    address: {
      required,
    },
    city: {
      required,
    },
  },
  methods: {
    ...mapActions({
      storeOrder: "storeOrder",
      clearData: "cart/clearCartData",
    }),
    async submitOrder() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        let order = await this.storeOrder({
          name: this.name,
          email: this.email,
          address: this.address,
          city: this.city,
          zip: this.zip,
        });
        this.clearData();
        this.$router.push(`/thank/${order}`);
      }
    },
  },
};
</script>
