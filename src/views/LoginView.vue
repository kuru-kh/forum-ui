<template>
    <div class="container">
        <div class="row justify-content-center">            
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Login</div>

                    <div class="card-body">
                        <form @submit.prevent="performLogin">
                            <div class="row mb-3">
                                <label for="email" class="col-md-4 col-form-label text-md-end">Email Address</label>

                                <div class="col-md-6">
                                    <input id="email" type="email" class="form-control" v-model="email" required autocomplete="email" autofocus>                            
                                </div>
                            </div>

                            <div class="row mb-3">
                                <label for="password" class="col-md-4 col-form-label text-md-end">Password</label>

                                <div class="col-md-6">
                                    <input id="password" type="password" class="form-control" v-model="password" required autocomplete="current-password">
                                </div>
                            </div>

                            <div class="row mb-0">
                                <div class="col-md-8 offset-md-4">
                                    <button type="submit" class="btn btn-primary">
                                        Login
                                    </button>
                                </div>
                                <div class="col-md-8 text-danger" v-if="errors">
                                    {{errors}}
                                </div>
                                <div class="col-md-8 text-success" v-if="success">
                                    {{success}}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import authentication from '../composables/authentication'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router';
    export default {
        setup(props) {
            const store = new useStore()
            const router = useRouter()
            if (store.state.auth.token) {
                router.push({
                    name: 'forum.index'
                });
            }
            const { email, password, login, errors, success } = authentication()
            const performLogin = async() => {
                await login()
            }
            return {
                email, password, performLogin, errors, success
            }
        }
        

    }

    
</script>