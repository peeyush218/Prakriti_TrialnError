from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from schemas import Product, Order, Feedback, User, RecommendationRequest, RecommendationResponse, ChatMessage, Post
import models
from sentence_transformers import SentenceTransformer, util
from sklearn.metrics.pairwise import cosine_similarity
import json
import os
from dotenv import load_dotenv
import google.generativeai as genai
import datetime
import numpy as np

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Post Endpoints ---
POSTS_FILE = "posts.json"

def read_posts_from_db():
    try:
        with open(POSTS_FILE, "r") as f:
            return json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        return []

def save_posts_to_db(posts_data):
    with open(POSTS_FILE, "w") as f:
        json.dump(posts_data, f, indent=4)

@app.get("/posts", response_model=List[Post])
def get_posts():
    return read_posts_from_db()

@app.get("/posts/{post_id}", response_model=Post)
def get_post(post_id: str):
    posts = read_posts_from_db()
    for post in posts:
        if post.get("id") == post_id:
            return post
    raise HTTPException(status_code=404, detail="Post not found")

@app.post("/posts", response_model=Post)
def create_post(post: Post):
    posts = read_posts_from_db()
    post.id = f"post_{datetime.datetime.utcnow().timestamp()}"
    post.time = "Just now"
    new_post_data = post.dict()
    posts.insert(0, new_post_data)
    save_posts_to_db(posts)
    return post
# --- End Post Endpoints ---

# Load environment variables and configure API
load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY not found in .env file")
genai.configure(api_key=GEMINI_API_KEY)

# Load data and models
all_products = models.products
model = SentenceTransformer('all-MiniLM-L6-v2')
product_texts = [f"{getattr(p, 'title', '')} {getattr(p, 'description', '')}" for p in all_products]
product_embeddings = model.encode(product_texts, convert_to_numpy=True)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Green-Commerce API"}

@app.post("/api/chat")
async def chat_handler(message: ChatMessage):
    try:
        chat_model = genai.GenerativeModel('gemini-1.5-flash')
        response = chat_model.generate_content(message.message)
        return {"response": response.text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/search", response_model=List[Product])
def search_products(q: str = ""):
    if not q:
        return []

    # Temporarily using a direct keyword search to ensure data is being loaded correctly.
    q_lower = q.lower()
    keyword_results = [
        p for p in all_products 
        if q_lower in p.title.lower() or 
            (hasattr(p, 'description') and p.description and q_lower in p.description.lower())
    ]
    return keyword_results

@app.get("/recommend", response_model=RecommendationResponse)
def recommend_products(query: str = Query(..., description="Product title or search query"), top_k: int = 5, sustainable_only: bool = False):
    
    target_products = all_products
    target_embeddings = product_embeddings

    if sustainable_only:
        # Filter for sustainable products
        sustainable_indices = [i for i, p in enumerate(all_products) if getattr(p, 'is_sustainable', False)]
        if not sustainable_indices:
            return RecommendationResponse(recommendations=[])
        
        target_products = [all_products[i] for i in sustainable_indices]
        target_embeddings = product_embeddings[sustainable_indices]

    query_embedding = model.encode([query], convert_to_numpy=True)
    similarities = cosine_similarity(query_embedding, target_embeddings)[0]
    
    # Get top_k indices from the target list
    top_indices_in_target = np.argsort(similarities)[::-1][:top_k]
    
    # The final recommended products
    recommended = [target_products[i] for i in top_indices_in_target]
    
    return RecommendationResponse(recommendations=recommended)

@app.get("/product/{product_id}", response_model=Product)
def get_product(product_id: str):
    for p in all_products:
        if str(p.id) == str(product_id):
            return p
    raise HTTPException(status_code=404, detail="Product not found")

@app.get("/products/all", response_model=List[Product])
def get_all_products():
    return all_products
