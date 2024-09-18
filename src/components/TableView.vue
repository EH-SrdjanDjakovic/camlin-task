<template>
  <div class="q-pa-md">
    <!-- rows need to be assinged to pinia store because initial view is tabular, so once data is retrieved it needs to be updated accordinlgy -->
    <q-table
      flat
      bordered
      title="Transformers"
      :rows="trafoStore.transformersData"
      :columns="columns"
      row-key="name"
      :filter="filter"
    >
      <template v-slot:top-right>
        <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th auto-width />
          <q-th v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td auto-width>
            <q-btn
              size="sm"
              color="accent"
              round
              dense
              @click="props.expand = !props.expand"
              :icon="props.expand ? 'remove' : 'add'"
            />
          </q-td>
          <q-td v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.value }}
          </q-td>
        </q-tr>
        <q-tr v-show="props.expand" :props="props">
          <q-td colspan="100%">
            <div class="text-left">
              <table>
                <tbody>
                  <tr v-for="voltage in props.row.lastTenVoltgageReadings">
                    <td>Date:</td>
                    <td>
                      {{ formatDate(voltage.timestamp) }}
                    </td>
                    <td>|</td>
                    <td>Voltage:</td>
                    <td>
                      {{ formatVoltageValue(voltage.voltage) }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { formatDate, formatVoltageValue } from "../helpers/formatters";
import { useTrafoStore } from "../store/appStore";

const trafoStore = useTrafoStore();

const columns = [
  {
    name: "name",
    label: "Name",
    align: "left",
    field: "name",
    sortable: true,
  },
  { name: "region", align: "left", label: "Region", field: "region", sortable: true },
  { name: "healt", label: "Healt", align: "left", field: "health", sortable: true },
];

const filter = ref(trafoStore.tableSearchInput);

watch(filter, (newFilter) => {
  trafoStore.tableSearchChanged(newFilter);
});
</script>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
