from sqlalchemy import create_engine
import urllib.parse
from sqlmodel import create_engine, Session, SQLModel
import pymysql
import sqlite3
from typing import Annotated
from fastapi import  Depends
from dotenv import load_dotenv
import os


load_dotenv()
def get_database_url():
    env = os.getenv("ENV", "development")

    if env == "production":
        user = os.getenv("DB_USER")
        password = urllib.parse.quote_plus(os.getenv("DB_PASS"))
        host = os.getenv("DB_HOST")
        db = os.getenv("DB_NAME")

        return f"mysql+pymysql://{user}:{password}@{host}/{db}"

    # Ambiente de desenvolvimento
    return os.getenv("DATABASE_URL", "sqlite:///database.db")


SQLALCHEMY_DATABASE_URL = get_database_url()

# Configuração do banco de dados
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
