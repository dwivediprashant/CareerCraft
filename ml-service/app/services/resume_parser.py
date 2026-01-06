import pymupdf
from docx import Document
import io
import re

def extract_textpdf(file_bytes):
    doc = pymupdf.open(stream=file_bytes, filetype="pdf")
    blocks = []

    for page in doc:
        for b in page.get_text("blocks"):
            text = b[4]  # block text
            text = re.sub(r"[^\x00-\x7F]+", " ", text)
            blocks.append(text)

    return "\n".join(blocks)

def extract_textdocs(file_bytes):
    doc = Document(io.BytesIO(file_bytes))
    return "\n".join(paragraph.text for paragraph in doc.paragraphs)
