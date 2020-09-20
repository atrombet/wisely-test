<template>
  <div class="pageSection">
    <h2>Inventory for Selected Date</h2>
    <div v-if="!!inventory">
      <p v-if="!inventory.length">No inventory for selected date.</p>
      <v-list v-else>
        <v-list-item-group>
          <v-list-item v-for="inv in inventory" :key="inv.id">
            <span>
              <span><strong>{{convertedTime(inv.time)}}</strong> - {{inv.parties}}</span>
              <span v-if="inv.parties > 1"> parties</span>
              <span v-else> party</span>
            </span>
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
