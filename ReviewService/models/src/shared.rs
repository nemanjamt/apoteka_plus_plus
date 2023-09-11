use rocket::serde::{Deserialize, Serialize};
#[derive(Deserialize, Serialize, Debug)]
pub struct UserBasicInfo{
    pub id:i32,
    pub first_name:String,
    pub last_name: String

}