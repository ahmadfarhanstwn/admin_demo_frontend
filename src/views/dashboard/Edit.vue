<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-12">
        <div class="card border-0 rounded shadow">
          <div class="card-body">
            <h4>EDIT POST</h4>
            <hr />

            <form @submit.prevent="update">
              <div class="form-group">
                <label for="title" class="font-weight-bold">TITLE</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="post.title"
                  placeholder="Masukkan Judul Post"
                />
                <!-- validation -->
                <div v-if="validation.title" class="mt-2 alert alert-danger">
                  {{ validation.title[0] }}
                </div>
              </div>
              <div class="form-group">
                <label for="content" class="font-weight-bold">CONTENT</label>
                <textarea
                  class="form-control"
                  rows="4"
                  v-model="post.content"
                  placeholder="Masukkan Konten Post"
                ></textarea>
                <!-- validation -->
                <div v-if="validation.content" class="mt-2 alert alert-danger">
                  {{ validation.content[0] }}
                </div>
              </div>
              <button type="submit" class="btn btn-primary">SIMPAN</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
export default {
  setup() {
    const router = useRouter();
    const route = useRoute();
    const token = localStorage.getItem("token");
    const post = reactive({
      title: "",
      content: "",
    });
    const validation = ref([]);

    onMounted(() => {
      if (!token) {
        return router.push({
          name: "login",
        });
      }

      axios
        .get(`http://localhost:8000/api/post/${route.params.id}`)
        .then((response) => {
          post.title = response.data.data.title;
          post.content = response.data.data.content;
        })
        .catch((err) => console.log(err.response.data));
    });

    function update() {
      let title = post.title;
      let content = post.content;

      axios
        .put(`http://localhost:8000/api/post/${route.params.id}`, {
          title,
          content,
        })
        .then(() => {
          router.push({
            name: "dashboard.data",
          });
        })
        .catch((error) => {
          validation.value = error.response.data;
        });
    }

    return { post, validation, router, update };
  },
};
</script>
