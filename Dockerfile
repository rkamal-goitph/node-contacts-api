# Step 1: Use an official Node.js image as a base image
FROM node:18

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json files to the working directory
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the entire project directory to the container
# first dot means copying the entire project directory
# second dot means moving the files over to the container
COPY . .

# Step 6: Set environment variables (example: change the port to 4000)
ENV PORT=4000

# Step 7: Expose the port on which your API runs (matching the PORT environment variable)
# the expose command makes sure that docker is able to access the port 4000
EXPOSE 4000

# Step 8: Define the command to run your API (choose between production or dev mode)
# For production mode
# CMD ["npm", "start"]

# Uncomment below if you want to run the API in development mode
CMD ["npm", "run", "start:dev"]
