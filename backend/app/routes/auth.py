from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm
from app.database import get_db
from app.models.user import User
from app.schemas.user import UserCreate, UserResponse

from app.utils.security import ( hash_password, verify_password, create_access_token, get_current_user) 

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
    )

@router.post("/register", response_model=UserResponse)
def register(user: UserCreate, db: Session = Depends(get_db)):

    existing_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    new_user = User(
        name=user.name,
        email=user.email,
        password_hash=hash_password(user.password)
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user

# @router.post("/login")
# def login(
#     form_data: OAuth2PasswordRequestForm = Depends(),
#     db: Session = Depends(get_db)
# ):

#     user = db.query(User).filter(
#         User.email == form_data.username
#     ).first()

#     if not user:
#         raise HTTPException(
#             status_code=400,
#             detail="User not found"
#         )

#     if not verify_password(
#         form_data.password,
#         user.password_hash
#     ):
#         raise HTTPException(
#             status_code=401,
#             detail="Incorrect password"
#         )
 
    
#     access_token = create_access_token(
#     data={"sub": user.email}
# )

#     return {
#            "access_token": access_token,  
#            "token_type": "bearer"
# }


@router.post("/login")
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):

    print("USERNAME RECEIVED =", form_data.username)
    print("PASSWORD RECEIVED =", form_data.password)

    user = db.query(User).filter(
        User.email == form_data.username
    ).first()

    print("USER FOUND =", user)

    if not user:
        raise HTTPException(
            status_code=400,
            detail="User not found"
        )

    if not verify_password(
        form_data.password,
        user.password_hash
    ):
        raise HTTPException(
            status_code=401,
            detail="Incorrect password"
        )

    access_token = create_access_token(
        data={"sub": user.email}
    )

    return {
        "access_token": access_token,
        "token_type": "bearer",
         "user": {
             "id": user.id,
             "name": user.name,
             "email": user.email
         }
    }
    
@router.get("/profile")
def profile(
    current_user: User = Depends(get_current_user)
):
    return {
        "id": current_user.id,
        "name": current_user.name,
        "email": current_user.email
    }