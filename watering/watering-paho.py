import paho.mqtt.subscribe as subscribe

def on_message_print(client, userdata, message):
#    print("%s %s" % (message.topic, message.payload))
    if( message.payload == "1" ):
	print("1")
    if( message.payload == "2" ):
	print("2")
    if( message.payload == "3" ):
	print("3")
    if( message.payload == "4" ):
	print("4")
    if( message.payload == "0" ):
	print("0")

subscribe.callback(on_message_print, "watering", hostname="10.10.1.3")
