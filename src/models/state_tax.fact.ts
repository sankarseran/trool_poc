import { TaxStandardFact } from './standard.fact';

export class StateTax extends TaxStandardFact {
	private rate: number;

	constructor() {
		super();
		this.rate = null;
	}

	getRate(): number {
		return this.rate;
	}

	setRate(rate: number) {
		this.rate = rate;
	}
}
