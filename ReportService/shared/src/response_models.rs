use rocket::serde::{Serialize, Deserialize};


#[derive(Serialize, Deserialize, Debug)]
pub struct ApiResponse<T> {
    pub success: bool,
    pub message: String,
    pub data: Option<T>,
    pub status_code: u16
}