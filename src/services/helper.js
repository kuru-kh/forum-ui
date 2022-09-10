import { useStore } from 'vuex'
import {useRouter} from 'vue-router';
export function  authCheck() {
        const store = new useStore()
        const router = useRouter()
        let auth = store.state.auth;
        if (auth && auth.token) {
            return auth.user
        } else {
            router.push({
                name : 'login'
            })
        }
    }


export function formatResponseError(error)
{
    let error_text = 'Something went wrong'
    if (error.response && error.response.data) {
        if (error.response.data.errors) {
            for (const key in error.response.data.errors) {
                error_text += error.response.data.errors[key][0] + '';
            }
        } else if (error.response.data.message) {
            error_text = error.response.data.message
        }
    }

    return error_text
}
