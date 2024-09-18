export interface ITransformer {
  assetId: number;
  name: string;
  region: string;
  health: string;
  lastTenVoltgageReadings: Array<{ timestamp: string; voltage: string }>;
}
