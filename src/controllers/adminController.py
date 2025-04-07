from src.models import Users
from fastapi import HTTPException
from sqlmodel import select
from sqlalchemy import or_, cast, String

async def getAllUser(db):
    getAll = db.query(Users).all()
    return getAll

async def getUser(termo_buscar, db):
    termo = f"%{termo_buscar}%"

    query = select(Users).where(
        or_(
            cast(Users.id, String).like(termo),
            Users.username.like(termo),
            Users.email.like(termo),
            cast(Users.phone, String).like(termo)
        )
    )

    return db.exec(query).all()



    if not user_to_update:
        raise HTTPException(status_code=404, detail="Usuário não encontrado.")
    return user_to_update


async def modifyUser(adminBase, id, db):
    getUserForId = db.query(Users).filter(Users.id == id).first()

    if not  getUserForId:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")

    # Atualiza os campos
    getUserForId.username = adminBase.username
    getUserForId.email = adminBase.email
    getUserForId.phone = adminBase.phone
    getUserForId.cpf_cnpj = adminBase.cpf_cnpj
    getUserForId.is_active = adminBase.is_active
    getUserForId.role = adminBase.role

    db.commit()
    db.refresh(getUserForId)

    return {"detail": "Usuário atualizado com sucesso", "user":  getUserForId}