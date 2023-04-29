import redis

class Dictionary:
    def __init__(self):
        self.connection = self.connect_to_redis()

    def connect_to_redis(self):
        r = redis.Redis(host='localhost', port=6379, db=0)
        return r

    def add_word(self, word, meaning):
        key = "word:" + word.lower()
        document = meaning
        self.connection.set(key, document)

    def edit_word(self, word, new_meaning):
        key = "word:" + word.lower()
        self.connection.set(key, new_meaning)

    def remove_word(self, word):
        key = "word:" + word.lower()
        self.connection.delete(key)

    def get_words(self):
        keys = self.connection.keys("word:*")
        return [key.decode('utf-8').split(":")[1] for key in keys]

    def get_meaning(self, word):
        key = "word:" + word.lower()
        meaning = self.connection.get(key)
        if meaning is not None:
            return meaning.decode('utf-8')
        else:
            return None
