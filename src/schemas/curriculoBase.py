from pydantic import BaseModel
 



class baseNewTableCurriculos(BaseModel):
    title: str
    token: str
   
class BaseDeleteTableCurriculos(BaseModel):
    token: str
#colocar title

class BaseUpdateAndDeleteCurriculo(BaseModel):
    token: str
    nPaginas: str

