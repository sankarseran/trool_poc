export class TaxStandardFact{
    
	private stateCode: string;
	private effDate: string;
	private expDate: string;
	private name: string;
	private feeAllowed: boolean;
	private feeTaxable: boolean;
	private maxFee: number;

	constructor() {
		this.stateCode = null;
		this.effDate = null;
		this.expDate = null;
		this.name = null;
		this.feeAllowed = null;
		this.feeTaxable = null;
		this.maxFee = null;
	}

	getStateCode(): string {
		return this.stateCode;
	}

	setStateCode(stateCode: string) {
		this.stateCode = stateCode;
	}

	getEffDate(): string {
		return this.effDate;
	}

	setEffDate(effDate: string) {
		this.effDate = effDate;
	}

	getExpDate(): string {
		return this.expDate;
	}

	setExpDate(expDate: string) {
		this.expDate = expDate;
	}

	getName(): string {
		return this.name;
	}

	setName(name: string) {
		this.name = name;
	}

	getFeeAllowed(): boolean {
		return this.feeAllowed;
	}

	setFeeAllowed(feeAllowed: boolean) {
		this.feeAllowed = feeAllowed;
    }
    
    

	getFeeTaxable(): boolean {
		return this.feeTaxable;
	}

	setFeeTaxable(feeTaxable: boolean) {
		this.feeTaxable = feeTaxable;
	}

	getMaxFee(): number {
		return this.maxFee;
	}

	setMaxFee(maxFee: number) {
		this.maxFee = maxFee;
	}
}