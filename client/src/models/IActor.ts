export interface IActors{
    docs: IDocsActors[];
    limit: number;
    page: number;
    pages: number;
    total: number;
}
export interface IDocsActors {
    id: number;
name: string;
enName: string;
photo: string;
age: number;
sex: string;
}