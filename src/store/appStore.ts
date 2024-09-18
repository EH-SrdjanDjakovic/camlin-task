import { defineStore } from "pinia";
import axios from "axios";
import { ITransformer } from "../models/ITransformer";

const trafoSelectionFromLocalStorage = localStorage.getItem("chartTrafoSelection");

export const useTrafoStore = defineStore("trafoStore", {
  state: () => ({
    transformersData: [] as [] | Array<ITransformer>,
    selectedTransformers:
      trafoSelectionFromLocalStorage && trafoSelectionFromLocalStorage.length > 0
        ? JSON.parse(trafoSelectionFromLocalStorage)
        : [],
    tableSearchInput: localStorage.getItem("tableSearchInput") || "",
  }),
  actions: {
    async getAllTransformersData() {
      try {
        const response = await axios.get<Array<ITransformer>>("http://localhost:3000/remoteTransformerData");
        this.transformersData = response.data;

        // in case of empty local storage, setting all transformer to be visible on chart
        if (!trafoSelectionFromLocalStorage || trafoSelectionFromLocalStorage.length === 0) {
          this.selectedTransformers = response.data.map((trafo) => trafo.name);
        }
      } catch (error) {
        console.error("Failed to fetch items:", error);
      }
    },
    updatedSelectedTransformers(trafo: { [key: string]: boolean }): void {
      const selectedTrafoKey: string = Object.keys(trafo)[0];
      if (trafo[selectedTrafoKey]) {
        this.selectedTransformers.push(selectedTrafoKey);
      } else {
        this.selectedTransformers = this.selectedTransformers.filter((element: string) => element !== selectedTrafoKey);
      }
      localStorage.setItem("chartTrafoSelection", JSON.stringify(this.selectedTransformers));
    },
    tableSearchChanged(newFilter: string) {
      this.tableSearchInput = newFilter;
      localStorage.setItem("tableSearchInput", newFilter);
    },
  },
});
