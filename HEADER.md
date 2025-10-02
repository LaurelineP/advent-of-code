# 🎄 Advent Of Code 🎄 

> [ Advent Of Code Website ](https://adventofcode.com)
The project transforms a simple repository into an integrated, developer-friendly environment by centralizing instructions and automating key workflows. It:

- **Centralizes Documentation**:
All instructions and challenge details from the Advent Of Code website are maintained in one place (the README), reducing the need to switch contexts during development.

- **Automates Daily Challenge Setup**:
The project abstracts the manual process of creating folders and files (like index.js, services.js, and input files) by automating their generation when launching a challenge.

- **Enhances Developer Workflow**:
By automating file creation and challenge launch through CLI commands, developers can focus on solving the problems rather than on repetitive setup tasks.

Overall, this approach makes the project not just a storing repo but a platform that facilitates effective participation and solution commits for each challenge.


## ⏯️ How to run 
Navigating through the folders using CLI was enhanced.  
We can provide an argument to the CLI corresponding to the challenge to check

https://github.com/user-attachments/assets/74ff6fcc-a654-445d-abda-93cfa19b42ec

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



## 🚀 Embarked features
- [x] CLI Challenge Navigation:  
      Run any challenge for any year or day directly from the command line,
	  reducing the effort to locate and execute solution files.
	  ```pnpm run-challenge 2022/01```
- [x] Automated File Generation:   
     Automatically create and populate challenge folders with template files (README.md, index.js, services.js, input.txt) when launching a challenge, ensuring a consistent starting point with minimal manual setup.”
  - `README.md` content - AoD x Day challenge content fetched and parsed
  - `input.txt` content - AoD x Day data input content fetched
  - `index.js` content - a TODO log
  - `services.js`  content - template code
  NB: `<DATE>` handles different formats Ex: [ `<YYYY>/<DD>`, `<YYYY>-<DD>` ]
  ```pnpm run-challenge```
  ```pnpm run-challenge <DATE>```
- [x] Template-Based File Enhancements
Utilize standardized templates for key files (such as index.js and services.js) to reduce duplication and enforce a uniform structure across all challenges.


## 💻 Challenges