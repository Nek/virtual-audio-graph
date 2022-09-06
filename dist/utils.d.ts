export interface IGenericObject<T> {
    [key: string]: T;
}
export declare const capitalize: (a: string) => string;
export declare const entries: <A>(o: IGenericObject<A>) => [string, A][];
export declare const equals: (a: any, b: any) => boolean;
export declare const mapObj: <A, B>(f: (a: A) => B, o: IGenericObject<A>) => IGenericObject<B>;
export declare const values: <A>(obj: IGenericObject<A>) => A[];
