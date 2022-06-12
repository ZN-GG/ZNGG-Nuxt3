<template>
    <div>
        <div class="flex container mx-auto my-6">
            <div class="w-2/12">
                <div class="w-full bg-white rounded p-4">
                    <UserLeftContents />
                </div>
            </div>
            <div class="w-8/12">
                <div class="w-full bg-white rounded mx-2 p-4">
                    <NuxtChild />
                </div>
            </div>
            <div class="w-2/12">
                <div class="w-full bg-white rounded mx-2"></div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'default',
    middleware: ['auth']
})
</script>

<style lang='postcss' scoped>
</style>

