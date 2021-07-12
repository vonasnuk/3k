<template>
    <v-container>
        <h2>Список активных пользователей</h2>
        <div class="users-list" v-for="user in userArr">
            <div class="users-list__item" title="Выберите пользователя, чтобы посмотреть детали">
                <router-link :to="'/user/' + user.id">{{user.user}}</router-link>
            </div>
        </div>
    </v-container>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
    name: "User-list",
    data () {
        return {
            userArr: []
        }
    },
    computed:{
        ...mapGetters(['getTaskList']),
    },
    mounted(){
        this.getTaskList.forEach(user => {
            let obj = {}
            obj.user = user.user
            obj.id = user.id
            this.userArr.push(obj)
        })
        this.userArr = Array.from(new Set(this.userArr.map(a => a.user)))
            .map(user => {
                return this.userArr.find(a => a.user === user)
            })
    }
}
</script>

<style scoped>

</style>