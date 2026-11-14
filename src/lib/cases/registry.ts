import type { CaseFile } from "./types";
import type { TrackKey } from "@/lib/tracks";
import { mayaChenCase } from "./mayaChen";
import { nursingSampleCase } from "./nursingSample";
import { danielOseiCase } from "./danielOsei";
import { marcusWebbCase } from "./marcusWebb";
import { priyaNairCase } from "./priyaNair";
import { ruthAlvaradoCase } from "./ruthAlvarado";
import { victorNgataCase } from "./victorNgata";
import { dorothyKesslerCase } from "./dorothyKessler";
import { elenaMarshCase } from "./elenaMarsh";
import { tomasReyesCase } from "./tomasReyes";
import { graceKimCase } from "./graceKim";
import { earlSimmonsCase } from "./earlSimmons";
import { meiLinZhaoCase } from "./meiLinZhao";
import { arthurCollinsCase } from "./arthurCollins";
import { walterBooneCase } from "./walterBoone";
import { laylaHassanCase } from "./laylaHassan";
import { ninaCastilloCase } from "./ninaCastillo";
import { beatriceOwusuCase } from "./beatriceOwusu";
import { carlosJimenezCase } from "./carlosJimenez";
import { ashleyTurnerCase } from "./ashleyTurner";
import { jordanLeeCase } from "./jordanLee";
import { haroldFinchCase } from "./haroldFinch";
import { samWhitfieldCase } from "./samWhitfield";
import { doloresVegaCase } from "./doloresVega";

// Server-side registry of authored case files, including hidden answer
// keys. Never import this module from a "use client" component — pages
// should read it in a server component and pass a stripped public view
// (see publicView.ts) down to client components, and grading should run
// through the server actions in actions.ts.
export const CASES: Record<string, CaseFile> = {
  [mayaChenCase.meta.id]: mayaChenCase,
  [nursingSampleCase.meta.id]: nursingSampleCase,
  [danielOseiCase.meta.id]: danielOseiCase,
  [marcusWebbCase.meta.id]: marcusWebbCase,
  [priyaNairCase.meta.id]: priyaNairCase,
  [ruthAlvaradoCase.meta.id]: ruthAlvaradoCase,
  [victorNgataCase.meta.id]: victorNgataCase,
  [dorothyKesslerCase.meta.id]: dorothyKesslerCase,
  [elenaMarshCase.meta.id]: elenaMarshCase,
  [tomasReyesCase.meta.id]: tomasReyesCase,
  [graceKimCase.meta.id]: graceKimCase,
  [earlSimmonsCase.meta.id]: earlSimmonsCase,
  [meiLinZhaoCase.meta.id]: meiLinZhaoCase,
  [arthurCollinsCase.meta.id]: arthurCollinsCase,
  [walterBooneCase.meta.id]: walterBooneCase,
  [laylaHassanCase.meta.id]: laylaHassanCase,
  [ninaCastilloCase.meta.id]: ninaCastilloCase,
  [beatriceOwusuCase.meta.id]: beatriceOwusuCase,
  [carlosJimenezCase.meta.id]: carlosJimenezCase,
  [ashleyTurnerCase.meta.id]: ashleyTurnerCase,
  [jordanLeeCase.meta.id]: jordanLeeCase,
  [haroldFinchCase.meta.id]: haroldFinchCase,
  [samWhitfieldCase.meta.id]: samWhitfieldCase,
  [doloresVegaCase.meta.id]: doloresVegaCase,
};

export function getCaseFile(caseId: string): CaseFile | undefined {
  return CASES[caseId];
}

export function listCases(): CaseFile[] {
  return Object.values(CASES);
}

export function casesForUnit(trackKey: TrackKey, unitKey: string): CaseFile[] {
  return listCases().filter((c) => c.meta.trackKey === trackKey && c.meta.unitKey === unitKey);
}

export function caseIdForUnit(trackKey: TrackKey, unitKey: string): string | null {
  const match = casesForUnit(trackKey, unitKey)[0];
  return match ? match.meta.id : null;
}
