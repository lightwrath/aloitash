use rocket::{get};
use std::{io, fs, path::{Path, PathBuf}};

fn get_root_dir() -> String {
    format!("{}/../scripts/", env!("CARGO_MANIFEST_DIR"))
}

#[derive(Debug)]
struct Scripts {
    root_dir: String,
    scripts: Vec<String>
}

#[get("/script_list")]
pub fn script_list() -> String {
    let text: String = "someText".into();
    let script_dir = get_root_dir();
    for path in fs::read_dir(script_dir).unwrap() { //for each folder in scripts dir
        let entry = path.unwrap().file_name();
        println!("{:?}", entry);
    };
    text
}
