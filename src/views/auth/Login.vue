<template>
  <div class="container-fluid mt-5">
    <div class="row justify-content-center">
      <div class="col-md-4">
        <div v-if="loginFailed" class="alert alert-danger">
          Email atau Password Anda salah.
        </div>
        <div class="card border-0 rounded shadow">
          <div class="card-body">
            <h4>LOGIN</h4>
            <hr />
            <form @submit.prevent="login">
              <div class="form-group">
                <label>Email address</label>
                <input
                  type="email"
                  v-model="user.email"
                  class="form-control"
                  placeholder="Email Address"
                />
              </div>
              <div v-if="validation.email" class="mt-2 alert alert-danger">
                {{ validation.email[0] }}
              </div>

              <div class="form-group">
                <label>Password</label>
                <input
                  type="password"
                  v-model="user.password"
                  class="form-control"
                  placeholder="Password"
                />
              </div>
              <div v-if="validation.password" class="mt-2 alert alert-danger">
                {{ validation.password[0] }}
              </div>
              <button type="submit" class="btn btn-primary btn-block">
                LOGIN
              </button>
            </form>
            <p>
              Don't have an account? Register
              <router-link :to="{ name: 'register' }">here</router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

export default {
  setup() {
    const router = useRouter();

    const user = reactive({
      email: "",
      password: "",
    });

    const validation = ref([]);

    const loginFailed = ref(null);
    const token = localStorage.getItem("token");

    onMounted(() => {
      if (token) {
        return router.push({
          name: "dashboard",
        });
      }
    });

    function login() {
      let email = user.email;
      let password = user.password;

      axios
        .post("http://localhost:8000/api/login", {
          email,
          password,
        })
        .then((response) => {
          if (response.data.success) {
            localStorage.setItem("token", response.data.token);

            return router.push({
              name: "dashboard",
            });
          }

          loginFailed.value = true;
        })
        .catch((error) => {
          validation.value = error.response.data;
        });
    }

    return { user, validation, loginFailed, login };
  },
};
</script>
