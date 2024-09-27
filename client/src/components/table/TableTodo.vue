<script setup>
import Swal from 'sweetalert2';
import { formatDate } from '../../helpers/formatDate';
import axios from '../../config/axiosInstance';
import { ref } from 'vue';

defineProps({
    todoList: Array,
    fetchTodos: Function,
    handleComplete: Function,
    handleUncomplete: Function,
    handleDelete: Function
})

const loading = ref(false);
</script>

<template>
    <div class="w-full p-6 m-auto bg-white lg:max-w-xl">
        <div class="overflow-x-auto space-y-4">
            <table class="table table-zebra">
                <!-- head -->
                <thead>
                <tr>
                    <th>Number</th>
                    <th>Activty</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                <!-- row 1 -->
                 <tr v-for="item in todoList" :key="item.id">
                        <th>{{ item?.id }}</th>
                        <td>{{ item?.todo}}</td>
                        <td>{{ formatDate(item.createdAt) }}</td>
                        <td>{{ item?.isCompleted ? "Yes" : "No" }}</td>
                        <td>
                            <button v-if="item.isCompleted === false" class="my-4 btn btn-outline btn-neutral btn-block" @click="handleComplete(item.id)">Mark as Completed</button>
                            <button v-else-if="item.isCompleted === true" class="my-4 btn btn-outline btn-neutral btn-block" @click="handleUncomplete(item.id)">Mark as Uncompleted</button>
                            <button class="my-4 btn btn-outline btn-neutral btn-block" @click="handleDelete(item.id)">Delete</button>
                        </td>
                 </tr>
                <!-- row 2 -->
                </tbody>
            </table>
        </div>
    </div>
</template>