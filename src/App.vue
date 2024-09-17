<script setup lang="ts">
import TableView from "./components/TableView.vue";
import ChartView from "./components/ChartView.vue";

import { ref } from "vue";

const tab = ref("table");
const splitterModel = ref(20);
</script>

<template>
  <div>
    <q-toolbar class="bg-primary text-white">
      <q-toolbar-title>Frontend Tech Lead / Software Architect Take-Home Technical Test</q-toolbar-title>

      <img src="https://s3.eu-west-1.amazonaws.com/camlin-group/logos/camlin-group-logo.svg" />
    </q-toolbar>
    <q-splitter v-model="splitterModel">
      <template v-slot:before>
        <q-tabs v-model="tab" vertical class="text-teal">
          <q-tab name="table" icon="table_view" label="Table view" />
          <q-tab name="chart" icon="query_stats" label="Chart view" />
        </q-tabs>
      </template>

      <template v-slot:after>
        <q-tab-panels v-model="tab" animated swipeable vertical transition-prev="jump-up" transition-next="jump-up">
          <q-tab-panel name="table"> <TableView /> </q-tab-panel>

          <q-tab-panel name="chart">
            <ChartView />
          </q-tab-panel>
        </q-tab-panels>
      </template>
    </q-splitter>
  </div>
</template>
