<template>
    <div class=" z-0  flex items-center justify-center  mb-8 py-7 md:py-12 px-4 sm:px-6 lg:px-8  items-center">
        <div class="max-w-md w-full   space-y-8 p-4 bg-gray-100 rounded-xl shadow-lg z-10">
            <div class="grid  gap-8 grid-cols-1">
                <div class="flex flex-col ">
                    <div class="flex flex-col sm:flex-row items-center">
                    <h2 v-if="!user" class="font-semibold text-lg mr-auto">Create User</h2>
                    <h2 v-else class="font-semibold text-lg mr-auto">Update User</h2>
                    <div class="w-full sm:w-auto sm:ml-auto mt-3 sm:mt-0"></div>
                    </div>
                    <form @submit.prevent="saveUser" class="mt-5">
                    <div class="form">
                        <div class="md:flex flex-row md:space-x-4 w-full text-xs">
                            <div class="mb-3 space-y-2 w-full text-xs">
                                <label  class="font-semibold text-gray-600 py-2">First  Name <abbr title="required">*</abbr></label>
                                <input v-model="userdata.first_name" placeholder="First Name" class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4" required="required" type="text" name="integration[shop_name]" id="integration_shop_name">
                                <p class="text-red text-xs hidden">Please fill out this field.</p>
                            </div>
                            <div class="mb-3 space-y-2 w-full text-xs">
                                <label class="font-semibold text-gray-600 py-2">Last  Name <abbr title="required">*</abbr></label>
                                <input v-model="userdata.last_name" placeholder="Last Name" class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4" required="required" type="text" name="integration[shop_name]" id="integration_shop_name">
                                <p class="text-red text-xs hidden">Please fill out this field.</p>
                            </div>
                        </div>
                        <div class="mb-3 space-y-2 w-full text-xs">
                            <label class=" font-semibold text-gray-600 py-2">Email<abbr title="required">*</abbr></label>
                            <div class="flex flex-wrap items-stretch w-full mb-4 relative">
                                <div class="flex">
                                <span class=" flex items-center leading-normal bg-grey-lighter border-1 rounded-r-none border border-r-0 border-blue-300 px-3 whitespace-no-wrap text-grey-dark text-sm w-12 h-10 bg-blue-500 justify-center items-center  text-xl rounded-lg text-white">
                                <span class="material-icons">
                                mail
                                </span>
                                </span>
                                </div>
                                <input v-model="userdata.user_email" type="email" class="flex-shrink flex-grow flex-auto leading-normal w-px flex-1 border border-l-0 h-10 border-grey-light rounded-lg rounded-l-none px-3 relative focus:border-blue focus:shadow" placeholder="abcxy@abc.com" required>
                            </div>
                        </div>
                        <p class="text-xs text-red-500 text-right my-3">Required fields are marked with an asterisk <abbr title="Required field">*</abbr>
                        </p>
                        <div class="mt-5 text-right md:space-x-3 md:block flex flex-col-reverse">
                            <button @click="this.$router.push('/')" class="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100"> Cancel </button>
                            <button  type="submit" v-if='!userId' class="mb-2 md:mb-0 bg-green-400 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-green-600">Create</button>
                            <button v-else class="mb-2 md:mb-0 bg-green-400 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-green-600">Update</button>
                        </div>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
 </template>
 
<script setup>
import { defineProps, reactive, onMounted } from 'vue'
import useUser from '../composables/Users'

const { createUser, updateUser, getUser, user } = useUser()
let userdata = reactive({
    'first_name': '',
    'last_name': '',
    'user_email': '',
});
const props = defineProps({
                userId: {
                    type: String,
                }
            })

if (props?.userId) {
    onMounted(async () => await getUser(props.userId));
    userdata = user;
}

// eslint-disable-next-line no-unused-vars
const saveUser = async () => {
    props?.userId ? await updateUser(userdata.value) : await createUser({...userdata});
}
 </script>