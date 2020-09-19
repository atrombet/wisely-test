<template>
  <v-form ref="resForm" class="resForm" v-model="valid">
    <h2 class="mt-2 mb-4">New Reservation</h2>
    <v-text-field v-model="form.name" :rules="nameRules" label="Name" placholder="Name" outlined></v-text-field>
    <v-text-field v-model="form.email" :rules="emailRules" label="Email" placholder="Email" outlined></v-text-field>
    <v-text-field v-model="form.partySize" type="number" :rules="partySizeRules" label="Party Size" placholder="Party Size" outlined></v-text-field>
    <v-menu v-model="datePicker" transition="scale-transition" offset-y min-width="290px">
      <template v-slot:activator="{ on, attrs }">
        <v-text-field v-model="form.date" label="Date" readonly v-bind="attrs" v-on="on" outlined></v-text-field>
      </template>
      <v-date-picker v-model="form.date" @input="updateAvailableTimes"></v-date-picker>
    </v-menu>
    <v-select :disabled="!availableTimes.length" v-model="form.time" label="Time" :items="availableTimes" outlined></v-select>
    <v-btn class="mr-4" @click="clear">Clear</v-btn>
    <v-btn color="success" @click="reserve">Reserve</v-btn>
  </v-form>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ReservationForm',
  data: () => ({
    valid: true,
    form: {
      name: '',
      email: '',
      partySize: null,
      date: '',
      time: ''
    },
    nameRules: [
      v => !!v || 'Name is required'
    ],
    emailRules: [
      v => !!v || 'Email is required',
      v => /.+@.+\..+/.test(v) || 'Email must be valid',
    ],
    partySizeRules: [
      v => !!v || 'Party Size is required',
      v => v > 0 || 'Party Size must be greater than zero'
    ],
    datePicker: false,
    availableTimes: []
  }),
  props: [
    'reservations'
  ],
  methods: {
    allowedDates (val) {
      return new Date(val) >= new Date();
    },
    updateAvailableTimes () {
      this.datePicker = false;
      axios.get(`http://localhost:9090/inventory?date=${this.form.date}`).then(response => {
        this.availableTimes = response.data.map(inv => {
          // Maps the inventory to a format for v-select
          return { 
            text: inv.time,
            value: inv.time,
            disabled: !inv.available
          }
        });
      });
    },
    reserve () {
      if (this.valid) {
        const res = { ...this.form };
        this.$emit('new-reservation', res);
      }
    },
    clear () {
      this.$refs.resForm.reset();
      this.availableTimes = [];
    }
  }
}
</script>

<style lang="scss">
.resForm {
  width: 400px;
}
</style>