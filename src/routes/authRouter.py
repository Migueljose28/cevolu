
from fastapi import APIRouter
from starlette import status
from src.schemas import *
from src.controllers import create_user
from src.database import *
from src.schemas import UsersRegister



router = APIRouter()

@router.post("/create", status_code= status.HTTP_201_CREATED)
async def register_route(db: db_dependency,
                      create_user_request: UsersRegister):
    return await create_user(db, create_user_request)

@router.post("/login", response_model=Token)
async def login_route():
    return "await login()"