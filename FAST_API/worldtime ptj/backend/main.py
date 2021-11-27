from fastapi import FastAPI
from pydantic import BaseModel
import requests


app = FastAPI()

db = []


class City(BaseModel):
    name: str  # Seoul
    timezone: str  # Asia/Seoul


@app.get('/cities')
def get_cities():
    results = []
    for city in db:
        url = f"http://worldtimeapi.org/api/timezone/{city['timezone']}"
        r = requests.get(url)
        cur_time = r.json()['datetime']
        results.append({'name': city['name'], 'timezone': city['timezone'],
                       'current_time': cur_time})

    return results


@ app.get('/city/{city_id}')
def get_city(city_id: int):
    city = db[city_id-1]
    url = f"http://worldtimeapi.org/api/timezone/{city['timezone']}"
    r = requests.get(url)
    cur_time = r.json()['datetime']
    return {'name': city['name'], 'timezone': city['timezone'], 'current_time': cur_time}


@ app.post('/cities/')
def create_city(city: City):
    db.append(city.dict())
    return db[-1]


@app.delete('/city/{city_id}')
def delete_city(city_id: int):
    db.pop(city_id-1)
    return {status: 'delete done'}
