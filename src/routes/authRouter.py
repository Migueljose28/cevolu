
from fastapi import APIRouter, Depends
from starlette import status
from src.schemas import Token, UsersRegister, Userslogin
from src.controllers import create_user, verify_login
from src.schemas import UsersRegister
from src.database import db_dependency
from fastapi import APIRouter, HTTPException, Response, Depends
from typing import Annotated
from fastapi.security import OAuth2PasswordRequestForm


router = APIRouter()

@router.post("/register", status_code= status.HTTP_201_CREATED)
async def register_route(db: db_dependency,create_user_request: UsersRegister):
    return await create_user(db, create_user_request)


@router.post("/login", response_model=Token)#A resposta vem do formado do schemas
async def login_route( response: Response, form_data: Annotated[OAuth2PasswordRequestForm, Depends()],db: db_dependency):
    return await verify_login(form_data, response, db)
