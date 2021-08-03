<template>
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
</template>

<script>
export default {
  props: {
    logout: {
      required: true,
      type: Function,
    },
  },
};
</script>
