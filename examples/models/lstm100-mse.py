from keras.layers import Dense
from keras.layers import Dropout
from keras.layers.recurrent import LSTM
from keras.models import Sequential


def create():
    model = Sequential()

    model.add(LSTM(100, input_dim=86))
    model.add(Dropout(0.25))
    model.add(Dense(1))

    model.compile(loss='mse', optimizer='rmsprop')

    return model
