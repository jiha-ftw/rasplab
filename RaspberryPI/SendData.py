from datetime import datetime, timezone
import RPi.GPIO as GPIO
import time
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

GREEN_PIN = 19
RED_PIN = 26
SIGNAL_PIN = GREEN_PIN

currtime = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S")
print(currtime)

if temperature is None:
	SIGNAL_PIN = RED_PIN
else:
	publish.single(
	        "mqtt/collect-temperature",
	        f"{{ \"Source\": {instance_id}, \"Temperature\": {temperature}, \"Humidity\": {humidity}, \"ReceivedOn\": \"{currtime}\" }}",
	        hostname = os.getenv("RASPLAB_MOSQUITTO_SERVER_IP"),
	        auth = {
	                "username": "mosquitto_user",
	                "password": os.getenv("RASPLAB_MOSQUITTO_USER_PASSWORD")
	        }
	)

try:
	GPIO.setmode(GPIO.BCM)

	GPIO.setwarnings(False)
	GPIO.setup(SIGNAL_PIN, GPIO.OUT)

	for i in range(1, 4):
		GPIO.output(SIGNAL_PIN, GPIO.HIGH)
		time.sleep(0.5)
		GPIO.output(SIGNAL_PIN, GPIO.LOW)
		time.sleep(0.5)

	GPIO.cleanup()

except KeyboardInterrupt:
	GPIO.cleanup()

