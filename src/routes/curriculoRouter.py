
from fastapi import APIRouter, Depends
from starlette import status
from src.schemas import setCurriculo
from src.database import db_dependency
from src.controllers import add_curriculos

#Crud

router_curriculos = APIRouter()

@router_curriculos.post("/add", status_code= status.HTTP_201_CREATED)
async def register_curriculo(form_data: setCurriculo, db: db_dependency):
   return await add_curriculos(form_data, db)

