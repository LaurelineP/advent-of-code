# 🎄 Advent Of Code 🎄 

> [ Advent Of Code Website ](https://adventofcode.com)

Repo containing all participations on The Advent Of Code Event.
Beside storing all solutions - this is also a project with  
Development Experience features for my files and folders organisations.

The Challenge here, was to take ownership of this event figure out how
to make a project out of it. Transforming 
- from a simple storing repo
- to a project involving more features


## 🚀 Embarked features
- [x] CLI execution navigation: run x challenge on x year / x day
- [x] CLI file system automations: CLI execution navigation enhancement:  
  on running a command: this should build a folder and files
  - `README.md` content - AoD x Day challenge content fetched and parsed
  - `input.txt` content - AoD x Day data input content fetched
  - `index.js` content - a TODO log
- [x] CLI file system automations enhancements: observed repeated accross  
  files from day folder: made a template for each file  
  ( `day-xx/index.js`, `day-xx/services.js` ) to inject on file creation
  - populated code template per file
    ---- TODO / NEXT IDEAS
- [ ] Update x day `README.md` file: as the site displays part 2 after submitting part 1
- [ ] CLI command to submit from terminal the answer
   - [ ] step 1: submit for part 1
   - [ ] step 2: submit for part 2


## ⏯️ How to run 
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
