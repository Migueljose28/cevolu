

from fastapi import APIRouter, Depends
from starlette import status
from src.database import db_dependency
from src.controllers import createVacancy, getVacancy, modifyVacancy
from src.models import StatusEnum


router_vacancy = APIRouter()


@router_vacancy.post("/createVacancy", status_code= status.HTTP_201_CREATED)
async def returnFunctionAsync(dados: dict, db: db_dependency):
    return await createVacancy(dados, db)

@router_vacancy.get("/getVacancy/{status}", status_code= status.HTTP_200_OK)
async def returnFunctionAsync(status: StatusEnum, db: db_dependency):
    return await getVacancy(status, db)


@router_vacancy.put("/modifyVacancy/{id}",  status_code= status.HTTP_202_ACCEPTED)
async def returnFunctionAsync(id: int, db: db_dependency):
    return await modifyVacancy( id, db)

