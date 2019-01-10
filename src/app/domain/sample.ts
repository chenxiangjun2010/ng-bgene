import { SampleType } from "./sampleType";

export interface Sample {
    id?: string;
    name: string;
    gender?: string;
    age?: string;
    illness?: string;
    hospital?: string;
    department: string;
    doctor: string;
    illnessNo?: number;
    tel?: string;
    adress?: string;
    inspectionNo?: number;
    sampleType?: SampleType;
    tissueType?: TissueType;
    orgType?: string;
    date?: Date;
    place?: string;
    sampleContainer?: SampleContainer;
    save?: string;
    sn?: string;
    property?: string;
    collectTime?: string;
    location?: string;
    savedType?: string;
}


export interface TissueType {
    id?: string;
    name: string;
}

export interface SampleContainer {
    id?: string;
    name: string;
}