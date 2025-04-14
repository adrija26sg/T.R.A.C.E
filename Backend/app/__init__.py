from flask import Flask
from flask_cors import CORS
import os

# Initialize Flask app
app = Flask(__name__)

# Enable CORS for cross-origin requests
CORS(app)

# Configure upload directories
app.config['UPLOAD_FOLDER'] = os.path.join(os.getcwd(), 'uploads', 'original')
app.config['CONVERTED_FOLDER'] = os.path.join(os.getcwd(), 'uploads', 'converted')

# Create upload directories if they don't exist
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
os.makedirs(app.config['CONVERTED_FOLDER'], exist_ok=True)

# Import routes and register blueprints
from app.routes.file_upload import file_upload_bp
from app.routes.soldier import soldier_bp

app.register_blueprint(file_upload_bp)
app.register_blueprint(soldier_bp)
