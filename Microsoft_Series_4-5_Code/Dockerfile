# Use the official Python 3.11 image as a base
FROM python:3.11

# Set the working directory to /app
WORKDIR /app

# Copy the requirements.txt file to /app
COPY requirements.txt .

# Install the required Python packages
RUN pip install -r requirements.txt

# Copy the main.py file to /app
COPY main.py .

# Expose port 8000 for FastAPI
EXPOSE 8000

# Use Uvicorn to run the app when the container starts
CMD ["uvicorn", "main:app", "--host", "0.0.0.0"]