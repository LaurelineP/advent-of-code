# 🎄 Advent Of Code 🎄 
When participating to the Advent Of Code, this represent  
my submissions organized by folder.  
All submissions would lies in folders named as a year.  

## How to run 
Navigating through the folders using CLI was enhanced.  
We can provide an argument to the CLI corresponding to the challenge to check

1. By default - it will run today's code
	```sh
	pnpm run-challenge
	```

2. By day
When specifying a day after the command, 
it will retrieve the corresponding file to execute, 
based on `current year` and command input  
	```sh
	pnpm run-challenge 1
	# Will execute ./2024/day-01 challenge
	```

3. By year
When specifying the year after the command, 
it will retrieve the corresponding file to execute,  
based on `current day` and command input  
- year format must be 4 digits `YYYY`  
	```sh
	pnpm run-challenge 2024
	# Will execute ./2024/day-01 challenge

	```

4. By year and day  
When specifying a year and date format after the command.  
it will retrieve the corresponding file to execute   
only based on your input  
- year and day should not be separated by space
- year can be mentioned before the day and vise-versa
	```sh
	pnpm run-challenge 2024/01
	# or
	pnpm run-challenge 01/2024
	# or
	pnpm run-challenge 01/2024
	# or
	pnpm run-challenge 1/2024

	# Will execute ./2024/day-01 challenge

	```
