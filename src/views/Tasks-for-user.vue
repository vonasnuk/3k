<template>
    <v-container>
        <div>Задачи пользователя {{getList.user}}</div>
        <v-simple-table class="list-table">
            <thead class="list-table__head">
            <tr>
                <th>Название</th>
                <th>Дата выполнения</th>
                <th>Описание</th>
                <th>Закрепленный пользователь</th>
                <th>Статус</th>
            </tr>
            </thead>
            <tbody class="list-table__body">
            <tr v-for="item in getList">
                <td>{{ item.taskName }}</td>
                <td>{{ item.executionDate }}</td>
                <td>{{ item.description }}</td>
                <td>{{ item.user }}</td>
                <td>{{ item.status }}</td>
            </tr>
            </tbody>
        </v-simple-table>
    </v-container>
</template>

<script>
import {mapGetters} from 'vuex'


export default {
    name: "Tasks-for-user",
    computed: {
    ...mapGetters(['getTaskList', 'getListById']),
        getList: function () {
            return this.getListById(+this.$route.params.id)
        }
    },
    mounted() {
    }
}
</script>

<style scoped>

</style>