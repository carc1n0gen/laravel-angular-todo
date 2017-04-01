<template>
    <div id="todo-app">
        <nav class="navbar navbar-default navbar-fixed-top">
            <div class="container-fluid">
                <div class="navbar-header">
                    <a href="/" class="navbar-brand">Todo</a>
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#main-nav" aria-expanded="false">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                </div>
                <div class="collapse navbar-collapse" id="main-nav">
                    <ul class="nav navbar-nav navbar-collapse navbar-right">
                        <li><a @click="doLogout()">Logout <i class="glyphicon glyphicon-log-out"></i></a></li>
                    </ul>
                </div>
            </div>
        </nav>
        <div class="container">
            <div class="row">
                <div class="col-md-8 col-md-offset-2">

                    <div class="panel panel-default">
                        <div class="panel-heading">
                            In Progress
                            <i @click="showInputDialog()" class="btn btn-primary btn-todo btn-todo-sml glyphicon glyphicon-plus"></i>
                        </div>

                        <table class="table">
                            <tbody>
                                <tr v-if="inProgress.length === 0">
                                    <td>No tasks in progress</td>
                                </tr>
                                <tr v-for="todo in inProgress">
                                    <td class="info-column">
                                        <!--<i @click="toggleEditTodo(todo.id)" :title="'Update ' + todo.name" class="btn btn-default glyphicon glyphicon-pencil"></i>-->
                                        <div class="todo-name">{{ todo.name }}</div>
                                        <small class="todo-metadata">created {{ timeago(todo.created_at) }}</small>
                                    </td>
                                    <td class="action-column">
                                        <div class="pull-right">
                                            <i @click="completeTodo(todo.id)" :title="'Complete ' + todo.name" class="btn btn-success btn-todo glyphicon glyphicon-ok"><span class="sr-only">Complete {{ todo.name }}</span></i>
                                            <i @click="deleteTodo(todo.id)" :title="'Delete ' + todo.name" class="btn btn-danger btn-todo glyphicon glyphicon-trash"><span class="sr-only">Delete {{ todo.name }}</span></i>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="panel panel-default">
                        <div class="panel-heading">Complete</div>

                        <table class="table">
                            <tbody>
                                <tr v-if="complete.length === 0">
                                    <td>Nothing completed</td>
                                </tr>
                                <tr v-for="todo in complete">
                                    <td>
                                        <!--<i @click="toggleEditTodo(todo.id)" :title="'Update ' + todo.name" class="btn btn-default glyphicon glyphicon-pencil"></i>-->
                                        <div class="todo-name">{{ todo.name }}</div>
                                        <small class="todo-metadata">completed {{ timeago(todo.completed_at) }}</small>
                                    </td>
                                    <td>
                                        <div class="pull-right">
                                            <i @click="restartTodo(todo.id)" :title="'Restart ' + todo.name" class="btn btn-primary btn-todo glyphicon glyphicon-refresh"><span class="sr-only">Restart {{ todo.name }}</span></i>
                                            <i @click="deleteTodo(todo.id)" :title="'Delete ' + todo.name" class="btn btn-danger btn-todo glyphicon glyphicon-trash"><span class="sr-only">Delete {{ todo.name }}</span></i>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<style>
    body {
        padding-top: 51px;
    }
</style>

<script>
    import moment from 'moment';
    import auth from '../services/auth'
    import TodoStore from '../services/todo-store'

    export default {
        mounted() {
            return TodoStore.list().then(todos => this.todos = todos)
        },

        data() {
            return {
                todos: []
            }
        },

        methods: {
            createTodo(name) {
                return TodoStore.create(name)
                    .then(todo => this.todos.push(todo))
            },

            toggleEditTodo(id) {

            },

            editTodo(id, name) {

            },

            completeTodo(id) {
                return TodoStore.update(id, { completed_at: moment().format('Y-MM-DD HH:mm:ss') })
                    .then((todo) => {
                        const i = this.findIndex(id)
                        Vue.set(this.todos, i, todo)
                    })
            },

            restartTodo(id) {
                return TodoStore.update(id, { completed_at: null })
                    .then((todo) => {
                        const i = this.findIndex(id)
                        Vue.set(this.todos, i, todo)
                    })
            },

            deleteTodo(id) {
                return TodoStore.delete(id)
                    .then(() => {
                        const i = this.findIndex(id)
                        this.todos.splice(i, 1)
                    })
            },

            findIndex(id) {
                return this.todos.findIndex(todo => todo.id === id)
            },

            doLogout() {
                return auth.logout()
            },

            showInputDialog() {
                const name = prompt("Enter the task name: ", "")
                if (name && name.trim()) {
                    return this.createTodo(name)
                }
            },

            timeago(datetime) {
                return moment(datetime).fromNow()
            },
        },

        computed: {
            inProgress() {
                return this.todos.filter(todo => 
                    todo.completed_at === null || todo.completed_at === undefined)
            },

            complete() {
                return this.todos.filter(todo => 
                    todo.completed_at !== null && todo.completed_at !== undefined)
            }
        }
    }
</script>
