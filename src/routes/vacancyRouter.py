

from fastapi import APIRouter, Depends
from starlette import status
from src.controllers import createVacancy

router_vacancy = APIRouter()


@router_vacancy.post("/createVacancy", status_code= status.HTTP_201_CREATED)
async def returnFunctionAsync():
    return await createVacancy()

