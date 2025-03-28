from sqlalchemy import create_engine
import urllib.parse
from sqlmodel import create_engine, Session, SQLModel
import pymysql
import sqlite3
from typing import Annotated
from fastapi import  Depends

senha = "@Consulte@20#25@"
senha_escapada = urllib.parse.quote_plus(senha)

# Configuração do banco de dados
mysql_url = f'mysql+pymysql://u630267573_user:{senha_escapada}@cevolu.com.br/u630267573_database'
SQLALCHEMY_DATABASE_URL = mysql_url
#"sqlite:///database.db"


engine = create_engine(SQLALCHEMY_DATABASE_URL, echo=True)

def init_db():
    SQLModel.metadata.create_all(bind=engine)

def get_db():
    try:
        with Session(engine) as session:
            yield session
    finally:
        session.close()

db_dependency = Annotated[Session, Depends(get_db)]
