terraform {
  backend "s3" {
    bucket = "gtm-tfstate"
    key    = "frontend/app/.tfstate"
    region = "us-east-1"
  }
}
