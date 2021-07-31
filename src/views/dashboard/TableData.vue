<template>
  <div class="container-fluid mt-5">
    <div class="row">
      <div class="col-md-4">
        <div class="card">
          <div class="card-body">
            MAIN MENU
            <hr />
            <ul class="list-group">
              <router-link
                :to="{ name: 'dashboard' }"
                class="list-group-item text-dark text-decoration-none"
                >DASHBOARD</router-link
              >
              <router-link
                :to="{ name: 'dashboard.data' }"
                class="list-group-item text-dark text-decoration-none"
                >DATA</router-link
              >
              <li
                @click.prevent="logout"
                class="list-group-item text-dark text-decoration-none"
                style="cursor:pointer"
              >
                LOGOUT
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="col-md-8">
        <div class="card border-0 rounded shadow">
          <div class="card-body">
            <h4>DATA POST</h4>
            <hr />
            <router-link
              :to="{ name: 'dashboard.create' }"
              class="btn btn-md btn-success"
              >ADD POST</router-link
            >

            <table class="table table-striped table-bordered mt-4">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">TITLE</th>
                  <th scope="col">CONTENT</th>
                  <th scope="col">OPTIONS</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(post, index) in posts" :key="index">
                  <td>{{ post.title }}</td>
                  <td>{{ post.content }}</td>
                  <td class="text-center">
                    <router-link
                      :to="{ name: 'dashboard.edit', params: { id: post.id } }"
                      class="btn btn-sm btn-primary mr-1"
                      >EDIT</router-link
                    >
                    <button
                      @click.prevent="postDelete(post.id)"
                      class="btn btn-sm btn-danger ml-1"
                    >
                      DELETE
                    </button>
                  </td>
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
import axios from "axios";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
export default {
  setup() {
    let posts = ref([]);
    const router = useRouter();
    const token = localStorage.getItem("token");

    onMounted(() => {
      if (!token) {
        return router.push({
          name: "login",
        });
      }

      axios
        .get("http://localhost:8000/api/post")
        .then((response) => {
          posts.value = response.data.data;
        })
        .catch((err) => console.log(err.response.data));
    });

    function postDelete(id) {
      axios
        .delete(`http://localhost:8000/api/post/${id}`)
        .then(() => {
          axios
            .get("http://localhost:8000/api/post")
            .then((response) => {
              posts.value = response.data.data;
            })
            .catch((err) => console.log(err.response.data));
        })
        .catch((error) => console.log(error.response.data));
    }

    function logout() {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      axios
        .post("http://localhost:8000/api/logout")
        .then((response) => {
          if (response.data.success) {
            localStorage.removeItem("token");

            return router.push({
              name: "login",
            });
          }
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }

    return { posts, logout, postDelete };
  },
};
</script>
