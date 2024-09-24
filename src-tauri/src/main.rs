// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::fs::remove_file;
use tauri_plugin_sql::{Migration, MigrationKind};
use tauri::{api::path::{BaseDirectory, resolve_path}, Env};

fn main() {
    let context = tauri::generate_context!();
    let path = resolve_path(
        context.config(),
        context.package_info(),
        &Env::default(),
        "",
        Some(BaseDirectory::AppConfig))
      .expect("failed to resolve path");

    let db_path = path.to_str().unwrap().to_string() + "test.db";
    println!("App path: {}", db_path);

    // TEST PURPOSES
    if std::path::Path::new(&db_path).exists() {
        println!("test.db exists");
        remove_file(db_path).expect("Failed to remove test.db");
    } else {
        println!("test.db does not exist");
    }
    // END TEST PURPOSES

    let migrations = vec![
        Migration {
            version: 1,
            description: "create_initial_tables",
            sql: "
              CREATE TABLE account (
                  id INTEGER PRIMARY KEY AUTOINCREMENT,
                  email VARCHAR NOT NULL UNIQUE,
                  password VARCHAR NOT NULL,
                  alias VARCHAR,
                  status VARCHAR,
                  last_login TIMESTAMP,
                  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
              );
          ",
            kind: MigrationKind::Up,
        },
    ];

    tauri::Builder::default()
        .plugin(
            tauri_plugin_sql::Builder::default()
                .add_migrations("sqlite:test.db", migrations)
                .build(),
        )
        .run(context)
        .expect("error while running tauri application");
}
