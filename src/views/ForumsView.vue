<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8 text-danger" v-if="errors">
                {{errors}}
            </div>
            <div class="col-md-8 text-success" v-if="success">
                {{success}}
            </div>
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">
                        <div class="row">
                            <div class="col-md-4">Forums</div>
                            <div class="col-md-4"><input type="text" v-model="searchTxt" class="form-control"/></div>
                            <div class="col-md-2"><button @click="search" class="btn btn-outline-success">Search</button></div>
                            <div class="col-md-2"><RouterLink to="/forums/create" class="btn btn-success btn-block">Create</RouterLink></div>
                        </div>
                        
                    </div>
                    <div class="card-body">
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>By</th>
                                    <th>Posted</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="forum in forumList " :key="forum.id">
                                    <th>{{forum.title}}</th>
                                    <th>{{forum.user}}</th>
                                    <th>{{forum.posted}}</th>
                                    <th>
                                        <router-link class="btn btn-secondary me-1"
                                            :to="{name: 'forum.view', params: {id : forum.id}}">View</router-link>
                                        <button v-if="forum.user_id == auth.id" class="btn btn-danger"
                                            @click="deletePost(forum.id)">Delete</button>
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import forum from '../composables/forum';
import { onMounted } from 'vue';
import { authCheck } from '../services/helper'

export default {
    setup() {
        const auth = authCheck()
        const { forumList, getAll, remove, success, errors, searchTxt } = forum()
        onMounted(getAll)
        const deletePost = async (id) => {
            if (!window.confirm('Are you sure')) {
                return;
            }
            await remove(id)
            if (success) {
                await getAll()
            }
        }
        const search = async() => {
            await getAll()
        }
        return {
            forumList,
            auth,
            success,
            errors,
            deletePost,
            searchTxt,
            search
        }
    }
}
</script>