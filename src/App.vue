<script>
import { RouterLink, RouterView } from 'vue-router'
import { useRouter } from 'vue-router';
import { useStore } from 'vuex'

export default {
  setup() {
    const store = useStore();
    const router = useRouter()
    store.commit('initialiseStore')

    const logout = () => {
      store.commit('logout')
      router.push({
        name: 'login'
      });
    }

    return { store, logout }
  }

}
</script>

<template>
  <nav class="navbar navbar-expand-md navbar-light bg-white shadow-sm">
    <div class="container">
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="nav justify-content-center" v-if="store.state.auth.token">

          <li class="nav-item">
            <a class="nav-link" @click="logout">Logout</a>
          </li>
          <li class="nav-item">
            <router-link v-if="store.state.auth.user.is_admin" class="nav-link" to="/forums/pending">Pending Forums</router-link>
            
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/forums">Forums</router-link>
          </li>
        </ul>

        <ul v-else class="nav justify-content-center">
          <li class="nav-item">
            <RouterLink class="nav-link" to="/login">Login</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/register">Register</RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <main class="py-4">
    <RouterView />

  </main>
</template>
