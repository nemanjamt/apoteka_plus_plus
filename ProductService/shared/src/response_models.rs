
use rocket::serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct ApiResponse<T> {
    pub success: bool,
    pub status_code: u16,
    pub data: Option<T>,
    pub message : String
}