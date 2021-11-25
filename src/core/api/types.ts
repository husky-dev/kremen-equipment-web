export type EquipmentMachineType = 'tractor' | 'sweeper' | 'spreader' | 'garbageTruck' | 'unknow';

export interface EquipmentMachine {
  eid: string;
  name: string;
  company: string;
  type: EquipmentMachineType;
  comments: string;
  color: string;
  lat?: number;
  lng?: number;
  speed?: number;
  ts?: number;
  accV?: number;
  satCount?: number;
  zajig?: number;
  acsel?: number;
  log: DataSourceEquipmentTimeEntryData[];
}

export interface DataSourceEquipmentTimeEntryData {
  ts: number;
  lat: number;
  lng: number;
  accV?: number;
  satCount?: number;
  zajig?: number;
  acsel?: number;
  speed?: number;
}

export interface LatLng {
  lat: number;
  lng: number;
}
