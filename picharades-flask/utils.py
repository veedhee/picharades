from datetime import datetime
import random
import string

def generate_unique_room_name():
    # this ia fun thing
    # we'll just ask to try again if it's duplicate lol
    a = datetime.now()
    room_name = random.choice(string.ascii_uppercase) + random.choice(string.ascii_uppercase) + str(a.hour % 10)+ str(a.minute) + str(a.second)
    return room_name
