module "admin" {
  source = "./admin"
  name = "GameTradeMarket-frontend-admin"
  domain_name = "admin2.qa.gametrade.market"
}

module "app" {
  source = "./app"
  name = "GameTradeMarket-frontend-app"
  domain_name = "prod2.qa.gametrade.market"
}
