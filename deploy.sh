*!/bin/bash
echo "Iniciando o deploy em $(date) na vps"

cd /home/cevolu || exit
git pull master

echo "usando .env de produção"
cp .env.prod .env

echo "reiniciando o nginx"
sudo systemctl daemon-reload
sudo systemctl restart seuprojeto
sudo systemctl restart nginx
sudo systemctl enable seuprojeto
sudo systemctl status seuprojeto
sudo journalctl -xeu seuprojeto.service
echo "deploy feito com sucesso em $(date) na vps" >> deploy.log
