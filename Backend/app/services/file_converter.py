# Logic for file conversion

import subprocess

def convert_to_glb(input_file, output_file):
    """
    Converts a 3D model file to GLB format using Assimp or other tools.
    Raises an exception if conversion fails.
    """
    try:
        # Example using Assimp
        subprocess.run(["assimp", "export", input_file, output_file, "-fglb2"], check=True)
    except subprocess.CalledProcessError as e:
        raise Exception(f"File conversion failed: {str(e)}")
