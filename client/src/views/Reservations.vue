<template>
  <div>
    <h1 class="mb-8 text-center">Reservations</h1>
    <div class="d-flex">
      <ReservationForm ref="formComponent" class="mr-16" v-on:new-reservation="onNewReservation" />
      <ReservationList :reservations="reservations" />
    </div>
    <v-snackbar color="success" v-model="showSnackbar" top>
      {{snackbarMessage}}
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="showSnackbar = false">OK</v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import ReservationForm from '../components/ReservationForm';
import ReservationList from '../components/ReservationList';
import axios from 'axios';
import { convertTime } from '../functions';

export default {
  components: {
    ReservationForm,
    ReservationList
  },
  data: () => ({
    reservations: [],
    showSnackbar: false,
    snackbarMessage: ''
  }),
  mounted () {
    axios.get('http://localhost:9090/reservations').then(response => {
      this.reservations = response.data.map(res => {
        return { ...res, time: convertTime(res.time) }
      });
    });
  },
  methods: {
    onNewReservation (reservation) {
      axios.post('http://localhost:9090/reservations', reservation).then(response => {
        const newRes = response.data;
        this.reservations.push(newRes);
        this.$refs.formComponent.clear();
        this.snackbarMessage = 'Reservation created!';
        this.showSnackbar = true;
      });
    }
  }
}
</script>
