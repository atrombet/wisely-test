<template>
  <div class="pageSection">
    <h2>Inventory for Selected Date</h2>
    <div v-if="!!inventory.length">
      <v-list>
        <v-list-item-group>
          <v-list-item v-for="inv in inventory" :key="inv.id">
            <span><strong>{{convertedTime(inv.time)}}</strong> - {{inv.seatings}} parties</span>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </div>
    <p v-else>Please select a date to see available inventory.</p>
  </div>
</template>

<script>
import { convertTime } from '../functions';

export default {
  name: 'InventoryList',
  props: [
    'inventory'
  ],
  methods: {
    convertedTime (time) {
      return convertTime(time);
    }
  }
}
</script>
