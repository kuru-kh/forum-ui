<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">{{forumSingle.title}}</div>

                    <div class="card-body">
                        <div v-if="forumSingle.comments" class="mb-2">
                            <div class="row"  v-for="comment in forumSingle.comments" :key="comment.id">
                                <div class="col-md-12">{{comment.comment}}</div>
                                <div class="col-md-4">By : {{comment.user}}</div>
                                <div class="col-md-4">On : {{comment.posted}}</div>
                            </div>
                        </div>
                        <form @submit.prevent="postComment" class="mt-2">
                            <div class="row mb-3">
                                <div class="col-md-8">
                                    <input type="text" class="form-control" v-model="form.comment" required placeholder="Comment here">
                                </div>
                                <div class="col-md-4">
                                    <button type="submit" class="btn btn-primary me-1">
                                        Post
                                    </button>
                                    <router-link class="btn btn-outline-dark" :to="{name:'forum.index'}">Back
                                    </router-link>
                                </div>
                                <div class="col-md-8 offset-md-2 text-danger" v-if="errors">
                                    {{errors}}
                                </div>
                                <div class="col-md-8 offset-md-2 text-success" v-if="success">
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
import { onMounted } from 'vue';
import { authCheck } from '../services/helper'
import { reactive } from '@vue/reactivity'

export default {
    props: {
        id: {
            required: true,
            type: String
        }
    },
    setup(props) {
        const form = reactive({
            'comment': ''
        })
        const auth = authCheck()
        const { forumSingle, get, success, errors, commentForum } = forum()
        onMounted(get(props.id))
        
        const postComment = async() => {
            await commentForum(props.id, { ...form })
            await get(props.id)
            Object.assign(form, {
                    'comment': ''
                })
        }

        return {
            forumSingle,
            auth,
            success,
            errors,
            postComment,
            form
        }
    }
}
</script>