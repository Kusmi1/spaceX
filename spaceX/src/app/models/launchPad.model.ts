import {Launch} from "./launch.model";

export interface LaunchPad {
  launchPadName: string;
  region: string;
  launches?: Launch[];
}


