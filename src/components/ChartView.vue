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
import sampleData from "../data/sampledata.json";
import { formatDate } from "../helpers/formatters";
import { IChartLineData } from "../models/IChartLineData";
import { ITransformer } from "../models/ITransformer";

const props = defineProps(["selectedTransformers"]);
const emit = defineEmits(["update-trafo-selection"]);

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

// timestamp extraction and date formatting
let timestampsChartDefinition: Array<string> = sampleData[0].lastTenVoltgageReadings.map(
  (reading) => reading.timestamp
);

timestampsChartDefinition = timestampsChartDefinition.map((timestamp) => {
  return formatDate(timestamp);
});

// setting necessary data for chart
const chartDataset: Array<IChartLineData> = sampleData.map((transformer: ITransformer) => {
  const transformerColor = chartColors();
  return {
    label: transformer.name,
    data: transformer.lastTenVoltgageReadings.map((reading) => reading.voltage),
    backgroundColor: transformerColor,
    borderColor: transformerColor,
    hidden: !props.selectedTransformers.includes(transformer.name),
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
        emit("update-trafo-selection", { [legendItem.text]: !isVisible });
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
