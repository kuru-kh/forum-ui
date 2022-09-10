<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Create Forum</div>
        
                    <div class="card-body">
                        <form @submit.prevent="createForum">
                            <div class="row mb-3">
                                <label class="col-md-4 col-form-label">Title</label>
        
                                <div class="col-md-12">
                                    <input type="text" class="form-control" v-model="form.title" required>
                                </div>
                            </div>
        
        
                            <div class="row mb-0">
                                <div class="col-md-8 offset-md-4">
                                    <button type="submit" class="btn btn-primary me-1">
                                        Post
                                    </button>
                                    <router-link class="btn btn-outline-dark" :to="{name:'forum.index'}">Back</router-link>
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
    import forum from '../composables/forum';
    import { authCheck } from '../services/helper'
    import { reactive } from '@vue/reactivity'
    export default {
        setup() {
            const auth = authCheck()
            const form = reactive({
                'title' : ''
            })
            const { success, errors, create } = forum()

            const createForum = async() => {
                await create({ ...form })
            }
            return {
                form,
                createForum,
                errors,
                success,
                auth
            }
        }
    }
</script>