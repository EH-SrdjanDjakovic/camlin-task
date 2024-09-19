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
  LegendItem,
  ChartEvent,
} from "chart.js";
import { Line } from "vue-chartjs";
import { chartColors } from "../helpers/chartColors";
import { formatDate } from "../helpers/formatters";
import { IChartLineData } from "../models/IChartLineData";
import { ITransformer } from "../models/ITransformer";
import { useTrafoStore } from "../store/appStore";

const trafoStore = useTrafoStore();

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

// timestamp extraction and date formatting
let timestampsChartDefinition: Array<string> = trafoStore.transformersData[0].lastTenVoltgageReadings.map(
  (reading) => reading.timestamp
);

timestampsChartDefinition = timestampsChartDefinition.map((timestamp) => {
  return formatDate(timestamp);
});

// setting necessary data for chart
const chartDataset: Array<IChartLineData> = trafoStore.transformersData.map((transformer: ITransformer) => {
  const transformerColor = chartColors();
  return {
    label: transformer.name,
    data: transformer.lastTenVoltgageReadings.map((reading) => Number(reading.voltage)),
    backgroundColor: transformerColor,
    borderColor: transformerColor,
    hidden: !trafoStore.selectedTransformers.includes(transformer.name),
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
      onClick: (_e: ChartEvent, legendItem: LegendItem, legend: { chart: ChartJS }) => {
        // Get the chart and dataset index
        const chart = legend.chart;
        const datasetIndex = legendItem.datasetIndex;

        // Toggle dataset visibility
        const isVisible = chart.isDatasetVisible(datasetIndex as number);
        chart.setDatasetVisibility(datasetIndex as number, !isVisible);

        // Force chart update to reflect the change
        chart.update();

        // update app state
        trafoStore.updatedSelectedTransformers({ [legendItem.text]: !isVisible });
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
