<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-12">
        <div class="card border-0 rounded shadow">
          <div class="card-body">
            <h4>ADD POST</h4>
            <hr />

            <form @submit.prevent="store">
              <div class="form-group">
                <label for="title" class="font-weight-bold">TITLE</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="post.title"
                  placeholder="Insert the title of the post"
                />
                <div v-if="validation.title" class="mt-2 alert alert-danger">
                  {{ validation.title[0] }}
                </div>
              </div>
              <div class="form-group">
                <label for="content" class="font-weight-bold">CONTENT</label>
                <textarea
                  rows="4"
                  type="text"
                  class="form-control"
                  v-model="post.content"
                  placeholder="Insert the content of the post"
                />
                <div v-if="validation.content" class="mt-2 alert alert-danger">
                  {{ validation.content[0] }}
                </div>
              </div>
              <button type="submit" class="btn btn-primary">SAVE</button>
            </form>
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
    const token = localStorage.getItem("token");
    const router = useRouter();
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
    });

    function store() {
      let title = post.title;
      let content = post.content;

      axios
        .post("http://localhost:8000/api/post", {
          title: title,
          content: content,
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

    return { post, validation, store, router };
  },
};
</script>
