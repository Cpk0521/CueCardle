import json
import random

jsondata = {'Images':[]}

with open('CardsData.json', 'r', encoding='utf-8') as json_file:
    data = json.load(json_file)
    for c in data['Cards']:
        if c['cardId'] > 3000000 and c['cardId'] < 9000000 :
            jsondata['Images'].append( {'cardId': c['cardId'], 
                                        'heroineId':c['heroineId'], 
                                        'heroine':c['heroine'], 
                                        'alias':c['alias'], 
                                        'Blooming': False,
                                        'image':c['image']['Normal']
                                        } )
            jsondata['Images'].append( {'cardId': c['cardId'], 
                                        'heroineId':c['heroineId'], 
                                        'heroine':c['heroine'], 
                                        'alias':c['alias'], 
                                        'Blooming': True,
                                        'image':c['image']['Blooming']
                                        } )
            
        elif c['cardId'] > 9000000 :
            jsondata['Images'].append( {'cardId': c['cardId'], 
                                    'heroineId':c['heroineId'], 
                                    'heroine':c['heroine'], 
                                    'alias':c['alias'],
                                    'Blooming': False,
                                    'image':c['image']['Normal']
                                    } )

        # jsondata['Images'].append( {'cardId': c['cardId'], 
        #                                 'heroineId':c['heroineId'], 
        #                                 'heroine':c['heroine'], 
        #                                 'alias':c['alias']
        #                                 } )


random.shuffle(jsondata['Images'])

with open('output.json', 'w', encoding='utf-8') as outfile:
    json.dump(jsondata, outfile, indent=4, ensure_ascii=False)