#!/bin/bash
#Roda no modo development


# Ativa o ambiente virtual
source venv/bin/activate

# Rodando o servidor com Uvicorn
uvicorn app:app --reload
