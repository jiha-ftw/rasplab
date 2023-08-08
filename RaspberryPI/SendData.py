import os
import Adafruit_DHT
import paho.mqtt.publish as publish

instance_id = os.getenv("RASPLAB_INSTANCE_IDENTIFIER")
humidity, temperature = Adafruit_DHT.read_retry(Adafruit_DHT.DHT11, 4)

publish.single(
	"mqtt/collect-temperature",
	f"{{ \"Source\": {instance_id}, \"Temperature\": {temperature}, \"Humidity\": {humidity} }}",
	hostname = os.getenv("RASPLAB_MOSQUITTO_SERVER_IP"),
	auth = { 
		"username": "mosquitto_user",
		"password": os.getenv("RASPLAB_MOSQUITTO_USER_PASSWORD") 
	}
)
