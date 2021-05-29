#![feature(decl_macro)]
extern crate rocket;
extern crate json;
#[macro_use] extern crate rocket_contrib;

mod script_dir;

use std::{io, path::{Path, PathBuf}};
use rocket::{get, post, routes, response::{NamedFile }};
use rocket_contrib::json::Json;
use rocket_contrib::json::JsonValue;

#[get("/")]
fn index() -> io::Result<NamedFile> {
    let page_dir_path = format!("{}/../aloitsh-client/build", env!("CARGO_MANIFEST_DIR"));
    NamedFile::open(Path::new(&page_dir_path))
}

#[post("/create_sh", format = "application/json", data = "<request>")]
fn create_sh(request: String) {
    println!("{}", request);
    let mut parsedReq = json::parse(&request).unwrap();
    parsedReq["info"] = "changed".into();
    println!("{}", parsedReq);
}


#[get("/<file..>")]
fn build_dir(file: PathBuf) -> io::Result<NamedFile> {
    let page_dir_path = format!("{}/../client/build", env!("CARGO_MANIFEST_DIR"));
    NamedFile::open(Path::new(&page_dir_path).join(file))
}

fn rocket() -> rocket::Rocket {
    rocket::ignite().mount("/", routes![index, build_dir, create_sh, script_dir::script_list])
}

fn main() {
    rocket().launch();
}
