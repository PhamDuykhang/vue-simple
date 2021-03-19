<template>
    <div>
        <router-link to="/admin/products/create" class="btn btn-primary my-2">Create product</router-link>
        <table class="table table-sm table-bordered"> 
            <thead>
                <th>ID</th>
                <th>Name</th>
                <th>Category</th>
                <th class="text-right">Price</th>
            </thead>
            <tbody>
                <tr v-for="p in products" v-bind:key="p.id">
                    <td>{{p.id}}</td>
                    <td>{{p.name}}</td>
                    <td>{{p.category}}</td>
                    <td class="text-right"> {{p.price|currency}}</td>
                    <td class="text-center">
                        <button class="btn btn-sm btn-danger mx-1" v-on:click="removeProduct(p)">Delete</button>
                        <button class="btn btn-sm btn-warning mx-1" v-on:click="handleEdit(p)">Edit</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <pagecontroll/>   
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import pagecontroll from '../pagecontroll.vue'
export default {
  components: { pagecontroll },
  computed:{
      ...mapGetters({products:"processedProducts"})
  },
  methods:{
      ...mapActions(['removeProduct']),
      handleEdit(product){
          
          this.$router.push(`/admin/products/edit/${product.id}`)
      }
  }
    
}
</script>