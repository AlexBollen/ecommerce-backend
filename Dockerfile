# Usa una imagen base de Node.js
FROM node:18-alpine

# Establecemos el directorio de trabajo dentro del contenedor
WORKDIR /

# Copia el archivo package.json y pnpm-lock.yaml al contenedor
COPY package*.json pnpm-lock.yaml ./

# Instala pnpm globalmente en el contenedor
RUN npm install -g pnpm

# Instalamos las dependencias de la app
RUN pnpm install

# COpia el resto del código fuente de la app
COPY . .

# Contruye la app
RUN pnpm build

# Comando para ejecutar la app
CMD ["node", "dist/main.js"]