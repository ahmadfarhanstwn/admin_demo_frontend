<template>
  <div class="container-fluid mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card border-0 rounded shadow">
          <div class="card-body">
            <h4>REGISTER</h4>
            <hr />
            <form @submit.prevent="register">
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      v-model="user.name"
                      class="form-control"
                      placeholder="Full Name"
                    />
                  </div>
                  <div v-if="validation.name" class="mt-2 alert alert-danger">
                    {{ validation.name[0] }}
                  </div>
                </div>
                <div class="col-md-6">
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
                </div>
              </div>

              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Password</label>
                    <input
                      type="password"
                      v-model="user.password"
                      class="form-control"
                      placeholder="Password"
                    />
                  </div>
                  <div
                    v-if="validation.password"
                    class="mt-2 alert alert-danger"
                  >
                    {{ validation.password[0] }}
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Konfirmasi Password</label>
                    <input
                      type="password"
                      v-model="user.password_confirmation"
                      class="form-control"
                      placeholder="Konfirmasi Password"
                    />
                  </div>
                </div>
              </div>
              <button type="submit" class="btn btn-primary btn-block">
                REGISTER
              </button>
            </form>
            <p>
              Already have account? Login
              <router-link :to="{ name: 'login' }">here</router-link>
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
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    });

    const validation = ref([]);

    const token = localStorage.getItem("token");

    onMounted(() => {
      if (token) {
        return router.push({
          name: "dashboard",
        });
      }
    });

    function register() {
      let name = user.name;
      let email = user.email;
      let password = user.password;
      let password_confirmation = user.password_confirmation;

      axios
        .post("http://localhost:8000/api/register", {
          name,
          email,
          password,
          password_confirmation,
        })
        .then(() => {
          return router.push({
            name: "login",
          });
        })
        .catch((error) => {
          validation.value = error.response.data;
        });
    }

    return { user, validation, register };
  },
};
</script>
