from fastapi import FastAPI,  Depends, HTTPException, Query,status
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlmodel import Session, SQLModel
from src.models.models import *
from src.database.db import engine,  get_db
from typing import Annotated
from sqlalchemy.orm import Session
#Routers
from src.routes import router as users
from src.routes import router_curriculos as curriculos
from src.routes import router_vacancy as vagas
from src.routes import adminRouter as admin
#COntrollers
from src.controllers.authController import get_current_user

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#Incluindo as rotas
app.include_router(users)
app.include_router(curriculos)
app.include_router(vagas)
app.include_router(admin)

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
    return JSONResponse(content={"redirect_url": "https://cevolu.com.br/templates/login.html"})



@app.get("/", status_code = status.HTTP_200_OK)
async def user(user: user_dependency, db: db_dependency):
    if user is None:
        raise HTTPException(status_code=401, detail = 'Authentication Faile')
    return {"User": user}

#uvicorn app:app --reload