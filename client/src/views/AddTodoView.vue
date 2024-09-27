<script setup>
import FormTodo from '../components/form/FormTodo.vue';
</script>

<template>
    <div class="flex flex-col items-center justify-between">
        <div class="m-4">
            <h1 class="font-bold text-4xl">New Todo</h1>
        </div>

        <div class="m-4">
            <FormTodo />
        </div>
    </div>
</template>