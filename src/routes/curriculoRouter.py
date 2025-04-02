
from fastapi import APIRouter, Depends
from starlette import status
from src.schemas import *
from src.database import db_dependency
from src.controllers import *

#Crud

router_curriculos = APIRouter()

@router_curriculos.post("/create", status_code=status.HTTP_201_CREATED)
async def returnFunctionAsync(dados: baseNewTableCurriculos, db: db_dependency):
   return await createNewTableCurriculos(dados, db)


@router_curriculos.get("/read", status_code=status.HTTP_200_OK)
async def returnFunctionAsync( db: db_dependency, token: dict = Depends(get_current_user)):
   return await readAllCurriculos(token, db)


@router_curriculos.put("/update",status_code=status.HTTP_200_OK)
async def returnFunctionAsync(dados: BaseUpdateAndDeleteCurriculo, db: db_dependency):
   return await addNewCurriculo(dados, db)


@router_curriculos.delete("/delete", status_code=status.HTTP_200_OK)
async def returnFunctionAsync(dados: BaseUpdateAndDeleteCurriculo, db: db_dependency):
   return await deleteCurriculo(dados, db)


#Deletando todos os curriculos
@router_curriculos.delete("/deleteAll", status_code=status.HTTP_200_OK)
async def returnFunctionAsync(dados: BaseDeleteTableCurriculos, db: db_dependency):
   return await  DeleteTableCurriculos(dados, db)


