import { ref } from "vue";
import axios from "axios";
import authHeader from "../services/auth-header";
import {formatResponseError} from "../services/helper";

export default function forum()
{
    const forumList = ref([])
    const forumSingle = ref([])
    const errors = ref('')
    const success = ref('')
    const searchTxt = ref('')
    const header = authHeader()

    const getAll = async() => {
        resetVal()
        let suffix = searchTxt.value ? `?search=${searchTxt.value}` : '';
        let response = axios.get(`${import.meta.env.VITE_API_PATH}forums${suffix}`, {
            headers: header
        })
        .then(response => {            
            forumList.value = response.data.data
        })
        .catch(error => {
            errors.value = formatResponseError(error)
        })
    }

    const getAllPending = async() => {
        resetVal()
        let response = axios.get(`${import.meta.env.VITE_API_PATH}forums/pending`, { headers: header })
        .then(response => {            
            forumList.value = response.data.data
        })
        .catch(error => {
            errors.value = formatResponseError(error)
        })
    }

    const create = async(data) => {
        resetVal()
        axios.post(`${import.meta.env.VITE_API_PATH}forums`, data, { headers: header })
        .then(response => {
            success.value = 'Posted, waiting for approval'
        })
        .catch(error => {
            errors.value = formatResponseError(error)
        })
    }

    const get = async(id) => {
        resetVal()
        axios.get(`${import.meta.env.VITE_API_PATH}forums/${id}`, { headers: header })
        .then(response => {
            forumSingle.value = response.data.data
        })
        .catch(error => {
            errors.value = formatResponseError(error)
        })
    }

    const update = async(id, data) => {
        resetVal()
        axios.put(`${import.meta.env.VITE_API_PATH}forums/${id}`, data, { headers: header })
        .then(response => {
            success.value = 'Updated'
        })
        .catch(error => {
            errors.value = formatResponseError(error)
        })
    }

    const remove = async (id) => {
        resetVal()
        axios.delete(`${import.meta.env.VITE_API_PATH}forums/${id}`, { headers: header })
            .then(response => {
                success.value = 'Deleted'
            })
            .catch(error => {
                errors.value = formatResponseError(error)
            })
    }

    const commentForum = async(id, data) => {
        resetVal()
        axios.post(`${import.meta.env.VITE_API_PATH}forums/${id}/comment`, data, { headers: header })
        .then(response => {
            success.value = 'Posted'
        })
        .catch(error => {
            errors.value = formatResponseError(error)
        })
    }

    const resetVal = () => {
        success.value = ''
        errors.value = ''
    }

    return {
        forumList,
        forumSingle,
        getAll,
        getAllPending,
        create,
        get,
        update,
        remove,
        success,
        errors,
        searchTxt,
        commentForum
    }
}