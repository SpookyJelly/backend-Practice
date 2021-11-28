from fastapi import FastAPI
from pydantic import BaseModel
# CORS 설정을 위한 미들웨어
from fastapi.middleware.cors import CORSMiddleware
import requests

# python dict는 키값에도  NUMBER가 들어갈 수 있기 때문에, 키에도 ""처리를 해줘서 string을 해줘야한다.

app = FastAPI()

# 출처 명시

origins = [
    'http://localhost:3000',
    'http://localhost'
]

# 이렇게 미들웨어로 상기한 origin에 있는 놈들과의 정보교환을 허락한다고 요청해야지
# cors 에러에 안걸린다.
# 근데 이상한건, JSON 데이터를 벡엔드에서 받아와 브라우저에서 실행하는건데, 그럼 CORS 설정은 브라우저가 관리하는,
# 프론트에서 해야하는거 아닌가?? 외부 오리진에서 오는 정보를 받아오는거니까 그렇다고 생각했는데,
# 문서를 보니 이러한것을 위해서는 백엔드에서 allow_origin을 설정해줘야한다고 한다,
# 생각해보니 싸피 Django 할때도 이랬는데... 새삼스럽게 이해가 안되네?
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


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
                       'current_time': cur_time, 'index': len(results)})

    return results


@ app.get('/city/{city_id}')
def get_city(city_id: int):
    city = db[city_id]
    url = f"http://worldtimeapi.org/api/timezone/{city['timezone']}"
    r = requests.get(url)
    cur_time = r.json()['datetime']
    # return db[city_id]
    return {'name': city['name'], 'timezone': city['timezone'], 'current_time': cur_time, 'index': city['index']}


@ app.post('/cities')
def create_city(city: City):
    db.append(city.dict())
    return db[-1]


@app.delete('/city/{city_id}')
def delete_city(city_id: int):
    db.pop(city_id)
    return {'status': 'delete done'}
