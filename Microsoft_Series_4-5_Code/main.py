from typing import List

import openai
from fastapi import FastAPI, File, UploadFile, BackgroundTasks
from fastapi.staticfiles import StaticFiles

openai.api_key = "AZURE_OPENAI_KEY"
openai.api_base = "AZURE_OPENAI_ENDPOINT"
openai.api_type = 'azure'
openai.api_version = '2023-05-15'

app = FastAPI()

async def generate_logos(text_prompt: str):
    # Generate images from text prompt using DALL-E
    response = await openai.Image.acreate(
        prompt=f"A company logo matching the following description: {text_prompt}",
        size="256x256",
        n=3,
    )

    # Return a list of image URLs
    image_urls = [image["url"] for image in response["data"]]
    return image_urls


@app.post("/logos", response_model=List[str])
async def logos(text_prompt: str = ""):
    # Generate logo variants using DALL-E
    image_urls = await generate_logos(text_prompt)
    
    return image_urls
    

app.mount("/", StaticFiles(directory="static", html=True), name="static")