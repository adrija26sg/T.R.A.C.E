 # Endpoints for file uploads and conversions
 
from flask import Blueprint, request, jsonify
import os
from werkzeug.utils import secure_filename
from ..services.file_converter import convert_to_glb
from ..models.file_log import FileLog
from ..utils.db import db

file_upload_bp = Blueprint('file_upload', __name__, url_prefix='/api/files')

UPLOAD_FOLDER = 'uploads/original'
CONVERTED_FOLDER = 'uploads/converted'
ALLOWED_EXTENSIONS = {'glb', 'obj', 'fbx', 'dae'}

# Ensure directories exist
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(CONVERTED_FOLDER, exist_ok=True)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# File upload endpoint
@file_upload_bp.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({"error": "No file provided"}), 400
    
    file = request.files['file']
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        original_path = os.path.join(UPLOAD_FOLDER, filename)
        file.save(original_path)

        # Attempt conversion
        converted_path = os.path.join(CONVERTED_FOLDER, filename.rsplit('.', 1)[0] + '.glb')
        try:
            convert_to_glb(original_path, converted_path)
            # Log success in the database
            log = FileLog(original_path=original_path, converted_path=converted_path, status="success")
            db.session.add(log)
            db.session.commit()

            return jsonify({"message": "File uploaded and converted successfully", "converted_file": converted_path}), 200
        except Exception as e:
            # Log failure
            log = FileLog(original_path=original_path, status="error", error_message=str(e))
            db.session.add(log)
            db.session.commit()

            return jsonify({"error": "File conversion failed", "details": str(e)}), 500
    else:
        return jsonify({"error": "Invalid file type"}), 400
