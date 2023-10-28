import json


def getParametersFromFile():

    f = open('./Data/Parameters/parameters.json')
    data = json.load(f)
    f.close()
    return data