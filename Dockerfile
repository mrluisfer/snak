# Dockerfile
FROM node:24

# Apply security patches to reduce vulnerabilities
RUN apt-get update && apt-get upgrade -y && rm -rf /var/lib/apt/lists/*

# 1) deps del sistema mínimas
RUN apt-get update && apt-get install -y git && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# 2) instala deps con caché
COPY package.json package-lock.json* yarn.lock* pnpm-lock.yaml* ./
# elige tu gestor (npm/yarn/pnpm). Ejemplo npm:
RUN npm ci || npm install

# 3) copia el resto
COPY . .

# 4) variables para que Expo/Metro escuchen desde fuera del contenedor
ENV EXPO_DEVTOOLS_LISTEN_ADDRESS=0.0.0.0 \
    REACT_NATIVE_PACKAGER_HOSTNAME=0.0.0.0 \
    # activan “polling” para hot-reload estable en Docker (especialmente en Mac/WSL)
    CHOKIDAR_USEPOLLING=1 \
    WATCHPACK_POLLING=true

# Puertos más comunes:
# 8081  -> Metro/Dev Server (RN)
# 19000 -> Expo (protocol) / Expo Go (classic)
# 19001 -> Debugger/Manifest (classic)
# 19002 -> DevTools UI (classic)
# 19006 -> Expo web (vite/webpack)
EXPOSE 8081 19000 19001 19002 19006

# 5) comando por defecto
# asegúrate que "start" corre `expo start --host 0.0.0.0`
CMD ["npm", "run", "start"]
