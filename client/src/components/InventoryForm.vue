<template>
  <div class="pageSection">
    <h2>Create Inventory</h2>
    <div v-if="selectedDate"></div>
    <p v-else>Please select a date to create inventory.</p>
  </div>
</template>

<script>
export default {
  name: 'InventoryForm',
  props: [
    'selectedDate'
  ]
}
</script>
