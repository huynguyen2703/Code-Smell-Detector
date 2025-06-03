# Dockerfile (Next.js)

# Start from an official Node.js image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
COPY . .

# Build the app for production
RUN npm run build

# Expose the port that the app runs on
EXPOSE 3000

# Command to run the app
CMD ["npm", "start"]
