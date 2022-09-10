<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Register</div>
                    <form @submit.prevent="registerUser">
                        <div class="card-body">
                            <div class="row mb-3">
                                <label for="name" class="col-md-4 col-form-label text-md-end">Name</label>

                                <div class="col-md-6">
                                    <input id="name" type="text" class="form-control" v-model="form.name" required
                                        autocomplete="name" autofocus>
                                </div>
                            </div>

                            <div class="row mb-3">
                                <label for="email" class="col-md-4 col-form-label text-md-end">Email Address</label>

                                <div class="col-md-6">
                                    <input id="email" type="email" class="form-control " v-model="form.email" required autocomplete="email">
                                </div>
                            </div>

                            <div class="row mb-3">
                                <label for="password" class="col-md-4 col-form-label text-md-end">Password</label>

                                <div class="col-md-6">
                                    <input id="password" type="password" class="form-control" v-model="form.password" required
                                        autocomplete="new-password">
                                </div>
                            </div>

                            <div class="row mb-0">
                                <div class="col-md-6 offset-md-4">
                                    <button type="submit" class="btn btn-primary">
                                        Register
                                    </button>
                                </div>
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
</template>

<script>
    import { reactive } from '@vue/reactivity'
    import authentication from '../composables/authentication'
    export default {
        setup() {
            const initialState = {
                'name': '',
                'email': '',
                'password': '',
            };
            const form = reactive({...initialState})
            const { register, errors, success } = authentication()
            const registerUser = async() => {
                await register({...form})
                if (success) {
                    Object.assign(form, initialState);
                }
            }
            return {
                form, registerUser, errors, success
            }
        }
        
    }
</script>