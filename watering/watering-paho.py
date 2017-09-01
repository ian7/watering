import paho.mqtt.subscribe as subscribe
import paho.mqtt.client as mqtt
import RPi.GPIO as GPIO
import time
import commands
import math


GPIO.setmode(GPIO.BCM)


def all_off():
    GPIO.setup(18, GPIO.IN)
    GPIO.setup(21, GPIO.IN)
    GPIO.setup(23, GPIO.IN)
    GPIO.setup(24, GPIO.IN)
    GPIO.setup(25, GPIO.IN)


def pump_on():
    GPIO.setup(25, GPIO.OUT)


def on_message_print(client, userdata, message):
#    print("%s %s" % (message.topic, message.payload))
  all_off()
  if(message.payload == "1"):
    print("1")
    GPIO.setup(18, GPIO.OUT)
    pump_on()
  if(message.payload == "2"):
    print("2")
    GPIO.setup(23, GPIO.OUT)
    pump_on()
  if(message.payload == "3"):
    print("3")
    GPIO.setup(24, GPIO.OUT)
    pump_on()
  if(message.payload == "4"):
    print("4")
    GPIO.setup(21, GPIO.OUT)
    pump_on()
  if(message.payload == "0"):
    print("0")


def measure_flow():
  measurement = 0
  startTime = time.time()

  while(1 == 1):
    while(GPIO.input(PiPin) == GPIO.LOW):
      time.sleep(0.005)
      if(time.time() - startTime > 1):
        print(measurement)
        measurement = 0
        startTime = time.time()

    while(GPIO.input(PiPin) == GPIO.HIGH):
      time.sleep(0.005)
      if(time.time() - startTime > 1):
        print(measurement)
        measurement = 0
        startTime = time.time()
    measurement += 1


def on_connect(client, userdata, flags, rc):
    client.subscribe("/watering") 


# subscribe.callback(on_message_print, "watering", hostname="10.10.1.3")
client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message_print
client.connect("10.10.1.3",1883,60)
client.loop_forever()
