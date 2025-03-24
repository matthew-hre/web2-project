FROM node:23
 
WORKDIR /app
 
COPY package*.json ./
 
RUN npm install --omit=dev
 
COPY . .
  
CMD ["npm", "run", "dev"]
