import paho.mqtt.subscribe as subscribe
import RPi.GPIO as GPIO, time,commands,math
 

GPIO.setmode(GPIO.BCM)

def all_off():
    GPIO.setup(18, GPIO.IN)
    GPIO.setup(21, GPIO.IN)
    GPIO.setup(23, GPIO.IN)
    GPIO.setup(24, GPIO.IN)
    GPIO.setup(25, GPIO.IN)

def pump_on():
    GPIO.setup(25,GPIO.OUT)

def on_message_print(client, userdata, message):
#    print("%s %s" % (message.topic, message.payload))
    all_off()
    if( message.payload == "1" ):
	print("1")
	GPIO.setup(18, GPIO.OUT)
	pump_on()
    if( message.payload == "2" ):
	print("2")
	GPIO.setup(23, GPIO.OUT)
	pump_on()
    if( message.payload == "3" ):
	print("3")
	GPIO.setup(24, GPIO.OUT)
	pump_on()
    if( message.payload == "4" ):
	print("4")
	GPIO.setup(21, GPIO.OUT)
	pump_on()
	pump_on()
    if( message.payload == "0" ):
	print("0")

subscribe.callback(on_message_print, "watering", hostname="10.10.1.3")
