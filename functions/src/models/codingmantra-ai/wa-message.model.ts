export interface IWAMessageReq {
    to: string;
    message?: string;
    file?: string;
    template_id?: string;
    template_variables?:string[]
}
