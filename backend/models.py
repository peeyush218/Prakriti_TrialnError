from typing import List
from schemas import Product, Order, Feedback, User
import json
import os

import sys

def log(msg):
    print(f"[ProductLoader] {msg}", file=sys.stderr)

# Load products from JSON file
products_path = os.path.join(os.path.dirname(__file__), 'products.json')
with open(products_path, encoding='utf-8') as f:
    raw_products = json.load(f)
    cleaned_products = []
    skipped = 0
    for idx, p in enumerate(raw_products):
        try:
            # Default missing fields
            p['id'] = str(p.get('id', f'unknown_{idx}'))
            p['title'] = p.get('title', 'No Title')
            p['description'] = p.get('description', '')
            p['image'] = p.get('image', '')
            p['price'] = float(p.get('price', 0.0) or 0.0)
            p['rating'] = float(p.get('rating', 0.0) or 0.0)
            if 'discounted_price' in p and p['discounted_price'] is None:
                p['discounted_price'] = 0.0
            if 'badge_id' not in p:
                p['badge_id'] = 0
            # Skip products without a valid image URL
            if not isinstance(p.get('image'), str) or not p.get('image'):
                log(f"Skipping product idx={idx} id={p['id']} due to missing/invalid image.")
                skipped += 1
                continue
            cleaned_products.append(Product(**p))
        except Exception as e:
            log(f"Skipping product idx={idx} id={p.get('id', 'unknown')} due to error: {e}")
            skipped += 1
    products = cleaned_products
    log(f"Loaded {len(products)} products. Skipped {skipped} products due to errors.")

orders: List[Order] = []
feedbacks: List[Feedback] = []
users: List[User] = [] 
