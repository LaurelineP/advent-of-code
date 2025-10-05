# 🎄 Advent Of Code 🎄

![Generated Readme](https://github.com/LaurelineP/advent-of-code/actions/workflows/generate-readme.yml/badge.svg)

> [ Advent Of Code Website ](https://adventofcode.com)
> The project transforms a simple repository into an integrated, developer-friendly environment by centralizing instructions and automating key workflows. It:

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
- Gets the application cookie - open Inspector > tab Application > Cookie > select the value of cookie for your session
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
    `sh
   bun run-challenge 1

    # Will execute ./2024/day-01 challenge

    `

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
      `bun run-challenge 2022/01`
- [x] Automated File Generation:  
       Automatically create and populate challenge folders with template files (README.md, index.ts, services.ts, input.txt) when launching a challenge, ensuring a consistent starting point with minimal manual setup.”
    - `README.md` content - AoD x Day challenge content fetched and parsed
    - `input.txt` content - AoD x Day data input content fetched
    - `index.ts` content - a TODO log
    - `services.ts` content - template code
      NB: `<DATE>` handles different formats Ex: [ `<YYYY>/<DD>`, `<YYYY>-<DD>` ]
      `bun run-challenge`
      `bun run-challenge <DATE>`
- [x] Template-Based File Enhancements
      Utilize standardized templates for key files (such as index.ts and services.ts) to reduce duplication and enforce a uniform structure across all challenges.


## 💻 Challenges
<details>
	<summary>📌 2024, DAY 01</summary>

[✏️ Need to update this Readme Section?](./2024/day-01/README.md)

# --- Day 1: Historian Hysteria ---

The Chief Historian is always present for the big Christmas sleigh launch, but nobody has seen him in months! Last anyone heard, he was visiting locations that are historically significant to the North Pole; a group of Senior Historians has asked you to accompany them as they check the places they think he was most likely to visit.

As each location is checked, they will mark it on their list with a star. They figure the Chief Historian must be in one of the first fifty places they'll look, so in order to save Christmas, you need to help them get fifty stars on their list before Santa takes off on December 25th.

Collect stars by solving puzzles. Two puzzles will be made available on each day in the Advent calendar; the second puzzle is unlocked when you complete the first. Each puzzle grants one star. Good luck!

You haven't even left yet and the group of Elvish Senior Historians has already hit a problem: their list of locations to check is currently empty. Eventually, someone decides that the best place to check first would be the Chief Historian's office.

Upon pouring into the office, everyone confirms that the Chief Historian is indeed nowhere to be found. Instead, the Elves discover an assortment of notes and lists of historically significant locations! This seems to be the planning the Chief Historian was doing before he left. Perhaps these notes can be used to determine which locations to search?

Throughout the Chief's office, the historically significant locations are listed not by name but by a unique number called the location ID. To make sure they don't miss anything, The Historians split into two groups, each searching the office and trying to create their own complete list of location IDs.

There's just one problem: by holding the two lists up side by side (your puzzle input), it quickly becomes clear that the lists aren't very similar. Maybe you can help The Historians reconcile their lists?

For example:

```
3   4
4   3
2   5
1   3
3   9
3   3
```

Maybe the lists are only off by a small amount! To find out, pair up the numbers and measure how far apart they are. Pair up the smallest number in the left list with the smallest number in the right list, then the second-smallest left number with the second-smallest right number, and so on.

Within each pair, figure out how far apart the two numbers are; you'll need to add up all of those distances. For example, if you pair up a 3 from the left list with a 7 from the right list, the distance apart is 4; if you pair up a 9 with a 3, the distance apart is 6.

```md
In the example list above, the pairs and distances would be as follows:

The smallest number in the left list is 1, and the smallest number in the right list is 3. The distance between them is 2.  
The second-smallest number in the left list is 2, and the second-smallest number in the right list is another 3.
The distance between them is 1.  
The third-smallest number in both lists is 3, so the distance between them is 0.  
The next numbers to pair up are 3 and 4, a distance of 1.  
The fifth-smallest numbers in each list are 3 and 5, a distance of 2.  
Finally, the largest number in the left list is 4, while the largest number in the right list is 9; these are a distance 5 apart.  
To find the total distance between the left list and the right list, add up the distances between all of the pairs you found. In the example above, this is 2 + 1 + 0 + 1 + 2 + 5, a total distance of 11!
```

Your actual left and right lists contain many location IDs.

What is the total distance between your lists?

--- Part Two ---
Your analysis only confirmed what everyone feared:  
the two lists of location IDs are indeed very different.

Or are they?

The Historians can't agree on which group made the mistakes  
or how to read most of the Chief's handwriting, but in the  
commotion you notice an interesting detail:  
a lot of location IDs appear in both lists!
Maybe the other numbers aren't location IDs at all  
but rather misinterpreted handwriting.

This time, you'll need to figure out exactly how often each number  
from the left list appears in the right list.  
Calculate a total similarity score by adding up each number  
in the left list after multiplying it by the number of times  
that number appears in the right list.

Here are the same example lists again:

```sh
3   4
4   3
2   5
1   3
3   9
3   3
```

For these example lists, here is the process of finding the similarity score:

The first number in the left list is 3.  
It appears in the right list three times,  
so the similarity score increases by 3 \* 3 = 9.

The second number in the left list is 4.  
It appears in the right list once, so the  
similarity score increases by 4 \* 1 = 4.

The third number in the left list is 2.  
It does not appear in the right list, so  
the similarity score does not increase (2 \* 0 = 0).

The fourth number, 1, also does not appear in the right list.

The fifth number, 3, appears in the right list three times;  
the similarity score increases by 9.

The last number, 3, appears in the right list three times;  
the similarity score again increases by 9.

So, for these example lists,  
the similarity score at the end of this  
process is 31 (9 + 4 + 0 + 0 + 9 + 9).

Once again consider your left and right lists.  
What is their similarity score?


</details>
<details>
	<summary>📌 2024, DAY 02</summary>

[✏️ Need to update this Readme Section?](./2024/day-02/README.md)

# --- Day 2: Red-Nosed Reports ---

Fortunately, the first location The Historians want to search isn't a long walk from the Chief Historian's office.

While the Red-Nosed Reindeer nuclear fusion/fission plant
appears to contain no sign of the Chief Historian, the engineers there run up to you as soon as they see you. Apparently, they _still_ talk about the time Rudolph was saved through molecular synthesis from a single electron.

They're quick to add that - since you're already here - they'd really appreciate your help analyzing some unusual data from the Red-Nosed reactor. You turn to check if The Historians are waiting for you, but they seem to have already divided into groups that are currently searching every corner of the facility. You offer to help with the unusual data.

The unusual data (your puzzle input) consists of many _reports_, one report per line. Each report is a list of numbers called _levels_ that are separated by spaces. For example:

```
7 6 4 2 1 <-- levels report + safe ✅
1 2 7 8 9 <-- levels report + un-safe ❌
9 7 6 2 1 <-- levels report + un-safe ❌
1 3 2 4 5 <-- levels report + un-safe ❌
8 6 4 4 1 <-- levels report + un-safe ❌
1 3 6 7 9 <-- levels report + safe ✅
```

This example data contains six reports each containing five levels.

The engineers are trying to figure out which reports are _safe_. The Red-Nosed reactor safety systems can only tolerate levels that are either gradually increasing or gradually decreasing. So, a report only counts as safe if both of the following are true:

The levels are either _all increasing_ or _all decreasing_.

Any two adjacent levels differ by _at least one_ and _at most three_.

In the example above, the reports can be found safe or unsafe by checking those rules:

`7 6 4 2 1`: _Safe_ because the levels are all decreasing by 1 or 2.

`1 2 7 8 9`: _Unsafe_ because `2 7` is an increase of 5.

`9 7 6 2 1`: _Unsafe_ because `6 2` is a decrease of 4.

`1 3 2 4 5`: _Unsafe_ because `1 3` is increasing but `3 2` is decreasing.

`8 6 4 4 1`: _Unsafe_ because `4 4` is neither an increase or a decrease.

`1 3 6 7 9`: _Safe_ because the levels are all increasing by 1, 2, or 3.

So, in this example, `*2*` reports are _safe_.

Analyze the unusual data from the engineers.
_How many reports are safe?_

--- Part Two ---
The engineers are surprised by the low number of safe reports until they realize they forgot to tell you about the Problem Dampener.

The Problem Dampener is a reactor-mounted module that lets the reactor safety systems tolerate a single bad level in what would otherwise be a safe report. It's like the bad level never happened!

Now, the same rules apply as before, except if removing a single level from an unsafe report would make it safe, the report instead counts as safe.

More of the above example's reports are now safe:

`7 6 4 2 1`: Safe without removing any level.

`1 2 7 8 9`: Unsafe regardless of which level is removed.

`9 7 6 2 1`: Unsafe regardless of which level is removed.

`1 3 2 4 5`: Safe by removing the second level, 3.

`8 6 4 4 1`: Safe by removing the third level, 4.

`1 3 6 7 9`: Safe without removing any level.

Thanks to the Problem Dampener, 4 reports are actually safe!

Update your analysis by handling situations where the Problem Dampener can remove a single level from unsafe reports. How many reports are now safe?


</details>
<details>
	<summary>📌 2024, DAY 03</summary>

[✏️ Need to update this Readme Section?](./2024/day-03/README.md)

# --- Day 3: Mull It Over ---

"Our computers are having issues, so I have no idea if we have any Chief Historians in stock
! You're welcome to check the warehouse, though," says the mildly flustered shopkeeper at the North Pole Toboggan Rental Shop
. The Historians head out to take a look.

The shopkeeper turns to you. "Any chance you can see why our computers are having issues again?"

The computer appears to be trying to run a program, but its memory (your puzzle input) is _corrupted_. All of the instructions have been jumbled up!

It seems like the goal of the program is just to _multiply some numbers_. It does that with instructions like `mul(X,Y)`, where `X` and `Y` are each 1-3 digit numbers. For instance, `mul(44,46)` multiplies `44` by `46` to get a result of `2024`. Similarly, `mul(123,4)` would multiply `123` by `4`.

However, because the program's memory has been corrupted, there are also many invalid characters that should be _ignored_, even if they look like part of a `mul` instruction. Sequences like `mul(4*`, `mul(6,9!`, `?(12,34)`, or `mul ( 2 , 4 )` do _nothing_.

For example, consider the following section of corrupted memory:

````
x*mul(2,4)*%&mul[3,7]!@^do_not_*mul(5,5)*+mul(32,64]then(*mul(11,8)mul(8,5)*)```

Only the four highlighted sections are real `mul` instructions. Adding up the result of each instruction produces `*161*` (`2*4 + 5*5 + 11*8 + 8*5`).

Scan the corrupted memory for uncorrupted `mul` instructions. *What do you get if you add up all of the results of the multiplications?*

````


</details>
