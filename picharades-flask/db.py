import pickledb

db = pickledb.load('db_store/picharades.db', False)


def db_setup():
    ### DEFINITIONS ###

    # list of all rooms
    # rooms = ['room1', 'room2', 'room3', ..]
    db.lcreate('rooms')

    # records of sids present in which room
    # rooms_sids = {'room1': [7458, 4574], 'room2': [8744, 3432, 9897], ...}
    db.dcreate('rooms_sids')

    # current deignated painters of each room
    # rooms_painter = {'room1': 4574, 'room2': 3432, ...}
    db.dcreate('rooms_painter')

    # score tracking
    # scores: {
    #     'room1': {
    #         4574: 3,
    #         3432: 2
    #     },
    #     'room2': {
    #         8744: 9,
    #         3432: 5
    #     },
    #     ...
    # }
    db.dcreate('scores')
    
    # user sid & name tracking
    # {'sid': 'preferred_name'}
    db.dcreate('usernames')

    # write to file
    db.dump()


### EXCEPTIONS ###
class RoomAlreadyExists(Exception):
    pass

class AlreadyAMember(Exception):
    pass


### ACTIONS ###

def create_room(room_name):
    if db.lexists('rooms', room_name):
        raise RoomAlreadyExists
    db.ladd('rooms', room_name)
    db.dadd('rooms_sids', (room_name, []))
    db.dadd('rooms_painter', (room_name, None))
    db.dadd('scores', (room_name, {}))
    
def destroy_room(room_name):
    db.dpop('scores', room_name)
    db.dpop('rooms_painter', room_name)
    db.dpop('rooms_sids', room_name)
    db.lremvalue('rooms', room_name)

def add_sid_to_room(room_name, sid, username):
    # we assume that an entry for the room is already present in rooms_sids
    db.dget('rooms_sids', room_name).append(sid)
    db.dadd('usernames', (sid, username))
    db.dget('scores', room_name)[sid] = 0

def _remove_user_score(room_name, sid):
    del db.dget('scores', room_name)[sid]

def _remove_username(room_name, sid):
    db.dpop('usernames', sid)

def remove_sid_from_room(room_name, sid):
    room_painter = get_room_painter(room_name)
    db.dget('rooms_sids', room_name).remove(sid)
    _remove_user_score(room_name, sid)
    _remove_username(room_name, sid)
    if get_room_population(rom_name) == 0:
        destroy_room(room_name)
    else:
        if room_painter == sid:
            next_painter = db.dget('rooms_sids', room_name)[0]
            set_room_painter(room_name, next_painter)

def get_room_population(room_name):
    return len(db.dget('rooms_sids', room_name))

def get_room_members(room_name):
    return db.dget('rooms_sids', room_name)

def update_score(room_name, sid, new_score):
    db.dget('scores', room_name)[sid] = new_score

def get_scores_for_room(room_name):
    return db.dget('scores', room_name)

def get_room_painter(room_name):
    return db.dget('rooms_sids', room_name)

def set_room_painter(room_name, sid):
    db.dadd('rooms_sids', (room_name, sid))

def room_exists(room_name):
    if db.lexists('rooms', room_name):
        return True
    return False

def commit():
    db.dump()

if __name__ == "__main__":
    db_setup()