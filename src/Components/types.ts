export interface IAdapter {
    open: (relation: string) => void;
    Return: () => void;
    pull: () => any;
    push: (...args: any) => any;
}