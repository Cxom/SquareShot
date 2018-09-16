import sys

block = 42 # const

json = {"platforms": [], 'spiders': []}
for row in range(15):
    try:
        line = input()
    except RuntimeError:
        break

    for x in range(len(line)):
        if line[x] == '.':
            json['platforms'].append({'image': 'grass:1x1', 'x': x * block, 'y': row * block})
        elif line[x] == 's':
            json['spiders'].append({'x': x * block, 'y': row * block})
        elif line[x] == '1':
            json['hero'] = {'x': x * block, 'y': row * block}


json = str(json).replace("'", '"')
print(json)
