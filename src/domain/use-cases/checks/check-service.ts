//caso de uso
interface CheckServiceUseCase {
    execute(url: string):Promise<boolean>;
}

type SuccessCallback = () => void;
type ErrorCallback = ( error: string ) => void;

export class CheckService implements CheckServiceUseCase {

    /* inject dependencies */
    constructor(
        private readonly successCallback: SuccessCallback,
        private readonly errorCallback: ErrorCallback,
    ) {}

    async execute(url: string):Promise<boolean> {
        try {
            const req = await fetch( url );
            if( !req.ok ) {
                throw new Error(`Error on check seervice ${ url }`);
            }
            this.successCallback();
            return true;
        } catch (error) {
            this.errorCallback(`${ error }`);
            return false;
        }
        return true;
    }

}