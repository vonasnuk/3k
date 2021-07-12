<template>
    <v-container class="list-container">
        <v-text-field
            v-model="searchString"
            clearable
            label="Поиск"
            @keydown="getSearchTasks"
        ></v-text-field>
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
            <tr v-for="item in taskList">
                <td>{{ item.taskName }}</td>
                <td>{{ item.executionDate }}</td>
                <td>{{ item.description }}</td>
                <td>{{ item.user }}</td>
                <td>{{ item.status }}</td>
            </tr>
            </tbody>
        </v-simple-table>

        <v-row>
            <h3 class="table-title">Новая задача:</h3>
        </v-row>

        <form class="new-task" @submit="updateNewTask" ref="formNewTask">
            <div class="new-task__item">
                <v-text-field required v-model="taskName" label="Название"></v-text-field>
            </div>
            <div class="new-task__item">
                <v-menu
                    v-model="toggleCalendar"
                    :close-on-content-click="false"
                >
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                            :value='picker'
                            clearable
                            label="Выбрать дату"
                            v-on="on"
                            @click:clear="date = null"
                        ></v-text-field>
                    </template>
                    <v-date-picker
                        :min="nowDate"
                        v-model="picker"
                        @change="toggleCalendar = false"
                    ></v-date-picker>
                </v-menu>
            </div>

            <div class="new-task__item">
                <v-text-field v-model="description" label="Описание"></v-text-field>
            </div>
            <div class="new-task__item">
                <v-select
                    v-model="user"
                    :items="userList"
                    label="Выберите пользователя"
                ></v-select>
            </div>
            <div class="new-task__item">
                <v-select
                    v-model="status"
                    :items="taskStatus"
                    label="Статус"
                ></v-select>
            </div>
            <div class="new-task__btn">
                <v-btn class="ma-2" light type="submit">
                    <v-icon light left>mdi-plus-circle</v-icon>
                    Add
                </v-btn>
            </div>
        </form>

        <router-link to="/users"><h3>Список активных пользователей</h3></router-link>
    </v-container>

</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
    name: 'Home',
    data() {
        return {
            newTask: {},
            taskList: null,
            searchString: '',
            taskStatus: ['К выполнению', 'В процессе', 'Тестирование', 'Готово'],
            taskName: null,
            description: null,
            user: '',
            userList: [],
            status: null,
            toggleCalendar: false,
            nowDate: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            picker: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        }
    },
    computed: {
        ...mapGetters(['getTaskList', 'getUserList', 'searchItem']),

    },
    methods: {
        ...mapActions(['addTask']),
        updateNewTask(event) {
            this.newTask['taskName'] = this.taskName
            this.newTask['executionDate'] = this.picker
            this.newTask['description'] = this.description
            this.newTask['user'] = this.user
            this.newTask['status'] = this.status

            this.getUserList.forEach(user => {
                if (user.name === this.user){
                    this.newTask['id'] = user.id
                }
            })

            this.addTask(this.newTask)
            this.newTask = {}

            this.$refs.formNewTask.reset()
            event.preventDefault();
        },
        getSearchTasks(){

            if (this.searchString.length > 0){
                this.taskList = this.searchItem(this.searchString)
            }
            else this.taskList = this.getTaskList
        }
    },
    mounted() {
        this.taskList = this.getTaskList
        this.getUserList.forEach(user => {
            this.userList.push(user.name)
        })
        this.searchItem('3')
    }
}
</script>

<style scoped lang="scss">
.list-container {
    h3 {
        margin-bottom: 50px;
    }

    .new-task {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: column;

        &__item {
            width: 100%;
            select {
                border: 1px solid black;
                border-radius: 5px;
                padding: 5px;
                cursor: pointer;
            }
        }
    }

    .list-table {
        margin-bottom: 50px;
        &__body {
            tr {
                td {
                    text-align: center;
                }
            }
        }
    }

}

</style>