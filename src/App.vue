<template>
    <v-app>
        <router-view></router-view>
    </v-app>
</template>

<script>

import Home from "../src/views/Home"



export default {
    name: "App",
    components:{
        Home
    }
}
</script>

<style scoped>

</style>