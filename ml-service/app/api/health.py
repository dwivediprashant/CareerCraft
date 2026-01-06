from fastapi import APIRouter

#Create a router

router = APIRouter()
@router.get("")
async def health_check():
    return{
        "status": "ok",
        "service": "ml-service"
    }
