
from src.utils import *
from src.utils import SECRET_KEY,   ALGORITHM
from src.models import Users
from starlette import status
from datetime import timedelta, datetime
from fastapi import HTTPException
from jose import JWTError
import jwt
from typing import Annotated
from fastapi import APIRouter, Depends

async def create_user(db,
                      create_user_request):
    create_user_model = Users(
        username= create_user_request.username,
        email = create_user_request.email,
        phone = create_user_request.phone,
        cpf_cnpj = create_user_request.cpf_cnpj,
        hashed_password = bcrypt_context.hash(create_user_request.password),

    )
    db.add(create_user_model)
    db.commit()
    return create_user_model



async def login_for_access_token(form_data, response, db):

    auth_result = authenticate_user(form_data.username, form_data.password, db)
    if not auth_result["success"]:
        raise HTTPException(status_code=400, detail=auth_result["message"])
    token = create_access_token(
        auth_result["user"].username,
        auth_result["user"].id,
        timedelta(minutes=9999)
    )
    response.set_cookie(
        key="access_token",
        value=token,
        httponly=True,
        samesite="None",
        secure=True
    )
    return {"username": form_data.username, "access_token": token, "token_type": "bearer"}

def authenticate_user(username: str, password: str, db):
    user = db.query(Users).filter(Users.username == username).first()
    if not user:
        return {"success": False, "message": "Usuário não encontrado."}

    if not bcrypt_context.verify(password, user.hashed_password):
        return {"success": False, "message": "Senha incorreta."}

    return {"success": True, "user": user, "message": "Login realizado com sucesso!"}


def create_access_token(username: str, user_id: int, expires_delta: timedelta):
    encode = {'sub': username, 'id': user_id}
    expires = datetime.utcnow() + expires_delta
    encode.update({'exp': expires})
    return jwt.encode(encode, SECRET_KEY, algorithm=ALGORITHM) 
 

async def get_current_user(token: Annotated[str, Depends(oauth2_bearer)]):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithm=ALGORITHM)
        username: str = payload.get('sub')
        user_id: int = payload.get('id')
        if username is None or user_id is None:
            raise HTTPException(status_code = status.HTTP_400_UNAUTHORIZED, detail = 'Could not validate user.')
        return {'username': username, 'id': user_id}
    except JWTError:
        raise HTTPException(status_code = status.HTTP_400_UNAUTHORIZED,
                            detail= 'Could not validate user.')
    
