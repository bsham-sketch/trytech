path = r'c:\Users\sham\Downloads\triztek.com-clone\index.html'
with open(path, 'r', encoding='utf-8') as f:
    lines = f.readlines()
for i in range(1318, 1362):
    print(f'{i+1}: {repr(lines[i])}')
