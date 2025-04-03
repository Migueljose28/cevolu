from fastapi import FastAPI
import subprocess

app = FastAPI()

@app.post("/webhook")
async def webhook():
	subprocess.run(["/home/cevolu/deploy.sh"], shell=True)
	return {"message": "Deploy iniciado!"}
