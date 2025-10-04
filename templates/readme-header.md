# 🎄 Advent Of Code 🎄 
![Generated Readme](https://github.com/LaurelineP/advent-of-code/actions/workflows/generate-readme.yml/badge.svg)

> [ Advent Of Code Website ](https://adventofcode.com)
The project transforms a simple repository into an integrated, developer-friendly environment by centralizing instructions and automating key workflows. It:

- **Centralizes Documentation**:
All instructions and challenge details from the Advent Of Code website are maintained in one place (the README), reducing the need to switch contexts during development.

- **Automates Daily Challenge Setup**:
The project abstracts the manual process of creating folders and files (like index.ts, services.ts, and input files) by automating their generation when launching a challenge.

- **Enhances Developer Workflow**:
By automating file creation and challenge launch through CLI commands, developers can focus on solving the problems rather than on repetitive setup tasks.

Overall, this approach makes the project not just a storing repo but a platform that facilitates effective participation and solution commits for each challenge.


## ⏯️ How to run 
Navigating through the folders using CLI was enhanced.  
We can provide an argument to the CLI corresponding to the challenge to check

### Authentication Presetup
- Connect to Advent of Code
- Gets the application cookie
	- open Inspector > tab Application > Cookie > select the value of cookie for your session
Copy the environment file `.env.example` to `.env`
https://github.com/user-attachments/assets/74ff6fcc-a654-445d-abda-93cfa19b42ec

### Running the code 
Different options are available using the specific commands
- `bun run-challenge` with an optional date argument
- `bun dev` 

#### Behaviors
1. By default - it will generate and/or run today's code
	```sh
	bun run-challenge
	```

2. By day
When specifying a day after the command, 
it will retrieve the corresponding file to execute, 
based on `current year` and command input  
	```sh
	bun run-challenge 1
	# Will execute ./2024/day-01 challenge
	```

3. By year
When specifying the year after the command, 
it will retrieve the corresponding file to execute,  
based on `current day` and command input  
- year format **must** be 4 digits `YYYY`  
	```sh
	bun run-challenge 2024
	# Will execute ./2024/day-01 challenge

	```

4. By year and day  
When specifying a year and date format after the command.  
it will retrieve the corresponding file to execute   
only based on your input  
- year and day should not be separated by space
- year can be mentioned before the day and vise-versa
	```sh
	bun run-challenge 2024/01
	# or
	bun run-challenge 01/2024
	# or
	bun run-challenge 01/2024
	# or
	bun run-challenge 1/2024

	# Will execute ./2024/day-01 challenge folder code

	```



## 🚀 Embarked features
- [x] CLI Challenge Navigation:  
      Run any challenge for any year or day directly from the command line,
	  reducing the effort to locate and execute solution files.
	  ```bun run-challenge 2022/01```
- [x] Automated File Generation:   
     Automatically create and populate challenge folders with template files (README.md, index.ts, services.ts, input.txt) when launching a challenge, ensuring a consistent starting point with minimal manual setup.”
  - `README.md` content - AoD x Day challenge content fetched and parsed
  - `input.txt` content - AoD x Day data input content fetched
  - `index.ts` content - a TODO log
  - `services.ts`  content - template code
  NB: `<DATE>` handles different formats Ex: [ `<YYYY>/<DD>`, `<YYYY>-<DD>` ]
  ```bun run-challenge```
  ```bun run-challenge <DATE>```
- [x] Template-Based File Enhancements
Utilize standardized templates for key files (such as index.ts and services.ts) to reduce duplication and enforce a uniform structure across all challenges.