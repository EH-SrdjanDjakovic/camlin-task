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
import { formatDate } from "../helpers/formatters";

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

let timestampsChartDefinition = sampleData[0].lastTenVoltgageReadings.map((reading) => reading.timestamp);

timestampsChartDefinition = timestampsChartDefinition.map((timestamp) => {
  return formatDate(timestamp);
});

const chartDataset = sampleData.map((transformer) => {
  const transformerColor = chartColors();
  return {
    label: transformer.name,
    data: transformer.lastTenVoltgageReadings.map((reading) => reading.voltage),
    backgroundColor: transformerColor,
    borderColor: transformerColor,
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
  scales: {
    x: {
      title: {
        display: true,
        text: "Date", // X-axis label
      },
    },
    y: {
      title: {
        display: true,
        text: "Voltage", // Y-axis label
      },
      beginAtZero: true,
    },
  },
};
</script>
