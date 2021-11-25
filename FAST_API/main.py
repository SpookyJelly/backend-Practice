from typing import Optional
from fastapi import FastAPI
# starlette: 경량화된 ASGI(비동기 서버 게이트웨이 인터페이스) 프레임워크/ 툴킷이자 FAST API의 기저가 되는 라이브러리
# pydantic : python의 타입 어노테이션을 사용한 data Validation과 settings management를 해주는 라이브러리
from pydantic import BaseModel


app = FastAPI()


class Item(BaseModel):
    name: str
    price: float
    is_offer: Optional[bool] = None

# fast API는 기본적으로 JSON 응답을 해준다.


@app.get("/")
def read_root():
    return {"Hello": "World"}

# q가 쿼리 매개변수이다. 이게 있다고 가정하면 실제 url은 다음과 같이 된다.
# /items/1?q=itemName
#결과 : {'item_id':1, 'q':itemName}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Optional[str] = None):
    return {"item_id": item_id, "q": q}


@app.put("/items/{item_id}")
def update_item(item_id: int, item: Item):
    return {"item_name": item.name, "item_id": item_id, "item_price": item.price}

# 달랑 이거밖에 안했는데, 자동완성/ 타입검사, 유효하지 않은 데이터에 대한 명확한 에러, 중첩된 JSON 객체에 대한 유효성 검사
# 경로 매개변수, 쿼리 매개변수, 자동 대화형 API 문서까지..?(Swagger, ReDoc) 오진다
