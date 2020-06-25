import Trool, { IFactsHolder } from 'trool';
import { join } from 'path';
import { StateTax } from './models/state_tax.fact';
import { TaxName, StateFee } from './models/state_fee.fact';

export class TaxService {
	private trool: Trool;

	constructor() {
		this.trool = new Trool(true);
	}

	async calculateTax() {
		try {
			

			// const statFee = new StateFee();
			// stateTax.setStateCode('FL');
			// stateTax.setEffDate('06/25/2020');
			// stateTax.setExpDate('06/25/2020');

			const csvFilePath = join(__dirname, 'tax.csv');
			const imports = await this.trool.getImports(csvFilePath);
			console.log('imports::', imports);
			const stateTaxes = [];
			const stateFees = [];
			for (let imp in imports['TaxNames']) {
				console.log(imports['TaxNames'][imp]);
				const stateTax = new StateTax();
				stateTax.setStateCode('FL');
				stateTax.setEffDate('06/25/2020');
				stateTax.setExpDate('06/25/2020');
				stateTax.setName(imports['TaxNames'][imp]);
				stateTaxes.push(stateTax)
			}
			for (let imp in imports['FeeNames']) {
				console.log(imports['FeeNames'][imp]);
				const stateFee = new StateFee();
				stateFee.setStateCode('FL');
				stateFee.setEffDate('06/25/2020');
				stateFee.setExpDate('06/25/2020');
				stateFee.setName(imports['FeeNames'][imp]);
				stateFees.push(stateFee)
			}
			const factsHolder: IFactsHolder = { StateTax: stateTaxes, StateFee: stateFees };
			const updatedFacts = await this.trool.applyRules(csvFilePath, factsHolder);
			console.log(updatedFacts);
		} catch (err) {
			console.error(err.message);
		}
	}
}

(async () => {
	await new TaxService().calculateTax();
})();
