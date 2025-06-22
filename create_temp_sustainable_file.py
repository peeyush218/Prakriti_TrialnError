import json

def create_sustainable_list():
    """
    Reads products from backend/products.json, filters for sustainable ones,
    and writes them to temp_sustainable_products.json.
    """
    try:
        with open('backend/products.json', 'r', encoding='utf-8') as f:
            products = json.load(f)
    except (FileNotFoundError, json.JSONDecodeError) as e:
        print(f"Error reading backend/products.json: {e}")
        return

    sustainable_products = [p for p in products if p.get('is_sustainable')]

    output_filename = 'temp_sustainable_products.json'
    try:
        with open(output_filename, 'w', encoding='utf-8') as f:
            json.dump(sustainable_products, f, indent=2, ensure_ascii=False)
        
        print(f"Found {len(sustainable_products)} sustainable products.")
        print(f"List of sustainable products saved to {output_filename}")

    except IOError as e:
        print(f"Error writing to {output_filename}: {e}")

if __name__ == "__main__":
    create_sustainable_list() 
