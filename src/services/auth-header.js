import { useStore } from 'vuex'
export default function authHeader() {
    const store = useStore();

    const auth = store.state.auth;
    if (auth && auth.token) {
        return {
            Authorization: 'Bearer ' + auth.token
        };
    } else {
        return {};
    }
}