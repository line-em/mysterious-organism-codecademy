/////////////////////////////////
////// Mysterious Organism //////
/////////////////////////////////

// Returns a random DNA base
const returnRandBase = () => {
	const dnaBases = ["A", "T", "C", "G"];
	return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
	const newStrand = [];
	for (let i = 0; i < 15; i++) {
		newStrand.push(returnRandBase());
	}
	return newStrand;
};

// Factory function to create multiple organisms
const pAequorFactory = (specimenNum, dna) => {
	return {
		specimenNum,
		dna,

		// Mutates the DNA of the organism
		mutate() {
			let randomIndex = Math.floor(Math.random() * this.dna.length);
			let newBase = returnRandBase();
			console.log(
				`Mutating specimen ${this.specimenNum}, with bases ${this.dna}... Starting process...`
			);

			while (this.dna[randomIndex] === newBase) {
				newBase = returnRandBase();
			} // if the new base is the same as the old one, keep generating a new one until it's different

			this.dna[randomIndex] = newBase; // replace the old base with the new one
			console.log(
				`Mutation complete. Mutated specimen ${this.specimenNum}, now with bases ${this.dna}.`
			);
			return this.dna;
		},

		// Compares the DNA of the organism to the DNA of another organism
		compareDNA(pAequor) {
			let count = 0;
			for (let i = 0; i < this.dna.length; i++) {
				if (this.dna[i] === pAequor.dna[i]) {
					count++;
				}
			}
			let percentMatch = (count / this.dna.length) * 100;

			console.log(
				`Specimen ${this.specimenNum} and specimen ${
					pAequor.specimenNum
				} have ${percentMatch.toFixed(1)}% DNA in common.`
			);
		},

		// Checks the amount of C and G dna bases for the organism, determining its survival chances. The higher the number, the higher the chances of survival.

		willLikelySurvive() {
			let count = 0;

			for (let i = 0; i < this.dna.length; i++) {
				if (this.dna[i] === "C" || this.dna[i] === "G") {
					count++;
				}
			}

			let percentMatch = (count / this.dna.length) * 100;

			console.log(
				`Specimen ${this.specimenNum} has a ${percentMatch.toFixed()}% chance of surviving.`
			);

			if (percentMatch >= 60) {
				return true;
			} else {
				return false;
			}
		},

		// Organizes the species more likely to survive in an array of 30 organisms.
		survivingSpecimens(pAequorArray) {
			let survivingSpecimens = [];
			let idSpecimen = 1;
			while (survivingSpecimens.length <= 30) {
				let newSpecimen = pAequorFactory(idSpecimen, mockUpStrand());
				if (newSpecimen.willLikelySurvive()) {
					survivingSpecimens.push(newSpecimen);
				}
				idSpecimen++;
			}
			return console.log(survivingSpecimens);
		},

		// Transform the DNA of the specimen into a complementary DNA strand.
		complementaryStrand(pAequor) {
			let complementaryStrand = [];
			for (let i = 0; i < this.dna.length; i++) {
				if (this.dna[i] === "A") {
					complementaryStrand.push("T");
				} else if (this.dna[i] === "T") {
					complementaryStrand.push("A");
				} else if (this.dna[i] === "C") {
					complementaryStrand.push("G");
				} else if (this.dna[i] === "G") {
					complementaryStrand.push("C");
				}
			}
			return console.log(complementaryStrand);
		}
	};
};

/////////////////////////////////
///////// Console.logs /////////
/////////////////////////////////

// Create an array of 30 organisms more likely to survive. The structure is:
// pAequorFactory(specimenNum, dna).survivingSpecimens(pAequorArray);
console.log(pAequorFactory(1, mockUpStrand()).survivingSpecimens());

// Checking the Complentary Strand
const specimen1 = pAequorFactory(1, mockUpStrand());
const specimen1Complementary = specimen1.complementaryStrand(specimen1);
console.log(specimen1.dna);
console.log(specimen1Complementary);
