

from fastapi import APIRouter, Depends
from starlette import status
from src.database import db_dependency
from src.controllers import createVacancy

router_vacancy = APIRouter()


@router_vacancy.post("/createVacancy", status_code= status.HTTP_201_CREATED)
async def returnFunctionAsync(dados: dict, db: db_dependency):
    return await createVacancy(dados, db)

