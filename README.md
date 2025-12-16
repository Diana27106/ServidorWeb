# ServidorWeb

Servidor Web Nginx automatizado con GitHub Actions

## Preparar la instancia EC2 (solo una vez)

### 🔹 Crear EC2

- Ubuntu Server
- Tipo: `t2.nano`
- Abrir puertos en el **Security Group**:

  - 22 (SSH)
  - 80 (HTTP)

- Asignarle una IP Elástica

---

### 🔹 Conectarte por SSH

```bash
chmod 400 /clave.pem
ssh -i clave.pem ubuntu@IP_PUBLICA
```

---

### 🔹 Instalar Docker en la EC2

```bash
sudo apt update
sudo apt install docker.io -y
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker ubuntu
```

---

## GitHub Actions despliega en EC2 por SSH

### Guardas secretos en GitHub

En **Settings → Secrets**:

- `EC2_HOST`
- `EC2_USER`
- `EC2_SSH_KEY`

---

### Workflow de deploy (ejemplo claro)

```yaml
name: Docker Dev Build

on:
  push:
    branches:
      - main
      - develop

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repo
        uses: actions/checkout@v6.0.1

      - name: Build Docker image
        run: docker build -t web-dev .

      - name: Save image
        run: docker save web-dev | gzip > web-dev.tar.gz

      - name: Copy image to EC2
        uses: appleboy/scp-action@v0.1.7
        with:
          host: ${{ secrets.EC2_HOST }}
          username: ${{ secrets.EC2_USER }}
          key: ${{ secrets.EC2_SSH_KEY }}
          source: "web-dev.tar.gz"
          target: "~"

      - name: Deploy on EC2
        uses: appleboy/ssh-action@v1.0.3
        with:
          host: ${{ secrets.EC2_HOST }}
          username: ${{ secrets.EC2_USER }}
          key: ${{ secrets.EC2_SSH_KEY }}
          script: |
            docker load < web-dev.tar.gz
            docker stop web || true
            docker rm web || true
            docker run -d -p 80:80 --name web web-dev
```

---

## Cómo compruebas que funciona

Ahora SÍ:

```
http://18.204.80.93
```

Y ves tu `index.html`.

---
