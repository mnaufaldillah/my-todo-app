<script setup>
import Swal from 'sweetalert2';
import axios from '../../config/axiosInstance'
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

const router = useRouter();
const email = ref('');
const password = ref('');
const loading = ref(false);

async function handleLogin() {
    try {
        loading.value = true;

        const { data } = await axios({
            method: 'POST',
            url: '/login',
            data: {
                email: email.value,
                password: password.value
            }
        });

        localStorage.setItem('access_token', data.access_token);

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
            <form @submit.prevent="handleLogin">
                <div class="m-4">
                    <label htmlFor="email">Email</label>
                    <input 
                        type="text" 
                        name="email"
                        v-model="email"
                        placeholder="Please enter your email" 
                        class="input input-bordered w-full max-w-xs" 
                    />
                </div>

                <div class="m-4">
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        name="password"
                        v-model="password"
                        placeholder="Please enter your password" 
                        class="input input-bordered w-full max-w-xs" 
                    />
                </div>

                <button
                    type="submit"
                    class="btn btn-neutral"
                >
                    Login
                </button>
            </form>

            <div class="m-8 bg-white">
                <h4 class="text-2xl">Don't have an account?</h4>

                <RouterLink to="/register" className="my-4 btn btn-outline btn-neutral btn-block">Register</RouterLink>
            </div>
        </div>
    </div>
</template>