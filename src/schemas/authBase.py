from pydantic import BaseModel


class UsersRegister(BaseModel):
    username: str
    email: str
    phone: str
    cpf_cnpj: str
    password: str
    
class Userslogin(BaseModel):
    username: str
    password: str

class Token(BaseModel):
    username: str
    access_token: str
    token_type: str
