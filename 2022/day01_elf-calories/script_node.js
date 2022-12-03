const fs = require('fs');

DATA_PATH = '../assets/day01_calories_per_elf.txt';

console.log(`
    📌 Objective: output the elf with the highest count of calories`
)

/** Get the elf ( its index ) with the maximum calories from the data file*/
function getElfWithMaxCalories(){

	// Read files and split spaces unicode
	const content = fs
		.readFileSync( DATA_PATH, { encoding: 'utf-8'})
		.split(/\s/);

	const elvesCalories = []
	let caloriesCount = 0;

	// Gets an elf sum of calories and add the total to "elvesCalories"
	for ( const lineValue of content){
		if( lineValue ) caloriesCount += Number(lineValue);
		else {
			elvesCalories.push( caloriesCount );
			caloriesCount = 0;
		}
	}

	// Gets elf's max calories and its index
	const maxCalories = Math.max( ...elvesCalories );
	return {
		caloriesCount: maxCalories,
		index: elvesCalories.indexOf(maxCalories)
	}
}

const result = getElfWithMaxCalories()
console.log( `
      🔹 The elf with the highest number of calories is:
            the ${result["index"]}th elf
            with ${result["caloriesCount"]} amount of calories
    ` )


