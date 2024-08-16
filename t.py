import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import make_pipeline
from sklearn.metrics import classification_report

# Sample data
data = {'product_description': ['Red running shoes', 'Wireless headphones', 'Organic black tea', 'Smartphone with 64GB storage'],
        'category': ['Footwear', 'Electronics', 'Groceries', 'Electronics']}

df = pd.DataFrame(data)

# Split the data
X_train, X_test, y_train, y_test = train_test_split(df['product_description'], df['category'], test_size=0.2, random_state=42)

# Create a pipeline
model = make_pipeline(TfidfVectorizer(), MultinomialNB())

# Train the model
model.fit(X_train, y_train)

# Predict and evaluate
y_pred = model.predict(X_test)
print(classification_report(y_test, y_pred))
