<script setup>
import { RouterLink, useRouter } from 'vue-router';
import TableTodo from '../components/table/TableTodo.vue';
import axios from '../config/axiosInstance';
import { onMounted, ref } from 'vue';
import Swal from 'sweetalert2';

const todos = ref([]);
const loading = ref(false);

const router = useRouter();

async function fetchTodos() {
    try {
        loading.value = true;

        const { data } = await axios({
            method: 'GET',
            url: '/todos',
            headers: {
                Authorization: `Bearer ${localStorage.access_token}`
            }
        });

        todos.value = data;
    } catch (error) {
        Swal.fire({
                title: 'Error.',
                text: error.response.data.message,
                icon: 'error',
                confirmButtonText: 'Lanjut'
        });
    } finally {
        loading.value = false;
    }
}

onMounted(() => {
    fetchTodos();
})

async function handleComplete(todoId) {
    try {
        loading.value = true;

        await axios({
            method: 'PATCH',
            url: `/todos/${todoId}/complete`,
            headers: {
                Authorization: `Bearer ${localStorage.access_token}`
            }
        });

        fetchTodos();
    } catch (error) {
        Swal.fire({
                title: 'Error.',
                text: error.response.data.message,
                icon: 'error',
                confirmButtonText: 'Lanjut'
        });
    } finally {
        loading.value = false;
    }
}

async function handleUncomplete(todoId) {
    try {
        loading.value = true;

        await axios({
            method: 'PATCH',
            url: `/todos/${todoId}/uncomplete`,
            headers: {
                Authorization: `Bearer ${localStorage.access_token}`
            }
        });

        fetchTodos();
    } catch (error) {
        Swal.fire({
                title: 'Error.',
                text: error.response.data.message,
                icon: 'error',
                confirmButtonText: 'Lanjut'
        });
    } finally {
        loading.value = false;
    }
}

async function handleDelete(todoId) {
    try {
        loading.value = true;

        await axios({
            method: 'DELETE',
            url: `/todos/${todoId}`,
            headers: {
                Authorization: `Bearer ${localStorage.access_token}`
            }
        });

        fetchTodos();
    } catch (error) {
        Swal.fire({
                title: 'Error.',
                text: error.response.data.message,
                icon: 'error',
                confirmButtonText: 'Lanjut'
        });
    } finally {
        loading.value = false;
    }
}

function handleLogout() {
    localStorage.clear();
    router.push('/login')
}
</script>

<template>
    <div class="flex flex-col items-center justify-between">
        <div class="m-4">
            <h1 class="font-bold text-4xl">Todo List</h1>
        </div>

        <div class="m-4">
            <button class="my-4 btn btn-outline btn-neutral btn-block" @click="handleLogout">Logout</button>
            <RouterLink to="/add" className="my-4 btn btn-outline btn-neutral btn-block">Add Todo</RouterLink>
        </div>

        <div class="m-4">
            <TableTodo :todoList="todos" :fetchTodos="fetchTodos" :handleComplete="handleComplete" :handleUncomplete="handleUncomplete" :handleDelete="handleDelete"/>
        </div>
    </div>
</template>