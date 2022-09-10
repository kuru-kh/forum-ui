import { ref } from "vue";
import axios from "axios";
import {useRouter} from 'vue-router';
import {formatResponseError} from "../services/helper";
import { useStore } from 'vuex'

// Axios.defaults.headers.common = {
//     'X-Requested-With': 'XMLHttpRequest'
// }
// axios.defaults.baseURL = process.env.API_PATH;
export default function authentication()
{
    const email = ref('')
    const password = ref('')
    const errors = ref('')
    const success = ref('')
    const router = useRouter()
    const store = useStore();
    const login = async() => {
        errors.value ='';
        success.value = ''
        let response = axios.post(`${import.meta.env.VITE_API_PATH}login`, {email : email.value, password: password.value})
        .then(response => {
            if (response.data.data.token) {
                store.commit('login', response.data.data)
                router.push({
                    name: 'forum.index'
                });
            }
        }).catch(error => {
            errors.value = formatResponseError(error)
        })
    }

    const register = async(data) => {
        errors.value = ''
        success.value = ''
        axios.post(`${import.meta.env.VITE_API_PATH}register`, data)
        .then(response => {
            console.log(response.data.data);
            if (response.data.data.name) {
                success.value = 'Registered successfully, Please login'
            }
        }).catch(error => {
            errors.value = formatResponseError(error)
        })
    }

    return {
        email, password, login, errors, register, success
    }
}