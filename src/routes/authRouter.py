
from fastapi import APIRouter, Depends
from starlette import status
from src.schemas import Token, UsersRegister, Userslogin
from src.controllers import create_user, login_for_access_token
from src.schemas import UsersRegister
from src.database import db_dependency



router = APIRouter()

@router.post("/create", status_code= status.HTTP_201_CREATED)
async def register_route(db: db_dependency,create_user_request: UsersRegister):
    return await create_user(db, create_user_request)


@router.post("/login", response_model=Token)
async def login_route(form_data: Userslogin ,db: db_dependency):
    return await login_for_access_token(form_data, db)
                                       