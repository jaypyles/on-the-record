terraform {
  required_version = ">= 1.13.3"

  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "7.4.0"
    }

    google-beta = {
      source  = "hashicorp/google-beta"
      version = "7.4.0"
    }
  }

  backend "gcs" {
    bucket = "otr-terraform-state"
    prefix = ""
  }
}

provider "google" {
  project = var.project_id
  region  = var.region

}

resource "google_sql_database_instance" "postgres" {
  name             = "otr-events"
  database_version = "POSTGRES_15"
  region           = var.region

  settings {
    tier = "db-f1-micro"
    ip_configuration {
      ipv4_enabled = true
      authorized_networks {
        value = "0.0.0.0/0"
      }
    }
  }
}

resource "google_sql_database" "default" {
  name     = "otr-warehouse"
  instance = google_sql_database_instance.postgres.name
}

resource "google_sql_user" "default" {
  name     = var.db_user
  password = var.db_password
  instance = google_sql_database_instance.postgres.name
}
