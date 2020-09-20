<template>
  <v-app>
    <div class="d-flex flex-column align-center">
      <header class="ma-4">
        <router-link to="/reservations">Reservations</router-link>
        <span> | </span>
        <router-link to="/inventory">Inventory</router-link>
      </header>
      <v-main>
        <router-view />
      </v-main>
    </div>
  </v-app>
</template>

<script>
export default {};
</script>

<style lang="scss">
.pageSection {
  width: 400px;
}
</style>
