import { ICommon } from "./common";

export interface INft extends ICommon {
  slug: string;
  phase: Phase;
  price: number;
  tokenId: number;
  minted: boolean;
}

export enum Phase {
  Phase1 = "phase1",
  Phase2 = "phase2",
  Phase3 = "phase3",
  Phase4 = "phase4",
}
