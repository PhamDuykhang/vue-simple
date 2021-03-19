<template>
    <div class="m-2 text-center">
        <h2>Thank!</h2>
        <p>Thank for placing your order which is #{{orderId}}. </p>
        <p>We will ship your goods as soon as posiable.</p>
        <router-link to="/" class="btn btn-primary"> Retrun to store</router-link>
    </div>
</template>
<script>
export default {
    computed:{
        orderId(){
            return this.$route.params.id
        }
    }
}
</script>