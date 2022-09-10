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
                    <div class="card-header">Forums
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
                                        <button class="btn btn-success"
                                            @click="approvePost(forum.id)">Approve</button>
                                        <button class="btn btn-danger"
                                            @click="rejectPost(forum.id)">Reject</button>
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
        const { forumList, getAllPending, update, errors, success } = forum()
        onMounted(getAllPending)
        const approvePost = async(id) => {
            await update(id, {'is_approved' : 1})
            await getAllPending()
        }
        const rejectPost = async(id) => {
            await update(id, {'is_approved' : 2})
            await getAllPending()
        }

        return {
            forumList,
            auth,
            approvePost,
            rejectPost,
            success,
            errors
        }
    }
}
</script>