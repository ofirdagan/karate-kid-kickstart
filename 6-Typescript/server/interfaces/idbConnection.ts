export interface IdbConnection{
    connect: () => Promise<boolean>
    disconnect: () => Promise<boolean>
}