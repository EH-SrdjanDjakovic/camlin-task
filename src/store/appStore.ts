import { defineStore } from "pinia";
import data from "../data/sampledata.json";

const trafoSelectionFromLocalStorage = localStorage.getItem("chartTrafoSelection");

export const useTrafoStore = defineStore("trafoStore", {
  state: () => ({
    selectedTransformers:
      trafoSelectionFromLocalStorage && trafoSelectionFromLocalStorage.length > 0
        ? JSON.parse(trafoSelectionFromLocalStorage)
        : data.map((transformer) => transformer.name),
    tableSearchInput: localStorage.getItem("tableSearchInput") || "",
  }),
  actions: {
    updatedSelectedTransformers(trafo: { [key: string]: boolean }): void {
      const selectedTrafoKey: string = Object.keys(trafo)[0];
      if (trafo[selectedTrafoKey]) {
        this.selectedTransformers.push(selectedTrafoKey);
      } else {
        this.selectedTransformers = this.selectedTransformers.filter((element) => element !== selectedTrafoKey);
      }
      localStorage.setItem("chartTrafoSelection", JSON.stringify(this.selectedTransformers));
    },
    tableSearchChanged(newFilter: string) {
      this.tableSearchInput = newFilter;
      localStorage.setItem("tableSearchInput", newFilter);
    },
  },
});
