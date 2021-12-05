from sqlalchemy import Column, Integer, String
from pydantic import BaseModel

# 파이썬 프로젝트는 자동으로 동일 디렉터리에 있는 py 파일을 참고해서 export import를 할 수 있는 듯하다
from db import Base
from db import ENGINE


class UserTable(Base):
    __tablename__ = "user"
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(50), nullable=False)
    age = Column(Integer)


class User(BaseModel):
    id__: int
    name_: str
    age__: int
