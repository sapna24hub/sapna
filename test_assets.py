import urllib.request, re

resp = urllib.request.urlopen('https://sapna-chi.vercel.app/')
html = resp.read().decode('utf-8')

scripts = re.findall(r'src="(/assets/[^"]+\.js)"', html)
css = re.findall(r'href="(/assets/[^"]+\.css)"', html)

print('SCRIPTS:', scripts)
print('CSS:', css)

for s in scripts:
    url = 'https://sapna-chi.vercel.app' + s
    try:
        r = urllib.request.urlopen(url)
        content = r.read()
        print('JS status for', url, ':', r.getcode(), 'len:', len(content))
    except Exception as e:
        print('JS FAILED for', url, ':', e)

for c in css:
    url = 'https://sapna-chi.vercel.app' + c
    try:
        r = urllib.request.urlopen(url)
        content = r.read()
        print('CSS status for', url, ':', r.getcode(), 'len:', len(content))
    except Exception as e:
        print('CSS FAILED for', url, ':', e)
