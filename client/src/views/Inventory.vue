<template>
  <div>
    <h1 class="mb-8 text-center">Inventory</h1>
    <div class="d-flex justify-center">
      <div class="invDatePicker">
        <v-menu v-model="datePicker" transition="scale-transition" offset-y min-width="290px">
          <template v-slot:activator="{ on, attrs }">
            <v-text-field v-model="date" label="Select a Date" readonly v-bind="attrs" v-on="on" outlined></v-text-field>
          </template>
          <v-date-picker v-model="date" @input="fetchInventory"></v-date-picker>
        </v-menu>
      </div>
    </div>
    <div class="d-flex">
      <InventoryForm :selectedDate="date" ref="invForm" class="mr-16" v-on:create-inventory="createInventory" />
      <InventoryList :inventory="inventory" />
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
import axios from 'axios';
import InventoryForm from '../components/InventoryForm';
import InventoryList from '../components/InventoryList';

export default {
  components: {
    InventoryList,
    InventoryForm
  },
  data () {
    return {
      apiUrl: process.env.VUE_APP_API_BASE,
      date: '',
      datePicker: false,
      inventory: null,
      showSnackbar: false,
      snackbarMessage: ''
    }
  },
  methods: {
    fetchInventory () {
      axios.get(`${this.apiUrl}/inventory?date=${this.date}`).then(response => {
        this.inventory = response.data;
      });
    },
    createInventory (newInventory) {
      axios.post(`${this.apiUrl}/inventory`, newInventory).then(response => {
        this.inventory = response.data;
        this.$refs.invForm.reset();
        this.snackbarMessage = 'Inventory created!';
        this.showSnackbar = true;
      });
    }
  }
}
</script>

<style lang="scss">
.invDatePicker {
  width: 400px;
}
</style>