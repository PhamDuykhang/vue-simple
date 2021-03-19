<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col bg-secondary text-white">
        <a class="nav-brand">SPORT STORE Admin</a>
      </div>
    </div>
    <div class="row">
      <div class="col-3 bg-secondary p-2">
        <router-link
          to="/admin/products"
          class="btn btn-clock btn-primary"
          active-class="active"
          >Products</router-link
        >
        <router-link
          to="/admin/orders"
          class="btn btn-clock btn-primary"
          active-class="active"
          >Order</router-link
        >

      </div>
      <div class="col-9 p-2">
          <router-view/>
      </div>
    </div>
  </div>
</template>
