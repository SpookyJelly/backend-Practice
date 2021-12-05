from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, scoped_session


user_name = "root"
user_pwd = "root"
# db_host = "127.0.0.1"
db_host = "localhost:3306"
# host는 루프백 주소기만 하면 뭐 127이든 localhost든 상관없다.
db_name = "user_crud"

# 각 %s가 user_name, user_pwd,db_host, db_name을 받는다.
# 이건 규칙이기 때문에 기억하는게 좋다
DATABASE = "mysql://%s:%s@%s/%s?charset=utf8" % (user_name, user_pwd, db_host, db_name)


ENGINE = create_engine(DATABASE, encoding="utf-8", echo=True)

session = scoped_session(sessionmaker(autocommit=False, autoflush=False, bind=ENGINE))

Base = declarative_base()
Base.query = session.query_property()
