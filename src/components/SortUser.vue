<template>
    <div>
        <transition name='slide-fade'>
            <span v-if="!isSorted" @click = "isSorted = true" class = "font-md text-2xl md:text-3xl mt-2 md:mt-8 md:mr-5 material-icons-outlined cursor-pointer hover:text-blue-300">
                filter_list
            </span>
            <span v-else @click = "isSorted = false" class = "font-md text-2xl md:text-3xl mt-2 md:mt-8 md:mr-5 material-icons-outlined cursor-pointer hover:text-blue-300">
                close
            </span>
        </transition>
        <transition name="dropdown">
            <div v-show= "isSorted" class="z-20  relative">
                <ul class="text-sm md:text-base  bg-white shadow absolute right-5  md:right-9 w-40 text-center rounded-md  md:py-5  md:space-y-2 cursor-pointer  " id="cars">
                    <li @click="handleSetSortType('no')" :class="{'bg-blue-200':sortType=='no'}" class="hover:bg-blue-200  py-2     font-md">Sort: No Sort</li>
                    <li @click="handleSetSortType('asc')" :class="{'bg-blue-200':sortType=='asc'}" class="hover:bg-blue-200 py-2  font-md">Sort name : A ➝ Z</li>
                    <li @click="handleSetSortType('desc')" :class="{'bg-blue-200':sortType=='des'}" class="hover:bg-blue-200 py-2  font-md">Sort name : Z ➝ A</li>
    
                </ul>
            </div>
        </transition>
    </div>
</template>
    
<script setup>
    import { ref, defineEmits } from 'vue'

    const isSorted = ref(false)
    const sortType = ref('')
    const emit = defineEmits(['setSortType'])


    const handleSetSortType = (type) => {
        sortType.value = type
        emit('setSortType', type)
    }
</script>
    
<style scoped>
    .dropdown-enter-active,
    .dropdown-leave-active {
        transition: all 1s;
    }
    
    .dropdown-enter,
    .dropdown-leave-to {
        opacity: 0;
        transform: translateY(-30px);
    }
    
    .slide-fade-enter-active,
    .slide-fade-leave-active {
        transition: all .8s;
    }
    
    .slide-fade-enter,
    .slide-fade-leave-active {
        opacity: 0;
    }
    
    .slide-fade-enter {
        transform: translateX(-31px);
    }
    
    .slide-fade-leave-active {
        transform: translateX(31px);
    }
</style>