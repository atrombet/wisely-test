<template>
  <div>
    <h1 class="mb-8 text-center">Reservations</h1>
    <div class="d-flex">
      <ReservationForm class="mr-16" />
      <ReservationList :reservations="reservations" />
    </div>
  </div>
</template>

<script>
import ReservationForm from '../components/ReservationForm';
import ReservationList from '../components/ReservationList';

export default {
  components: {
    ReservationForm,
    ReservationList
  },
  data: () => ({
    reservations: [],
    valid: true,
    name: '',
    nameRules: [
      v => !!v || 'Name is required'
    ],
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
    partySize: 0,
    date: '',
    time: ''
  }),
  mounted () {
    this.reservations = [
      { id: 1, name: 'Anthony', email: 'atrombet@gmail.com', partySize: 4, date: '2020-9-16', time: '2:15' },
      { id: 1, name: 'Joe', email: 'atrombet@gmail.com', partySize: 5, date: '2020-9-16', time: '2:30' }
    ];
  }
}
</script>
