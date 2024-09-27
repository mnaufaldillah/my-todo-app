<script setup>
import Swal from 'sweetalert2';
import axios from '../../config/axiosInstance'
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

const router = useRouter();
const todo = ref('');
const loading = ref(false);

async function handleAddTodo() {
    try {
        loading.value = true;

        await axios({
            method: 'POST',
            url: '/todos',
            headers: {
                Authorization: `Bearer ${localStorage.access_token}`
            },
            data: {
                todo: todo.value,
            }
        });

        router.push('/')
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
</script>

<template>
    <div class="w-full p-6 m-auto bg-white lg:max-w-xl">
        <div class="overflow-x-auto space-y-4">
            <form @submit.prevent="handleAddTodo">
                <div class="m-4">
                    <label htmlFor="todo">New Todo</label>
                    <input 
                        type="text" 
                        name="todo"
                        v-model="todo"
                        placeholder="In my mind today..." 
                        class="input input-bordered w-full max-w-xs" 
                    />
                </div>

                <button
                    type="submit"
                    class="btn btn-neutral"
                >
                    Add
                </button>
            </form>

            <div class="m-8 bg-white">
                <RouterLink to="/" className="my-4 btn btn-outline btn-neutral btn-block">Back to Home</RouterLink>
            </div>
        </div>
    </div>
</template>