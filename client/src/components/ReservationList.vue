<template>
  <v-list two-line class="resList">
    <h2>Today's Reservations</h2>
    <v-list-item-group>
      <v-list-item v-for="res in reservations" :key="res.id">
        <v-list-item-avatar>
          <span>{{res.time}}</span>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title v-text="res.name"></v-list-item-title>
          <v-list-item-subtitle v-text="`Party of ${res.partySize}`"></v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn icon>
            <v-icon color="grey" :title="res.email">mdi-email</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script>
export default {
  name: 'ReservationList',
  props: [
    'reservations'
  ]
}
</script>

<style lang="scss">
.resList {
  width: 400px;
}
</style>