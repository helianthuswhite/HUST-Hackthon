# -*- coding: utf-8 -*-
import urllib2
import urllib
import time
import json
import sys
http_url='https://api-cn.faceplusplus.com/facepp/v3/detect'
key = "3AQxIJRjo330jrAOW2KwjACDr2ahS_7p"
# http_url = "https://api-cn.faceplusplus.com/facepp/v3/face/analyze"
secret = "ZXESN5A5Dxq9oRATxHNLpyF-ZEI7Qvuv"
# filepath = r"/Users/Apple/Desktop/test.jpeg"
try:
	filepath = sys.argv[1]
except Exception,e:
	print Exception,":",e
return_attributes = "smiling"
boundary = '----------%s' % hex(int(time.time() * 1000))
data = []
data.append('--%s' % boundary)
data.append('Content-Disposition: form-data; name="%s"\r\n' % 'api_key')
data.append(key)
data.append('--%s' % boundary)
data.append('Content-Disposition: form-data; name="%s"\r\n' % 'api_secret')
data.append(secret)

data.append('--%s' % boundary)
data.append('Content-Disposition: form-data; name="%s"\r\n' % 'return_attributes')
data.append(return_attributes)

data.append('--%s' % boundary)
fr=open(filepath,'rb')
data.append('Content-Disposition: form-data; name="%s"; filename=" "' % 'image_file')
data.append('Content-Type: %s\r\n' % 'application/octet-stream')

data.append(fr.read())
fr.close()
data.append('--%s--\r\n' % boundary)

http_body='\r\n'.join(data)
#buld http request
req=urllib2.Request(http_url)
#header
req.add_header('Content-Type', 'multipart/form-data; boundary=%s' % boundary)
req.add_data(http_body)
try:
	#req.add_header('Referer','http://remotserver.com/')
	#post data to server

	resp = urllib2.urlopen(req, timeout=5)
	#get response
	qrcont=resp.read()
	hjson = json.loads(qrcont)
	value =  hjson["faces"][0]["attributes"]["smile"]["value"]
	# print type(hjson["faces"][0]["attributes"])
	# if value > 30.1:
	# 	print 1
	# else:
	# 	print 0
	print value
except Exception,e:
	print Exception,":",e
except urllib2.HTTPError as e:
	print e.read()