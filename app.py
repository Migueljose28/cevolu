from fastapi import FastAPI,  Depends, HTTPException, Query,status
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlmodel import Session, SQLModel
from src.models.models import *


from src.database.db import engine,  get_db
from typing import Annotated
from sqlalchemy.orm import Session
from auth import get_current_user
from src.routes.authRouter import router as auth_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(auth_router)

def init_db():
    SQLModel.metadata.create_all(bind=engine)

@app.on_event("startup")
def on_startup():
    init_db()


db_dependency = Annotated[Session, Depends(get_db)]
user_dependency = Annotated[dict, Depends(get_current_user)]

#Rotas
@app.get("/start")
async def home():
    return JSONResponse(content={"redirect_url": "http://127.0.0.1:5500/templates/login.html"})



@app.get("/", status_code = status.HTTP_200_OK)
async def user(user: user_dependency, db: db_dependency):
    if user is None:
        raise HTTPException(status_code=401, detail = 'Authentication Faile')
    return {"User": user}

#uvicorn app:app --reload