from src.models import Vacancy



async def createVacancy(dados, db):
    title = dados["title"]
    description = dados["Descrição"]
    requirements = dados["Requisitos"]
    benefits = dados["Benefícios"]
    typeForWork = dados["tipoDeTrabalho"]
    location = dados["Localização"]
    expirationDate = dados["dataExpiração"]
    newVacancy = Vacancy(title=title,
     description=description,
      requirements=requirements,
       benefits=benefits,
       typeForWork=typeForWork,
       location=location,
       expirationDate =expirationDate
       )
    db.add(newVacancy)
    db.commit()
    db.refresh(newVacancy)
    return {"mensagem": "Deu certo"}




  #title: str = Form(...),
   # Descrição: str = Form(...),
   # Requisitos: str = Form(...),
  #  Benefícios: float = Form(...),
  #  tipoDeTabalho: str = Form(...),
   # Localização: str = Form(...),
   # Localização: str = Form(...),
    #dataExpiração:  = Form(...)