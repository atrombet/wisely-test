<template>
  <v-form ref="resForm" class="pageSection" v-model="valid">
    <h2 class="mt-2 mb-4">New Reservation</h2>
    <v-text-field v-model="form.name" :rules="nameRules" label="Name" outlined></v-text-field>
    <v-text-field v-model="form.email" :rules="emailRules" label="Email" outlined></v-text-field>
    <v-text-field v-model="form.party_size" type="number" :rules="partySizeRules" label="Party Size" outlined></v-text-field>
    <v-menu v-model="datePicker" transition="scale-transition" offset-y min-width="290px">
      <template v-slot:activator="{ on, attrs }">
        <v-text-field v-model="form.date" :rules="dateRules" label="Date" readonly v-bind="attrs" v-on="on" outlined></v-text-field>
      </template>
      <v-date-picker v-model="form.date" @input="updateAvailableTimes"></v-date-picker>
    </v-menu>
    <v-select :disabled="!availableTimes.length" v-model="form.time" :rules="timeRules" label="Time" :items="availableTimes" outlined></v-select>
    <v-btn class="mr-4" @click="clear">Clear</v-btn>
    <v-btn color="success" @click="reserve" :disabled="!valid">Reserve</v-btn>
  </v-form>
</template>

<script>
import axios from 'axios';
import { convertTime } from '../functions';

export default {
  name: 'ReservationForm',
  data () {
    return {
      apiUrl: process.env.VUE_APP_API_BASE,
      valid: true,
      form: {
        name: '',
        email: '',
        party_size: null,
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
      dateRules: [
        v => !!v || 'Date is required',
      ],
      availableTimes: [],
      timeRules: [
        v => !!v || 'Time is required',
      ]
    }
  },
  props: [
    'reservations'
  ],
  methods: {
    allowedDates (val) {
      return new Date(val) >= new Date();
    },
    updateAvailableTimes () {
      this.datePicker = false;
      axios.get(`${this.apiUrl}/inventory?date=${this.form.date}`).then(response => {
        this.availableTimes = response.data.map(inv => {
          // Maps the inventory to a format for v-select
          return { 
            text: convertTime(inv.time),
            value: convertTime(inv.time),
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
