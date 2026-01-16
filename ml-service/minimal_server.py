#!/usr/bin/env python3
"""
Minimal server for cover letter generation - only working endpoints
"""

import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from typing import Dict, Any
from datetime import datetime

# Import only working cover letter functionality
from app.api.cover_letter import router as cover_letter_router
from app.api.health import router as health_router

app = FastAPI(title="CareerCraft ML Service - Minimal")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include only working routes
app.include_router(health_router, prefix="/health", tags=["System"])
app.include_router(cover_letter_router, prefix="/cover-letter", tags=["Cover Letter"])

# Mock resume endpoints (avoiding spaCy compatibility issues)
@app.post("/resume/extract-text")
async def extract_resume_text(file: UploadFile = File(...)):
    """Mock resume text extraction"""
    return {
        "filename": file.filename,
        "text": """
John Doe
Software Engineer
Email: john.doe@email.com | Phone: (555) 123-4567 | Location: San Francisco, CA

EXPERIENCE
Senior Software Engineer - Tech Corp (2020-Present)
- Led development of microservices architecture
- Implemented CI/CD pipelines reducing deployment time by 40%
- Mentored team of 5 junior developers

Software Engineer - StartupXYZ (2018-2020)
- Developed RESTful APIs using Node.js and Express
- Built responsive web applications with React
- Collaborated with cross-functional teams

EDUCATION
Bachelor of Science in Computer Science
University of California, Berkeley (2014-2018)

SKILLS
Programming: Python, JavaScript, Java, C++
Technologies: React, Node.js, Docker, AWS, MongoDB
Tools: Git, Jenkins, Jira, Agile methodologies
        """.strip()
    }

@app.post("/resume/extract")
async def extract_resume(file: UploadFile = File(...)):
    """Mock resume text extraction (alternative endpoint)"""
    return {
        "text": """
John Doe
Software Engineer
Email: john.doe@email.com | Phone: (555) 123-4567 | Location: San Francisco, CA

EXPERIENCE
Senior Software Engineer - Tech Corp (2020-Present)
- Led development of microservices architecture
- Implemented CI/CD pipelines reducing deployment time by 40%
- Mentored team of 5 junior developers

Software Engineer - StartupXYZ (2018-2020)
- Developed RESTful APIs using Node.js and Express
- Built responsive web applications with React
- Collaborated with cross-functional teams

EDUCATION
Bachelor of Science in Computer Science
University of California, Berkeley (2014-2018)

SKILLS
Programming: Python, JavaScript, Java, C++
Technologies: React, Node.js, Docker, AWS, MongoDB
Tools: Git, Jenkins, Jira, Agile methodologies
        """.strip()
    }

@app.post("/resume/analyze")
async def analyze_resume(request: Dict[str, Any]):
    """Mock resume analysis (avoiding spaCy issues)"""
    return {
        "personal_info": {
            "name": "John Doe",
            "email": "john.doe@email.com",
            "phone": "(555) 123-4567",
            "location": "San Francisco, CA"
        },
        "skills": [
            "Python", "JavaScript", "Java", "C++", "React", 
            "Node.js", "Docker", "AWS", "MongoDB", "Git", 
            "Jenkins", "Jira", "Agile", "Microservices", "REST APIs"
        ],
        "experience": [
            {
                "company": "Tech Corp",
                "position": "Senior Software Engineer",
                "duration": "2020-Present",
                "description": "Led development of microservices architecture, implemented CI/CD pipelines, mentored team"
            },
            {
                "company": "StartupXYZ",
                "position": "Software Engineer",
                "duration": "2018-2020",
                "description": "Developed RESTful APIs, built responsive web applications, collaborated with teams"
            }
        ],
        "education": [
            {
                "institution": "University of California, Berkeley",
                "degree": "Bachelor of Science in Computer Science",
                "year": "2018"
            }
        ],
        "projects": [
            {
                "name": "E-commerce Platform",
                "description": "Built full-stack e-commerce solution with React and Node.js",
                "technologies": ["React", "Node.js", "MongoDB", "Docker"]
            },
            {
                "name": "API Gateway",
                "description": "Developed microservices API gateway with authentication",
                "technologies": ["Python", "FastAPI", "PostgreSQL", "Redis"]
            }
        ]
    }

@app.get("/")
async def root():
    return {"message": "Minimal ML Service is running"}

if __name__ == "__main__":
    print("Starting Minimal ML Service...")
    print("Server will be available at: http://localhost:8000")
    print("✅ Real cover letter generation enabled")
    print("⚠️  Mock resume analysis (avoiding spaCy issues)")
    
    uvicorn.run(app, host="0.0.0.0", port=8000)
