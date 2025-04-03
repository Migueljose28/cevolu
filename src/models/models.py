from sqlmodel import SQLModel, Field, Relationship
from datetime import datetime
from typing import List, Optional
from enum import Enum

class Role(str, Enum):
    ADMIN = "admin"
    MEMBRO = "MEMBRO"
    USER = "user"

class Users(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    username: str = Field(index=True)
    email: str = Field(index=True)
    phone: str = Field(index=True)
    cpf_cnpj: str = Field(index=True)
    hashed_password: str = Field(index=True)
    is_logged_in: bool = Field(default=False)
    is_active: bool = Field(default=True)
    last_login: datetime = Field(default_factory=datetime.now) 
    last_logout: datetime = Field(default_factory=datetime.now) 
    role: Role = Field(default=Role.USER)
    
    # Relacionamento com a tabela CurriculoPaginas
    curriculos: List["CurriculoPaginas"] = Relationship(back_populates="user")
    #curriculos: List["Vacancy"] = Relationship(back_populates="user")

class CurriculoPaginas(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="users.id", nullable=False)  
    nPaginas: str = Field(index=True,default="")
    title: str = Field(index=True,default="")
    # Relacionamento com a tabela Users
    user: Users = Relationship(back_populates="curriculos")


class Vacancy(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    #user_id: int = Field(foreign_key="users.id", nullable=False) 
    title: str = Field(index=True)
    description: str = Field(index=True,default="")
    Requirements: str = Field(index=True,default="")
    benefits: str = Field(index=True,default="")
    typeForWork: str = Field(index=True,default="")
    Location: str = Field(index=True,default="")
    expirationDate: str = Field(index=True,default="")
    #datetime = Field(default_factory=datetime.now)

    #user: Users = Relationship(back_populates="Vacancy")