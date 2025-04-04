

from src.database import db_dependency 
from src.models import CurriculoPaginas
from src.controllers.authController import get_current_user



async def createNewTableCurriculos(dados, db):
    user =  await get_current_user(dados.token);
    if user:
        existing_curriculo = db.query(CurriculoPaginas).filter(CurriculoPaginas.user_id == user['id']).first()
        if not existing_curriculo:
            newTablecurriculo = CurriculoPaginas(user_id=user['id'], nPaginas="", title= dados.title)
            db.add(newTablecurriculo)
            db.commit()
            db.refresh(newTablecurriculo)
            return {"message": "Tabela criada com sucesso"};
        return {"error": "Tabela ja existe"};
    else:    
        return {"error": "Token invalido"};



async def readAllCurriculos(token,db):
        existing_curriculo = db.query(CurriculoPaginas).filter(CurriculoPaginas.user_id == token['id']).first()
        if existing_curriculo:
             return {"mensagem": existing_curriculo.nPaginas , "title": existing_curriculo.title};
        return {"error": "Tabela de Curriculo nao encontrado"};






async def addNewCurriculo(dados, db):
  
    user =  await get_current_user(dados.token);
    curriculo = db.query(CurriculoPaginas).filter(CurriculoPaginas.user_id == user['id']).first()
    if curriculo:
        curriculo.nPaginas = dados.nPaginas
        db.commit()
        db.refresh(curriculo)
        return {"message": "Curriculo atualizado com sucesso"};
    return {"error": "Curriculo nao encontrado"};

async def deleteCurriculo(dados, db):
    user =  await get_current_user(dados.token);
    curriculo = db.query(CurriculoPaginas).filter(CurriculoPaginas.user_id == user['id']).first()
    if curriculo:
        db.delete(curriculo)
        db.commit()
    return {"mensagem": "deletar curriculos"};



#deletar tudos os curriculos
async def DeleteTableCurriculos(dados, db):
    user =  await get_current_user(dados.token);
    curriculo = db.query(CurriculoPaginas).filter(CurriculoPaginas.user_id == user['id']).first()
    if curriculo:
        db.delete(curriculo)
        db.commit()
    return {"mensagem": "curriculo deletado curriculos"};