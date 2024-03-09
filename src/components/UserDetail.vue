<template>
  <tr>
    <td class="px-5 py-5 bg-gray-50 dark:bg-gray-800 text-sm cursor-pointer ">
      <div class="flex items-center ">
        <div class="ml-2 text-sm    ">
          <p class="md:text-base text-gray-900 whitespace-pre">
            {{ `${userdata.full_name} ` }}
          </p>
        </div>
      </div>
    </td>

    <td class="px-5 py-5 bg-white text-sm">
      <div class="flex items-center ">
        <div class="ml-2 text-sm    ">
          <p class="md:text-base text-gray-900 whitespace-pre">
            {{ `${userdata.email} ` }}
          </p>
        </div>
      </div>
    </td>

    <td class="px-5 py-5 bg-gray-50 dark:bg-gray-800 hidden md:table-cell text-center md:pl-1 md:py-5 text-sm">
      <router-link :to="{name: 'edit', params: {id: userdata.id }} " class="text-gray-500  hover:text-blue-500  mx-2">
        <i class="font-bold material-icons-outlined md:text-md">manage_accounts</i>
      </router-link>
      <a @click="deleteUser(userdata.id)" class="text-gray-500 cursor-pointer ml-2">
        <i
          class="material-icons-round text-gray-500 md:text-md">person_remove</i>
      </a>
    </td>
  </tr>
</template>

<script setup>
import useUser from '../composables/Users'
defineProps({
  userdata: {
    type: Object,
    required: true
  }
})
const { deleteUser } = useUser()
</script>

<style scoped>
td {
  width: 5%;
}
</style>