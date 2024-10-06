# Usa una imagen base de Node.js
FROM node:18-alpine

# Establecemos el directorio de trabajo dentro del contenedor
WORKDIR /

# Copia el archivo package.json y pnpm-lock.yaml al contenedor
COPY package*.json yarn.lock ./

# Instala yarn globalmente en el contenedor si no esta instalado
RUN if ! command -v yarn > /dev/null; then npm install -g yarn; fi

# Instalamos las dependencias de la app
RUN yarn install

# Copia el resto del código fuente de la app
COPY . .

# Contruye la app
RUN yarn build

# Comando para ejecutar la app
CMD ["node", "dist/main.js"]