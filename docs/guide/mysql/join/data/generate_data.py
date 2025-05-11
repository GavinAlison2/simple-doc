import csv
import random
import string

# cost time: 40s

def generate_random_data(num_records, filename):
    with open(filename, 'w', newline='', encoding='utf-8') as file:
        writer = csv.writer(file)
        writer.writerow(['id', 'key_col', 'data_col'])
        for i in range(1, num_records + 1):
            key_col = random.randint(1, 1000000)
            data_col = ''.join(random.choices(string.ascii_uppercase, k=20))
            writer.writerow([i, key_col, data_col])

generate_random_data(5000000, 'random_data.csv')

