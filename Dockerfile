FROM node:alpine

# Copy data directory
COPY data ./data

# Set working directory
WORKDIR /src

# Copy application code
COPY . .

# Copy package*.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Expose port
EXPOSE 3000

# Run command
CMD ["npm", "start"]