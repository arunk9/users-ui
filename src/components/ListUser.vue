<script setup>
import useUser from '../composables/Users'
import SortUser from './SortUser.vue'
import { ref, onMounted, watch } from 'vue'
import UserDetail from './UserDetail.vue'

//Get User data
const {
  data,
  getAllData,
  deleteUser,
  totaluserscount,
  pagefrom,
  pageto,
  currentpage,
  nextpage,
  prevpage,
  setData,
} = useUser()

// Sort User
const isSort = ref(false)
const sortedData = async (sort) => {
  isSort.value = true
  switch (sort) {
    case 'asc':
      await getAllData({ sort })
      break
    case 'desc':
      await getAllData({ sort })
      break
    default:
      isSort.value = false
  }

  return data
}

const search = ref('')
const filterUsers = async () => {
  return getAllData({ text: search.value.toLowerCase() })
}

// watch search query
watch(search, async () => filterUsers())

const isOpenModal=ref(false)
const modalData=ref([])
const openModal=(data)=>{
    if(window.innerWidth < 820){
        isOpenModal.value = true
        modalData.value = {...data}
    }
}

onMounted(async () => {
  let savedResults = localStorage.getItem('getAllData');
  if (savedResults) {
    savedResults = JSON.parse(savedResults);
    setData(savedResults);
  } else {
    await getAllData()
  }
})


</script>

<template>
  <transition name="modal">
    <modal v-if="isOpenModal" :userData="modalData"
           @closeModal="isOpenModal=false"
           @deleteUser="deleteUser">
    </modal>

  </transition>

  <div >
    <div class="z-999 search-container flex justify-between md:ml-8 py-2">
      <div class="search-contain relative mx-2 px-4">
        <input @keydown="filterUsers()" v-model="search" type="text" class="transition duration-200  ease-in-out bg-gray-200 h-10  pr-8 pl-5 rounded z-0 focus:bg-gray-100 focus:outline-none search-input" placeholder="Search User...">
        <span class="absolute md:text-2xl material-icons search-icon">search</span>
      </div>
      <div>
        <router-link to="/create" class="md:p-3 rounded-full font-bold text-center cursor-pointer ">
          <span class="p-3 xl:mr-7 material-icons-outlined">
              person_add
          </span>
        </router-link>
      </div>
    </div>
    <div class="container mx-auto pb-6 px-4  sm:px-8 ">
      <div class="py-8 md:py-4">
        <div class="my-2 flex sm:flex-row flex-col">
        </div>
        <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-6 overflow-x-auto ">
          <div class="flex  justify-between ">
            <div>
              <p class="text-3xl font-bold">USERS</p>
              <p class="text-gray-400 mt-2 mb-5">{{   totaluserscount }} users</p>
            </div>
            <sort-user @setSortType="sortedData"></sort-user>
          </div>
          <div class="inline-block min-w-full shadow md:shadow-xl md:pl-4 pt-6 rounded-lg overflow-hidden ">
            <tbody>
            <transition-group name='list'>
              <user-detail v-for="user in data" :key="user.id"
                            :userdata='user' @click="openModal(user)">
              </user-detail>
            </transition-group>
            </tbody>

            <!-- Pagination -->
            <div class="px-5 py-5 bg-white  flex flex-col xs:flex-row items-center xs:justify-between">
              <div class="flex items-center space-x-5">
                <a
                  @click="getAllData({page: prevpage})"
                  class="flex items-center px-4 py-2 text-gray-800 cursor-pointer  rounded-md">
                                  <span
                                    :class="{'text-gray-200':currentpage==1}"
                                    class="transition duration-200 ease-in-out material-icons text-base">
                                              arrow_back_ios
                                      </span>
                </a>
                <a
                  @click="getAllData({page: nextpage})" class="px-4 py-2 font-bold  cursor-pointer rounded-3xl ">
                                  
                                  <span
                                    :class="{'text-gray-200':!nextpage}"
                                    class="material-icons text-base font-bold"
                                  >
                                      arrow_forward_ios
                                  </span>
                </a>
              </div>
              <span class="text-sm font-md mt-5 font-bold xs:text-sm text-gray-400">
                Showing {{ totaluserscount === 0 ? 0 : pagefrom }} to  {{ totaluserscount === 0 ? 0 : pageto }} of {{ totaluserscount }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
th {
  text-align: center;
  padding-left: 75px;
}

.modal-enter-active, .modal-leave-active {
  transition: opacity 0.5s
}

.modal-enter, .modal-leave-active {
  opacity: 0
}

.search-container {
  display: flex;
  flex-direction: row-reverse;
  justify-content: center;
  width: 100vw;

}

.search-contain {
  width: 80%;
}

.search-input {
  display: relative;
  width: 40%;
}

.search-icon {
  top: 12%;
  left: 37%;
  cursor: pointer;
}

.search-list {
  top: 100%;
  left: 0%;
  width: 40%;
  max-height: 200px;
  overflow-x: hidden;
}

.list-enter-active {
  animation: add-item .8s;
}

.list-leave-active {
  animation: add-item .8s reverse;
}

.list-move {
  transition: transform .8s;
}

@media screen and (max-width: 820px) {
  .search-input {
    width: 90%;
    height: 30px;
    margin-left: 0.4rem;

  }

  .search-icon {
    top: 5%;
    left: 83%;
  }

  .search-list {
    left: 4%;
    width: 90%;
    max-height: 200px;
    overflow-x: hidden;
  }
}
</style>
