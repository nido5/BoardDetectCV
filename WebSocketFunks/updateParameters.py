import json

def updateParameters(newParameters):
      
    old_file = open('./Data/Parameters/parameters.json')
    old_data = json.load(old_file)
    old_file.close()

    for param in  old_data:
        
        for newParam in newParameters:
            if newParam["name"] == param["name"] and newParam["newValue"] is not None :
                param["value"] = newParam["newValue"]


    with open('./Data/Parameters/parameters.json', 'w') as f:
        # Write the newParameters to the file as JSON data
        json.dump(old_data, f, indent=4)
    

