from fastapi import APIRouter, Depends, HTTPException
from starlette import status    
from src.schemas import UsersRegister, Userslogin, Token
from src.controllers import getUser, modifyUser, getAllUser 
from src.database import db_dependency
from src.schemas import adminBase



adminRouter = APIRouter()


@adminRouter.get("/admin/", status_code=status.HTTP_200_OK)
async def returnFunctionAsync(db: db_dependency):
    return await getAllUser(db)

@adminRouter.get("/admin/{id}", status_code=status.HTTP_200_OK)
async def returnFunctionAsync(db: db_dependency, id: int | None = None):
    return await getUser(id, db)

@adminRouter.put("/admin/{id}", status_code=status.HTTP_202_ACCEPTED)
async def returnFunctionAsync(Userbase: adminBase,  db: db_dependency, id: int | None = None):
    return await modifyUser(Userbase, id, db)
