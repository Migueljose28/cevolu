from pydantic import BaseModel


class adminBase(BaseModel):
    username: str
    email: str
    phone: str
    cpf_cnpj: str
    is_active: bool
    role: str
    
 
 
 
 
  

