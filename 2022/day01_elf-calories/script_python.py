import re

DATA_PATH = '../assets/day01_calories_per_elf.txt'

print('''
    📌 Objective: output the elf with the highest count of calories''')


def get_elf_with_max_calories():
    """ Outputs both which elf ( index ) and its calories count
    """

    elves = []
    elf_calories_sum = 0

	# Read file with data
    with open( DATA_PATH, 'r', encoding = 'UTF-8' ) as elves_calories:
        lines = elves_calories.readlines()

        # Parsing string with all lines "lines"
        for line in lines:

			#  Gets an elf sum of calories and add the total to "elvesCalories"
            if not re.match('^\n', line):
                elf_calories_sum += (int(line.removesuffix('\n')))
            else:
                elves.append(elf_calories_sum)
                elf_calories_sum = 0

        # Returns elves max calories count, and its index
        max_calories = max(elves)
        return {
            "caloriesCount" : max_calories,
            "index": elves.index(max_calories)
            }


result = get_elf_with_max_calories()
print( f'''
      🔹 The elf with the highest number of calories is:
            the {result["index"]}th elf
            with {result["caloriesCount"]} amount of calories
    ''' )


