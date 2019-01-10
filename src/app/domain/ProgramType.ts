export interface ProgramType {
    id?: string;
    name: string;
    parent?:ProgramType;
}