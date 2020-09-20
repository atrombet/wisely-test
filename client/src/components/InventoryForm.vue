<template>
  <div class="pageSection">
    <h2>Create Inventory</h2>
    <v-form v-if="selectedDate" class="mt-4" v-model="valid">
      <div>
        <label class="timeRangeLabel">Time Range</label>
        <v-range-slider class="mt-2" :min="sliderMin" :max="sliderMax" v-model="range">
          <template v-slot:prepend><span class="timeRangeValue">{{minSelectedTime}}</span></template>
          <template v-slot:append><span class="timeRangeValue">{{maxSelectedTime}}</span></template>
        </v-range-slider>
      </div>
      <v-text-field v-model="form.parties" type="number" :rules="partiesRules" label="Number of Parties" outlined></v-text-field>
    </v-form>
    <p v-else>Please select a date to create inventory.</p>
  </div>
</template>

<script>
export default {
  name: 'InventoryForm',
  props: [
    'selectedDate'
  ],
  data () {
    return {
      valid: true,
      sliderMin: 0,
      sliderMax: 95,
      range: [40, 80],
      form: {
        date: this.selectedDate,
        parties: '',
        startTime: '',
        endTime: ''
      },
      partiesRules: [
        v => !!v || 'Parties is required',
        v => v > 0 || 'Parties must be greater than zero'
      ]
    }
  },
  computed: {
    minSelectedTime () {
      return this.convertTickToTimeSlot(this.range[0]);
    },
    maxSelectedTime () {
      return this.convertTickToTimeSlot(this.range[1]);
    }
  },
  methods: {
    // Takes in a number between 0 and 96 and converts it to a 15 minute interval of the day.
    // EX: Input: 80, Output: 8:00 PM; Input: 5, Output: 1:15 AM
    convertTickToTimeSlot (tick) {
      const hour24 = Math.floor(tick / 4);
      const minutes = (tick % 4) * 15;
      const options = { hour: 'numeric', minute: 'numeric', hour12: true };
      return new Date(2020, 1, 1, hour24, minutes).toLocaleString('en-US', options);
    }
  }
}
</script>

<style lang="scss">
.timeRangeLabel {
  font-size: 12px;
  color: rgba(0, 0, 0, 0.6);
  margin-left: 12px;
}

.timeRangeValue {
  width: 70px;
  white-space: nowrap;
}
</style>
