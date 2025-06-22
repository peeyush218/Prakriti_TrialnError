from pydantic import BaseModel
from typing import List, Optional

class Product(BaseModel):
    id: str
    title: str
    image: str
    price: float
    rating: float
    badge_id: Optional[int] = 0
    is_sustainable: Optional[bool] = False

class Order(BaseModel):
    id: str
    user_id: str
    items: List[Product]
    total: float
    timestamp: int

class Feedback(BaseModel):
    name: str
    email: str
    feedback: str
    rating: int

class User(BaseModel):
    id: str
    email: str
    password: str

class RecommendationRequest(BaseModel):
    user_id: Optional[str] = None
    query: Optional[str] = None

class RecommendationResponse(BaseModel):
    recommendations: List[Product]

class ChatMessage(BaseModel):
    message: str

class Post(BaseModel):
    id: Optional[str] = None
    title: Optional[str] = None
    author: Optional[str] = None
    username: Optional[str] = None
    avatar: Optional[str] = None
    time: Optional[str] = None
    tags: Optional[List[str]] = []
    isPool: Optional[bool] = False
    location: Optional[str] = None
    poolDetails: Optional[dict] = None
    body: Optional[str] = None
    content: Optional[str] = None
    comments: Optional[List[dict]] = []
    likes: Optional[int] = 0 