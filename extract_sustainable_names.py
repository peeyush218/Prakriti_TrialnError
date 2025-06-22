import json

def extract_sustainable_names():
    """
    Reads temp_sustainable_products.json and extracts just the product names
    to a text file for easy reference.
    """
    try:
        with open('temp_sustainable_products.json', 'r', encoding='utf-8') as f:
            products = json.load(f)
    except (FileNotFoundError, json.JSONDecodeError) as e:
        print(f"Error reading temp_sustainable_products.json: {e}")
        return

    # Extract just the titles
    product_names = [product.get('title', 'No title') for product in products]
    
    output_filename = 'sustainable_product_names.txt'
    try:
        with open(output_filename, 'w', encoding='utf-8') as f:
            for i, name in enumerate(product_names, 1):
                f.write(f"{i}. {name}\n")
        
        print(f"Extracted {len(product_names)} product names to {output_filename}")

    except IOError as e:
        print(f"Error writing to {output_filename}: {e}")

if __name__ == "__main__":
    extract_sustainable_names() 
