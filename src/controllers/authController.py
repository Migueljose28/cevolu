
from src.utils import *
from src.models import Users

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