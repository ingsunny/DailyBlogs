# Use the official Node.js image
FROM node:18-alpine 

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the frontend code
COPY . .

# Expose the port Vite runs on
EXPOSE 5173

# Start the frontend
CMD ["npm", "run", "dev"]
