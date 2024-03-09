import  User  from '../api/Users.js';
import { useRouter} from 'vue-router'
import { ref } from 'vue';

export default function useUser(){
    const data = ref([])
    const user = ref([])
    const router = useRouter()
    const totaluserscount = ref(0)
    const pagefrom = ref(0)
    const pageto = ref(0)
    const currentpage = ref(1)
    const nextpage = ref(1)
    const prevpage = ref(0)

    const getAllData = async (params) => {
        // default sorting order
        if (!params?.sort) {
            params = { ...params, sort: 'asc', page: params?.page || currentpage };
        }

        let response = await User.get('/', { params })
        setData(response.data)
        localStorage.setItem('getAllData', JSON.stringify(response.data));
    }

    const setData = (response) => {
        data.value      = response.data;
        totaluserscount.value = response.total || 0
        pagefrom.value = response.from
        pageto.value = response.to
        currentpage.value = response.current_page
        nextpage.value = response.next_page_url ? currentpage.value + 1 : null
        prevpage.value = response.prev_page_url ? currentpage.value - 1 : null
    }

    const createUser = async (data) => {
          await User.post(`/`,data)
          await router.push({name: 'list'})
          
    }

    const getUser = async (id) => {
        const res = await User.get(`/${id}`)
        user.value = res.data
    };

    const updateUser = async (params) => {
          await User.put(`/${params.id}` , params)
          await router.push({name: 'list'})
        }
    
    const deleteUser = async (id) => {
        let confirm = window.confirm('Want to delete this user ?')
        if(confirm) { 
            await User.delete(`/${id}`)
            await getAllData();
        }
   }

    return {
        data,
        user,
        totaluserscount,
        getAllData,
        deleteUser,
        updateUser,
        createUser,
        getUser,
        pagefrom,
        pageto,
        currentpage,
        nextpage,
        prevpage,
        setData
    }
  
 }
