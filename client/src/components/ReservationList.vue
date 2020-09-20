<template>
  <v-list two-line class="pageSection">
    <h2>All Reservations</h2>
    <v-list-item-group v-for="entry in sortedReservations" :key="entry.date">
      <v-subheader>{{new Date(`${entry.date} 00:00:00`).toLocaleDateString('en-US', dateOptions)}}</v-subheader>
      <v-list-item v-for="res in entry.reservations" :key="res.id">
        <v-list-item-avatar>
          <span class="time">{{res.time}}</span>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title v-text="res.name"></v-list-item-title>
          <v-list-item-subtitle v-text="`Party of ${res.party_size}`"></v-list-item-subtitle>
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
  data () {
    return {
      dateOptions: { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' }
    }
  },
  props: [
    'reservations'
  ],
  computed: {
    sortedReservations () {
      if (!!this.reservations.length) {
        const reservations = [ ...this.reservations ];
        // Get an array of unique dates in teh current reservations.
        const dates = Array.from(new Set(reservations.map(res => res.date)));
        // Pair each date with a list of its reservations sorted by date / time.
        const sorted = dates.map(date => {
          return {
            date,
            reservations: reservations.filter(res => res.date === date).sort((a, b) => {
              return Date.parse(`${a.date} ${a.time}`) - Date.parse(`${b.date} ${b.time}`);
            })
          }
        });
        // Returns array of reservations per date:
        // [ {date: 2020-09-16, reservations: [] }, { date: 2020-09-17, reservations: [] } ]
        return sorted;
      } else {
        return null;
      }
    }
  }
}
</script>

<style lang="scss">
.time {
  font-size: 12px;
}
</style>