<template>
  <Line :data="data" :options="options" />
</template>

<script setup lang="ts">
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Line } from "vue-chartjs";
import { chartColors } from "../helpers/chartColors";
import sampleData from "../data/sampledata.json";

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

let timestampsChartDefinition = sampleData[0].lastTenVoltgageReadings.map((reading) => reading.timestamp);

timestampsChartDefinition = timestampsChartDefinition.map((timestamp) => {
  const dateObj = new Date(timestamp);
  const formattedDate = dateObj.toISOString().split("T")[0];
  return formattedDate;
});

const chartDataset = sampleData.map((transformer) => {
  return {
    label: transformer.name,
    data: transformer.lastTenVoltgageReadings.map((reading) => reading.voltage),
    backgroundColor: chartColors(),
  };
});

const data = {
  labels: timestampsChartDefinition,
  datasets: chartDataset,
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      onClick: (e, legendItem, legend) => {
        // Get the chart and dataset index
        const chart = legend.chart;
        const datasetIndex = legendItem.datasetIndex;

        // Toggle dataset visibility
        const isVisible = chart.isDatasetVisible(datasetIndex);
        chart.setDatasetVisibility(datasetIndex, !isVisible);

        // Force chart update to reflect the change
        chart.update();

        // Log the dataset state (selected/deselected)
        if (isVisible) {
          console.log(`Dataset ${datasetIndex + 1} deselected`);
        } else {
          console.log(`Dataset ${datasetIndex + 1} selected`);
        }
      },
    },
  },
};
</script>
