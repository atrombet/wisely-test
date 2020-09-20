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
      <InventoryForm :selectedDate="date" class="mr-16" />
      <InventoryList :inventory="inventory" />
    </div>
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
      date: '',
      datePicker: false,
      inventory: []
    }
  },
  methods: {
    fetchInventory () {
      axios.get(`http://localhost:9090/inventory?date=${this.date}`).then(response => {
        this.inventory = response.data;
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