// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{Manager, Window};


#[tauri::command]

fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
async fn close_splashscreen(window: tauri::Window) {
  // Close splashscreen
  if let Some(splashcsreen) =  window.get_window("splashscreen"){
    splashcsreen.close().unwrap();
  }
//   window.get_window("splashscreen").expect("no window labeled 'splashscreen' found").close().unwrap();
  // Show main window
  window.get_window("main").expect("no window labeled 'main' found").show().unwrap();
}


use std::process::{Command, Stdio};
use std::os::windows::process::CommandExt; // Add this line

#[tauri::command]
fn mine_driver() -> Result<String, String> {
    let output = Command::new("powershell")
        .args(&["-Command", "$driverInfo = Get-WmiObject Win32_PnPSignedDriver | Select-Object DeviceName, DriverVersion, DriverStatus; ConvertTo-Json $driverInfo"])
        .stdout(Stdio::piped())
        .stderr(Stdio::piped())
        .creation_flags(0x08000000) // CREATE_NO_WINDOW flag
        .output()
        .map_err(|e| format!("Failed to execute command: {}", e))?;

    if output.status.success() {
        let stdout = String::from_utf8_lossy(&output.stdout);
        Ok(stdout.to_string())
    } else {
        let stderr = String::from_utf8_lossy(&output.stderr);
        Err(format!("Command failed with error: {}", stderr))
    }
}

// use std::convert::TryInto;

use serde::Serialize;
// use std::error::Error;
#[derive(Serialize)]
struct SystemInfo {
    os_info: String,
    cpu_info: String,
    disk_info: String,
    video_controller_info: String,
    product_id: String,
    memory_info: String,
}



#[tauri::command]
fn __cmd__testing() -> SystemInfo {
    use std::process::{Command, Stdio};

    let os_info = Command::new("wmic")
        .args(&["os", "get", "Caption"])
        .stdout(Stdio::piped())
        .creation_flags(0x08000000) // CREATE_NO_WINDOW flag

        .output()
        .expect("Failed to execute command")
        .stdout;

    let os_info_str = String::from_utf8_lossy(&os_info).lines().nth(1).unwrap_or("").trim().to_string();

    let cpu_info = Command::new("wmic")
        .args(&["cpu", "get", "name"])
        .stdout(Stdio::piped())
        .creation_flags(0x08000000) // CREATE_NO_WINDOW flag

        .output()
        .expect("Failed to execute command")
        .stdout;

    let cpu_info_str = String::from_utf8_lossy(&cpu_info).lines().nth(1).unwrap_or("").trim().to_string();

    let disk_info = Command::new("wmic")
        .args(&["diskdrive", "get", "size"])
        .stdout(Stdio::piped())
        .creation_flags(0x08000000) // CREATE_NO_WINDOW flag

        .output()
        .expect("Failed to execute command")
        .stdout;

    let disk_info_str = String::from_utf8_lossy(&disk_info).lines().nth(1).unwrap_or("").trim().to_string();

    let disk_info_gb = match disk_info_str.parse::<u64>() {
        Ok(bytes) => bytes / (1024 * 1024 * 1024), // Convert bytes to gigabytes
        Err(_) => 0, // Handle parse errors gracefully
    };

    let disk_info_gb_str = format!("{}", disk_info_gb);

    let video_controller_info = Command::new("wmic")
        .args(&["path", "Win32_VideoController", "get", "name"])
        .stdout(Stdio::piped())
        .creation_flags(0x08000000) // CREATE_NO_WINDOW flag

        .output()
        .expect("Failed to execute command")
        .stdout;

    let video_controller_info_str = String::from_utf8_lossy(&video_controller_info).lines().nth(1).unwrap_or("").trim().to_string();

    let product_id = Command::new("wmic")
        .args(&["bios", "get", "serialnumber"])
        .stdout(Stdio::piped())
        .creation_flags(0x08000000) // CREATE_NO_WINDOW flag

        .output()
        .expect("Failed to execute command")
        .stdout;

    let product_id_str = String::from_utf8_lossy(&product_id).lines().nth(1).unwrap_or("").trim().to_string();

    let memory_info = Command::new("wmic")
    .args(&["ComputerSystem", "get", "TotalPhysicalMemory"])
    .stdout(Stdio::piped())
    .creation_flags(0x08000000) // CREATE_NO_WINDOW flag
    .output()
    .expect("Failed to execute command")
    .stdout;

let memory_info_str = String::from_utf8_lossy(&memory_info)
    .lines()
    .nth(1)
    .unwrap_or("")
    .trim()
    .to_string();


let memory_info_gb = match memory_info_str.parse::<f64>() {
    Ok(bytes) => bytes / (1024.0 * 1024.0 * 1024.0), // Convert bytes to gigabytes
    Err(_) => 0.0, // Handle parse errors gracefully
};

let rounded_memory_size_gb: u64 = memory_info_gb.ceil() as u64;

    SystemInfo {
        os_info: os_info_str,
        cpu_info: cpu_info_str,
        disk_info: disk_info_gb_str,
        video_controller_info: video_controller_info_str,
        product_id: product_id_str,
        memory_info:format!("{} ", rounded_memory_size_gb),
    }

   
}

fn main() {
    tauri::Builder::default()
    
        .invoke_handler(tauri::generate_handler![greet, mine_driver, __cmd__testing,close_splashscreen])
        .setup(|app| {
            let splashscreen_window = app.get_window("splashscreen").unwrap();
            let main_window = app.get_window("main").unwrap();
            tauri::async_runtime::spawn(async move {
              println!("Initializing...");
              std::thread::sleep(std::time::Duration::from_secs(1));
              println!("Done initializing.");
              splashscreen_window.close().unwrap();
              main_window.show().unwrap();
            });
            Ok(())
          })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}